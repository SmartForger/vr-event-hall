import React, { FC, useState, useEffect } from 'react'
import { makeStyles, Theme, Grid, TextField, Link, Typography } from '@material-ui/core'
import { I18n, Auth } from 'aws-amplify'

import { PillButton, PasswordRequirementsTooltip } from 'components'
import { AuthFlowSteps } from 'types'
import { validateEmail, validatePassword } from 'helpers'

interface ForgotPasswordProps {
  setAuthState: (state: AuthFlowSteps) => void
}

export const ForgotPassword: FC<ForgotPasswordProps> = ({ setAuthState }) => {
  const classes = useStyles()
  const [email, setEmail] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<string>('')
  const [codeError, setCodeError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [codeSent, setCodeSent] = useState<boolean>(false)
  const [passwordTooltipOpen, setPasswordTooltipOpen] = useState<boolean>(false)

  useEffect(() => {
    return () => {
      setPassword('')
      setConfirmPassword('')
    }
  }, [])

  const forgotPassword = async () => {
    if (!email) {
      setEmailError(I18n.get('requiredField'))
    } else if (!validateEmail(email)) {
      setEmailError(I18n.get('invalidEmail'))
    } else {
      setLoading(true)
      try {
        await Auth.forgotPassword(email)
        setCodeSent(true)
      } catch (error) {
        if (error.code === 'UserNotFoundException') {
          setEmailError(I18n.get('emailNotFound'))
        } else if (error.code === 'LimitExceededException') {
          setEmailError(I18n.get('limitExceeded'))
        } else {
          console.log(error)
        }
      } finally {
        setLoading(false)
      }
    }
  }

  const submitForgotPassword = async () => {
    if (!password || !confirmPassword) {
      setPasswordError(I18n.get('requiredField'))
    } else if (password !== confirmPassword) {
      setPasswordError(I18n.get('passwordsMustMatch'))
    } else if (!validatePassword(password)) {
      setPasswordError(I18n.get('invalidPassword'))
    } else {
      setLoading(true)
      try {
        await Auth.forgotPasswordSubmit(email, code, password)
        setAuthState(AuthFlowSteps.SignIn)
      } catch (error) {
        if (error.code === 'CodeMismatchException') {
          setCodeError(I18n.get('invalidConfirmationCode'))
        } else {
          console.log(error)
        }
      } finally {
        setLoading(false)
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      codeSent ? submitForgotPassword() : forgotPassword()
    }
  }

  return (
    <Grid container direction='column' spacing={4}>
      <Grid item>
        <Typography variant='h2' className={classes.heading} paragraph>
          {I18n.get('forgotPassword')}
        </Typography>
      </Grid>
      <Grid item container alignItems='center'>
        <Typography component='p' display='inline' paragraph>
          {!codeSent ? (
            <>
              <span>{I18n.get('alreadyHaveAnAccount')}</span>
              <Link
                component='button'
                className={classes.inlineButton}
                onClick={() => setAuthState(AuthFlowSteps.SignIn)}
              >
                {I18n.get('signIn')}
              </Link>
            </>
          ) : (
            I18n.get('confirmEmailInstructions')
          )}
        </Typography>
      </Grid>
      <Grid item container spacing={2} justify='center'>
        {!codeSent ? (
          <Grid item xs={12}>
            <TextField
              fullWidth
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
        ) : (
          <>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                className={classes.input}
                id='confirmation-code'
                error={!!codeError}
                helperText={codeError}
                onFocus={() => setCodeError('')}
                label={I18n.get('confirmationCode')}
                value={code}
                variant='outlined'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
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
                id='confirm-password'
                label={I18n.get('confirmPassword')}
                type='password'
                value={confirmPassword}
                variant='outlined'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </Grid>
          </>
        )}
      </Grid>

      <Grid item container spacing={1} justify='space-between'>
        {!codeSent ? (
          <PillButton loading={loading} type='submit' onClick={() => forgotPassword()} className={classes.button}>
            {I18n.get('continue')}
          </PillButton>
        ) : (
          <>
            <Grid item>
              <PillButton
                type='submit'
                loading={loading}
                onClick={() => submitForgotPassword()}
                className={classes.button}
              >
                {I18n.get('submit')}
              </PillButton>
            </Grid>

            <Grid item>
              <PillButton onClick={() => setCodeSent(false)} className={classes.button} solid>
                {I18n.get('back')}
              </PillButton>
            </Grid>
          </>
        )}
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
  inlineButton: {
    color: '#000',
    margin: '0 .5rem',
    fontFamily: 'Verizon-Regular',
    textDecoration: 'underline'
  },
  tooltipList: {
    paddingLeft: '.75rem'
  },
  tooltipIcon: {
    color: theme.palette.grey[500],
    '&:hover': {
      cursor: 'pointer'
    }
  }
}))
