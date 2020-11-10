/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import {
  useContentShareState,
  UserActivityProvider,
  useRemoteVideoTileState,
  ContentShare,
  useRosterState,
  VideoGrid,
  VideoTile,
  useLocalVideo,
  LocalVideo,
  useAudioVideo,
  RemoteVideo,
  useContentShareControls
} from 'amazon-chime-sdk-component-library-react'
import { Box, Drawer, makeStyles, Tab, Tabs, Toolbar } from '@material-ui/core'
import { Modal } from '@mvrk-hq/vx360-components'

import MeetingControls from '../MeetingControls'
import MeetingDetails from '../MeetingDetails'
import { StyledLayout, StyledContent, StyledGrid } from './Styled'
import { DetailsPanel, PeoplePanel, ToolsPanel } from '../Panels'
import { PollDrawer } from '../PollDrawer'
import { DeviceSetup } from '../DeviceSetup'
import { ChatMessages, TabPanel } from 'components'

// import { useMeetingEndedRedirect } from 'hooks'
import { useAppState, useVideoChatContext, PollProvider } from 'providers'
import { graphQLQuery, graphQLSubscription } from 'graphql/helpers'
import { getSession } from 'graphql/queries'
import { onUpdateSession } from 'graphql/subscriptions'
import { ISubscriptionObject, ISession } from 'types'

import { ReactComponent as Logo } from 'assets/verizon-logo.svg'
import { ConditionalWrapper, DialogCard } from 'components/shared'
import { NullEngine } from 'babylonjs'

interface ClassRoomVideoChatModalProps {}

export const ClassRoomVideoChatModal: FC<ClassRoomVideoChatModalProps> = () => {
  const classes = useStyles()
  const {
    appState: { user }
  } = useAppState()
  const [presenterTileId, setPresenterTileId] = useState<number | null>(null)
  const [currentSession, setCurrentSession] = useState<ISession | null>(null)
  const [userStarted, setUserStarted] = useState<boolean>(false)
  const [qaDialogOpen, setQADialogOpen] = useState<boolean>(false)

  // Chime
  const audioVideo = useAudioVideo()
  const { isVideoEnabled, toggleVideo } = useLocalVideo()
  const { tiles, attendeeIdToTileId, tileIdToAttendeeId } = useRemoteVideoTileState()
  const { isLocalUserSharing, sharingAttendeeId } = useContentShareState()
  const { toggleContentShare } = useContentShareControls()
  const { roster } = useRosterState()
  const rosterArray = Object.values(roster)

  let sessionUpdatedSubscription = useRef<ISubscriptionObject | null>(null)

  const { videoChatState, dispatch } = useVideoChatContext()
  const [tabValue, setTabValue] = useState<number>(0)
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true)
  let isPresenter = videoChatState?.session?.admins.items.some(admin => admin.userId === (user?.id as string))
  let isVideoPresenter = videoChatState?.session?.presenterPins.includes(user?.id as string)

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
    dispatch({
      type: 'SET_DETAILS',
      payload: {
        session: onUpdateSession,
        pinnedMessage: onUpdateSession.pinnedMessage
      }
    })
  }

  const getSessionInfo = async () => {
    const session = await graphQLQuery(getSession, 'getSession', { id: videoChatState.sessionId })
    setCurrentSession(session)

    dispatch({
      type: 'SET_DETAILS',
      payload: {
        session: session,
        pinnedMessage: session.pinnedMessage
      }
    })

    sessionUpdatedSubscription.current = graphQLSubscription(
      onUpdateSession,
      { id: videoChatState?.session?.id || videoChatState.sessionId },
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

  useEffect(() => {
    if (videoChatState?.session?.muted && !isPresenter && !isVideoPresenter) {
      audioVideo?.realtimeSetCanUnmuteLocalAudio(false)
      audioVideo?.realtimeMuteLocalAudio()
    } else {
      audioVideo?.realtimeSetCanUnmuteLocalAudio(true)
    }
  }, [videoChatState?.session?.muted])

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

  useEffect(() => {
    if (isVideoEnabled && !videoChatState?.session?.presenterPins.includes(user?.id || '')) {
      toggleVideo()
    }
    if (isLocalUserSharing && !videoChatState?.session?.presenterPins.includes(user?.id || '')) {
      toggleContentShare()
    }
  }, [videoChatState?.session?.presenterPins])

  useEffect(() => {
    if (videoChatState?.session?.qaActive) {
      setQADialogOpen(true)
    }
  }, [videoChatState?.session?.qaActive])

  return (
    <UserActivityProvider>
      <PollProvider>
        <Modal open fullscreen onClose={() => setVisible(false)} className={classes.black}>
          {userStarted ? (
            <StyledLayout drawerWidth={drawerOpen ? 350 : 0}>
              <StyledContent>
                <div className='presenter'>
                  <MeetingDetails
                    isClassroom={true}
                    isActive={Boolean(tiles.length > 0 || isLocalUserSharing || sharingAttendeeId || isVideoEnabled)}
                  />
                  <StyledGrid
                    tileCount={isVideoEnabled ? tiles.length + 1 : tiles.length}
                    isContentSharing={isLocalUserSharing || sharingAttendeeId}
                    style={isVideoEnabled || tiles.length > 0 ? {} : { backgroundColor: 'transparent' }}
                  >
                    {isLocalUserSharing || sharingAttendeeId ? <ContentShare /> : null}
                    <ConditionalWrapper
                      condition={isLocalUserSharing || sharingAttendeeId}
                      wrapper={children => <Box display='grid'>{children}</Box>}
                    >
                      <>
                        {isVideoEnabled ? (
                          <LocalVideo nameplate={`${user?.firstName} ${user?.lastName}`} className='user-video' />
                        ) : null}
                        {tiles.map(tileId => {
                          const attendeeId = tileIdToAttendeeId[tileId]
                          return (
                            <RemoteVideo
                              className='user-video'
                              tileId={tileId}
                              name={roster[attendeeId] && roster[attendeeId].name ? roster[attendeeId].name : ''}
                              style={{ border: '1px solid grey', gridArea: '' }}
                              key={tileId}
                            />
                          )
                        })}
                      </>
                    </ConditionalWrapper>
                  </StyledGrid>
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
                      <ChatMessages videoChat={true} />
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
                      <PeoplePanel isAdmin={isPresenter} />
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
                <PollDrawer />
              </StyledContent>
            </StyledLayout>
          ) : (
            <DeviceSetup confirmStart={setUserStarted} />
          )}
        </Modal>
      </PollProvider>
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
  dialog: {
    position: 'absolute',
    top: 0,
    width: '100%'
  }
}))
