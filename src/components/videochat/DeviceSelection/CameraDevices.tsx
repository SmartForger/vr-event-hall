import React, { useState } from 'react'
import {
  useMeetingManager,
  useVideoInputs,
  useSelectVideoQuality,
  VideoQuality
} from 'amazon-chime-sdk-component-library-react'

import { Box } from '@material-ui/core'
import { DeviceSelect } from './DeviceSelect'

export const CameraDevices = () => {
  const meetingManager = useMeetingManager()
  const { devices, selectedDevice } = useVideoInputs()
  const selectVideoQuality = useSelectVideoQuality()
  const [videoQuality, setVideoQuality] = useState('unselected')

  async function handleCameraChange(deviceId: string) {
    meetingManager.selectVideoInputDevice(deviceId)
  }

  async function handleQualityChange(quality: string) {
    setVideoQuality(quality)
    selectVideoQuality(quality as VideoQuality)
  }

  return (
    <>
      <Box marginRight={3}>
        <DeviceSelect
          label='Camera Source'
          id='camera-source'
          devices={devices}
          selected={selectedDevice || ''}
          handleChange={handleCameraChange}
        />
      </Box>
      <Box marginRight={3}>
        <DeviceSelect
          label='Video Quality'
          id='video-quality'
          devices={qualityOptions}
          selected={videoQuality}
          handleChange={handleQualityChange}
        />
      </Box>
    </>
  )
}

export const VIDEO_INPUT_QUALITY = {
  '360p': '360p (nHD) @ 15 fps (600 Kbps max)',
  '540p': '540p (qHD) @ 15 fps (1.4 Mbps max)',
  '720p': '720p (HD) @ 15 fps (1.4 Mbps max)'
}

const qualityOptions = [
  {
    label: 'Select video quality',
    value: 'unselected'
  },
  {
    label: VIDEO_INPUT_QUALITY['720p'],
    value: '720p'
  },
  {
    label: VIDEO_INPUT_QUALITY['540p'],
    value: '540p'
  },
  {
    label: VIDEO_INPUT_QUALITY['360p'],
    value: '360p'
  }
]
