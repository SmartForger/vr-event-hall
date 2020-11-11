import React, { FC, useEffect, useState } from 'react'
import { I18n, Auth } from 'aws-amplify'
import { makeStyles, Theme, Grid, TextField, Link, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import { PillButton } from 'components'
import { validateEmail } from 'helpers'
import { AuthFlowSteps } from 'types'
import { graphQLQuery } from 'graphql/helpers'
import { userByEmailBase } from 'graphql/customQueries'
import { useAppState } from 'providers'

interface SignInProps {
  setAuthState: (state: AuthFlowSteps) => void
  setUserEmail: (email: string) => void
  setUserPd: (pd: string) => void
  redirectRoute?: string
}

export const SignIn: FC<SignInProps> = ({ setAuthState, setUserEmail, setUserPd, redirectRoute = '/event' }) => {
  const defaultAvatar = 'defaultAvatar.jpg'
  const classes = useStyles()
  const history = useHistory()
  const { setUser } = useAppState()
  const [loading, setLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')

  const getCurrentUser = async (email: string) => {
    const foundUser = await graphQLQuery(userByEmailBase, 'userByEmail', { email })
    if (foundUser) {
      if (!foundUser.avatar) {
        foundUser.avatar = defaultAvatar
      }
      setUser(foundUser)
      // TODO: Uncomment after registration
      // setAuthState(AuthFlowSteps.ThankYou)
      history.push(redirectRoute)
    } else {
      setAuthState(AuthFlowSteps.Register)
    }
  }

  useEffect(() => {
    return () => {
      setEmail('')
      setPassword('')
    }
  }, [])

  const signIn = async () => {
    error && setError('')
    if (!email || !password) {
      !email && setEmailError(I18n.get('requiredField'))
      !password && setPasswordError(I18n.get('requiredField'))
    } else if (!validateEmail(email)) {
      setEmailError(I18n.get('invalidEmail'))
    } else {
      setLoading(true)
      try {
        const user = await Auth.signIn(email.toLowerCase(), password)
        setUserEmail(email)
        getCurrentUser(user.attributes.email)
      } catch (error) {
        if (error.code === 'UserNotConfirmedException') {
          setUserEmail(email)
          setUserPd(password)
          setAuthState(AuthFlowSteps.ConfirmSignUp)
        } else if (error.code === 'NotAuthorizedException' || error.code === 'UserNotFoundException') {
          // email or password is incorrect
          setError(I18n.get('incorrectEmailOrPassword'))
        }
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      signIn()
    }
  }

  return (
    <Grid container direction='column' justify='center' spacing={2}>
      <Grid item>
        <Typography variant='h2' className={classes.heading}>
          {I18n.get('signIn')}
        </Typography>
      </Grid>
      <Grid item container alignItems='center'>
        <Typography component='p' display='inline'>
          <span>{I18n.get('dontHaveAnAccount')}</span>
          <Link component='button' className={classes.inlineButton} onClick={() => setAuthState(AuthFlowSteps.SignUp)}>
            {I18n.get('signUp')}
          </Link>
        </Typography>
      </Grid>
      <Grid item container spacing={2} justify='center'>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            className={classes.input}
            id='email'
            error={!!emailError}
            helperText={emailError}
            onFocus={() => setEmailError('')}
            label={I18n.get('email')}
            value={email}
            type='email'
            variant='outlined'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            className={classes.input}
            id='password'
            error={!!passwordError}
            helperText={passwordError}
            onFocus={() => setPasswordError('')}
            label={I18n.get('password')}
            type='password'
            value={password}
            variant='outlined'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </Grid>
      </Grid>

      {error && (
        <Grid item>
          <Typography component='p' className={classes.errorMessage}>
            {error}
          </Typography>
        </Grid>
      )}

      <Grid item container spacing={2} justify='space-between'>
        <Grid item xs={12} sm={6}>
          <PillButton
            loading={loading}
            type='submit'
            onClick={() => signIn()}
            className={classes.button}
            backgroundColor='transparent'
          >
            {I18n.get('continue')}
          </PillButton>
        </Grid>
        <Grid item className={classes.forgotButtonContainer} xs={12} sm={6}>
          <Link
            component='button'
            className={classes.forgotPasswordButton}
            onClick={() => setAuthState(AuthFlowSteps.ForgotPassword)}
          >
            {I18n.get('forgotPassword')}
          </Link>
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
  },
  input: {
    color: '#000',
    borderRadius: 0,
    '& .MuiInputBase-root': {
      backgroundColor: '#fff'
    },
    '& fieldset': {
      borderRadius: 0,
      borderColor: '#dadada',
      borderBottomColor: '#000'
    }
  },
  forgotButtonContainer: {
    alignSelf: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      marginTop: '1rem',
      textAlign: 'center'
    }
  },
  forgotPasswordButton: {
    color: '#000',
    textDecoration: 'underline'
  },
  inlineButton: {
    color: '#000',
    margin: '0 .5rem',
    fontFamily: 'Verizon-Regular',
    textDecoration: 'underline'
  },
  tooltipList: {
    paddingLeft: '.5rem'
  },
  tooltipIcon: {
    color: theme.palette.grey[500],
    '&:hover': {
      cursor: 'pointer'
    }
  },
  errorMessage: {
    color: theme.palette.error.main
  }
}))
