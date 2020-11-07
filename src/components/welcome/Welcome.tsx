import React, { FC } from 'react'
import { makeStyles, Theme, Grid, Typography } from '@material-ui/core'
import { IUser, GameFlowSteps } from 'types'

import { PillButton } from 'components/shared'

interface WelcomeProps {
  setGameState: (state: GameFlowSteps) => void
  user?: IUser
}

export const Welcome: FC<WelcomeProps> = ({ user, setGameState }) => {
  const classes = useStyles()
  const explore = () => {
    setGameState(GameFlowSteps.Explore)
  }
  return (
    <div className={classes.root}>
      <Grid container direction='column' justify='center' spacing={2}>
        <Grid item>
          <Typography component='h4' variant='h4' color='textPrimary'>
            Hi <span>{user?.firstName}</span>.
          </Typography>
        </Grid>
        <Grid item>
          <Typography component='h1' variant='h2' color='textPrimary'>
            Welcome to the Verizon 5G Innovation Sessions
          </Typography>
        </Grid>
        <Grid item>
          <Typography component='p' variant='body1' paragraph>
            During this hour-long event, we’ll show how Verizon 5G Ultra Wideband can unleash new applications, use
            cases and immersive customer experiences. With thought provoking discussions, cutting edge demos, and
            breakout sessions customized to the way you work, you'll learn how to take advantage of the exciting and
            transformative benefits of Verizon 5G. This is the 5G businesses have been waiting for. This is 5G built
            right.
          </Typography>
        </Grid>
        <Grid item container spacing={1}>
          <Grid item xs={12} sm={6}>
            <PillButton className={classes.button} backgroundColor='transparent' onClick={() => explore()}>
              Explore
            </PillButton>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: 'calc(100% - 125px - 90px)',
    height: 'initial',
    width: '100%',
    color: '#000',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    [theme.breakpoints.down('sm')]: {
      backgroundColor: '#fff'
    }
  },
  salutation: {
    color: 'black'
  },
  description: {
    color: 'black'
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
  }
}))
