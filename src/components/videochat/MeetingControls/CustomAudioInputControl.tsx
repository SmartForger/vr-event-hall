import React, { FC, useEffect } from 'react'
import {
  useAudioInputs,
  useAudioVideo,
  useMeetingManager,
  useToggleLocalMute
} from 'amazon-chime-sdk-component-library-react'
import { DeviceConfig } from 'amazon-chime-sdk-component-library-react/lib/types'
import { PopOverItemProps } from 'amazon-chime-sdk-component-library-react/lib/components/ui/PopOver/PopOverItem'
import { useTheme } from '@material-ui/core'

import { MuteIcon } from 'assets/MuteIcon'
import { isOptionActive } from './helpers'
import { CustomControlBarButton } from './Styled'
import { useVideoChatContext } from 'providers'

interface AudioInputControlProps {
  muteLabel?: string
  unmuteLabel?: string
  isAdmin?: boolean
}

export const CustomAudioInputControl: FC<AudioInputControlProps> = ({
  muteLabel = 'Mute',
  unmuteLabel = 'Unmute',
  isAdmin
}) => {
  const meetingManager = useMeetingManager()
  const { muted, toggleMute } = useToggleLocalMute()
  const audioVideo = useAudioVideo()
  const { videoChatState } = useVideoChatContext()
  const audioInputConfig: DeviceConfig = {
    additionalDevices: true
  }
  const { devices, selectedDevice } = useAudioInputs(audioInputConfig)
  const theme = useTheme()

  const dropdownOptions: PopOverItemProps[] = devices.map(device => ({
    children: <span>{device.label}</span>,
    checked: isOptionActive(selectedDevice, device.deviceId),
    onClick: (): Promise<void> => meetingManager.selectAudioInputDevice(device.deviceId)
  }))
  // Listen for mute all call
  useEffect(() => {
    if (isAdmin) {
      return
    }
    audioVideo?.realtimeSetCanUnmuteLocalAudio(!videoChatState.globalMute)
    if (videoChatState.globalMute) {
      audioVideo?.realtimeMuteLocalAudio()
    }
  }, [videoChatState.globalMute])

  return (
    <CustomControlBarButton
      icon={<MuteIcon muted={muted} width={16} height={16} />}
      onClick={toggleMute}
      label={muted ? muteLabel : unmuteLabel}
      popOver={dropdownOptions}
      removeSideMargin='right'
      backgroundColor={muted ? 'white' : theme.palette.error.main}
    />
  )
}
