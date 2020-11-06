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
  setVisible: (val: boolean) => void
  isPresenter?: boolean
}

export const EndMeetingControl: React.FC<EndMeetingControlProps> = ({ setVisible, isPresenter }) => {
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
    if (Object.keys(roster).length === 1 || isPresenter) {
      endChimeMeeting(meetingId)
    }
    setVisible(false)
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
