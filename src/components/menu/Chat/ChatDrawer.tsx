import React, { useEffect, useRef, useState } from 'react'
import {
  ActionType,
  Severity,
  useMeetingManager,
  useNotificationDispatch
} from 'amazon-chime-sdk-component-library-react'
import { Drawer, IconButton, makeStyles, Tab, Tabs, Toolbar, Theme, Typography } from '@material-ui/core'
import { Close, VideocamOutlined } from '@material-ui/icons'

import { ChatMessages } from '../ChatMessages'
import { TabPanel } from './TabPanel'

import { useAppState, useChatContext, UserAdminType, useVideoChatContext } from 'providers'
import { createChimeMeeting, endChimeMeeting } from 'helpers'
import { graphQLMutation, graphQLQuery, graphQLSubscription } from 'graphql/helpers'
import { getAttendeeInfo } from 'graphql/customQueries'
import { createVideoChatInvite } from 'graphql/mutations'
import { onUpdateVideoChatInvite } from 'graphql/subscriptions'
import { ISubscriptionObject } from 'types'

interface ChatDrawerProps {
  vcOff?: boolean
}

export const ChatDrawer = ({ vcOff }) => {
  const classes = useStyles()
  const {
    appState: { user }
  } = useAppState()
  const { chatState, dispatch } = useChatContext()
  const { videoChatState, dispatch: videoChatDispatch } = useVideoChatContext()
  const [tabValue, setTabValue] = useState<number>(0)
  const [inviteId, setInviteId] = useState<string>('')
  const meetingManager = useMeetingManager()
  const notificationDispatch = useNotificationDispatch()

  let videoChatInviteSubscription = useRef<ISubscriptionObject | null>(null)

  const closeDrawer = () => {
    dispatch({
      type: 'SET_DETAILS',
      payload: { conversationId: '', conversation: null, conversationOpen: false, selectedUser: null }
    })
  }

  const handleChange = (_, newValue) => {
    setTabValue(newValue)
  }

  const getUserTitle = () => {
    const chatUser = chatState?.conversation?.associated.items.find(a => a.userId !== user?.id)
    return chatUser?.user?.firstName ? `${chatUser?.user?.firstName} ${chatUser?.user?.lastName}` : ''
  }

  const leaveMeeting = () => {
    const meetingId = meetingManager.meetingId
    meetingManager.leave()
    videoChatDispatch({
      type: 'SET_DETAILS',
      payload: {
        visible: false,
        attendeeId: '',
        meetingId: ''
      }
    })
    notificationDispatch({
      type: ActionType.ADD,
      payload: {
        severity: Severity.INFO,
        message: `The video chat invite was declined`,
        autoClose: true,
        replaceAll: true
      }
    })
    if (meetingId) {
      endChimeMeeting(meetingId)
    }
  }

  const onInviteUpdated = ({ onUpdateVideoChatInvite }) => {
    if (onUpdateVideoChatInvite.invitingUserId === user?.id && onUpdateVideoChatInvite.declined === true) {
      console.log('USER DECLINED')
      leaveMeeting()
    } else {
      videoChatInviteSubscription?.current?.unsubscribe()
    }
  }

  const joinVideoCall = async () => {
    videoChatDispatch({ type: 'SET_LOADING', payload: true })
    const {
      data: { meeting, attendee }
    } = await createChimeMeeting({ meetingId: chatState?.conversation?.id, userId: user?.id })
    const convoUser = chatState?.conversation?.associated.items.find(a => a.userId !== user?.id)
    const invite = await graphQLMutation(
      createVideoChatInvite,
      {
        conversationId: chatState?.conversation?.id,
        userId: convoUser?.userId,
        invitingUserId: user?.id,
        declined: false
      },
      'createVideoChatInvite'
    )
    setInviteId(invite.id)

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

  useEffect(() => {
    if (meetingManager.meetingId && inviteId) {
      videoChatInviteSubscription.current = graphQLSubscription(
        onUpdateVideoChatInvite,
        { id: inviteId },
        onInviteUpdated
      )
    }
    return () => {
      videoChatInviteSubscription?.current?.unsubscribe()
    }
  }, [meetingManager.meetingId, inviteId])

  return (
    <Drawer
      anchor={'right'}
      open={Boolean(chatState.conversationOpen && chatState.conversationId)}
      onClose={closeDrawer}
      variant='persistent'
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
          {!vcOff ? (
            <IconButton className={classes.cameraButton} onClick={joinVideoCall}>
              <VideocamOutlined />
            </IconButton>
          ) : null}
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
          <ChatMessages videoChat={false} />
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
    overflow: 'hidden',

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
    maxWidth: '100%',
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
