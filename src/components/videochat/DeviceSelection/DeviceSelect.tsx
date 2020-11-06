import React, { FC } from 'react'
import { InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core'
import { VideoQuality } from 'amazon-chime-sdk-component-library-react'

interface IDevice {
  deviceId?: string
  label: string
  value?: string
}

interface DeviceSelectProps {
  label: string
  id: string
  devices: IDevice[]
  selected: string
  handleChange: (val: string | VideoQuality) => void
}

export const DeviceSelect: FC<DeviceSelectProps> = ({ label, id, devices, selected, handleChange }) => {
  const classes = useStyles()
  return (
    <>
      <InputLabel id={id} className={classes.label}>
        {label}
      </InputLabel>
      <Select
        labelId={id}
        name={id}
        fullWidth
        value={selected}
        label={label}
        onChange={(e: React.ChangeEvent<{ value: unknown }>) => handleChange(e.target.value as string)}
      >
        {devices.map(device => (
          <MenuItem value={device.deviceId || device.value} key={device.deviceId || device.value}>
            {device.label}
          </MenuItem>
        ))}
      </Select>
    </>
  )
}

const useStyles = makeStyles(() => ({
  label: {
    color: '#000',
    fontSize: '0.75rem',
    marginRight: 3
  }
}))
