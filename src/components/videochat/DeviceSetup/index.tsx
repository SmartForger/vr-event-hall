import React, { FC } from 'react'

import { StyledContainer, StyledLayout } from './Styled'
import DeviceSelection from '../DeviceSelection'

interface DeviceSetupProps {
  confirmStart: (val: boolean) => void
}

export const DeviceSetup: FC<DeviceSetupProps> = ({ confirmStart }) => {
  return (
    <StyledContainer>
      <StyledLayout>
        <DeviceSelection confirmStart={confirmStart} />
      </StyledLayout>
    </StyledContainer>
  )
}
