import React, { FC } from 'react'
import { I18n } from 'aws-amplify'
import { makeStyles, Theme, Grid, Typography } from '@material-ui/core'

import { PillButton } from 'components'
import { AuthFlowSteps } from 'types'

interface SignInProps {
  setAuthState: (state: AuthFlowSteps) => void
}

export const AuthRoot: FC<SignInProps> = ({ setAuthState }) => {
  const classes = useStyles()

  const signIn = () => {
    setAuthState(AuthFlowSteps.SignIn)
  }

  const signUp = () => {
    setAuthState(AuthFlowSteps.SignUp)
  }

  return (
    <Grid container direction='column' justify='center'>
      <Grid item>
        <Typography variant='h2' className={classes.heading}>
          Join us for 5G <br />
          Innovation Sessions
        </Typography>
      </Grid>
      <Grid item container alignItems='flex-start' spacing={2}>
        <Grid item>
          <PillButton onClick={() => signIn()} className={classes.button} solid>
            {I18n.get('signIn')}
          </PillButton>
        </Grid>
        <Grid item>
          <PillButton onClick={() => signUp()} className={classes.button} backgroundColor='transparent'>
            {I18n.get('register')}
          </PillButton>
        </Grid>
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    width: 165
  },
  heading: {
    fontWeight: 700,
    fontSize: '3.125rem',
    lineHeight: '3.125rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '3rem',
      lineHeight: '3rem'
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '2rem'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '2rem',
      lineHeight: '2rem'
    }
  }
}))
