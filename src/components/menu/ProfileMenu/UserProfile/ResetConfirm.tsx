import React, { FC } from 'react'

// Components
import { Modal } from 'components/shared'

// Styles
import { makeStyles, Theme, Box, IconButton, Typography, Button, Grid } from '@material-ui/core'

// Images
import CloseIcon from '@material-ui/icons/Close'

interface ResetConfirmProps {
  showModal: boolean
  setShowModal: (boolean) => void
  onSubmit: (boolean) => void
}

export const ResetConfirm: FC<ResetConfirmProps> = ({ setShowModal, showModal, onSubmit }) => {
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
          Are you sure you want to reset your profile image?
        </Typography>

        <Grid container direction='row' justify='center' alignItems='center' spacing={10}>
          <Grid item xs={6}>
            <Button className={classes.button} variant='outlined' size='large' onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button className={classes.button} variant='contained' size='large' onClick={onSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '500px',
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
  },
  button: {
    width: 132,
    height: 42,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    margin: '42px 0'
  }
}))
