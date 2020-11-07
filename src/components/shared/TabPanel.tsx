import React from 'react'
import { Box } from '@material-ui/core'

export const TabPanel = props => {
  const { children, value, index, ...other } = props

  return (
    <div role='tabpanel' hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && (
        <Box p={0} py='6px' height='100%'>
          {children}
        </Box>
      )}
    </div>
  )
}
