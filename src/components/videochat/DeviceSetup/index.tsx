import React, { FC } from 'react'
import { Heading, useMeetingManager } from 'amazon-chime-sdk-component-library-react'

import { MeetingJoinDetails } from './MeetingJoinDetails'
import { StyledContainer, StyledLayout } from './Styled'
import DeviceSelection from '../DeviceSelection'

interface DeviceSetupProps {
  confirmStart: (val: boolean) => void
}

export const DeviceSetup: FC<DeviceSetupProps> = ({ confirmStart }) => {
  const meetingManager = useMeetingManager()

  return (
    <StyledContainer>
      <StyledLayout>
        <DeviceSelection />
        <MeetingJoinDetails meetingId={meetingManager.meetingId || ''} confirmStart={confirmStart} />
      </StyledLayout>
    </StyledContainer>
  )
}
