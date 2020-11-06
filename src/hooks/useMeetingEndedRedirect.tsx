/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

import {
  MeetingStatus,
  useNotificationDispatch,
  Severity,
  ActionType,
  useMeetingStatus
} from 'amazon-chime-sdk-component-library-react'

export const useMeetingEndedRedirect = (onEnd: (val: boolean) => void) => {
  const dispatch = useNotificationDispatch()
  const meetingStatus = useMeetingStatus()

  useEffect(() => {
    if (meetingStatus === MeetingStatus.Ended) {
      dispatch({
        type: ActionType.ADD,
        payload: {
          severity: Severity.INFO,
          message: 'The meeting was ended by the moderator',
          autoClose: true,
          replaceAll: true
        }
      })
      onEnd(false)
    }
  }, [meetingStatus])

  return meetingStatus
}
