import React, { FC, useState } from 'react'
import { Flex, useMeetingManager, Modal, ModalBody, ModalHeader } from 'amazon-chime-sdk-component-library-react'

import { Card } from './JoinDetailsCard'
import { Button } from '@material-ui/core'

interface MeetingJoinDetailsProps {
  meetingId: string
  localUserName?: string
  confirmStart: (val: boolean) => void
}

export const MeetingJoinDetails: FC<MeetingJoinDetailsProps> = ({ meetingId, localUserName = 'Me', confirmStart }) => {
  const meetingManager = useMeetingManager()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleJoinMeeting = async () => {
    setIsLoading(true)

    try {
      await meetingManager.start()
      confirmStart(true)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError(error.message)
    }
  }

  return (
    <>
      <Flex container alignItems='flex-start' flexDirection='column'>
        <Button variant='contained' onClick={handleJoinMeeting} style={{ textTransform: 'none' }}>
          {isLoading ? 'Loading...' : 'Join Session'}
        </Button>
      </Flex>
      {error && (
        <Modal size='md' onClose={(): void => setError('')}>
          <ModalHeader title={`Meeting ID: ${meetingId}`} />
          <ModalBody>
            <Card
              title='Unable to join meeting'
              description='There was an issue in joining this meeting. Check your connectivity and try again.'
              smallText={error}
            />
          </ModalBody>
        </Modal>
      )}
    </>
  )
}
