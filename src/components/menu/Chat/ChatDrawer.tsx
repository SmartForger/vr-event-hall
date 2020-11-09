import React, { useState } from 'react'
import { useMeetingManager } from 'amazon-chime-sdk-component-library-react'
import { Drawer, IconButton, makeStyles, Tab, Tabs, Toolbar, Theme, Typography } from '@material-ui/core'
import { Close, VideocamOutlined } from '@material-ui/icons'

import { ChatMessages } from '../ChatMessages'
import { TabPanel } from './TabPanel'

import { useAppState, useChatContext, UserAdminType, useVideoChatContext } from 'providers'
import { DetailsPanel } from './DetailsPanel.tsx'
import { createChimeMeeting } from 'helpers'
import { graphQLQuery } from 'graphql/helpers'
import { getAttendeeInfo } from 'graphql/customQueries'

export const ChatDrawer = () => {
  const classes = useStyles()
  const {
    appState: { user }
  } = useAppState()
  const { chatState, dispatch } = useChatContext()
  const { videoChatState, dispatch: videoChatDispatch } = useVideoChatContext()
  const [tabValue, setTabValue] = useState<number>(0)
  const meetingManager = useMeetingManager()

  const closeDrawer = () => {
    dispatch({ type: 'SET_DETAILS', payload: { conversationId: '', conversationOpen: false, selectedUser: null } })
  }

  const handleChange = (_, newValue) => {
    setTabValue(newValue)
  }

  const getUserTitle = () => {
    const chatUser = chatState?.conversation?.associated.items.find(a => a.userId !== user?.id)
    return chatUser?.user?.firstName ? `${chatUser?.user?.firstName} ${chatUser?.user?.lastName}` : ''
  }

  const joinVideoCall = async () => {
    videoChatDispatch({ type: 'SET_LOADING', payload: true })
    const {
      data: { meeting, attendee }
    } = await createChimeMeeting({ meetingId: videoChatState.meetingId, userId: user?.id })

    const joinData = {
      meetingInfo: meeting.Meeting,
      attendeeInfo: attendee.Attendee
    }

    meetingManager.getAttendee = async (chimeAttendeeId: string, externalUserId?: string) => {
      if (externalUserId) {
        const user = await graphQLQuery(getAttendeeInfo, 'getUser', { id: externalUserId })

        return {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          avatar: user.avatar,
          title: user.title || '',
          company: user.company || ''
        }
      }
      return { name: '', avatar: '', email: '', title: '', company: '' }
    }

    await meetingManager.join(joinData)
    videoChatDispatch({
      type: 'SET_DETAILS',
      payload: {
        visible: true,
        isClassroom: false,
        attendeeId: attendee.Attendee.AttendeeId,
        meetingId: meeting.Meeting.MeetingId
      }
    })
  }

  return (
    <Drawer
      anchor={'right'}
      open={Boolean(chatState.conversationOpen && chatState.conversationId)}
      onClose={closeDrawer}
      ModalProps={{ hideBackdrop: true }}
      classes={{
        paper: classes.messagePaper
      }}
    >
      <div className={classes.displayMenu}>
        <div className={classes.conversationName}>
          <Typography variant='h5'>
            {chatState?.conversations.find(c => c.id === chatState.conversationId)?.name || getUserTitle()}
          </Typography>
          <IconButton onClick={closeDrawer}>
            <Close />
          </IconButton>
        </div>
        <Toolbar className={classes.toolbar}>
          <IconButton className={classes.cameraButton} onClick={joinVideoCall}>
            <VideocamOutlined />
          </IconButton>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            className={classes.tabs}
            TabIndicatorProps={{
              style: { top: 0, backgroundColor: '#D52B1E', height: '4px' }
            }}
          >
            <Tab label='Chat' className={classes.tab} />
            <Tab label='Details' className={classes.tab} />
          </Tabs>
        </Toolbar>
        <TabPanel value={tabValue} index={0} className={classes.tabPanel}>
          <ChatMessages videoChat={false} />
        </TabPanel>
        <TabPanel value={tabValue} index={1} className={classes.tabPanel}>
          <DetailsPanel />
        </TabPanel>
      </div>
    </Drawer>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  messagePaper: {
    '&.MuiPaper-root': {
      backgroundColor: 'white !important',
      marginTop: '60px',
      [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
        marginTop: '40px'
      }
    }
  },
  displayMenu: {
    width: '334px',
    color: 'white',
    height: 'calc(100% - 60px)',
    display: 'flex',
    flexDirection: 'column',

    [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
      width: '256px'
    }
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
    maxWidth: '50%',
    minWidth: '50%'
  },
  tabPanel: { flex: 1 },
  conversationName: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'black',
    height: '60px',
    padding: '0 16px',
    borderBottom: '1px solid lightgray',

    '& h5': {
      fontWeight: 'bold'
    }
  },
  cameraButton: {
    borderRadius: 0,
    borderRight: '1px solid #D8DADA'
  }
}))
