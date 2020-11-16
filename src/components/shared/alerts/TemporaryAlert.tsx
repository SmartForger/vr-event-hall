/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Collapse, IconButton, Theme, createStyles, makeStyles } from '@material-ui/core'
import { Alert, AlertProps } from '@material-ui/lab'
import { Close } from '@material-ui/icons'

interface TemporaryAlert {
  duration?: number
  message: string
  onClose: () => void
  severity?: AlertProps['severity']
}

const ALERT_DEFAULT_DURATION = 10000

export const TemporaryAlert = ({
  duration = ALERT_DEFAULT_DURATION,
  message = '',
  onClose,
  severity
}: TemporaryAlert) => {
  const [open, setOpen] = useState<boolean>(false)
  const classes = useStyles()

  useEffect(() => {
    let timer: number

    if (message) {
      setOpen(true)

      // Clear message after duration
      timer = setTimeout(() => setOpen(false), duration)
    }

    return () => clearTimeout(timer)
  }, [message])

  return (
    <Collapse in={open} onExited={() => onClose()}>
      <Alert
        className={classes.alert}
        severity={severity}
        action={
          <IconButton aria-label='close' color='inherit' size='small' onClick={() => setOpen(false)}>
            <Close fontSize='inherit' />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Collapse>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    alert: {
      fontSize: '1rem'
    }
  })
)
