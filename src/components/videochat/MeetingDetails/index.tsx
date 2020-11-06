import React, { FC } from 'react'
import { Flex, Heading, useMeetingManager } from 'amazon-chime-sdk-component-library-react'

import { StyledFlex, StyledList } from './Styled'
import { IMeetingInfo } from 'types'

interface MeetingDetailsProps {
  isClassroom?: boolean
}

const MeetingDetails: FC<MeetingDetailsProps> = ({ isClassroom }) => {
  const meetingManager = useMeetingManager()

  return (
    <StyledFlex container layout='fill-space-centered' className={isClassroom ? 'classroom' : ''}>
      <Flex mb='2rem' mr={{ md: '2rem' }} px='1rem'>
        <Heading level={4} tag='h1' mb={2}>
          Meeting information
        </Heading>
        <StyledList>
          <div>
            <dt>Meeting ID</dt>
            <dd>{meetingManager?.meetingId || ''}</dd>
          </div>
        </StyledList>
      </Flex>
    </StyledFlex>
  )
}

export default MeetingDetails
