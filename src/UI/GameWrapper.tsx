import React, { useRef, useEffect, useState } from 'react'
import { Scene } from 'babylonjs/scene'
import { useWindowSize } from 'react-use'
import { Step } from 'react-joyride'

// Components
import { Chat, LiveStream, MapMarker, ProfileMenu, Video, Loader, PillButton, Toast, Tutorial, Modal } from 'components'
import Receiver from '../Receiver'

// Helpers
import { IUser, ITeleportLocation, AnchorType } from 'types'
import { tutorialSteps } from '../helpers'

interface IModalConfig {
  videoSrc?: string
  trackSrc?: string
  streamSrc?: string
  imgSource?: string
}

interface GameWrapperProps {
  user?: IUser
  users?: IUser[]
}

export const GameWrapper: React.FC<GameWrapperProps> = ({ user, users }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { width } = useWindowSize()

  const localStorage = window.localStorage
  const localStorageTutorialEnabled = localStorage.getItem('tutorialEnabled')
  const [showTutorial, setShowTutorial] = useState<boolean>(
    localStorageTutorialEnabled ? localStorageTutorialEnabled === 'true' : true
  )
  const [stepsEnabled, setStepsEnabled] = useState<boolean>(false)
  const [scene, setScene] = useState<Scene>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalConfig, setmodalConfig] = useState<IModalConfig>({})
  const [mapLocation, setMapLocation] = useState<ITeleportLocation>({
    babylonParam: 'Hall',
    name: 'Hall'
  })
  const [anchorFlags, setAnchorFlags] = useState({ right: false })
  const [steps, setSteps] = useState<Step[]>(tutorialSteps)
  const [gameLoading, setGameLoading] = useState<boolean>(true)
  const [percentLoaded, setPercentLoaded] = useState<number>(0)
  const teleportLocations: ITeleportLocation[] = [
    {
      babylonParam: 'Entryway',
      name: 'Entryway'
    },
    {
      babylonParam: 'Lounge',
      name: 'Lounge'
    },
    {
      babylonParam: 'Gallery',
      name: 'Gallery'
    },
    {
      babylonParam: 'Roundtable',
      name: 'Roundtable'
    },
    {
      babylonParam: 'Concert Hall',
      name: 'Concert Hall'
    }
  ]

  const toggleDrawer = (
    event: React.KeyboardEvent | React.MouseEvent,
    anchor: AnchorType,
    open: boolean,
    location: string = 'drawer'
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    if (location === 'drawer') {
      setAnchorFlags({ ...anchorFlags, [anchor]: open })
    } else {
      setAnchorFlags({ ...anchorFlags, [anchor]: open })
      goto3Dlocation(location)
    }
  }

  const goto3Dlocation = location => {
    var instance = BABYLON['SceneManager'].GetInstance()
    var gobjScene = instance.getScene().getNodeByName('Scene')
    var scriptMain = instance.findSceneComponent('PROJECT.VX360SceneController', gobjScene)
    scriptMain.teleport(location)
  }

  const onSceneSetup = () => {
    setScene((window as any)['scene'])
    // setShowLoading(false);
  }

  const toggleTutorial = bool => {
    if (anchorFlags.right) {
      setAnchorFlags({ right: false })
    }
    setShowTutorial(bool)
    setStepsEnabled(false)
    localStorage.setItem('tutorialEnabled', bool.toString())
  }

  const dismissWelcomeModal = () => {
    setShowTutorial(false)
    setStepsEnabled(true)
  }

  // TODO: Move to provider or store

  useEffect(() => {
    setGameLoading(true)
    const antialias = true,
      adaptive = true,
      offline = false
    const sceneFile = 'vx360.babylon'
    const scenePath = 'scene/'
    const divcvs = canvasRef.current

    Receiver.init(onSceneSetup, setmodalConfig, setShowModal, setMapLocation, teleportLocations)

    if (window.BABYLON) {
      const engine = new BABYLON.Engine(divcvs, antialias, undefined, adaptive)
      engine.enableOfflineSupport = offline
      engine.clear(new BABYLON.Color4(0, 0, 0, 0), true, true)

      window.addEventListener('resize', () => {
        engine.resize()
      })

      BABYLON.SceneLoader.ShowLoadingScreen = false
      const xmlhttp = new XMLHttpRequest()
      let textureTotal
      let textureCount = 0
      const scene = new BABYLON.Scene(engine)

      xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          const arrTextures = JSON.parse(this.responseText)
          textureTotal = arrTextures.length
          for (let i = 0; i < arrTextures.length; i++) {
            const texture = arrTextures[i]
            const ext = texture.split('.').pop()
            if (ext !== 'env') {
              new BABYLON.Texture(
                scenePath + texture,
                scene,
                undefined,
                undefined,
                undefined,
                // eslint-disable-next-line
                () => {
                  textureCount++
                  updateProgress()
                  if (textureCount === textureTotal - 3) {
                    loadScene()
                  }
                }
              )
            } else {
              new BABYLON.CubeTexture(
                scenePath + texture,
                scene,
                undefined,
                undefined,
                undefined,
                // eslint-disable-next-line
                () => {
                  textureCount++
                  updateProgress()
                  if (textureCount === textureTotal - 3) {
                    loadScene()
                  }
                },
                undefined,
                undefined,
                false
              )
            }
          }
        }
      }
      xmlhttp.open('GET', scenePath + 'textures.json', true)
      xmlhttp.send()

      const updateProgress = () => {
        let percentLoaded = Math.round((textureCount * 50) / textureTotal)
        setPercentLoaded(percentLoaded)
      }

      const loadScene = () => {
        // @ts-ignore
        BABYLON.SceneManager.LoadScene(
          scenePath,
          sceneFile,
          engine,
          newScene => {
            setPercentLoaded(100)
            window.scene = newScene
            window.scene.executeWhenReady(() => {
              // Tell React part that the scene is set up
              window.postMessage('{"command":"initialised"}', '*')

              setGameLoading(false)
              engine.runRenderLoop(() => {
                window.scene.render()
              })

              if (divcvs) {
                divcvs.style.opacity = '1'
              }
            })
          },
          evt => {
            if (evt.lengthComputable) {
              var loaded = (evt.loaded * 50) / evt.total + 50
              setPercentLoaded(loaded)
            }
          }
        )
      }
    }
    // eslint-disable-next-line
  }, [])

  // Updates the tutorial steps on window size change
  useEffect(() => {
    if (width > 766) {
      setSteps(tutorialSteps)
    } else {
      // Filter out the map step on mobile and update the placement of the menu and chat steps
      const steps = tutorialSteps
        .filter(step => step.target !== '.map-marker')
        .map(step => {
          if (step.target === '#menu-icon' || step.target === '#chat-icon') {
            step.placement = 'bottom-start'
          }
          return step
        })

      setSteps(steps)
    }
  }, [width])

  return (
    <div id='game'>
      <canvas id='cvs' ref={canvasRef} />
      {gameLoading ? <Loader percentLoaded={percentLoaded} /> : null}
      {!gameLoading && scene && (
        <>
          <Tutorial run={stepsEnabled} steps={steps} onClose={() => toggleTutorial(false)} />
          <Modal open={showTutorial} onClose={dismissWelcomeModal}>
            <div id='welcome-modal' className='welcome-modal'>
              <div className='text'>
                <h2 className='heading'>Welcome to Vx360, {user && user.firstName}!</h2>
                <div className='body'>
                  Immersive, web-based, device agnostic, and optimized for desktop and mobile, the Vx360 platform boasts
                  360 degree exploration of a virtual event space that can be completely customized for your next event.
                </div>
                <div className='actions'>
                  <PillButton type='button' className='button' variant='outlined' onClick={dismissWelcomeModal}>
                    Continue
                  </PillButton>
                </div>
              </div>
              <div className='image'></div>
            </div>
          </Modal>
          <Video
            visible={Boolean(showModal && modalConfig && modalConfig.videoSrc)}
            setVisibility={setShowModal}
            videoSrc={modalConfig.videoSrc}
            trackSrc={modalConfig.trackSrc}
          />
          <LiveStream
            visible={Boolean(showModal && modalConfig && modalConfig.streamSrc)}
            setVisibility={setShowModal}
            streamSrc={modalConfig.streamSrc}
            user={user}
            users={users}
          />
          <Modal
            open={Boolean(showModal && modalConfig && modalConfig.imgSource)}
            onClose={setShowModal}
            className='responsive-modal modal-video-only'
          >
            <img src={modalConfig.imgSource} style={{ height: '100%', width: '100%' }} alt='Modal' />
          </Modal>
          <MapMarker teleportLocations={teleportLocations} mapLocation={mapLocation} />
          <Chat user={user} users={users} />
          <ProfileMenu
            anchorFlags={anchorFlags}
            toggleTutorial={() => toggleTutorial(true)}
            toggleDrawer={toggleDrawer}
            teleportLocations={teleportLocations}
            mapLocation={mapLocation}
            user={user}
            users={users}
          />
          <Toast />
        </>
      )}
    </div>
  )
}
