import React, { FC } from 'react'
import {
  ControlBarButton,
  Sound,
  useAudioInputs,
  useMeetingManager,
  useLocalAudioOutput
} from 'amazon-chime-sdk-component-library-react'
import { PopOverItemProps } from 'amazon-chime-sdk-component-library-react/lib/components/ui/PopOver/PopOverItem'
import { DeviceType } from 'amazon-chime-sdk-component-library-react/lib/types'

import { isOptionActive } from './helpers'
import { CustomControlBarButton } from './Styled'

interface CustomAudioOutputControlProps {
  label?: string
}

export const CustomAudioOutputControl: FC<CustomAudioOutputControlProps> = ({ label = 'Speaker' }) => {
  const meetingManager = useMeetingManager()
  const { devices, selectedDevice } = useAudioInputs()
  const { isAudioOn, toggleAudio } = useLocalAudioOutput()

  const dropdownOptions: PopOverItemProps[] = devices.map((device: DeviceType) => ({
    children: <span>{device.label}</span>,
    checked: isOptionActive(selectedDevice, device.deviceId),
    onClick: (): Promise<void> => meetingManager.selectAudioOutputDevice(device.deviceId)
  }))

  return (
    <CustomControlBarButton
      icon={<Sound disabled={!isAudioOn} />}
      onClick={toggleAudio}
      label={label}
      popOver={dropdownOptions.length ? dropdownOptions : null}
    />
  )
}
