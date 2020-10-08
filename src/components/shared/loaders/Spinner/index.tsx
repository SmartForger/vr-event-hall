import React from 'react'
import { StyledSpinner, StyledDoubleBounce } from './Styled'

export const Spinner = () => (
  <StyledSpinner>
    <StyledDoubleBounce />
    <StyledDoubleBounce inverted />
  </StyledSpinner>
)
