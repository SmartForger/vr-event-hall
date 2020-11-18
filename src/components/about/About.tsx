import React, { FC } from 'react'

// Components
import { Modal } from 'components/shared'

// Styles
import { makeStyles, Theme, Box, IconButton, Typography } from '@material-ui/core'

// Types
import { GameFlowSteps } from '../../types'

// Images
import CloseIcon from '@material-ui/icons/Close'

interface AboutProps {
  eventDate?: string
  eventDescription?: string
  showModal: boolean
  setShowModal: (boolean) => void
}

export const About: FC<AboutProps> = ({
  setShowModal,
  showModal,
  eventDate = 'November 18 at 2PM EST',
  eventDescription = `During this hour-long event, we’ll show how Verizon 5G Ultra Wideband can unleash new applications, use cases and immersive customer experiences.<br /><br />With thought provoking discussions, cutting edge demos, and breakout sessions customized to the way you work, you'll learn how to take advantage of the exciting and transformative benefits of Verizon 5G.<br /><br />This is the 5G businesses have been waiting for. This is 5G built right.`
}) => {
  const classes = useStyles()

  return (
    <Modal open={showModal} onClose={() => setShowModal(false)}>
      <Box className={classes.root}>
        <IconButton
          className={classes.closeButton}
          color='default'
          aria-label='close'
          onClick={() => setShowModal(false)}
        >
          <CloseIcon fontSize='large' />
        </IconButton>
        <Typography component='h1' variant='h4' color='textPrimary' gutterBottom>
          5G Innovation Sessions.
        </Typography>
        <Typography component='h6' variant='h6' color='textPrimary' gutterBottom>
          {eventDate}
        </Typography>
        <Typography
          component='p'
          variant='body1'
          color='textPrimary'
          gutterBottom
          dangerouslySetInnerHTML={{ __html: eventDescription }}
        />
      </Box>
    </Modal>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '560px',
    borderRadius: 0,
    margin: '0 auto',
    position: 'relative',
    padding: '58px 52px 38px',
    backgroundColor: '#ffffff',
    overflow: 'auto',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: '20px'
    }
  },
  closeButton: {
    position: 'absolute',
    top: '0',
    right: '0'
  }
}))
