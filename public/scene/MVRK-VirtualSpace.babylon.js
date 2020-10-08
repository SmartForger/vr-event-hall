window.project = true;

// Project Shader Store


// Browser Window Services

//////////////////////////////////////////////
// Babylon Toolkit - Browser Window Services
//////////////////////////////////////////////

/** Firelight Audio Shims */
window.firelightAudio = 0;
window.firelightDebug = false;
if (window.firelightAudio === 1 || window.firelightAudio === 2) {
	var fmodjs = "scripts/fmodstudio.js";
	if (window.firelightDebug === true) {
		fmodjs = ("scripts/" + (window.firelightAudio === 1) ? "fmodstudioL.js" : "fmodL.js");
	} else {
		fmodjs = ("scripts/" + (window.firelightAudio === 1) ? "fmodstudio.js" : "fmod.js");
	}
	var script2 = document.createElement('script');
	script2.setAttribute("type","text/javascript");
	script2.setAttribute("src", fmodjs);
	if (document.head != null) {
		document.head.appendChild(script2);
	} else if (document.body != null) {
		document.body.appendChild(script2);
	}
}

/** Windows Launch Mode */
window.preferredLaunchMode = 0;
if (typeof Windows !== "undefined" && typeof Windows.UI !== "undefined" && typeof Windows.UI.ViewManagement !== "undefined" &&typeof Windows.UI.ViewManagement.ApplicationView !== "undefined") {
	Windows.UI.ViewManagement.ApplicationView.preferredLaunchWindowingMode = (window.preferredLaunchMode === 1) ? Windows.UI.ViewManagement.ApplicationViewWindowingMode.fullScreen : Windows.UI.ViewManagement.ApplicationViewWindowingMode.auto;
}

/** Xbox Full Screen Shims */
document.querySelector('style').textContent += "@media (max-height: 1080px) { @-ms-viewport { height: 1080px; } }";

/** Xbox Live Plugin Shims */
window.xboxLiveServices = false;
window.isXboxLivePluginEnabled = function() {
	var isXboxLive = (typeof Windows !== "undefined" && typeof Microsoft !== "undefined" && typeof Microsoft.Xbox !== "undefined" && typeof Microsoft.Xbox.Services !== "undefined");
	var hasToolkit = (typeof BabylonToolkit !== "undefined" && typeof BabylonToolkit.XboxLive !== "undefined" && typeof BabylonToolkit.XboxLive.Plugin !== "undefined");
	return (window.xboxLiveServices === true && isXboxLive === true && hasToolkit === true);
}

/** Generic Promise Shims */
window.createGenericPromise = function(resolveRejectHandler) {
	return new Promise(resolveRejectHandler);
}
window.resolveGenericPromise = function(resolveObject) {
    return Promise.resolve(resolveObject);
}


