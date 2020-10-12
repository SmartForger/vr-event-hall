import React, { FC, useState, useEffect } from 'react'
import classNames from 'classnames'
import { makeStyles, Theme, Grid } from '@material-ui/core'
import { useLocation } from 'react-router-dom'

import { Welcome } from 'components'
import {
  SignUp,
  ConfirmSignUp,
  ResendCode,
  Registration,
  SignIn,
  ForgotPassword,
  BreakoutSessions,
  // Survey,
  ThankYou
} from './index'
import { AuthFlowSteps, IUser } from 'types'

interface IAuthWrapper {
  backgroundImage?: string
  setUser: (user: IUser) => void
}
export const AuthWrapper: FC<IAuthWrapper> = props => {
  const queryParams = new URLSearchParams(useLocation().search)
  const classes = useStyles(props)

  const [authState, setAuthState] = useState<AuthFlowSteps>(AuthFlowSteps.SignUp)
  const [userEmail, setUserEmail] = useState<string>('')
  const [userPd, setUserPd] = useState<string>('')

  useEffect(() => {
    // Uncomment if we need to use query params to set the auth state
    const authParam = queryParams.get('auth')
    if (authParam) {
      // Uncomment if we need to use query params to set the auth state
      // setAuthState(authParam as AuthFlowSteps)
    }
    return () => {
      setUserEmail('')
      setUserPd('')
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className={classNames(classes.root, props.backgroundImage && classes.backgroundImage)}>
      {authState === AuthFlowSteps.Welcome && <Welcome setAuthState={setAuthState} />}
      {authState !== AuthFlowSteps.Welcome && (
        <div className={classes.authWrapper}>
          <Grid container className={classes.authStateWrapper} spacing={3} direction='column'>
            <Grid item xs={12}>
              {authState === AuthFlowSteps.SignIn && (
                <SignIn setAuthState={setAuthState} setUserEmail={setUserEmail} setUserPd={setUserPd} />
              )}
              {authState === AuthFlowSteps.SignUp && (
                <SignUp setAuthState={setAuthState} setUserEmail={setUserEmail} setUserPd={setUserPd} />
              )}
              {authState === AuthFlowSteps.ConfirmSignUp && (
                <ConfirmSignUp userPd={userPd} userEmail={userEmail} setAuthState={setAuthState} />
              )}
              {authState === AuthFlowSteps.ResendCode && (
                <ResendCode userEmail={userEmail} setAuthState={setAuthState} />
              )}
              {authState === AuthFlowSteps.Register && (
                <Registration userEmail={userEmail} setAuthState={setAuthState} setUser={props.setUser} />
              )}
              {authState === AuthFlowSteps.BreakoutSessions && (
                <BreakoutSessions setAuthState={setAuthState} userEmail={userEmail} />
              )}
              {/* {authState === AuthFlowSteps.Suruvey && (
                <Survey setAuthState={setAuthState} userEmail={userEmail} />
              )} */}
              {authState === AuthFlowSteps.ThankYou && <ThankYou />}
              {authState === AuthFlowSteps.ForgotPassword && <ForgotPassword setAuthState={setAuthState} />}
            </Grid>
          </Grid>
        </div>
      )}
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
  backgroundImage: (props: IAuthWrapper) =>
    props.backgroundImage
      ? {
          [theme.breakpoints.up('lg')]: {
            backgroundImage: `url(${props.backgroundImage})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }
        }
      : {},
  authWrapper: {
    backgroundColor: 'transparent',
    height: '100%',
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    padding: '0 4rem',
    marginBottom: '2rem',
    [theme.breakpoints.down('md')]: {
      width: '70%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      padding: 0
    }
  },
  authStateWrapper: {
    width: '80%',
    [theme.breakpoints.down('md')]: {
      width: '90%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: 0
    }
  }
}))
