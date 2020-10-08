import React, { FC } from 'react'
import {
  ControlBar,
  AudioInputControl,
  VideoInputControl,
  ContentShareControl,
  AudioOutputControl,
  useUserActivityState
} from 'amazon-chime-sdk-component-library-react'

import { EndMeetingControl } from '../EndMeetingControl'
import { StyledControls } from './Styled'

interface MeetingControlProps {
  setVisible: (val: boolean) => void
}

const MeetingControls: FC<MeetingControlProps> = ({ setVisible }) => {
  const { isUserActive } = useUserActivityState()

  return (
    <StyledControls className='controls' active={!!isUserActive}>
      <ControlBar className='controls-menu' layout='undocked-horizontal' showLabels>
        <AudioInputControl />
        <VideoInputControl />
        <ContentShareControl />
        <AudioOutputControl />
        <EndMeetingControl setVisible={setVisible} />
      </ControlBar>
    </StyledControls>
  )
}

export default MeetingControls
