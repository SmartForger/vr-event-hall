import React, { FC, useEffect } from 'react'
import { UserActivityProvider, VideoTileGrid } from 'amazon-chime-sdk-component-library-react'

import { Modal } from 'components/shared'
import { StyledLayout, StyledContent } from './Styled'
import MeetingControls from '../MeetingControls'
import MeetingDetails from '../MeetingDetails'
import { IMeetingInfo } from 'types'

interface VideoChatModalProps {
  visible: boolean
  setVisible: (val: boolean) => void
  setLoading: (val: boolean) => void
  meetingInfo: IMeetingInfo
}

export const VideoChatModal: FC<VideoChatModalProps> = ({ visible, setVisible, setLoading, meetingInfo }) => {
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
    // eslint-disable-next-line
  }, [])

  return (
    <UserActivityProvider>
      <Modal open={visible} onClose={() => setVisible(false)}>
        <StyledLayout showNav={false} showRoster={false}>
          <StyledContent>
            <VideoTileGrid className='videos' noRemoteVideoView={<MeetingDetails />} />
            <MeetingControls setVisible={setVisible} />
          </StyledContent>
        </StyledLayout>
      </Modal>
    </UserActivityProvider>
  )
}
