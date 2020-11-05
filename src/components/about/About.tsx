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
  eventDate = 'October 27–29, 2020',
  eventDescription = `Verizon is proud to be the lead sponsor for GSMA Thrive North America.\n\n During this three-day event, we'll show how Verizon 5G can unleash new applications, use cases and immersive customer experiences.\n\n With thought-provoking speakers, cutting-edge demos, and real-world case studies you'll learn how to take advantage of the exciting and transformative benefits of Verizon 5G.\n\n This is the 5G business has been waiting for. From the network businesses rely on.`
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
          Event info.
        </Typography>
        <Typography component='h6' variant='h6' color='textPrimary' gutterBottom>
          {eventDate}
        </Typography>
        <Typography component='p' variant='body1' color='textPrimary' gutterBottom>
          {eventDescription}
        </Typography>
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

    [theme.breakpoints.only('xs')]: {
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
