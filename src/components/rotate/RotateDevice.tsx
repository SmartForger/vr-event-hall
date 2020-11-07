import React, { FC } from 'react'

// Styles
import { makeStyles, Theme, Box, Typography } from '@material-ui/core'

// Images
import imageRotateDevice from 'assets/rotate-device.svg'

export const RotateDevice: FC = () => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <img className={classes.image} src={imageRotateDevice} alt='Rotate device' width='60' />
      <Typography component='h5' variant='h5' color='textPrimary'>
        Please rotate your
        <br />
        device to landscape.
      </Typography>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    userSelect: 'none',

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'fixed',
    'z-index': '1000000',

    display: 'none',
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',

    backgroundColor: '#ffffff',
    animation: '$fadeInOpacity 0.4s',

    [`${theme.breakpoints.down('md')} and (orientation: portrait)`]: {
      display: 'flex'
    }
  },
  image: {
    marginBottom: '20px'
  },
  '@keyframes fadeInOpacity': {
    '0%': {
      opacity: 0
    },
    '100%': {
      opacity: 1
    }
  }
}))
