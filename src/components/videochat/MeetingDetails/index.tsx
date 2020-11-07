import React, { FC } from 'react'
import { Flex, Heading, useMeetingManager } from 'amazon-chime-sdk-component-library-react'

import { StyledFlex, StyledList } from './Styled'
import { ReactComponent as Logo } from 'assets/verizon-logo-white.svg'

interface MeetingDetailsProps {
  isClassroom?: boolean
}

const MeetingDetails: FC<MeetingDetailsProps> = ({ isClassroom }) => {
  const meetingManager = useMeetingManager()

  return (
    <StyledFlex container layout='fill-space-centered' className={isClassroom ? 'classroom' : ''}>
      <Flex mb='2rem' mr={{ md: '2rem' }} ml={{ md: '7%' }} px='1rem'>
        <Logo width={250} height={60} />
        <Heading level={4} tag='h1' mb={2}>
          The session will begin shortly
        </Heading>
      </Flex>
    </StyledFlex>
  )
}

export default MeetingDetails
