import React, { FC } from 'react'
import { FormControlLabel, FormControl, FormLabel, Radio, RadioGroup } from '@material-ui/core'

interface RadioButtonsProps {
  label?: string
  options: object
  value: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const RadioButtons: FC<RadioButtonsProps> = ({ label, options, value, handleChange }) => {
  return (
    <FormControl component='fieldset'>
      {label ? <FormLabel component='legend'>{label}</FormLabel> : null}
      <RadioGroup aria-label='gender' name='gender1' value={value} onChange={handleChange}>
        {Object.keys(options).map(key => (
          <FormControlLabel value={key} control={<Radio />} label={options[key]} />
        ))}
      </RadioGroup>
    </FormControl>
  )
}
