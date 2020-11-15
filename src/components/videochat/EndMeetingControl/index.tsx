import React from 'react'
import {
  useMeetingManager,
  useRosterState,
  ActionType,
  Severity,
  useNotificationDispatch
} from 'amazon-chime-sdk-component-library-react'
import { endChimeMeeting } from 'helpers'
import { HangupIcon } from 'assets/HangupIcon'
import { CustomControlBarButton } from '../MeetingControls/Styled'

interface EndMeetingControlProps {
  onMeetingEnd: () => void
  isPresenter?: boolean
}

export const EndMeetingControl: React.FC<EndMeetingControlProps> = ({ onMeetingEnd, isPresenter }) => {
  const { roster } = useRosterState()
  const meetingManager = useMeetingManager()
  const dispatch = useNotificationDispatch()

  const leaveNotifyAndRedirect = (notificationMessage: string): void => {
    const meetingId = meetingManager.meetingId as string
    meetingManager.leave()
    dispatch({
      type: ActionType.ADD,
      payload: {
        severity: Severity.INFO,
        message: `${notificationMessage}`,
        autoClose: true,
        replaceAll: true
      }
    })
    // TODO: come back to this later to
    // put in better logic and warnings
    // kill the meeting if only one person is left
    // if (Object.keys(roster).length === 1 || isPresenter) {
    if (Object.keys(roster).length === 1) {
      endChimeMeeting(meetingId)
    }
    onMeetingEnd()
  }

  const leaveMeeting = (): void => {
    leaveNotifyAndRedirect('You left the meeting')
  }

  return (
    <CustomControlBarButton
      icon={<HangupIcon width='20' />}
      onClick={() => leaveMeeting()}
      label='Leave'
      removeSideMargin='left'
    />
  )
}
