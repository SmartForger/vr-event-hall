import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Drawer, IconButton, makeStyles, Tab, Tabs, Toolbar } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import classnames from 'classnames'

import { ChatMessages, RouteTransition, TabPanel } from 'components'
import { graphQLMutation } from '../../graphql/helpers'
import { createUserInteraction } from '../../graphql/mutations'
import { EventStages } from '../../types'
import { ISession, Sessions } from '../../helpers'

// import { StyledLayout, StyledContent, StyledGrid } from './Styled'
import { DetailsPanel, ToolsPanel } from '../videochat/Panels'
import { PollDrawer } from '../videochat/PollDrawer'

// import { useMeetingEndedRedirect } from 'hooks'
import { PollProvider, useAppState, useVideoChatContext, VideoChatProvider } from 'providers'
import { graphQLQuery, graphQLSubscription } from 'graphql/helpers'
import { onCreateSessionParticipant, onUpdateSession } from 'graphql/subscriptions'
import { ISubscriptionObject } from 'types'

import { ReactComponent as Logo } from 'assets/verizon-logo.svg'
import { DialogCard } from 'components/shared'
import { getSessionWithParticipants } from 'graphql/customQueries'
import { createSessionParticipantMin, deleteSessionParticipantMin } from 'graphql/customMutations'
import { LiveStreamPeoplePanel } from 'components/videochat/Panels/LiveStreamPeoplePanel'

interface VimeoLiveStreamProps {
  useBackupStream: Boolean
  eventStage?: EventStages
  setPostLiveStream: (changeVal: boolean) => void
}
export const LiveStreamWrapper: FC<VimeoLiveStreamProps> = (props: VimeoLiveStreamProps) => (
  <VideoChatProvider>
    <VimeoLiveStream {...props} />
  </VideoChatProvider>
)

