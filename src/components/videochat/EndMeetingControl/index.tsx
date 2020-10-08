import React from 'react'
import {
  ControlBarButton,
  Phone,
  useMeetingManager,
  useRosterState,
  ActionType,
  Severity,
  useNotificationDispatch
} from 'amazon-chime-sdk-component-library-react'
import { endChimeMeeting } from 'helpers'

interface EndMeetingControlProps {
  setVisible: (val: boolean) => void
}

export const EndMeetingControl: React.FC<EndMeetingControlProps> = ({ setVisible }) => {
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
    if (Object.keys(roster).length === 1) {
      endChimeMeeting(meetingId)
    }
    setVisible(false)
  }

  const leaveMeeting = (): void => {
    leaveNotifyAndRedirect('You left the meeting')
  }

  return <ControlBarButton icon={<Phone />} onClick={() => leaveMeeting()} label='Leave' />
}
