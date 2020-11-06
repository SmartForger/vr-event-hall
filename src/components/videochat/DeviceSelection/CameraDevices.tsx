import React from 'react'
import {
  Heading,
  PreviewVideo,
  QualitySelection,
  CameraSelection,
  Label
} from 'amazon-chime-sdk-component-library-react'

import { title, StyledInputGroup } from './Styled'

export const CameraDevices = () => {
  return (
    <>
      <Heading tag='h2' level={6} css={title}>
        Video
      </Heading>
      <StyledInputGroup>
        <CameraSelection />
      </StyledInputGroup>
      <StyledInputGroup>
        <QualitySelection />
      </StyledInputGroup>
      <Label style={{ display: 'block', marginBottom: '.5rem' }}>Video preview</Label>
      <PreviewVideo />
    </>
  )
}
