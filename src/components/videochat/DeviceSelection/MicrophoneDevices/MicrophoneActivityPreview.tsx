import React from 'react'
import { Label } from 'amazon-chime-sdk-component-library-react'

import { StyledPreviewGroup } from '../Styled'
import { MicrophoneActivityPreviewBar } from './MicrophoneActivityPreviewBar'

export const MicrophoneActivityPreview = () => {
  return (
    <StyledPreviewGroup>
      <Label style={{ display: 'block', marginBottom: '14px' }}>Microphone activity</Label>
      <MicrophoneActivityPreviewBar />
    </StyledPreviewGroup>
  )
}
