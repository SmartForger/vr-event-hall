/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import {
  useContentShareState,
  UserActivityProvider,
  useRemoteVideoTileState,
  ContentShare,
  useRosterState,
  VideoTileGrid,
  VideoGrid,
  VideoTile,
  useLocalVideo,
  LocalVideo
} from 'amazon-chime-sdk-component-library-react'
import { Button, Drawer, makeStyles, Tab, Tabs, Toolbar, Typography } from '@material-ui/core'
import { Modal } from '@mvrk-hq/vx360-components'

import MeetingControls from '../MeetingControls'
import MeetingDetails from '../MeetingDetails'
import { StyledLayout, StyledContent } from './Styled'
import { DetailsPanel, PeoplePanel, ToolsPanel } from '../Panels'
import { DeviceSetup } from '../DeviceSetup'
import { ChatMessages, CountdownTimer, RadioButtons, TabPanel } from 'components'

// import { useMeetingEndedRedirect } from 'hooks'
import { useAppState, useVideoChatContext } from 'providers'
import { graphQLQuery, graphQLSubscription } from 'graphql/helpers'
import { getSession } from 'graphql/queries'
import { onUpdateSession } from 'graphql/subscriptions'
import { IPollObject, ISubscriptionObject, ISession } from 'types'

import { ReactComponent as Logo } from 'assets/verizon-logo.svg'

interface ClassRoomVideoChatModalProps {}

