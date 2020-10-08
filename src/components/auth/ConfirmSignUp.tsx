import React, { FC, useState, useEffect } from 'react'
import { I18n, Auth } from 'aws-amplify'
import { makeStyles, Theme, Grid, TextField, Link, Typography } from '@material-ui/core'

import { PillButton } from 'components'
import { validateEmail } from 'helpers'
import { AuthFlowSteps } from 'types'

interface ConfirmSignUpProps {
  userPd: string
  userEmail: string
  setAuthState: (state: AuthFlowSteps) => void
}

export const ConfirmSignUp: FC<ConfirmSignUpProps> = ({ userEmail, userPd, setAuthState }) => {
  const classes = useStyles()
  const [email, setEmail] = useState<string>()
  const [confirmationCode, setConfirmationCode] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [codeError, setCodeError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    return () => {
      setEmail('')
      setConfirmationCode('')
    }
  }, [])

  useEffect(() => {
    if (userEmail) {
      setEmail(userEmail)
    }
    // eslint-disable-next-line
  }, [userEmail])

  const confirmEmail = async () => {
    if (!email) {
      setEmailError(I18n.get('requiredField'))
    } else if (!validateEmail(email)) {
      setEmailError(I18n.get('invalidEmail'))
    } else {
      setLoading(true)
      try {
        await Auth.confirmSignUp(email.toLowerCase(), confirmationCode)
        await Auth.signIn(email.toLowerCase(), userPd)
        setAuthState(AuthFlowSteps.Register)
      } catch (error) {
        if (error.code === 'CodeMismatchException') {
          setCodeError(I18n.get('invalidConfirmationCode'))
        }
        if (error.code === 'UserNotFoundException') {
          setEmailError(I18n.get('emailNotFound'))
        }
        if (error.code === 'NotAuthorizedException' && error.message.includes('Current status is CONFIRMED')) {
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
      confirmEmail()
    }
  }

  return (
    <Grid container direction='column' justify='center' spacing={2}>
      <Grid item>
        <Typography variant='h2' className={classes.heading}>
          {I18n.get('confirmEmail')}
        </Typography>
      </Grid>
      <Grid item>
        <Typography component='p' display='inline'>
          <span>{I18n.get('confirmEmailInstructions')}</span>
          <Link
            className={classes.inlineButton}
            component='button'
            onClick={() => setAuthState(AuthFlowSteps.ResendCode)}
          >
            {I18n.get('resendCode')}
          </Link>
        </Typography>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={12} sm={6} md={12} lg={6}>
          <TextField
            fullWidth
            error={!!emailError}
            helperText={emailError}
            onFocus={() => setEmailError('')}
            className={classes.input}
            id='email'
            type='email'
            label={I18n.get('email')}
            variant='outlined'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            defaultValue={userEmail}
            onKeyPress={handleKeyPress}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={12} lg={6}>
          <TextField
            fullWidth
            error={!!codeError}
            helperText={codeError}
            onFocus={() => setCodeError('')}
            className={classes.input}
            id='confirmation-code'
            label={I18n.get('confirmationCode')}
            variant='outlined'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmationCode(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </Grid>
      </Grid>
      <Grid item>
        <PillButton
          type='submit'
          loading={loading}
          className={classes.button}
          onClick={() => confirmEmail()}
          backgroundColor='transparent'
        >
          {I18n.get('continue')}
        </PillButton>
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
  inlineButton: {
    color: '#000',
    margin: '0 .5rem',
    fontFamily: 'Verizon-Regular',
    textDecoration: 'underline'
  },
  input: {
    color: '#000',
    borderRadius: 0,
    '& .MuiInputBase-root': {
      backgroundColor: '#fff'
    },
    '& label': {
      color: theme.palette.grey[500]
    },
    '& fieldset': {
      borderRadius: 0,
      borderColor: '#dadada',
      borderBottomColor: '#000'
    }
  }
}))
