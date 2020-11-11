import React from 'react'
import { SecondaryButton, useAudioOutputs, useMeetingManager } from 'amazon-chime-sdk-component-library-react'
import { Box, makeStyles } from '@material-ui/core'

import { DeviceSelect } from './DeviceSelect'
import { TestSound } from 'helpers'
import { Button } from '@mvrk-hq/vx360-components'
import { SpeakerUnmuteIcon } from 'assets'

export const SpeakerDevices = () => {
  const classes = useStyles()
  const meetingManager = useMeetingManager()
  const { devices, selectedDevice } = useAudioOutputs()

  const handleChange = (deviceId: string): void => {
    meetingManager.selectAudioOutputDevice(deviceId)
  }

  const handleTestSpeaker = () => {
    new TestSound(selectedDevice)
  }

  return (
    <Box marginRight={3}>
      <DeviceSelect
        label='Speaker Source'
        id='speaker-source'
        devices={devices}
        selected={selectedDevice || ''}
        handleChange={handleChange}
      />
      <Button
        startIcon={<SpeakerUnmuteIcon width={14} height={14} />}
        variant='outlined'
        className={classes.button}
        onClick={handleTestSpeaker}
      >
        Test
      </Button>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  button: {
    marginTop: '1rem',
    paddingTop: 0,
    paddingBottom: 0
  }
}))
