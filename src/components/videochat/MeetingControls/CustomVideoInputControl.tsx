import React, { FC } from 'react'
import {
  ControlBarButton,
  useLocalVideo,
  useSelectVideoInputDevice,
  useVideoInputs
} from 'amazon-chime-sdk-component-library-react'
import { DeviceConfig } from 'amazon-chime-sdk-component-library-react/lib/types'
import { PopOverItemProps } from 'amazon-chime-sdk-component-library-react/lib/components/ui/PopOver/PopOverItem'

import { CameraOffIcon } from 'assets/CameraOffIcon'
import { CameraOnIcon } from 'assets/CameraOnIcon'
import { isOptionActive } from './helpers'
import { CustomControlBarButton } from './Styled'
import { useTheme } from '@material-ui/core'

interface CustomVideoInputControlProps {
  label?: string
}

const videoInputConfig: DeviceConfig = {
  additionalDevices: true
}

export const CustomVideoInputControl: FC<CustomVideoInputControlProps> = ({ label = 'Video' }) => {
  const { devices, selectedDevice } = useVideoInputs(videoInputConfig)
  const { isVideoEnabled, toggleVideo } = useLocalVideo()
  const selectDevice = useSelectVideoInputDevice()
  const theme = useTheme()

  const dropdownOptions: PopOverItemProps[] = devices.map((device: any) => ({
    children: <span>{device.label}</span>,
    checked: isOptionActive(selectedDevice, device.deviceId),
    onClick: () => selectDevice(device.deviceId)
  }))

  return (
    <CustomControlBarButton
      icon={
        isVideoEnabled ? <CameraOnIcon width={16} height={16} /> : <CameraOffIcon width={16} height={16} fill='white' />
      }
      onClick={toggleVideo}
      label={label}
      popOver={dropdownOptions}
      backgroundColor={isVideoEnabled ? 'white' : theme.palette.error.main}
    />
  )
}
