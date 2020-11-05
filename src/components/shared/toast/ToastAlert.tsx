import React, { FC } from 'react'
import { I18n } from 'aws-amplify'
import { Grid, makeStyles, Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import WarningIcon from '@material-ui/icons/Warning'
import InfoIcon from '@material-ui/icons/Info'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import NotificationsIcon from '@material-ui/icons/Notifications'

type TToastType = 'info' | 'warning' | 'success' | 'error' | 'notice'

export interface IToastAlertProps {
  type?: TToastType
  isOpen: boolean
  onOpen?: () => void
  onClose: () => void
}

export const ToastAlert: FC<IToastAlertProps> = ({ type = 'notice', isOpen, children, onClose }) => {
  const classes = useStyles()

  return (
    <Snackbar
      open={isOpen}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      classes={{ root: classes[`toastLevel-${type}`] }}
    >
      <Grid container justify='space-between'>
        <Grid item xs={1}>
          <div className={classes.typeIconContainer}>
            {type === 'notice' && <NotificationsIcon />}
            {type === 'success' && <CheckCircleIcon />}
            {type === 'warning' && <WarningIcon />}
            {type === 'info' && <InfoIcon />}
          </div>
        </Grid>
        <Grid item xs={2}>
          <IconButton aria-label={I18n.get('close')} className={classes.closeToastButton} onClick={() => onClose()}>
            <CloseIcon />
          </IconButton>
        </Grid>
        {/* 2nd Row - Content */}
        <Grid item xs={12} classes={{ root: classes.bodyContainer }}>
          {children}
        </Grid>
      </Grid>
    </Snackbar>
  )
}

const sharedToastStyles = {
  right: 88,
  maxWidth: '320px',
  padding: '0.5rem',
  color: '#000',
  backgroundColor: '#fff'
}
const useStyles = makeStyles({
  typeIconContainer: {
    height: '48px',
    width: '48px',
    padding: '12px',
    margin: '0 1rem 1rem',
    color: 'inherit',
    borderRadius: '50%',
    backgroundColor: '#D8DADA'
  },
  'toastLevel-notice': {
    ...sharedToastStyles,
    backgroundColor: '#fff',
    color: '#000'
  },
  'toastLevel-info': {
    ...sharedToastStyles,
    backgroundColor: '#fff',
    color: '#000'
  },
  closeToastButton: {},
  bodyContainer: {
    padding: '0 1rem',
    fontFamily: 'Verizon NHG DS',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '24px'
  }
})
