import React, { useEffect, useRef, useState, useMemo } from 'react'
import { Scene } from 'babylonjs/scene'
import { useWindowSize } from 'react-use'
import { I18n } from 'aws-amplify'
import { Step } from 'react-joyride'
import { Grid, makeStyles, Snackbar, Typography, Box, IconButton } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { Close } from '@material-ui/icons'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { menuDrawerOpen, toggleDrawer } from 'redux/menu'
// Components
import {
  About,
  ClassRoomContainer,
  Contact,
  Header,
  IntroTutorial,
  Loader,
  Modal,
  Navigation,
  PillButton,
  ProfileMenu,
  SceneWrapper,
  Support,
  Tutorial
} from 'components'
import { ToastAlert, Video } from 'components/shared'
import { graphQLSubscription } from 'graphql/helpers'
// TODO: rename once we  have the real thing
import { onCreateNotification } from 'graphql/subscriptions'
import Receiver from '../Receiver'
// Helpers
import {
  findSessionById,
  introTutorialSteps,
  ISession,
  Sessions,
  sessionTutorialSteps,
  tutorialSteps
} from '../helpers'
import { GameFlowStepsConfig } from '../helpers/steps'
import {
  ETouchpoints,
  EventStages,
  GameFlowSteps,
  IDemo,
  INoticeConfig,
  ISubscriptionObject,
  ITeleportLocation,
  IUser
} from 'types'
import { Demos } from '../helpers/demos'
import { Alert } from '@material-ui/lab'
import { VideoChatProvider, useAppState } from 'providers'
import { E3DSessionNameVals } from 'types'
import { JoyrideTutorialStyles } from '../components/shared/tutorial/JoyrideTutorialStyles'
import { useBrowserCache } from '../hooks'
import { RosterProvider } from 'providers/RosterProvider'
import { VideoChatContainer } from 'components/videochat/VideoChatContainer'

interface IModalConfig {
  videoSrc?: string
  trackSrc?: string
  streamSrc?: string
  imgSource?: string
  demo?: string
  type?: string
}

interface GameWrapperProps {
  user?: IUser
  users?: IUser[]
  eventStage?: EventStages
  streamStartTime?: string
  vcOff?: boolean
  postLiveStream?: boolean
  setPostLiveStream: (val: boolean) => void
}

