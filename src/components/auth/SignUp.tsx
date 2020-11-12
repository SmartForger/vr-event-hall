import React, { FC, useState, useEffect } from 'react'
import { I18n, Auth } from 'aws-amplify'
import { makeStyles, Theme, Grid, TextField, Link, Typography } from '@material-ui/core'

import { PillButton, PasswordRequirementsTooltip } from 'components'
import { AuthFlowSteps } from 'types'
import { validateEmail, validatePassword } from 'helpers'

interface SignUpProps {
  setUserEmail: (email: string) => void
  setUserPd: (pd: string) => void
  setAuthState: (state: AuthFlowSteps) => void
}
interface ISignUpErrors {
  emailError: string
  passwordError: string
}

export const SignUp: FC<SignUpProps> = ({ setAuthState, setUserEmail, setUserPd }) => {
  const classes = useStyles()
  const [loading, setLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [passwordTooltipOpen, setPasswordTooltipOpen] = useState<boolean>(false)

  useEffect(() => {
    return () => {
      // clean up user in state so we don't hold on to passwords
      setPassword('')
      setConfirmPassword('')
    }
    //eslint-disable-next-line
  }, [])

  const validateSignUp = (): ISignUpErrors => {
    let emailError, passwordError

    if (!email) {
      emailError = I18n.get('requiredField')
    }

    if (!password) {
      passwordError = I18n.get('requiredField')
    }

    if (password.length > 0) {
      if (password !== confirmPassword) {
        passwordError = I18n.get('passwordsMustMatch')
      } else if (!validatePassword(password)) {
        passwordError = I18n.get('invalidPassword')
      }
    }

    if (email.length > 0 && !validateEmail(email)) {
      emailError = I18n.get('invalidEmail')
    }

    return {
      emailError,
      passwordError
    }
  }

  const signUp = async () => {
    const { emailError, passwordError } = validateSignUp()
    if (!!emailError || !!passwordError) {
      setEmailError(emailError)
      setPasswordError(passwordError)
    } else {
      setLoading(true)
      try {
        await Auth.signUp({
          username: email.toLowerCase(),
          password: password
        })
        setUserEmail(email)
        setUserPd(password)
        setAuthState(AuthFlowSteps.ConfirmSignUp)
      } catch (error) {
        if (error.code === 'UsernameExistsException') {
          setEmailError(I18n.get('emailAlreadyRegistered'))
        }
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      signUp()
    }
  }

  return (
    <Grid container direction='column' justify='center' spacing={2}>
      <Grid item>
        <Typography variant='h2' className={classes.heading} paragraph>
          <span dangerouslySetInnerHTML={{ __html: I18n.get('joinUs') }}></span>
        </Typography>
      </Grid>
      <Grid item container alignItems='center'>
        <Typography component='p' display='inline' paragraph>
          <span>{I18n.get('alreadyHaveAnAccount')}</span>
          <Link component='button' className={classes.inlineButton} onClick={() => setAuthState(AuthFlowSteps.SignIn)}>
            {I18n.get('signIn')}
          </Link>
        </Typography>
      </Grid>
      <Grid item container spacing={2} justify='center'>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            className={classes.input}
            id='email'
            type='email'
            error={!!emailError}
            helperText={emailError}
            onFocus={() => setEmailError('')}
            label={I18n.get('email')}
            value={email}
            variant='outlined'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PasswordRequirementsTooltip open={passwordTooltipOpen} password={password}>
            <TextField
              fullWidth
              required
              className={classes.input}
              id='password'
              error={!!passwordError}
              helperText={passwordError}
              onFocus={() => {
                setPasswordError('')
                setPasswordTooltipOpen(true)
              }}
              onBlur={() => setPasswordTooltipOpen(false)}
              label={I18n.get('password')}
              type='password'
              value={password}
              variant='outlined'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </PasswordRequirementsTooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            className={classes.input}
            error={!!passwordError}
            id='confirm-password'
            label={I18n.get('confirmPassword')}
            type='password'
            value={confirmPassword}
            variant='outlined'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </Grid>
      </Grid>
      <Grid item container xs={12}>
        <Typography variant='body2' paragraph classes={{ root: classes.emailNote }}>
          {I18n.get('emailWillBecomeUsername')}
        </Typography>
      </Grid>
      <Grid item container xs={12}>
        <PillButton
          loading={loading}
          type='submit'
          onClick={() => signUp()}
          backgroundColor='transparent'
          className={classes.button}
        >
          {I18n.get('continue')}
        </PillButton>
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
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
  button: {
    width: 165
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
  inlineButton: {
    color: '#000',
    margin: '0 .5rem',
    fontFamily: 'Verizon-Regular',
    textDecoration: 'underline',
    verticalAlign: 'baseline'
  },
  arrow: {
    color: '#000'
  },
  tooltip: {
    backgroundColor: '#fff',
    border: '1px solid #000'
  },
  tooltipContainer: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column'
  },
  tooltipItem: {
    color: '#000',
    display: 'flex',
    alignItems: 'center'
  },

  tooltipIcon: {
    color: theme.palette.grey[500],
    '&:hover': {
      cursor: 'pointer'
    }
  },
  emailNote: {
    color: '#979797',
    fontSize: '14px'
  }
}))
