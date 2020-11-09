import React from 'react'

import { useVideoChatContext } from 'providers'
import { VideoChatModal } from './Meeting'

export const VideoChatContainer = () => {
  const { videoChatState } = useVideoChatContext()

  return videoChatState?.visible && !videoChatState?.isClassroom ? <VideoChatModal /> : null
}