export const GameWrapper: React.FC<GameWrapperProps> = ({
  user,
  users,
  eventStage,
  streamStartTime,
  postLiveStream,
  setPostLiveStream,
  vcOff
}) => {
  const dispatch = useDispatch()

  // Selectors
  const drawerOpen = useSelector(menuDrawerOpen)
  const history = useHistory()
  const { width } = useWindowSize()
  const classes = useStyles()
  // const {
  //   appState: { postStream: postLiveStream }
  // } = useAppState()

  const localStorage = window.localStorage
  const [eventStartingSoon, setEventStartingSoonState] = useState<boolean>(false)
  const [eSSClosed, setESSClosed] = useState<boolean>(false)
  const [showTooltip, setShowTooltip] = useState<boolean>(false)
  const [breakoutNoticeOpen, setBreakoutNoticeOpen] = useState<boolean>(!!postLiveStream)
  const [reservedBreakoutSession, setReservedBreakoutSession] = useState<ISession | undefined>()

  setTimeout(() => {
    setShowTooltip(true)
  }, 8000)

  // notice configs
  const [activeNotice, setActiveNotice] = useState<INoticeConfig>({})
  let noticeSubscription = useRef<ISubscriptionObject | null>(null)

  const [welcomeTutorialViewedLoading, welcomeTutorialViewed, setWelcomeTutorialViewed] = useBrowserCache(
    'welcome-tutorial-dismissed'
  )
  const [sessionTutorialViewedLoading, sessionTutorialViewed, setSessionTutorialViewed] = useBrowserCache(
    'session-tutorial-dismissed'
  )
  const [stepsEnabled, setStepsEnabled] = useState<boolean>(false)
  const [scene, setScene] = useState<Scene>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalConfig, setModalConfig] = useState<IModalConfig>({})
  const [mapLocation] = useState<ITeleportLocation>({
    babylonParam: 'Hall',
    name: 'Hall'
  })
  const [steps, setSteps] = useState<Step[]>(tutorialSteps)
  const [gameLoading, setGameLoading] = useState<boolean>(true)
  const [hideExploreText, setHideExploreText] = useState<boolean>(false)
  const [hideSessionsText, setHideSessionsText] = useState<boolean>(false)
  const [showLivestream, setShowLivestream] = useState<boolean>(false)
  const [showGUI, setShowGUI] = useState<boolean>(false)
  const [loaderOptions, setLoaderOptions] = useState<any>({})
  const [gameState, setGameState] = useState<GameFlowSteps>(GameFlowSteps.Intro)
  const [prevGameState, setPrevGameState] = useState<GameFlowSteps>(GameFlowSteps.Intro)
  const [activeDemo, setActiveDemo] = useState<IDemo>(Demos.mecExplainer)
  const [activeSession, setActiveSession] = useState<ISession>(Sessions['financialServices'])
  const [activeTouchpoint, setActiveTouchpoint] = useState<ETouchpoints>(ETouchpoints.None)
  const [conversationId, setConversationId] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [infoMessage, setInfoMessage] = useState<string | null>(null)

  // set the tutorial as viewed for next visit
  const handleToggleDrawer = () => dispatch(toggleDrawer(!drawerOpen))

  const goto3Dlocation = location => {
    const ifx: HTMLIFrameElement = document.getElementById('ifx') as HTMLIFrameElement
    const welcomeSteps = [GameFlowSteps.Intro, GameFlowSteps.Welcome, GameFlowSteps.Connect]
    let newLocation = location

    if ([GameFlowSteps.Sessions, GameFlowSteps.Explore, GameFlowSteps.Session].includes(location)) {
      window.postMessage(`{"command":"location", "param": "${location}"}`, '*')
    } else if (welcomeSteps.includes(prevGameState) && welcomeSteps.includes(location)) {
      setPrevGameState(location)
      return
    }

    setPrevGameState(location)
    triggerAnimation(newLocation)

    function triggerAnimation(newLocation) {
      if (ifx != null && ifx.contentWindow != null) {
        try {
          //@ts-ignore
          if (ifx.contentWindow.PROJECT) {
            //@ts-ignore
            ifx.contentWindow.PROJECT.AnimatorManager.Instance.GetAnimator('ThriveAnimator').animator.setInteger(
              'State',
              GameFlowStepsConfig[newLocation].animation.state
            )
          }
        } catch (e) {
          console.error(e)
        }
      }
    }
  }

  const onSceneSetup = () => {
    setScene((window as any)['scene'])
  }

  const toggleTutorial = (bool: boolean) => {
    // setShowTutorial(bool)
    setStepsEnabled(false)
    localStorage.setItem('tutorialEnabled', bool.toString())
  }

  ///////////////////////////////////////////////////////////
  // Babylon Scene Loader Window Hooks
  ///////////////////////////////////////////////////////////
  window['loadScene'] = (sceneFile: string, queryString?: string) => {
    if (window.state != null && window.state.showSceneLoader != null) {
      window.state.showSceneLoader(true)
    } else {
      setGameLoading(true)
      setLoaderOptions({ indeterminate: false, percentLoaded: 0 })
    }
    let url: string = `${process.env.PUBLIC_URL}/babylon/engine.html?scene=${sceneFile}`
    if (queryString != null) url += queryString
    const ifx: HTMLIFrameElement = document.getElementById('ifx') as HTMLIFrameElement
    if (ifx != null) {
      if (ifx.contentWindow != null) {
        ifx.contentWindow.location.replace(url)
      } else ifx.src = url
    }
  }
  window['updateStatus'] = (status: string, details: string, state: number) => {
    if (window.state != null && window.state.updateSceneLoader != null) {
      window.state.updateSceneLoader(status, details, state)
    } else {
      setLoaderOptions({ indeterminate: true, loadingStatus: status, loadingDetails: details, loadingState: state })
    }
  }
  window['updateProgress'] = (progress: number) => {
    if (window.state != null && window.state.tickSceneLoader != null) {
      window.state.tickSceneLoader(progress)
    } else {
      setLoaderOptions({ indeterminate: false, percentLoaded: progress })
    }
  }
  window['showGameLoading'] = (show: boolean) => {
    setGameLoading(show)
  }
  window['loadSceneComplete'] = () => {
    if (!window.scene) {
      window.scene = true
      window.postMessage('{"command":"initialised"}', '*') // Tell React part that the scene is set up
    }
    if (window.state != null && window.state.showSceneLoader != null) {
      window.state.showSceneLoader(false)
    } else {
      setGameLoading(false)
      setTimeout(() => {
        setShowGUI(true)
      }, GameFlowStepsConfig[GameFlowSteps.Intro].animation.time)
    }
  }
  ///////////////////////////////////////////////////////////
  // Babylon Web Socket Window Hook
  ///////////////////////////////////////////////////////////
  window['socketConnect'] = connection => {
    if (window['io'] != null) {
      if (window.state == null) window.state = {}
      window.state['socket'] = window['io'].connect(connection, { transports: ['websocket'] })
      if (window.state['socket'] != null) {
        window.state['socket'].on('connect', () => {
          if (window.state.onSocketConnect) {
            window.state.onSocketConnect()
          }
          window.state['socket'].on('disconnect', () => {
            if (window.state.onSocketDisconnect) {
              window.state.onSocketDisconnect()
            }
          })
        })
      }
    }
    return window.state != null && window.state['socket'] != null ? window.state['socket'] : null
  }
  ///////////////////////////////////////////////////////////

  useEffect(() => {
    setLoaderOptions({ indeterminate: false, percentLoaded: 0 })

    const defaultSceneFile = 'VerizonEnterprise.gltf'

    Receiver.init(
      onSceneSetup,
      setHideExploreText,
      setHideSessionsText,
      setGameState,
      setActiveDemo,
      setActiveSession,
      setActiveTouchpoint,
      setModalConfig,
      setShowModal,
      setConversationId,
      user
    )

    window.loadScene(defaultSceneFile)

    const newNotificationCreated = data => {
      const notification = data.onCreateNotification

      // in case there's extra stuff in the notice from the subscription
      const uiNotice: INoticeConfig = {
        type: notification.type,
        body: notification.body,
        button: notification.button,
        link: notification.link
      }
      setActiveNotice(uiNotice)
    }
    // I think this means we will subscribe to ANY new notice
    noticeSubscription.current = graphQLSubscription(onCreateNotification, {}, newNotificationCreated)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (postLiveStream !== undefined) {
      setBreakoutNoticeOpen(postLiveStream)
      setESSClosed(postLiveStream === true)
    }
  }, [postLiveStream])

  const getDetailsForReservedBreakoutSession = async () => {
    let reservedSessionId = user?.sessions?.items?.[0]?.sessionId
    if (reservedSessionId) {
      setReservedBreakoutSession(findSessionById(reservedSessionId))
    } else if (setReservedBreakoutSession) {
      setReservedBreakoutSession(undefined)
    }
  }

  useEffect(() => {
    if (breakoutNoticeOpen !== undefined) {
      getDetailsForReservedBreakoutSession()
    }
  }, [breakoutNoticeOpen])

  const goToReservedSession = () => {
    if (reservedBreakoutSession) {
      // go to the breakout session set as the user's resereved one
      window.postMessage(`{"command":"sessions", "param": "${reservedBreakoutSession?.sceneKey}"`, '*')
    } else {
      // or go to the breakout session monoliths so the user can choose
      setGameState(GameFlowSteps.Sessions)
    }
    setBreakoutNoticeOpen(false)
    setEventStartingSoonState(false)
    setReservedBreakoutSession(undefined)
  }

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

  useEffect(() => {
    goto3Dlocation(gameState)
  }, [gameState])

  useEffect(() => {
    if (
      eventStage === EventStages.LIVESTREAM ||
      (eventStage === EventStages.COUNTDOWN && streamStartTime && Number(streamStartTime) < new Date().getTime())
    ) {
      setShowLivestream(true)
    } else {
      setShowLivestream(false)
    }
  }, [eventStage, streamStartTime])

  useEffect(() => {
    if (!drawerOpen && conversationId) {
      handleToggleDrawer()
    }
  }, [conversationId])

  const noticeButtonClick = () => {
    switch (activeNotice.type) {
      case 'demo':
        // go to demos
        setGameState(GameFlowSteps.Explore)
        break
      case 'session':
        // go to a specific session
        setGameState(GameFlowSteps.Session)
        setActiveSession(Sessions[activeNotice?.link || 'financialServices'])
        break
      case 'external':
        // open an external link in a new tab
        window.open(activeNotice.link)
        break
      default:
        console.warn('notice')
    }
    setActiveNotice({})
  }

  useEffect(() => {
    if (gameLoading) {
      return
    }
    const sessionId = new URLSearchParams(window.location.search).get('sessionId')
    if (!sessionId) {
      return
    }

    if (sessionId === 'home') {
      setGameState(GameFlowSteps.Sessions)
      return
    }

    const session = findSessionById(sessionId)
    if (!session) {
      return
    }
    setGameState(GameFlowSteps.Session)
    setActiveSession(session)
  }, [gameLoading])

  return (
    <div id='game' className={classes.gameContainer}>
      <iframe
        id='ifx'
        className={classes.frameContainer}
        width='100%'
        height='100%'
        scrolling='no'
        frameBorder='0'
        title='ifx'
      />
      {gameLoading && <Loader loaderOptions={loaderOptions} />}
      <VideoChatProvider>
        {!gameLoading && showGUI && (
          <>
            <Header>
              <Navigation
                activeTab={gameState}
                setActiveTab={setGameState}
                streamStartTime={streamStartTime}
                eventStage={eventStage}
                setShowLivestream={setShowLivestream}
                showLivestream={showLivestream}
                notifyESS={() => setEventStartingSoonState(true)}
              />
            </Header>
            <SceneWrapper
              changeActiveTouchpoint={setActiveTouchpoint}
              changeScene={setGameState}
              activeScene={gameState}
              prevScene={prevGameState}
              hideExploreText={hideExploreText}
              hideSessionsText={hideSessionsText}
              user={user}
              activeDemo={activeDemo}
              activeSession={activeSession}
              activeTouchpoint={activeTouchpoint}
              drawerOpen={drawerOpen}
              setSuccessMessage={setSuccessMessage}
              setErrorMessage={setErrorMessage}
            />
            <ProfileMenu
              toggleTutorial={() => toggleTutorial(true)}
              toggleIntroTutorial={() => setWelcomeTutorialViewed(false)}
              toggleDrawer={handleToggleDrawer}
              setGameState={setGameState}
              mapLocation={mapLocation}
              drawerOpen={drawerOpen}
              user={user}
              users={users}
              conversationId={conversationId}
              setConversationId={setConversationId}
              vcOff={vcOff}
            />
            <Tutorial run={stepsEnabled} steps={steps} onClose={() => toggleTutorial(false)} />
            <Video videoSrc={modalConfig.videoSrc || ''} />
            <Modal
              open={Boolean(showModal && modalConfig && modalConfig.imgSource)}
              onClose={setShowModal}
              className='responsive-modal modal-video-only'
            >
              <img src={modalConfig.imgSource} style={{ height: '100%', width: '100%' }} alt='Modal' />
            </Modal>
            {showModal && modalConfig.type === 'about' && <About showModal={showModal} setShowModal={setShowModal} />}
            {showModal && modalConfig.type === 'connect' && (
              <Contact
                setSuccessMessage={setSuccessMessage}
                setErrorMessage={setErrorMessage}
                showModal={showModal}
                setShowModal={setShowModal}
                user={user}
                demo={modalConfig.demo}
              />
            )}
            {showModal && modalConfig.type === 'support' && (
              <Support
                setSuccessMessage={setSuccessMessage}
                setErrorMessage={setErrorMessage}
                showModal={showModal}
                setShowModal={setShowModal}
                user={user}
              />
            )}
            <RosterProvider>
              <ClassRoomContainer />
            </RosterProvider>

            {vcOff ? null : <VideoChatContainer />}

            {showTooltip && !welcomeTutorialViewedLoading && showGUI && (
              <IntroTutorial
                run={!welcomeTutorialViewed}
                steps={introTutorialSteps(user)}
                onClose={() => setWelcomeTutorialViewed(true)}
                styles={JoyrideTutorialStyles}
              />
            )}

            {showTooltip &&
              !sessionTutorialViewedLoading &&
              (gameState === GameFlowSteps.Sessions || gameState === GameFlowSteps.Explore) && (
                <IntroTutorial
                  run={!sessionTutorialViewed}
                  steps={sessionTutorialSteps}
                  onClose={() => setSessionTutorialViewed(true)}
                  styles={JoyrideTutorialStyles}
                />
              )}

            {eventStartingSoon && !breakoutNoticeOpen ? (
              <ToastAlert type='notice' isOpen={eventStartingSoon && !eSSClosed} onClose={() => setESSClosed(true)}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant='h5' paragraph classes={{ root: classes.toastESSTitle }}>
                      {I18n.get('startingSoon')}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <PillButton
                      type='button'
                      variant='outlined'
                      textColor='white'
                      backgroundColor='black'
                      solid
                      onClick={() => history.push('/stream')}
                      classes={{ root: classes.toastESSButton }}
                    >
                      {I18n.get('goToLiveStream')}
                    </PillButton>
                  </Grid>
                </Grid>
              </ToastAlert>
            ) : null}

            {/* Post-Livestream Breakout Notice */}
            {breakoutNoticeOpen ? (
              <div className={classes.modal}>
                <div className={classes.modalBody}>
                  <Box p={4}>
                    <Box mb={4} mt={2}>
                      <Typography style={{ color: '#000' }} variant='h4'>
                        {reservedBreakoutSession ? 'Join your breakout session.' : 'Join a breakout session.'}
                      </Typography>
                    </Box>
                    <Typography style={{ color: '#000' }}>
                      {reservedBreakoutSession
                        ? `Your breakout session for ${I18n.get(
                            `breakoutSessionName-${reservedBreakoutSession.nameKey}`
                          )} is starting soon. Click below to join your session. If you do not join within 5 minutes you may lose your seat to a guest on the waitlist.`
                        : I18n.get('genericBreakoutsStartingMessage')}
                    </Typography>
                    <Box>
                      <PillButton
                        type='button'
                        classes={{ root: classes.toastESSButton }}
                        variant='outlined'
                        textColor='white'
                        backgroundColor='black'
                        onClick={() => goToReservedSession()}
                      >
                        {reservedBreakoutSession ? 'Join session' : 'Pick your breakout session'}
                      </PillButton>
                    </Box>
                  </Box>
                  <IconButton className={classes.closeButtonModal} onClick={() => setBreakoutNoticeOpen(false)}>
                    <Close />
                  </IconButton>
                </div>
              </div>
            ) : null}

            {/* Toast for Notice */}
            <ToastAlert type='notice' isOpen={!!activeNotice?.type} onClose={() => setActiveNotice({})}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant='h5' paragraph classes={{ root: classes.toastESSTitle }}>
                    {activeNotice?.body}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <PillButton
                    type='button'
                    className='button'
                    variant='outlined'
                    textColor='white'
                    backgroundColor='black'
                    onClick={() => noticeButtonClick()}
                    classes={{ root: classes.toastESSButton }}
                  >
                    {activeNotice?.button}
                  </PillButton>
                </Grid>
              </Grid>
            </ToastAlert>

            {(Boolean(successMessage) || Boolean(errorMessage) || Boolean(infoMessage)) && (
              <Snackbar
                className={classes.toastPosition}
                open={Boolean(successMessage) || Boolean(errorMessage) || Boolean(infoMessage)}
                autoHideDuration={5000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                onClose={() => {
                  successMessage && setSuccessMessage(null)
                  errorMessage && setErrorMessage(null)
                  infoMessage && setInfoMessage(null)
                }}
              >
                <Alert severity={successMessage ? 'success' : infoMessage ? 'info' : 'error'} variant='filled'>
                  {successMessage ? successMessage : infoMessage ? infoMessage : errorMessage}
                </Alert>
              </Snackbar>
            )}
          </>
        )}
      </VideoChatProvider>
    </div>
  )
}

const useStyles = makeStyles({
  toastESSTitle: {},
  toastESSButton: {
    height: '32px',
    fontSize: '12px',
    margin: '0.5em',
    padding: '6px 12px',
    width: 'auto',
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: 'black',
      color: 'white'
    }
  },
  toastPosition: {
    right: 88
  },
  gameContainer: {
    backgroundColor: '#e7e7e7'
  },
  frameContainer: {
    marginTop: 60,
    height: 'calc(100vh - 60px)'
  },
  modal: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 9999,
    height: '100vh',
    width: '100vw',
    top: 0,
    left: 0
  },
  modalBody: {
    backgroundColor: '#fff',
    width: 560,
    position: 'relative'
  },
  closeButtonModal: {
    position: 'absolute',
    right: 0,
    top: 0
  }
})
