import React, { FC } from 'react'
import { Flex, Heading, useMeetingManager } from 'amazon-chime-sdk-component-library-react'

import { StyledList } from './Styled'
import { IMeetingInfo } from 'types'

interface MeetingDetailsProps {
  meetingInfo: IMeetingInfo
}

const MeetingDetails: FC<MeetingDetailsProps> = ({ meetingInfo }) => {
  const manager = useMeetingManager()

  return (
    <Flex container layout='fill-space-centered'>
      <Flex mb='2rem' mr={{ md: '2rem' }} px='1rem'>
        <Heading level={4} tag='h1' mb={2}>
          Meeting information
        </Heading>
        <StyledList>
          <div>
            <dt>Meeting ID</dt>
            <dd>{meetingInfo.MeetingId || ''}</dd>
          </div>
          <div>
            <dt>Hosted region</dt>
            <dd>{manager.meetingRegion}</dd>
          </div>
        </StyledList>
      </Flex>
    </Flex>
  )
}

export default MeetingDetails
