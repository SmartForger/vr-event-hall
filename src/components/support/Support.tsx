import React, { FC } from 'react'

// Components
import { Modal, ContactForm } from 'components/shared'

// Styles
import { makeStyles, Theme, Box, IconButton, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { IUser } from '../../types'

interface SupportProps {
  showModal: boolean
  setShowModal: (boolean) => void
  user?: IUser
  setErrorMessage: (message: string | null) => void
  setSuccessMessage: (message: string | null) => void
}

export const Support: FC<SupportProps> = ({ showModal, setShowModal, user, setErrorMessage, setSuccessMessage }) => {
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
          Support.
        </Typography>
        <ContactForm
          setShowModal={setShowModal}
          isHelpRequest={true}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
          messageHelper='Please let us know what issues you’re experiencing.'
          user={user}
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
