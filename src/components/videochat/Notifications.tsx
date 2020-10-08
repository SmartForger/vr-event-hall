import React from 'react'
import { useNotificationState, NotificationGroup } from 'amazon-chime-sdk-component-library-react'

export const Notifications = () => {
  const { notifications } = useNotificationState()

  return notifications.length ? <NotificationGroup /> : null
}
