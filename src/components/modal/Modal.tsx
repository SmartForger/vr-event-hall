import React, { FC } from 'react'
import { Backdrop, Grow, Modal as MuiModal, ModalProps as MuiModalProps, makeStyles } from '@material-ui/core'

export const Modal: FC<MuiModalProps> = ({ open, onClose, children }) => {
  const classes = useStyles()

  return (
    <MuiModal
      open={open}
      onClose={onClose}
      className={classes.modal}
      closeAfterTransition={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 1000 }}
    >
      <Grow in={open} timeout={800}>
        <div className={classes.paper}>{children}</div>
      </Grow>
    </MuiModal>
  )
}

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    width: '80vw',
    height: 'auto',
    display: 'flex',

    outline: '0',
    '& *': { outline: '0' }
  }
}))
