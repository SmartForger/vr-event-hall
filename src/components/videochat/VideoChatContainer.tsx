import React, { useEffect, useRef, useState } from 'react'
import { useMeetingManager } from 'amazon-chime-sdk-component-library-react'

import { useAppState, useVideoChatContext } from 'providers'
import { VideoChatModal } from './Meeting'
import { ISubscriptionObject, IVideoChatInvite } from 'types'
import { graphQLQuery, graphQLSubscription } from 'graphql/helpers'
import { onCreateVideoChatInvite } from 'graphql/subscriptions'
import { DialogCard } from 'components/shared'
import { createChimeMeeting } from 'helpers'
import { getAttendeeInfo } from 'graphql/customQueries'
import { makeStyles } from '@material-ui/core'

export const VideoChatContainer = () => {
  const classes = useStyles()
  const {
    appState: { user }
  } = useAppState()
  const { videoChatState, dispatch } = useVideoChatContext()
  const [dialogInfo, setDialogInfo] = useState<IVideoChatInvite | null>(null)
  const meetingManager = useMeetingManager()

  let subscription = useRef<ISubscriptionObject | null>(null)

  const onVideoChatInvite = ({ onCreateVideoChatInvite }) => {
    if (onCreateVideoChatInvite?.userId === user?.id) {
      setDialogInfo(onCreateVideoChatInvite)
    }
  }

  useEffect(() => {
    if (user?.id) {
      subscription.current = graphQLSubscription(onCreateVideoChatInvite, { userId: user?.id }, onVideoChatInvite)
    }

    return () => {
      subscription.current?.unsubscribe()
    }
  }, [user])

  const joinVideoCall = async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
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
    dispatch({
      type: 'SET_DETAILS',
      payload: {
        visible: true,
        isClassroom: false,
        attendeeId: attendee.Attendee.AttendeeId,
        meetingId: meeting.Meeting.MeetingId
      }
    })
    setDialogInfo(null)
  }

  const ignoreCall = () => {
    setDialogInfo(null)
  }

  return (
    <>
      {videoChatState?.visible && !videoChatState?.isClassroom ? <VideoChatModal /> : null}
      {dialogInfo ? (
        <DialogCard
          title='New Video Call'
          message={`${dialogInfo.invitingUser.firstName} ${dialogInfo.invitingUser.lastName} would like to start a video call`}
          onConfirm={joinVideoCall}
          onCancel={ignoreCall}
          className={classes.dialog}
          confirmText='Join'
          cancelText='Decline'
        />
      ) : null}
    </>
  )
}

const useStyles = makeStyles(() => ({
  dialog: {
    position: 'absolute',
    top: 0,
    width: '100%'
  }
}))