// MVRK-VirtualSpace.ts
/* Babylon Camera Component Template */
var PROJECT;
/* Babylon Camera Component Template */
(function (PROJECT) {
    class CameraController extends BABYLON.CameraComponent {
        constructor(owner, scene, tick = true, propertyBag = {}) {
            super(owner, scene, tick, propertyBag);
            this.cameraPos = new BABYLON.Vector3(2, 1, 2);
        }
        ready() {
            // Scene execute when ready
        }
        start() {
            // Start component function
            this.scene.actionManager = new BABYLON.ActionManager(this.scene);
            this.navmesh = this.manager.getNavigationMesh();
            //this.manager.buildNavigationMesh(this.navmesh);
            console.log(this.manager.hasNavigationMesh());
            this.navmesh.material = new BABYLON.StandardMaterial("MoiMaterial", this.scene);
            this.navmesh.material.diffuseColor = new BABYLON.Color3(1., 0., 0);
            this.minimoi = BABYLON.Mesh.CreateBox("MiniMoi", 0.5, this.scene);
            this.minimoi.material = new BABYLON.StandardMaterial("MoiMaterial", this.scene);
            this.minimoi.material.diffuseColor = new BABYLON.Color3(1., 0., 0);
            this.minimoi.position = new BABYLON.Vector3(2, 1, 2);
            this.arcCam = this.camera;
            this.scene.onPointerDown = (evt, pickInfo, type) => {
                if (pickInfo.hit) {
                    var checkPoint = new BABYLON.Vector3(parseFloat(pickInfo.pickedPoint.x.toFixed(3)), parseFloat(pickInfo.pickedPoint.y.toFixed(3)), parseFloat(pickInfo.pickedPoint.z.toFixed(3)));
                    var navpoint = this.manager.getNavigationPoint(checkPoint, .1, 1);
                    var path = this.manager.findNavigationPath(this.minimoi.position, navpoint);
                    console.log(navpoint);
                    console.log(path);
                    if (path != null) {
                        this.manager.moveNavigationAgent(this.minimoi, path, 2);
                    }
                }
            };
            // this.scene.actionManager.registerAction(
            //     new BABYLON.ExecuteCodeAction(
            //         {
            //             trigger: BABYLON.ActionManager.OnLongPressTrigger,
            //             parameter: 1
            //         },
            //         function () { console.log('long press'); }
            //     )
            // );
        }
        update() {
            // Update render loop function
            //this.arcCam.setTarget(new BABYLON.Vector3(this.minimoi.position.x, 1, this.minimoi.position.z));
            this.arcCam.setTarget(this.cameraPos);
        }
        after() {
            // After render loop function
        }
        destroy() {
            // Destroy component function
        }
    }
    PROJECT.CameraController = CameraController;
})(PROJECT || (PROJECT = {}));
/* Babylon Camera Component Template */
var PROJECT;
/* Babylon Camera Component Template */
(function (PROJECT) {
    class CameraMovement extends BABYLON.CameraComponent {
        constructor(owner, scene, tick = true, propertyBag = {}) {
            super(owner, scene, tick, propertyBag);
            this.inverted = false;
        }
        start() {
            // Start component function
            let originalCameraPosition = this.camera.position.clone();
            let freeCamera = new BABYLON.FreeCamera("UniversalCamera", new BABYLON.Vector3(0, 0, -10), this.scene);
            freeCamera.position = originalCameraPosition;
            freeCamera.rotation.x = this.camera["rotation"]["x"];
            freeCamera.rotation.y = this.camera["rotation"]["y"];
            freeCamera.rotation.z = this.camera["rotation"]["z"];
            freeCamera.fov = this.camera.fov;
            this.scene.activeCamera = freeCamera;
            freeCamera.attachControl(this.scene.getEngine().getRenderingCanvas(), true);
            // Invert camera movement
            this.inverted = this.getProperty("inverted");
            if (this.inverted) {
                //console.log("INVERT CAMERA");
                this.scene.activeCamera["angularSensibility"] *= -1;
            }
        }
        update() {
            // Update render loop function
            let height = this.getProperty("height", 1.0);
            this.scene.activeCamera.position.y = height;
        }
    }
    PROJECT.CameraMovement = CameraMovement;
})(PROJECT || (PROJECT = {}));
/* Babylon Mesh Component Template */
var PROJECT;
/* Babylon Mesh Component Template */
(function (PROJECT) {
    class InsideNotification extends BABYLON.MeshComponent {
        constructor(owner, scene, tick = true, propertyBag = {}) {
            super(owner, scene, tick, propertyBag);
        }
        start() {
            // Start component function
            var boundInfo = this.mesh.getBoundingInfo();
            var max = boundInfo.boundingBox.maximumWorld;
            var min = boundInfo.boundingBox.minimumWorld;
            var diameter = 2 * boundInfo.boundingSphere.radius;
        }
        update() {
            // Update render loop function
            if (PROJECT.InsideNotification.currentRoom !== this.mesh.name) {
                var cameraPos = this.scene.activeCamera.globalPosition;
                if (this.pointIsInside(cameraPos)) {
                    PROJECT.InsideNotification.currentRoom = this.mesh.name;
                    var JSON = '{"command":"location","param1":"' + this.mesh.name + '"}';
                    window.postMessage(JSON, '*');
                }
            }
        }
        pointIsInside(point) {
            var boundInfo = this.mesh.getBoundingInfo();
            var max = boundInfo.boundingBox.maximumWorld;
            var min = boundInfo.boundingBox.minimumWorld;
            if (point.x < min.x || point.x > max.x) {
                return false;
            }
            if (point.y < min.y || point.y > max.y) {
                return false;
            }
            if (point.z < min.z || point.z > max.z) {
                return false;
            }
            return true;
        }
    }
    InsideNotification.currentRoom = "";
    PROJECT.InsideNotification = InsideNotification;
})(PROJECT || (PROJECT = {}));
/* Babylon Mesh Component Template */
var PROJECT;
/* Babylon Mesh Component Template */
(function (PROJECT) {
    class Popup extends BABYLON.MeshComponent {
        constructor(owner, scene, tick = true, propertyBag = {}) {
            super(owner, scene, tick, propertyBag);
            this.triggerType = "vod";
            this.triggerParam = "defaultParam";
            this.mesh.actionManager = new BABYLON.ActionManager(this.scene);
        }
        ready() {
            this.triggerParam = this.getProperty("triggerParam");
            this.triggerType = this.getProperty("triggerType");
            var nodeFocus = this.getProperty("focus");
            if (!!nodeFocus) {
                this.gobjFocus = this.scene.getNodeByName(nodeFocus.name);
            }
        }
        start() {
            // Start component function
            var JSON = '{"command":"' + this.triggerType + '","param":"' + this.triggerParam + '"}';
            this.mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
                trigger: BABYLON.ActionManager.OnPickTrigger
            }, () => {
                if (!!this.gobjFocus) {
                    this.gradualFocus();
                }
                window.postMessage(JSON, '*');
                console.log(JSON);
            }));
        }
        gradualFocus() {
            var camera = this.scene.activeCamera;
            var empty = new BABYLON.Mesh("empty", this.scene);
            empty.position = camera.position.clone();
            empty.rotation = camera["rotation"].clone();
            empty.movePOV(0, 0, -2);
            var vecSource = empty.position.clone();
            var vecDest = this.gobjFocus.absolutePosition;
            this.scene.activeCamera["lockedTarget"] = vecSource;
            empty.dispose();
            this.lerpCameraView(vecSource, vecDest, 0);
        }
        lerpCameraView(vecSource, vecDest, amount) {
            var newVec = BABYLON.Vector3.Lerp(vecSource, vecDest, amount);
            if (amount < 1) {
                setTimeout(() => {
                    let newAmount = amount + 0.01;
                    this.scene.activeCamera["lockedTarget"] = newVec;
                    this.lerpCameraView(vecSource, vecDest, newAmount);
                }, 5);
            }
            else {
                this.scene.activeCamera["lockedTarget"] = null;
            }
        }
    }
    PROJECT.Popup = Popup;
})(PROJECT || (PROJECT = {}));
/* Babylon Mesh Component Template */
var PROJECT;
/* Babylon Mesh Component Template */
(function (PROJECT) {
    class Spin extends BABYLON.MeshComponent {
        constructor(owner, scene, tick = true, propertyBag = {}) {
            super(owner, scene, tick, propertyBag);
            this.rotateSpeed = 1.0;
        }
        ready() {
            this.rotateSpeed = this.getProperty("rotateSpeed", 1.0);
        }
        update() {
            this.mesh.rotation.z += (this.rotateSpeed * this.manager.deltaTime);
        }
    }
    PROJECT.Spin = Spin;
})(PROJECT || (PROJECT = {}));
/* Babylon Scene Controller Template */
var PROJECT;
/* Babylon Scene Controller Template */
(function (PROJECT) {
    class VX360SceneController extends BABYLON.MeshComponent {
        constructor(owner, scene, tick = true, propertyBag = {}) {
            super(owner, scene, tick, propertyBag);
            this.followTarget = null;
            this.canvas = null;
            this.path = null;
            this.navSpeed = 3.0;
            this.destMesh = null;
            this.ellipse2 = null;
            this.trigger = false;
            this.isMoving = false;
            this.timer = null;
            this.navmesh = null;
            this.pointerActive = false;
            this.pointerMoving = false;
            this.clickTimer = null;
            this.clickTimerInterval = null;
            this.telefade = {
                speed: 0.01,
                timeout: 50,
                multiplier: 1.8,
                limit: 0.4
            };
        }
        ready() {
            // Scene execute when ready
        }
        start() {
            // Need to update sampling mode of .env cubemaps after they are displayed
            this.scene.textures.filter((tex) => tex.isCube == true).forEach((tex) => tex.updateSamplingMode(7));
            this.scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);
            this.canvas = this.scene.getEngine().getRenderingCanvas();
            this.createBlanket();
            this.originalCameraY = this.scene.activeCamera.position.y;
            this.setupDestinationMesh();
            this.setupNavMesh();
        }
        createBlanket() {
            this.blanket = document.createElement("div");
            this.blanket.style.position = "absolute";
            this.blanket.style.backgroundColor = "black";
            this.blanket.style.top = 0;
            this.blanket.style.bottom = 0;
            this.blanket.style.right = 0;
            this.blanket.style.left = 0;
            this.blanket.id = "blanket";
            this.blanket.style.opacity = 0;
            this.blanket.style.zIndex = -1;
            document.body.appendChild(this.blanket);
        }
        teleport(location) {
            // Move camera position to this gameobject's global position
            let gameObjectName = this.getProperty(location);
            let gobjLocation = this.scene.getNodeByName(gameObjectName);
            if (!!gobjLocation) {
                this.blanket.style.zIndex = 0;
                let position = gobjLocation.absolutePosition.clone();
                let originalY = this.followTarget.position.y;
                position.y = originalY;
                this.teleportRotation = gobjLocation.rotation.z + gobjLocation.rotation.y;
                this.teleportDest = position;
                this.moveAccel(this.telefade.speed);
            }
        }
        getFollowTarget() {
            return this.followTarget;
        }
        moveAccel(speed) {
            var cameraY = this.scene.activeCamera['rotation'].y;
            this.followTarget.movePOV(0, 0, -speed);
            if (speed < this.telefade.limit) {
                setTimeout(() => {
                    this.blanket.style.opacity = speed / (this.telefade.limit - speed);
                    this.moveAccel(speed * this.telefade.multiplier);
                }, this.telefade.timeout);
            }
            else {
                this.blanket.style.opacity = 1;
                this.followTarget.position = this.teleportDest;
                this.scene.activeCamera['rotation'].x = 0;
                this.scene.activeCamera['rotation'].y = this.teleportRotation;
                this.followTarget.rotation.y = this.teleportRotation;
                this.followTarget.movePOV(0, 0, speed * 2);
                this.moveDecel(this.telefade.limit);
            }
        }
        moveDecel(speed) {
            this.followTarget.movePOV(0, 0, -speed);
            if (speed > 0.001) {
                setTimeout(() => {
                    this.blanket.style.opacity = speed / (this.telefade.limit - speed);
                    this.moveDecel(speed / this.telefade.multiplier);
                }, this.telefade.timeout);
            }
            else {
                this.blanket.style.zIndex = -1;
                this.blanket.style.opacity = 0;
            }
        }
        update() {
            // Update render loop function
        }
        after() {
            // After render loop function
        }
        destroy() {
            // Destroy component function
        }
        setupDestinationMesh() {
            this.destMesh = BABYLON.MeshBuilder.CreatePlane("destMesh", { size: 1.5 }, this.scene);
            this.destMesh.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.LOCAL);
            this.destMesh.position = new BABYLON.Vector3(0, 0.05, 2.2);
            this.destMesh.visibility = 0;
            var advancedTexture1 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(this.destMesh);
            let ellipse1 = new BABYLON.GUI.Ellipse();
            ellipse1.width = "400px";
            ellipse1.height = "400px";
            ellipse1.color = "White";
            ellipse1.thickness = 16;
            ellipse1.background = "LightGray";
            ellipse1.alpha = 0.8;
            advancedTexture1.addControl(ellipse1);
            this.ellipse2 = new BABYLON.GUI.Ellipse();
            this.ellipse2.width = "400px";
            this.ellipse2.height = "400px";
            this.ellipse2.color = "White";
            this.ellipse2.thickness = 20;
            this.ellipse2.scaleX = 1;
            this.ellipse2.scaleY = 1;
            this.ellipse2.alpha = 0;
            this.ellipse2.background = "Transparent";
            advancedTexture1.addControl(this.ellipse2);
        }
        setupNavMesh() {
            this.navmesh = this.manager.getNavigationMesh();
            if (this.navmesh) {
                let camera = this.scene.activeCamera;
                this.followTarget = BABYLON.Mesh.CreateBox("target", 0.5, this.scene);
                this.followTarget.material = new BABYLON.StandardMaterial("matTarget", this.scene);
                this.followTarget.material.diffuseColor = new BABYLON.Color3(1., 0., 0);
                this.followTarget.visibility = 0;
                this.followTarget.position = camera.position.clone();
                this.followTarget.position.y = 0;
                window["follow"] = this.followTarget;
                this.scene.onBeforeRenderObservable.add(() => {
                    camera.position = this.followTarget.position.clone();
                    camera.position.y = this.originalCameraY;
                    this.followTarget.rotation.y = camera["rotation"].y;
                });
                // Can we walk on this?
                this.canvas.addEventListener('pointermove', (evt) => {
                    var pickingInfo = this.scene.pick(this.scene.pointerX, this.scene.pointerY, (mesh) => { return (mesh === this.navmesh); });
                    if (pickingInfo.hit) {
                        let navpoint = pickingInfo.pickedPoint;
                        navpoint.x = parseFloat(navpoint.x.toFixed(2));
                        navpoint.y = parseFloat(navpoint.y.toFixed(2));
                        navpoint.z = parseFloat(navpoint.z.toFixed(2));
                        var localpath = this.manager.findNavigationPath(this.followTarget.position, navpoint);
                        if (localpath != null) {
                            if (!this.isMoving && !this.pointerActive) {
                                this.destMesh.position.x = navpoint.x;
                                this.destMesh.position.y = navpoint.y;
                                this.destMesh.position.z = navpoint.z;
                                this.destMesh.visibility = 1;
                            }
                        }
                    }
                });
                this.canvas.addEventListener('pointerdown', (evt) => {
                    this.pointerMoving = true;
                    this.clickTimer = 0;
                    clearInterval(this.clickTimerInterval);
                    if (!this.isMoving) {
                        this.trigger = true;
                        this.pointerActive = true;
                        this.clickTimerInterval = setInterval(() => {
                            this.clickTimer += 10;
                        }, 10);
                        var pickingInfo = this.scene.pick(this.scene.pointerX, this.scene.pointerY, (mesh) => { return (mesh === this.navmesh); });
                        if (pickingInfo.hit) {
                            let navpoint = pickingInfo.pickedPoint;
                            navpoint.x = parseFloat(navpoint.x.toFixed(2));
                            navpoint.y = parseFloat(navpoint.y.toFixed(2));
                            navpoint.z = parseFloat(navpoint.z.toFixed(2));
                            this.path = this.manager.findNavigationPath(this.followTarget.position, navpoint);
                            // if (this.path != null) {
                            //     if (!this.isMoving) {
                            //         this.destMesh.position.x = navpoint.x;
                            //         this.destMesh.position.y = navpoint.y;
                            //         this.destMesh.position.z = navpoint.z;
                            //         this.destMesh.visibility = 1;
                            //     }
                            // }
                        }
                    }
                });
                this.canvas.addEventListener('pointerup', (evt) => {
                    if (!this.isMoving) {
                        if (this.trigger) {
                            //this.pointerActive = true;
                            var pickingInfo = this.scene.pick(this.scene.pointerX, this.scene.pointerY, (mesh) => { return (mesh === this.navmesh); });
                            if (pickingInfo.hit) {
                                var navpoint = pickingInfo.pickedPoint;
                                navpoint.x = parseFloat(navpoint.x.toFixed(2));
                                navpoint.y = parseFloat(navpoint.y.toFixed(2));
                                navpoint.z = parseFloat(navpoint.z.toFixed(2));
                                this.path = this.manager.findNavigationPath(this.followTarget.position, navpoint);
                                if (this.path != null) {
                                    if (this.clickTimer <= 100) {
                                        this.destMesh.position.x = navpoint.x;
                                        this.destMesh.position.y = navpoint.y;
                                        this.destMesh.position.z = navpoint.z;
                                        this.destMesh.visibility = 1;
                                        this.ringOut();
                                    }
                                    this.clickTimer = 0;
                                    clearInterval(this.clickTimerInterval);
                                    this.pointerActive = false;
                                }
                                else {
                                    this.destMesh.visibility = 0;
                                }
                            }
                            else {
                                this.destMesh.visibility = 0;
                            }
                        }
                        else {
                            this.destMesh.visibility = 0;
                        }
                        this.trigger = false;
                    }
                    else {
                        this.destMesh.visibility = 0;
                    }
                });
            }
        }
        ringOut() {
            this.ellipse2.height = "400px";
            this.ellipse2.width = "400px";
            this.ellipse2.alpha = 1;
            let size = 400;
            let count = 0;
            this.isMoving = true;
            this.manager.moveNavigationAgent(this.followTarget, this.path, this.navSpeed, false, () => {
                clearInterval(this.timer);
                this.timer = null;
                this.ellipse2.alpha = 0;
                this.isMoving = false;
                var pickingInfo = this.scene.pick(this.scene.pointerX, this.scene.pointerY, (mesh) => { return (mesh === this.navmesh); });
                if (pickingInfo.hit) {
                    let navpoint = pickingInfo.pickedPoint;
                    navpoint.x = parseFloat(navpoint.x.toFixed(2));
                    navpoint.y = parseFloat(navpoint.y.toFixed(2));
                    navpoint.z = parseFloat(navpoint.z.toFixed(2));
                    this.path = this.manager.findNavigationPath(this.followTarget.position, navpoint);
                    if (this.path != null) {
                        this.destMesh.position.x = navpoint.x;
                        this.destMesh.position.y = navpoint.y;
                        this.destMesh.position.z = navpoint.z;
                        this.destMesh.visibility = 0;
                    }
                }
            });
            if (!this.timer) {
                this.timer = setInterval(() => {
                    size += 8;
                    count++;
                    this.ellipse2.width = size + "px";
                    this.ellipse2.height = size + "px";
                    this.ellipse2.alpha = 1 - (count / 19);
                    if (size > 550) {
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 25);
            }
        }
    }
    PROJECT.VX360SceneController = VX360SceneController;
})(PROJECT || (PROJECT = {}));
/* Babylon Mesh Component Template */
var PROJECT;
/* Babylon Mesh Component Template */
(function (PROJECT) {
    class spin extends BABYLON.MeshComponent {
        constructor(owner, scene, tick = true, propertyBag = {}) {
            super(owner, scene, tick, propertyBag);
        }
        ready() {
            // Scene execute when ready
        }
        start() {
            // Start component function
        }
        update() {
            // Update render loop function
        }
        after() {
            // After render loop function
        }
        destroy() {
            // Destroy component function
        }
    }
    PROJECT.spin = spin;
})(PROJECT || (PROJECT = {}));


