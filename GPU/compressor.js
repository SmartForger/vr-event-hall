/*

    YOU NEED ETCTOOL INSTALLED TO USE THIS

    EtcTool - https://github.com/google/etc2comp

    to run use 'npm run compress' in the GPU directory

    to overwrite existing KTX files use 'npm run compress overwrite' instead

*/  

const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');
const { pack } = require('texture-compressor');
const { execSync } = require('child_process');
const { FILE } = require('dns');

var texturePath = {
    source:'../public/scene',
    ETC:'../public/scene',
    PVRTC:'../public/scene'
}

var myArgs = process.argv.slice(2);
let overwrite = false;
if (myArgs.length > 0 ) {
    overwrite = (myArgs[0] === "overwrite");
}

fs.readdir(texturePath.source, (err, files) => {
    if (err) {
        console.error("Could not list directory:",err);
        process.exit(1);
    }
    createPVRTC(files, 0);
});

async function createPVRTC(files, idx) {
    if (files.length === idx) {
        console.log("PVRTC FINISHED!");
        createETC2(files, 0)
    } else {
        var filename = files[idx];
        var ext = path.parse(filename).ext.toLowerCase(); 
        if (!(ext === ".jpg" || ext === ".jpeg" || ext === ".png")) {
            createPVRTC(files, ++idx);
        } else {    
            var inPath = texturePath.source+"/"+filename;
            var newFilename = path.parse(filename).name+"-pvrtc.ktx";
            var outPath = texturePath.PVRTC+"/"+newFilename;

            let skipThis = false;
            if (!overwrite) {
                if (fs.existsSync(outPath)) {
                    skipThis = true;
                }
            }

            if (!skipThis) {
                var compression = "PVRTC1_2";
                if ((ext === ".jpg") || (ext === ".jpeg")) {
                    compression = "PVRTC1_2_RGB";
                }
                await pack({
                    type: 'pvrtc',
                    input: inPath,
                    output: outPath,
                    compression: compression,
                    quality: 'pvrtcbest',
                    verbose: false,
                    flipY: true,
                    pot: '+',
                    square: '+',
                    mipmap: true
                }).then(() => {
                    console.log(newFilename+" DONE!");
                }).catch((reason) => {
                    console.log(newFilename,reason);
                })
            }
            createPVRTC(files, ++idx);
        }
    }
}

function createETC2(files, idx) {
    if (files.length === idx) {
        console.log("ETC2 FINISHED!");
    } else {
        var filename = files[idx];
        let ext = path.parse(filename).ext.toLowerCase(); 
        if (!(ext === ".jpg" || ext === ".jpeg" || ext === ".png")) {
            createETC2(files, ++idx);
        } else {    
            let basename = path.parse(filename).name;
            var inPath = texturePath.source+"/"+filename;
            var newFilename = basename+"-etc2.ktx";
            var outPath = texturePath.ETC+"/"+newFilename;
            var tempJPG = texturePath.ETC+"/__JPG__"+basename+".png";
            var tempPNG = texturePath.ETC+"/__PNG__"+basename+".png";
            var tempPath;

            const convertETC = (hasAlpha = false) => {
                let alpha = ''
                let prefix = '__PNG__'
                if (hasAlpha) {
                    alpha = 'A'
                } else {
                    prefix = '__JPG__'                
                }
                execSync(`EtcTool "${tempPath}" -jobs 8 -format RGB${alpha}8 -effort 90 -m 10 -output "${outPath}"`)

                // Remove temp PNG files
                fs.unlink(tempPath, () => {
                    console.log(filename+" DONE!")
                    createETC2(files, ++idx)
                })
            }

            let skipThis = false;
            if (!overwrite) {
                if (fs.existsSync(outPath)) {
                    skipThis = true;
                }
            }

            if (!skipThis) {
                if (ext === "jpg") {
                    Jimp.read(inPath, (err, JimpFile) => {
                        if (err) throw err;
                        JimpFile.flip(false, true).write(tempJPG,() => {
                            tempPath = tempJPG;
                            convertETC();
                        });
                    })
                } else {
                    Jimp.read(inPath, (err, JimpFile) => {
                        if (err) throw err;
                        JimpFile.flip(false, true).write(tempPNG,() => {
                            tempPath = tempPNG;
                            convertETC(true);
                        });
                    })
                }
            } else {
                createETC2(files, ++idx)                
            }
        }
    }
}
