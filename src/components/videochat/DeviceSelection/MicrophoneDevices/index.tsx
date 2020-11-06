import React from 'react'
import { useAudioInputs, useMeetingManager } from 'amazon-chime-sdk-component-library-react'

import { MicrophoneActivityPreview } from './MicrophoneActivityPreview'
import { DeviceSelect } from '../DeviceSelect'
import { Box } from '@material-ui/core'

export const MicrophoneDevices = () => {
  const meetingManager = useMeetingManager()
  const { devices, selectedDevice } = useAudioInputs()

  async function handleChange(deviceId: string) {
    meetingManager.selectAudioInputDevice(deviceId)
  }

  return (
    <Box marginRight={3}>
      <DeviceSelect
        label='Microphone Source'
        id='mic-source'
        devices={devices}
        selected={selectedDevice || ''}
        handleChange={handleChange}
      />
      <MicrophoneActivityPreview />
    </Box>
  )
}
