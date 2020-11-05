import React, { FC, useEffect, useState } from 'react'
import { GameFlowSteps, IUser } from 'types'
import { Grid, IconButton, makeStyles, Theme, Typography } from '@material-ui/core'
import { PillButton, Video } from 'components'
import classnames from 'classnames'
import { GameFlowStepsConfig } from '../../helpers/steps'
import CloseIcon from '@material-ui/icons/Close'

interface IWelcomeProps {
  setScene: (state: GameFlowSteps) => void
  setGameState: (state: GameFlowSteps) => void
  user?: IUser
  activeScene: GameFlowSteps
  transition: boolean
}

export const WelcomeScene: FC<IWelcomeProps> = ({ user, setGameState, activeScene, transition }) => {
  const [exit, setExit] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(activeScene === GameFlowSteps.Welcome && transition)
  const [showVideo, setShowVideo] = useState<boolean>(false)
  const classes = useStyles()

  useEffect(() => {
    if (activeScene === GameFlowSteps.Welcome && transition) {
      setTimeout(() => {
        setLoading(false)
      }, GameFlowStepsConfig[GameFlowSteps.Welcome].animation.time)
    }
    return () => {
      setExit(true)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {!loading && (
        <div
          id='scene-welcome'
          className={classnames(classes.transition, classes.root, {
            [classes.transitionOut]: exit,
            [classes.introZIndex]: showVideo
          })}
        >
          <Grid container direction='column' justify='center' spacing={2}>
            <Grid item>
              <Typography component='h4' variant='h4'>
                Hi <span>{user?.firstName}</span>.
              </Typography>
            </Grid>
            <Grid item>
              <Typography component='h2' variant='h2'>
                The 5G Business has been waiting for.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component='p' paragraph>
                Welcome to the Verizon 5G Innovation Sessions.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component='p' paragraph>
                Over the next three days we'll show how Verizon 5G can unleash new applications, use cases and immersive
                customer experiences.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component='p' paragraph>
                This is the 5G business has been waiting for. From the network businesses rely on.
              </Typography>
            </Grid>
            <Grid item container spacing={1}>
              <Grid item xs={12} sm={6}>
                <PillButton className={classes.button} backgroundColor='transparent' onClick={() => setShowVideo(true)}>
                  Play
                </PillButton>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
      {showVideo && (
        <div className={classnames('video-containment', classes.intro, classes.transition)}>
          <IconButton
            className={classes.closeButton}
            color='default'
            aria-label='close'
            onClick={() => {
              setGameState(GameFlowSteps.Sessions)
              setShowVideo(false)
            }}
          >
            <CloseIcon fontSize='large' />
          </IconButton>
          <Video
            videoSrc={'https://d1oc551tl862q5.cloudfront.net/welcome-4.mp4'}
            onEnded={() => {
              setGameState(GameFlowSteps.Sessions)
              setShowVideo(false)
            }}
            autoPlay={true}
          />
        </div>
      )}
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 'calc(100% - 105px)',
    width: 'calc(50% - 32px)',
    padding: '0 12.5%',
    top: '105px',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    zIndex: 1300,
    color: '#000',
    [theme.breakpoints.down('lg')]: {
      padding: '0 12.5% 0 10%'
    },
    [theme.breakpoints.down('md')]: {
      padding: '0 12.5% 0 8%'
    },

    [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
      flexDirection: 'row',
      overflowY: 'auto',
      height: '100%',
      textAlign: 'left',
      justifyContent: 'flex-start',
      top: '55px'
    }
  },
  introZIndex: {
    zIndex: 20000
  },
  intro: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 20000,
    display: 'flex',
    background: '#000',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  button: {
    width: 200,
    fontWeight: 600
  },
  inlineButton: {
    color: '#000',
    margin: '0 .5rem',
    fontFamily: 'Verizon-Regular',
    textDecoration: 'underline'
  },
  closeButton: {
    zIndex: 10000,
    position: 'absolute',
    top: '0',
    right: '5px',
    color: 'rgba(255, 255, 255, 0.25)',
    '&:hover': {
      color: 'rgba(255, 255, 255, 0.75)'
    }
  },
  transition: {
    opacity: 1,
    animationName: '$fadeInOpacity',
    animationIterationCount: 1,
    animationTimingFunction: 'ease-in',
    animationDuration: '0.75s'
  },
  transitionOut: {
    animationName: '$fadeOutOpacity',
    animationIterationCount: 1,
    animationTimingFunction: 'ease-out',
    animationDuration: '0.75s',
    opacity: 0
  },
  '@keyframes fadeInOpacity': {
    '0%': {
      opacity: 0
    },
    '100%': {
      opacity: 1
    }
  },
  '@keyframes fadeOutOpacity': {
    '0%': {
      opacity: 1
    },
    '100%': {
      opacity: 0
    }
  }
  // ,
  // delay: {
  //   animation: '0s linear 2.3s forwards makeVisible',
  //   visibility: 'hidden'
  // }
}))
