import React from 'react'
import { Heading, PreviewVideo } from 'amazon-chime-sdk-component-library-react'

import { StyledWrapper, StyledAudioGroup, StyledVideoGroup, title, preview } from './Styled'
import { MicrophoneDevices } from './MicrophoneDevices'
import { SpeakerDevices } from './SpeakerDevices'
import { CameraDevices } from './CameraDevices'
import { Box } from '@material-ui/core'

const DeviceSelection = () => (
  <StyledWrapper>
    <StyledAudioGroup>
      <PreviewVideo css={preview} />
    </StyledAudioGroup>
    <StyledVideoGroup>
      <Heading tag='h1' level={3} css='align-self: flex-start; font-weight: bold'>
        Device settings
      </Heading>
      <Box display='flex' flexDirection='column'>
        <Heading tag='h2' level={6} css={title}>
          Audio
        </Heading>
        <Box display='flex'>
          <MicrophoneDevices />
          <SpeakerDevices />
        </Box>
      </Box>
      <Box display='flex' flexDirection='column'>
        <Heading tag='h2' level={6} css={title}>
          Video
        </Heading>
        <Box display='flex'>
          <CameraDevices />
        </Box>
      </Box>
    </StyledVideoGroup>
  </StyledWrapper>
)

export default DeviceSelection
