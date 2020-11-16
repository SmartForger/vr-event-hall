import React, { FC, useEffect, useState } from 'react'
import { I18n } from 'aws-amplify'
import { GameFlowSteps } from 'types'
import { Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import { GameFlowStepsConfig } from '../../helpers/steps'
import classnames from 'classnames'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

interface ExploreProps {
  setScene: (state: GameFlowSteps) => void
  prevScene: GameFlowSteps
  hideText: boolean
  sceneType: string
}

export const ExploreScene: FC<ExploreProps> = ({ setScene, sceneType, hideText, prevScene }) => {
  const classes = useStyles()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(
      () => {
        setLoading(false)
      },
      [GameFlowSteps.Demo, GameFlowSteps.Session].includes(prevScene)
        ? GameFlowStepsConfig[GameFlowSteps.BackToExplore].animation.time
        : GameFlowStepsConfig[sceneType].animation.time
    )
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {!loading && !hideText && (
        <div id='scene-explore' className={classnames(classes.transition, classes.root)}>
          <Typography variant='h2' className={classes.heading}>
            {sceneType === GameFlowSteps.Explore ? I18n.get('exploreSceneTitle') : I18n.get('sessionsSceneTitle')}
          </Typography>

          <Typography component='p' paragraph>
            {sceneType === GameFlowSteps.Explore ? I18n.get('exploreSceneBlurb') : I18n.get('sessionsSceneBlurb')}
          </Typography>

          <Typography className={classes.fontSize14} component='span'>
            {I18n.get('clickAndDragToExplore')}
          </Typography>
          <ArrowBackIcon className={`${classes.forwardArrow} ${classes.fontSize14}`} />
        </div>
      )}
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 'calc(100% - 105px)',
    width: 'calc(50% - 12.5% - 32px)',
    padding: '0 0 0 12.5%',
    top: '105px',
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 1300,
    color: '#000',

    [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
      height: 'calc(100vh - 65px)',
      paddingLeft: '4rem',
      top: 65,
      width: '40vw'
    }
  },
  heading: {
    fontWeight: 700,
    fontSize: '3.125rem',
    lineHeight: '3.125rem',
    marginBottom: '16px',

    [theme.breakpoints.down('md')]: {
      fontSize: '3rem',
      lineHeight: '3rem'
    },
    [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
      fontSize: '1.5rem',
      lineHeight: 1.1,
      marginTop: '2rem'
    }
  },
  button: {
    width: 200
  },
  inlineButton: {
    color: '#000',
    margin: '0 .5rem',
    fontFamily: 'Verizon-Regular',
    textDecoration: 'underline'
  },
  forwardArrow: {
    position: 'relative',
    top: '2px',
    left: '4px',
    WebkitTransform: 'rotate(180deg)',
    transform: 'rotate(180deg)'
  },
  fontSize14: {
    fontSize: '14px'
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
}))
