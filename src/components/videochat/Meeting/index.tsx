import React, { FC, useCallback, useEffect, useState } from 'react'
import { UserActivityProvider, VideoTileGrid } from 'amazon-chime-sdk-component-library-react'
import { Drawer, makeStyles, Tab, Tabs, Toolbar } from '@material-ui/core'
import { Modal } from '@mvrk-hq/vx360-components'

import { StyledLayout, StyledContent } from './Styled'
import MeetingControls from '../MeetingControls'
import MeetingDetails from '../MeetingDetails'
import { DeviceSetup } from '../DeviceSetup'
import { ChatMessages, TabPanel } from 'components'
import { DetailsPanel, PeoplePanel, ToolsPanel } from '../Panels'

import { useVideoChatContext } from 'providers'

import { ReactComponent as Logo } from 'assets/verizon-logo.svg'

interface VideoChatModalProps {}

export const VideoChatModal: FC<VideoChatModalProps> = () => {
  const classes = useStyles()
  const { videoChatState, dispatch } = useVideoChatContext()
  const [userStarted, setUserStarted] = useState<boolean>(false)
  const [tabValue, setTabValue] = useState<number>(0)
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
  const setVisible = useCallback(
    (visible: boolean) =>
      dispatch({
        type: 'SET_DETAILS',
        payload: {
          visible,
          isClassroom: false
        }
      }),
    []
  )

  useEffect(() => {
    const timer = setTimeout(() => dispatch({ type: 'SET_LOADING', payload: false }), 1500)
    return () => clearTimeout(timer)
    // eslint-disable-next-line
  }, [])

  const handleChange = (_, newValue) => {
    setTabValue(newValue)
  }

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <UserActivityProvider>
      <Modal open fullscreen onClose={() => setVisible(false)}>
        {userStarted ? (
          <>
            <StyledLayout showNav={false} showRoster={false} drawerWidth={drawerOpen ? 350 : 0}>
              <StyledContent>
                <VideoTileGrid className='videos' noRemoteVideoView={<MeetingDetails />} />
                <MeetingControls setVisible={setVisible} toggleDrawer={toggleDrawer} />
              </StyledContent>
            </StyledLayout>
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
                  </Tabs>
                </Toolbar>
                <TabPanel value={tabValue} index={0} className={classes.tabPanel}>
                  <ChatMessages />
                </TabPanel>
              </div>
            </Drawer>
          </>
        ) : (
          <DeviceSetup confirmStart={setUserStarted} />
        )}
      </Modal>
    </UserActivityProvider>
  )
}

const useStyles = makeStyles(() => ({
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
  }
}))