const VimeoLiveStream: FC<VimeoLiveStreamProps> = ({ useBackupStream, eventStage, setPostLiveStream }) => {
  const classes = useStyles()
  const history = useHistory()
  const {
    appState: { user },
    dispatch: appDispatch
  } = useAppState()

  const [redirectTrigger, setRedirectTrigger] = useState<boolean>(false)
  const [qaDialogOpen, setQADialogOpen] = useState<boolean>(false)
  const [tabValue, setTabValue] = useState<number>(0)
  const [isAdmin, setAdmin] = useState<boolean>(false)
  const [showChatDrawer, setShowChatDrawer] = useState<boolean>(false)

  const { videoChatState, dispatch } = useVideoChatContext()
  const [currentSession, setCurrentSession] = useState<ISession | null>(null)
  const [participantId, setParticipantId] = useState<string>('')

  const setLoading = useCallback((payload: boolean) => dispatch({ type: 'SET_LOADING', payload }), [])

  let sessionUpdatedSubscription = useRef<ISubscriptionObject | null>(null)
  let newParticipantSubscription = useRef<ISubscriptionObject | null>(null)

  const updateSessionInfo = ({ onUpdateSession }) => {
    // setGlobalMute(onUpdateSession.muted)
    setCurrentSession(onUpdateSession)
    dispatch({
      type: 'SET_DETAILS',
      payload: {
        session: onUpdateSession,
        pinnedMessage: onUpdateSession.pinnedMessage,
        attendees: onUpdateSession.attendees
      }
    })
  }

  const getSessionInfo = async () => {
    const session = await graphQLQuery(getSessionWithParticipants, 'getSession', { id: Sessions.livestream.id })
    setCurrentSession(session)
    console.log(session)
    dispatch({
      type: 'SET_DETAILS',
      payload: {
        session: session,
        conversationId: session?.conversationId,
        pinnedMessage: session.pinnedMessage
      }
    })
    // if the user is one of the admins, set them as such
    if (session?.admins?.items?.some?.(a => a.userId === user?.id)) {
      setAdmin(true)
    }

    sessionUpdatedSubscription.current = graphQLSubscription(
      onUpdateSession,
      { id: Sessions.livestream.id },
      updateSessionInfo
    )
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500)
    getSessionInfo()

    return () => {
      sessionUpdatedSubscription?.current?.unsubscribe()
      newParticipantSubscription?.current?.unsubscribe()
      // remove the user as participant in livestream for an accurate-ish count
      if (participantId) {
        graphQLMutation(deleteSessionParticipantMin, { id: participantId })
      }
    }
  }, [])

  const handleChange = (_, newValue) => {
    setTabValue(newValue)
  }

  const participantJoined = ({ onCreateSessionParticipant }) => {
    dispatch({
      type: 'SET_DETAILS',
      payload: {
        session: {
          ...videoChatState?.session,
          participants: {
            items: [...(videoChatState?.session?.participants?.items || []), onCreateSessionParticipant]
          }
        }
      }
    })
  }

  const createParticipant = async () => {
    newParticipantSubscription?.current?.unsubscribe()

    if (
      Array.isArray(videoChatState?.session?.participants?.items) &&
      !videoChatState?.session?.participants?.items.some(p => p?.userId === user?.id)
    ) {
      const participantInfo = await graphQLMutation(
        createSessionParticipantMin,
        {
          userId: user?.id,
          sessionId: Sessions.livestream.id
        },
        'createSessionParticipant'
      )
      dispatch({
        type: 'SET_DETAILS',
        payload: {
          session: {
            ...videoChatState.session,
            participants: {
              items: [...(videoChatState?.session?.participants?.items || []), participantInfo]
            }
          }
        }
      })
      setParticipantId(participantInfo.id)
    } else {
      const participant = videoChatState?.session?.participants?.items.find(p => p?.userId === user?.id)
      setParticipantId(participant?.id || '')
    }

    newParticipantSubscription.current = graphQLSubscription(
      onCreateSessionParticipant,
      { sessionId: Sessions.livestream.id },
      participantJoined
    )
  }

  useEffect(() => {
    if (user?.id) {
      graphQLMutation(createUserInteraction, {
        name: 'livestream',
        trigger: 'view',
        type: 'livestream',
        userId: user?.id
      })
      createParticipant()
    }
  }, [user, videoChatState?.session?.participants?.items])

  useEffect(() => {
    if (
      eventStage &&
      ![EventStages.COUNTDOWN, EventStages.LIVESTREAM, EventStages.LIVESTREAMENDING].includes(eventStage)
    ) {
      setRedirectTrigger(true)
    }
  }, [eventStage])

  useEffect(() => {
    if (videoChatState?.session?.admins?.items?.some?.(a => a?.userId === user?.id)) {
      setAdmin(true)
    }
  }, [videoChatState?.session?.admins])

  const exit = () => {
    if (eventStage && [EventStages.LIVESTREAMENDING, EventStages.POSTLIVESTREAM].includes(eventStage)) {
      setPostLiveStream(true)
    }
    if (participantId) {
      graphQLMutation(deleteSessionParticipantMin, { id: participantId })
    }
    history.push(`/event`)
  }

  return (
    <PollProvider>
      <div className={classes.root}>
        <div className={showChatDrawer ? classes.streamSideWithChat : classes.streamSideFull}>
          <IconButton
            className={classes.closeButton}
            onClick={() => exit()}
            disableFocusRipple
            disableRipple
            disableTouchRipple
          >
            Exit
          </IconButton>
          {!useBackupStream ? (
            <>
              <iframe
                className={classnames([classes.iframe, showChatDrawer ? classes.iframeWithChat : classes.iframeFull])}
                title='Verizon 5G'
                src='https://vimeo.com/event/445293/embed'
                allow='autoplay; fullscreen'
                allowFullScreen
              ></iframe>
            </>
          ) : (
            <>
              <iframe
                className={classnames([classes.iframe, showChatDrawer ? classes.iframeWithChat : classes.iframeFull])}
                title='Verizon 5G'
                src='https://vimeo.com/event/445311/embed'
                allow='autoplay; fullscreen'
                allowFullScreen
              ></iframe>
            </>
          )}
        </div>

        {/* chat drawer */}
        {showChatDrawer && (
          <div className={classes.chatSide}>
            <Drawer
              anchor={'right'}
              open={true}
              ModalProps={{ hideBackdrop: true }}
              variant='persistent'
              classes={{
                paper: classes.messagePaper
              }}
            >
              <div className={classes.logo}>
                <Logo />
              </div>
              <div className={classes.displayMenu}>
                <Toolbar className={classes.toolbar}>
                  <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    className={classes.tabs}
                    TabIndicatorProps={{
                      style: { top: 0, backgroundColor: '#D52B1E', height: '4px' }
                    }}
                  >
                    <Tab label='Chat' className={classes.tab} />
                    <Tab label='People' className={classes.tab} />
                    <Tab label={isAdmin ? 'Tools' : 'Details'} className={classes.tab} />
                  </Tabs>
                </Toolbar>
                <TabPanel value={tabValue} index={0} className={classes.tabPanel}>
                  <ChatMessages videoChat={true} isLivestream={true} />
                  {qaDialogOpen ? (
                    <DialogCard
                      title='Q&A now open!'
                      message={`Submit your question by clicking the question mark icon in the chat message box`}
                      onConfirm={() => setQADialogOpen(false)}
                      onCancel={() => setQADialogOpen(false)}
                      className={classes.dialog}
                      confirmText='Ok'
                      hideCancel
                    />
                  ) : null}
                </TabPanel>
                <TabPanel value={tabValue} index={1} className={`${classes.tabPanel} ${classes.peoplePanel}`}>
                  <LiveStreamPeoplePanel isAdmin={isAdmin} />
                </TabPanel>
                {isAdmin ? (
                  <TabPanel value={tabValue} index={2} className={classes.tabPanel}>
                    <ToolsPanel inLivestream={true} />
                  </TabPanel>
                ) : (
                  <TabPanel value={tabValue} index={2} className={classes.tabPanel}>
                    {currentSession && <DetailsPanel body={Sessions.livestream.side.chatBody || ''} />}
                  </TabPanel>
                )}
              </div>
            </Drawer>
            <PollDrawer />
          </div>
        )}
      </div>
      <RouteTransition animationTrigger={redirectTrigger} route='/event' timeout={300} />
    </PollProvider>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    width: '100%'
  },
  iframe: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 'none',
    transition: 'all 200ms'
  },
  iframeFull: {
    width: '100%'
  },
  iframeWithChat: {
    width: 'calc(100% - 351px)'
  },
  closeButton: {
    color: 'white',
    position: 'absolute',
    top: 30,
    left: 30,
    zIndex: 10,
    '& svg': {
      color: '#fff'
    }
  },
  toastESSButton: {
    height: '24px',
    fontSize: '12px',
    marginBottom: '1rem',
    padding: '0 20px',
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: 'black',
      color: 'white'
    }
  },
  streamSideWithChat: {
    width: 'calc(100% - 351px)'
  },
  streamSideFull: {
    width: '100%'
  },
  chatSide: {},
  hamburgerMenu: {
    position: 'absolute',
    top: '30px',
    right: '45px',
    display: 'inline-block',
    cursor: 'pointer'
  },
  messagePaper: {
    '&.MuiPaper-root': {
      backgroundColor: 'white !important'
    }
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'white',
    minHeight: '60px',
    maxHeight: '60px'
  },
  mainMenu: {
    height: 'calc(100% - 60px)',
    overflow: 'scroll'
  },
  displayMenu: {
    width: '350px',
    color: 'white',
    height: 'calc(100% - 60px)',
    display: 'flex',
    flexDirection: 'column'
  },
  toolbar: {
    paddingRight: 0,
    paddingLeft: 0,
    alignItems: 'flex-start',
    minHeight: '50px',
    borderBottom: '1px solid #D8DADA'
  },
  tabs: {
    display: 'flex',
    width: '100%',
    color: 'black'
  },
  tab: {
    flex: 1,
    minWidth: '33.33%',
    maxWidth: '100%'
  },
  tabPanel: { flex: 1 },
  peoplePanel: {
    '& .MuiBox-root': {
      paddingTop: 0
    }
  },
  black: {
    background: 'black'
  },
  dialog: {
    position: 'absolute',
    top: 0,
    width: '100%'
  },
  avatarContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    color: 'white',
    alignItems: 'center',
    position: 'relative'
  },
  avatarCircle: {
    width: '100px',
    height: '100px',
    background: 'blue',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9
  },
  avatarLetter: {
    fontSize: '3rem'
  }
}))
