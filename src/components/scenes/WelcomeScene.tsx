import React, { FC, useEffect, useState } from 'react'
import { GameFlowSteps, IUser } from 'types'
import { Box, Grid, IconButton, makeStyles, Theme, Typography } from '@material-ui/core'
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

  const explore = () => {
    setGameState(GameFlowSteps.Explore)
  }

  return (
    <>
      {!loading && (
        <div
          id='scene-welcome'
          className={classnames(classes.transition, classes.root, {
            [classes.transitionOut]: exit
          })}
        >
          <div>
            <Box marginBottom={2}>
              <Typography component='h4' variant='h4'>
                Hi <span>{user?.firstName}</span>.
              </Typography>
            </Box>

            <Box marginBottom={3}>
              <Typography component='h2' variant='h2'>
                Welcome to 5G Innovation Sessions.
              </Typography>
            </Box>

            <Typography component='p' paragraph>
              During this hour-long event, we’ll show how Verizon 5G Ultra Wideband can unleash new applications, use
              cases and immersive customer experiences.
            </Typography>

            <Typography component='p' paragraph>
              With thought provoking discussions, cutting edge demos, and breakout sessions customized to the way you
              work, you'll learn how to take advantage of the exciting and transformative benefits of Verizon 5G.
            </Typography>

            <Typography component='p' paragraph>
              This is the 5G businesses have been waiting for. This is 5G built right.
            </Typography>

            <PillButton className={classes.button} backgroundColor='transparent' onClick={() => explore()}>
              Explore
            </PillButton>
          </div>
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
    position: 'absolute',
    backgroundColor: 'transparent',
    overflowY: 'auto',
    zIndex: 1300,
    color: '#000',
    top: '105px',
    paddingTop: '140px',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('lg')]: {
      padding: '0 12.5% 0 10%'
    },
    [theme.breakpoints.down('md')]: {
      padding: '90 12.5% 0 8%',
      paddingTop: '120px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '90 12.5% 0 8%',
      paddingTop: '0px',
      alignItems: 'flex-start'
    },
    [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
      height: 'calc(100vh - 65px)',
      paddingLeft: '4rem',
      paddingRight: theme.spacing(4),
      textAlign: 'left',
      top: 65
    }
  },
  heading: {
    fontSize: 50,
    lineHeight: '48px',

    [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
      fontSize: 18,
      lineHeight: 1.1
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
    width: 132,
    height: 42,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    margin: '42px 0'
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
  withMarginBottom: {
    marginBottom: theme.spacing(2)
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