export const ClassRoomVideoChatModal: FC<ClassRoomVideoChatModalProps> = () => {
  const classes = useStyles()
  const {
    appState: { user }
  } = useAppState()
  const [presenterTileId, setPresenterTileId] = useState<number | null>(null)
  const [currentSession, setCurrentSession] = useState<ISession | null>(null)
  const [userStarted, setUserStarted] = useState<boolean>(false)
  const [pollResponse, setPollResponse] = useState<string>('')
  const [activePoll, setActivePoll] = useState<IPollObject | null>(null)
  // Chime
  const { isVideoEnabled } = useLocalVideo()
  const { tiles, attendeeIdToTileId } = useRemoteVideoTileState()
  const { isLocalUserSharing, sharingAttendeeId } = useContentShareState()
  const { roster } = useRosterState()
  const rosterArray = Object.values(roster)

  let sessionUpdatedSubscription = useRef<ISubscriptionObject | null>(null)

  const { videoChatState, dispatch } = useVideoChatContext()
  const [tabValue, setTabValue] = useState<number>(0)
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
  let isPresenter = currentSession?.admins.items.some(admin => admin.userId === (user?.id as string))
  let isVideoPresenter = currentSession?.presenterPins.includes(user?.id as string)

  const setLoading = useCallback((payload: boolean) => dispatch({ type: 'SET_LOADING', payload }), [])
  // useMeetingEndedRedirect(setLoading)

  const setVisible = useCallback(
    (visible: boolean) =>
      dispatch({
        type: 'SET_DETAILS',
        payload: {
          visible,
          isClassRoom: true
        }
      }),
    []
  )

  const setGlobalMute = (globalMute: boolean) => dispatch({ type: 'SET_DETAILS', payload: { globalMute } })

  const updateSessionInfo = ({ onUpdateSession }) => {
    setGlobalMute(onUpdateSession.muted)
    setCurrentSession(onUpdateSession)
  }

  const getSessionInfo = async () => {
    const session = await graphQLQuery(getSession, 'getSession', { id: videoChatState.sessionId })
    setCurrentSession(session)

    dispatch({
      type: 'SET_DETAILS',
      payload: {
        pinnedMessage: session.pinnedMessage
      }
    })

    sessionUpdatedSubscription.current = graphQLSubscription(
      onUpdateSession,
      { id: videoChatState.sessionId },
      updateSessionInfo
    )
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500)
    if (videoChatState.sessionId) {
      getSessionInfo()
    }
    // eslint-disable-next-line
    if (videoChatState.presenterPins.includes(user?.id as string)) {
      const tileId = getTileId(videoChatState.presenterPins[0])
      setPresenterTileId(tileId)
    }

    return () => {
      sessionUpdatedSubscription?.current?.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!presenterTileId && !videoChatState.presenterPins.includes(user?.id as string)) {
      const tileId = getTileId(videoChatState.presenterPins[0])
      if (tileId) {
        setPresenterTileId(tileId)
      }
    }
    // eslint-disable-next-line
  }, [roster, tiles])

  const getTileId = id => {
    const presenter = rosterArray.find(r => r.externalUserId === id)
    if (presenter && presenter.chimeAttendeeId) {
      return attendeeIdToTileId[presenter.chimeAttendeeId]
    }
    return 0
  }

  const handleChange = (_, newValue) => {
    setTabValue(newValue)
  }

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  const handlePollResponse = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPollResponse(event.target.value)
  }

  return (
    <UserActivityProvider>
      <Modal open fullscreen onClose={() => setVisible(false)} className={classes.black}>
        {userStarted ? (
          <StyledLayout drawerWidth={drawerOpen ? 350 : 0}>
            <StyledContent>
              <div className='presenter'>
                <MeetingDetails isClassroom={true} />
                {isLocalUserSharing || sharingAttendeeId ? <ContentShare /> : null}
                <VideoGrid
                  layout='standard'
                  size={isVideoEnabled ? tiles.length + 1 : tiles.length}
                  style={isVideoEnabled || tiles.length > 0 ? {} : { backgroundColor: 'transparent' }}
                >
                  {isVideoEnabled ? (
                    <LocalVideo className={isLocalUserSharing || sharingAttendeeId ? 'mini-video' : ''} />
                  ) : null}
                  {tiles.map(tileId => (
                    <VideoTile style={{ border: '1px solid grey', gridArea: '' }} nameplate={`${tileId}`} />
                  ))}
                </VideoGrid>
                <MeetingControls
                  setVisible={setVisible}
                  isClassroom={true}
                  isPresenter={isPresenter}
                  isVideoPresenter={isVideoPresenter}
                  toggleDrawer={toggleDrawer}
                />
              </div>
              <Drawer
                anchor={'right'}
                open={drawerOpen}
                onClose={(e: React.KeyboardEvent | React.MouseEvent) => setDrawerOpen(false)}
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
                      <Tab label={isPresenter ? 'Tools' : 'Details'} className={classes.tab} />
                    </Tabs>
                  </Toolbar>
                  <TabPanel value={tabValue} index={0} className={classes.tabPanel}>
                    <ChatMessages />
                  </TabPanel>
                  <TabPanel value={tabValue} index={1} className={`${classes.tabPanel} ${classes.peoplePanel}`}>
                    <PeoplePanel isAdmin={true} sessionId={videoChatState.sessionId} />
                  </TabPanel>
                  {isPresenter ? (
                    <TabPanel value={tabValue} index={2} className={classes.tabPanel}>
                      <ToolsPanel />
                    </TabPanel>
                  ) : (
                    <TabPanel value={tabValue} index={2} className={classes.tabPanel}>
                      <DetailsPanel />
                    </TabPanel>
                  )}
                </div>
              </Drawer>
              <Drawer
                anchor='bottom'
                open={activePoll !== null}
                className={classes.pollDrawer}
                ModalProps={{ hideBackdrop: true }}
                classes={{
                  paper: classes.messagePaper
                }}
              >
                <div className={classes.pollHeader}>
                  <Typography>{activePoll?.name}</Typography>
                  <CountdownTimer totalTime={30} />
                </div>
                <div className={classes.pollContent}>
                  <Typography variant='subtitle1'>{activePoll?.question}</Typography>
                  <RadioButtons
                    value={pollResponse}
                    handleChange={handlePollResponse}
                    options={{
                      optionA: activePoll?.optionA,
                      optionB: activePoll?.optionB,
                      optionC: activePoll?.optionC,
                      optionD: activePoll?.optionD
                    }}
                  />
                  <Button className={classes.pollSubmit} disabled={!pollResponse} onClick={() => setActivePoll(null)}>
                    Submit
                  </Button>
                </div>
              </Drawer>
            </StyledContent>
          </StyledLayout>
        ) : (
          <DeviceSetup confirmStart={setUserStarted} />
        )}
      </Modal>
    </UserActivityProvider>
  )
}

const useStyles = makeStyles(() => ({
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
    maxWidth: '33.33%'
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
  pollDrawer: {
    '&.MuiDrawer-root': {
      left: 'calc(100% - 350px) !important'
    },
    '& .MuiDrawer-paperAnchorBottom': {
      width: 350,
      left: 'calc(100% - 350px)'
    }
  },
  pollHeader: {
    display: 'flex',
    height: '60px',
    alignItems: 'center',
    background: 'black',
    color: 'white',
    justifyContent: 'space-between',
    padding: '0 16px'
  },
  pollContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 24px',
    minHeight: '300px',
    '& h6': {
      marginBottom: '16px'
    }
  },
  pollSubmit: {
    width: '75px',
    borderRadius: '16px',
    background: 'black',
    color: 'white',
    textTransform: 'none',
    padding: '2px 8px',
    marginTop: '16px',
    '&:disabled': {
      color: 'white',
      cursor: 'not-allowed'
    },
    '&:hover': {
      background: 'black',
      color: 'white'
    }
  }
}))
