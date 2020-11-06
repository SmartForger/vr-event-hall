import React from 'react'

import { useAppState, useVideoChatContext } from 'providers'
import { ClassRoomVideoChatModal } from './Classroom'

export const ClassRoomContainer = () => {
  const { videoChatState } = useVideoChatContext()
  const {
    appState: { user }
  } = useAppState()

  return videoChatState?.visible && videoChatState?.isClassroom ? <ClassRoomVideoChatModal /> : null
}
