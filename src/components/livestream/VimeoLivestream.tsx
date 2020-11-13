import React, { FC, useEffect, useState } from 'react'
import { Box, IconButton, makeStyles, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { PillButton, RouteTransition } from 'components'
import { graphQLMutation } from '../../graphql/helpers'
import { createUserInteraction } from '../../graphql/mutations'
import { EventStages, IUser } from '../../types'
import { useHistory } from 'react-router-dom'

interface VimeoLiveStreamProps {
  useBackupStream: Boolean
  user?: IUser
  eventStage?: EventStages
}

export const VimeoLiveStream: FC<VimeoLiveStreamProps> = ({ useBackupStream, user, eventStage }) => {
  const classes = useStyles()
  const [redirectTrigger, setRedirectTrigger] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState(false)
  const history = useHistory()

  useEffect(() => {
    console.log(user)
    if (user?.id) {
      graphQLMutation(createUserInteraction, {
        name: 'livestream',
        trigger: 'view',
        type: 'livestream',
        userId: user?.id
      })
    }
  }, [user])

  useEffect(() => {
    if (eventStage && ![EventStages.COUNTDOWN, EventStages.LIVESTREAM].includes(eventStage)) {
      setRedirectTrigger(true)
    }
  }, [eventStage])

  return (
    <>
      <div className={classes.root}>
        <IconButton
          className={classes.closeButton}
          onClick={() => setOpenModal(true)}
          disableFocusRipple
          disableRipple
          disableTouchRipple
        >
          <Close />
        </IconButton>
        {!useBackupStream ? (
          <>
            <iframe
              className={classes.iframe}
              title='Verizon 5G'
              src='https://vimeo.com/event/445293/embed'
              allow='autoplay; fullscreen'
              allowFullScreen
            ></iframe>
          </>
        ) : (
          <>
            <iframe
              className={classes.iframe}
              title='Verizon 5G'
              src='https://vimeo.com/event/445311/embed'
              allow='autoplay; fullscreen'
              allowFullScreen
            ></iframe>
          </>
        )}
      </div>
      <RouteTransition animationTrigger={redirectTrigger} route='/event' timeout={300} />
      {openModal && (
        <div className={classes.modal}>
          <div className={classes.modalBody}>
            <Box p={4}>
              <Box mb={4} mt={2}>
                <Typography style={{ color: '#000' }} variant='h4'>
                  Join a breakout session.
                </Typography>
              </Box>
              <Typography style={{ color: '#000' }}>
                It’s almost time to hear how your business can take advantage of the full, transformative power of
                Verizon 5G Ultra Wideband. Let our experts to take you on a deeper dive into vertical-specific use cases
                to demonstrate how Verizon 5G can benefit you. Each session includes a live Q&A. Click below to see
                which sessions are available to join.
              </Typography>
              <Box>
                <PillButton
                  type='button'
                  className='button'
                  variant='outlined'
                  textColor='white'
                  backgroundColor='black'
                  onClick={() => history.push('/event')}
                  classes={{ root: classes.toastESSButton }}
                >
                  Pick your breakout session
                </PillButton>
              </Box>
            </Box>
            <IconButton className={classes.closeButtonModal} onClick={() => setRedirectTrigger(true)}>
              <Close />
            </IconButton>
          </div>
        </div>
      )}
    </>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    width: '100%'
  },
  iframe: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 'none'
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 50,
    zIndex: 10,
    '& svg': {
      color: '#fff'
    }
  },
  modal: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 9999,
    height: '100vh',
    width: '100vw',
    top: 0,
    left: 0
  },
  modalBody: {
    backgroundColor: '#fff',
    width: 560,
    position: 'relative'
  },
  closeButtonModal: {
    position: 'absolute',
    right: 0,
    top: 0
  },
  toastESSButton: {
    height: '24px',
    fontSize: '12px',
    marginBottom: '1rem',
    padding: '0 20px',
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: 'black',
      color: 'white'
    }
  }
}))
