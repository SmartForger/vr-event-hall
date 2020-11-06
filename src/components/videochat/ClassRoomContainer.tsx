import React from 'react'
import { useMeetingManager } from 'amazon-chime-sdk-component-library-react'
import { Button } from '@mvrk-hq/vx360-components'

import { useAppState, UserAdminType, useVideoChatContext } from 'providers'
import { ClassRoomVideoChatModal } from './Classroom'
import { createChimeMeeting } from 'helpers'

export const ClassRoomContainer = () => {
  const meetingManager = useMeetingManager()
  const { videoChatState, dispatch } = useVideoChatContext()
  const {
    appState: { user }
  } = useAppState()

  return videoChatState?.visible && videoChatState?.isClassroom ? <ClassRoomVideoChatModal /> : null
}
