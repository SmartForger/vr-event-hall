import React, { FC, useEffect, useState } from 'react'
import { IconButton, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { RouteTransition } from 'components'
import { graphQLMutation } from '../../graphql/helpers'
import { createUserInteraction } from '../../graphql/mutations'
import { EventStages, IUser } from '../../types'

interface VimeoLiveStreamProps {
  useBackupStream: Boolean
  user?: IUser
  eventStage?: EventStages
}

export const VimeoLiveStream: FC<VimeoLiveStreamProps> = ({ useBackupStream, user, eventStage }) => {
  const classes = useStyles()
  const [redirectTrigger, setRedirectTrigger] = useState<boolean>(false)

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
          onClick={() => setRedirectTrigger(true)}
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
              title='Verizon at Thrive'
              src='https://vimeo.com/event/380826/embed'
              allow='autoplay; fullscreen'
              allowFullScreen
            ></iframe>
          </>
        ) : (
          <>
            <iframe
              className={classes.iframe}
              title='Verizon at Thrive'
              src='https://vimeo.com/event/380833/embed'
              allow='autoplay; fullscreen'
              allowFullScreen
            ></iframe>
          </>
        )}
      </div>
      <RouteTransition animationTrigger={redirectTrigger} route='/event' timeout={300} />
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
  }
}))
