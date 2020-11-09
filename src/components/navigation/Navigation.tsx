import React, { FC, useState } from 'react'
import { I18n } from 'aws-amplify'
import { Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import { GameFlowSteps, EventStages } from 'types'
import { Countdown, RouteTransition } from 'components'
import { GameFlowStepsConfig } from '../../helpers/steps'
import { useHistory } from 'react-router-dom'

interface NavigationProps {
  activeTab: GameFlowSteps
  setActiveTab: (state: GameFlowSteps) => void
  setShowLivestream: (boolean) => void
  notifyESS: () => void // EventStartingSoon
  streamStartTime?: string
  eventStage?: EventStages
  showLivestream: boolean
}

export const Navigation: FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  notifyESS,
  streamStartTime,
  eventStage,
  setShowLivestream,
  showLivestream
}) => {
  const history = useHistory()
  const [changingState, setChangingState] = useState<boolean>(false)
  const [previousState, setPreviousState] = useState<GameFlowSteps>(activeTab)
  const [redirectTrigger, setRedirectTrigger] = useState<boolean>(false)

  const classes = useStyles()
  const onClick = state => {
    if (!changingState) {
      setActiveTab(state)

      const welcomeScene = [GameFlowSteps.Welcome, GameFlowSteps.Intro, GameFlowSteps.Connect]
      if (!(welcomeScene.includes(state) && welcomeScene.includes(previousState))) {
        setChangingState(true)
        setTimeout(() => {
          setChangingState(false)
        }, GameFlowStepsConfig[activeTab].animation.time)
      }

      setPreviousState(state)
    }
  }

  return (
    <>
      <div id='topNavContainer' className={classes.topNavContainer}>
        <Grid item classes={{ root: classes.navigationSectionOfHeader }}>
          <Typography
            component='span'
            variant='h5'
            className={
              activeTab === GameFlowSteps.Welcome || activeTab === GameFlowSteps.Intro
                ? classes.navItemActive
                : classes.navItem
            }
            onClick={() => onClick(GameFlowSteps.Welcome)}
          >
            Welcome
          </Typography>
          <Typography
            component='span'
            variant='h5'
            className={activeTab === GameFlowSteps.Sessions ? classes.navItemActive : classes.navItem}
            onClick={() => onClick(GameFlowSteps.Sessions)}
          >
            {I18n.get('sessions')}
          </Typography>
          <Typography
            component='span'
            variant='h5'
            className={activeTab === GameFlowSteps.Explore ? classes.navItemActive : classes.navItem}
            onClick={() => onClick(GameFlowSteps.Explore)}
          >
            {I18n.get('explore')}
          </Typography>
          <Typography
            component='span'
            variant='h5'
            className={activeTab === GameFlowSteps.Connect ? classes.navItemActive : classes.navItem}
            onClick={() => onClick(GameFlowSteps.Connect)}
          >
            {I18n.get('connect')}
          </Typography>
          {showLivestream && (
            <Typography
              component='span'
              variant='h5'
              className={activeTab === GameFlowSteps.LiveStream ? classes.navItemActive : classes.navItem}
              onClick={() => onClick(history.push('/stream'))}
            >
              {I18n.get('liveStream')}
            </Typography>
          )}

          {streamStartTime && eventStage === EventStages.COUNTDOWN && (
            <div className={classes.countdownContainer}>
              <Countdown
                setShowLivestream={setShowLivestream}
                streamStartTime={streamStartTime}
                notifyESS={notifyESS}
              />
            </div>
          )}
        </Grid>
      </div>
      <RouteTransition route='/stream' animationTrigger={redirectTrigger} timeout={300} />
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  topNavContainer: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center'
  },
  navigationSectionOfHeader: {
    // we should remove this once the right-most
    // items are moved into the header too
    // so that it spaces automatically
    marginRight: '100px',
    display: 'inline-flex',
    height: '30px',

    [theme.breakpoints.down('md')]: {
      display: 'flex',
      marginRight: '40px'
    },
    [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
      alignItems: 'center'
    }
  },
  navItem: {
    marginRight: '1rem',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '1rem',
    color: '#000000',
    cursor: 'pointer',

    [theme.breakpoints.down('md')]: {
      fontSize: '0.9rem',
      marginRight: '0.5rem'
    },
    [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
      display: 'none'
    }
  },
  navItemActive: {
    marginRight: '1rem',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '1rem',
    color: '#000000',
    cursor: 'pointer',
    borderBottom: '3px solid #CD040B',

    [theme.breakpoints.down('md')]: {
      fontSize: '0.9rem',
      marginRight: '0.5rem'
    },
    [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
      display: 'none'
    }
  },
  lineBreak: {
    border: '2px solid #D52B1E'
  },
  countdownContainer: {
    position: 'relative',
    display: 'inline-flex',
    transition: '200ms width ease',

    [theme.breakpoints.down('md')]: {
      position: 'absolute',
      right: 0,
      marginTop: '-26px',
      marginRight: '32px',
      width: '305px',
      display: 'block',
      fontSize: '0.9rem'
    },
    [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
      whiteSpace: 'nowrap',
      marginTop: 'unset'
    }
  }
}))
