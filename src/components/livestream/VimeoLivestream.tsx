import React, { FC, useEffect, useState, useCallback, useRef } from 'react'
import { Close } from '@material-ui/icons'
import { RouteTransition } from 'components'
import { graphQLMutation } from '../../graphql/helpers'
import { createUserInteraction } from '../../graphql/mutations'
import { EventStages, IUser } from '../../types'

import { Box, Drawer, makeStyles, Tab, Tabs, Toolbar, IconButton } from '@material-ui/core'

import MeetingControls from '../videochat/MeetingControls'
import MeetingDetails from '../videochat/MeetingDetails'
// import { StyledLayout, StyledContent, StyledGrid } from './Styled'
import { DetailsPanel, PeoplePanel, ToolsPanel } from '../videochat/Panels'
import { PollDrawer } from '../videochat/PollDrawer'
import { ChatMessages, TabPanel } from 'components'

// import { useMeetingEndedRedirect } from 'hooks'
import { useAppState, useVideoChatContext, PollProvider, VideoChatProvider } from 'providers'
import { graphQLQuery, graphQLSubscription } from 'graphql/helpers'
import { onUpdateSession } from 'graphql/subscriptions'
import { ISubscriptionObject, ISession } from 'types'

import { ReactComponent as Logo } from 'assets/verizon-logo.svg'
import { ConditionalWrapper, DialogCard } from 'components/shared'
import { Sessions } from '../../helpers'
import { getSessionWithParticipants } from 'graphql/customQueries'
import { createSessionParticipantMin, deleteSessionParticipantMin } from 'graphql/customMutations'
import { LiveStreamPeoplePanel } from 'components/videochat/Panels/LiveStreamPeoplePanel'
import { useLocation } from 'react-router-dom'

interface VimeoLiveStreamProps {
  useBackupStream: Boolean
  eventStage?: EventStages
}
export const LiveStreamWrapper: FC<VimeoLiveStreamProps> = (props: VimeoLiveStreamProps) => (
  <VideoChatProvider>
    <VimeoLiveStream {...props} />
  </VideoChatProvider>
)

const VimeoLiveStream: FC<VimeoLiveStreamProps> = ({ useBackupStream, eventStage }) => {
  const classes = useStyles()
  const [redirectTrigger, setRedirectTrigger] = useState<boolean>(false)
  const [qaDialogOpen, setQADialogOpen] = useState<boolean>(false)
  const [tabValue, setTabValue] = useState<number>(0)
  const [isAdmin, setAdmin] = useState<boolean>(false)
  const {
    appState: { user }
  } = useAppState()
  const { videoChatState, dispatch } = useVideoChatContext()
  const [currentSession, setCurrentSession] = useState<ISession | null>(null)
  const [participantId, setParticipantId] = useState<string>('')
  const setLoading = useCallback((payload: boolean) => dispatch({ type: 'SET_LOADING', payload }), [])

  let sessionUpdatedSubscription = useRef<ISubscriptionObject | null>(null)

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
      // remove the user as participant in livestream for an accurate-ish count
      if (participantId) {
        graphQLMutation(deleteSessionParticipantMin, { id: participantId })
      }
    }
  }, [])

  const handleChange = (_, newValue) => {
    setTabValue(newValue)
  }

  const createParticipant = async () => {
    if (
      Array.isArray(videoChatState?.session?.participants?.items) &&
      !videoChatState?.session?.participants?.items.some(p => p.userId === user?.id)
    ) {
      const participantInfo = await graphQLMutation(
        createSessionParticipantMin,
        {
          userId: user?.id,
          sessionId: Sessions.livestream.id
        },
        'createSessionParticipant'
      )
      setParticipantId(participantInfo.id)
    } else {
      const participant = videoChatState?.session?.participants?.items.find(p => p.userId === user?.id)
      setParticipantId(participant?.id || '')
    }
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
    if (eventStage && ![EventStages.COUNTDOWN, EventStages.LIVESTREAM].includes(eventStage)) {
      setRedirectTrigger(true)
    }
  }, [eventStage])

  const close = () => {
    setRedirectTrigger(true)
    if (participantId) {
      console.log('DELETE')
      graphQLMutation(deleteSessionParticipantMin, { id: participantId })
    }
  }

  return (
    <PollProvider>
      <div className={classes.root}>
        <div className={classes.streamSide}>
          <IconButton
            className={classes.closeButton}
            onClick={close}
            disableFocusRipple
            disableRipple
            disableTouchRipple
          >
            <Close />
          </IconButton>
          {!useBackupStream ? (
            <>
              <iframe
                className={classes.iframe}
                title='Verizon 5G'
                src='https://vimeo.com/event/445293/embed'
                allow='autoplay; fullscreen'
                allowFullScreen
              ></iframe>
            </>
          ) : (
            <>
              <iframe
                className={classes.iframe}
                title='Verizon 5G'
                src='https://vimeo.com/event/445311/embed'
                allow='autoplay; fullscreen'
                allowFullScreen
              ></iframe>
            </>
          )}
        </div>

        {/* chat drawer */}
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
                  <ToolsPanel />
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
    width: 'calc(100% - 351px)',
    height: '100%',
    border: 'none'
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    left: 30,
    zIndex: 10,
    '& svg': {
      color: '#fff'
    }
  },
  streamSide: {
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
