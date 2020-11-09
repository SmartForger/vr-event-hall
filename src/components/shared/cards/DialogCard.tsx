import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Backdrop, Card, CardActionArea, CardActions, CardContent, Button, Typography, Box } from '@material-ui/core'

interface DialogCardProps {
  title: string
  message: string
  messageLine2?: string
  onCancel?: () => void
  onConfirm?: (val?: any) => void
  containerHeight?: number
  className?: string
  confirmText?: string
  cancelText?: string
}

export const DialogCard: FC<DialogCardProps> = ({
  title,
  message,
  messageLine2,
  onCancel,
  onConfirm,
  containerHeight,
  className,
  confirmText,
  cancelText
}) => {
  const classes = useStyles()

  return (
    <Box className={`${classes.dialogRoot} ${className || ''}`} height={containerHeight || '100%'}>
      <Backdrop open={true} className={classes.backdrop}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant='h5' component='h2' align='center'>
                {title}
              </Typography>
              <Typography variant='body1' component='p' align='center' className={classes.dialogMessage}>
                {message}
                {messageLine2 ? (
                  <>
                    <br />
                    {messageLine2}
                  </>
                ) : null}
              </Typography>
            </CardContent>
          </CardActionArea>
          {onConfirm || onCancel ? (
            <CardActions className={classes.actions}>
              {onCancel && (
                <Button size='small' variant='contained' className={classes.cancel} onClick={onCancel}>
                  {cancelText || 'Cancel'}
                </Button>
              )}
              {onConfirm && (
                <Button size='small' variant='outlined' className={classes.confirm} onClick={onConfirm}>
                  {confirmText || 'Yes'}
                </Button>
              )}
            </CardActions>
          ) : null}
        </Card>
      </Backdrop>
    </Box>
  )
}

const useStyles = makeStyles({
  root: {
    maxWidth: 320,
    borderRadius: 0,
    border: '1px solid black'
  },
  dialogRoot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    position: 'relative',
    zIndex: 99999,
    '& .MuiPaper-root': {
      backgroundColor: 'white !important'
    }
  },
  actions: {
    justifyContent: 'center',
    marginBottom: '16px',
    '& button': {
      borderRadius: '16px',
      width: '70px',
      textTransform: 'none',
      padding: '2px 8px'
    }
  },
  cancel: {
    color: 'black',
    backgroundColor: 'white',
    boxShadow: 'none',
    border: '1px solid black',
    '&:hover': {
      backgroundColor: 'white',
      boxShadow: 'none',
      border: '1px solid black',
      color: 'black'
    }
  },
  confirm: {
    backgroundColor: 'black',
    color: 'white',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'black',
      color: 'white',
      boxShadow: 'none'
    }
  },
  backdrop: {
    width: '100%',
    position: 'absolute'
  },
  dialogMessage: { padding: '8px 8px' }
})
