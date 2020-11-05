import React, { FC, useState } from 'react'
import { I18n } from 'aws-amplify'
import { Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import { GameFlowSteps } from 'types'
import { GameFlowStepsConfig } from '../../helpers/steps'

interface NavigationProps {
  activeTab: GameFlowSteps
  setActiveTab: (state: GameFlowSteps) => void
}

export const Navigation: FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const [changingState, setChangingState] = useState<boolean>(false)
  const [previousState, setPreviousState] = useState<GameFlowSteps>(activeTab)

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
      <div className={classes.topNavContainer}>
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
        </Grid>
      </div>
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
  }
}))
