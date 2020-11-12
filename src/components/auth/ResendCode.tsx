import React, { FC, useState, useEffect } from 'react'
import { I18n, Auth } from 'aws-amplify'
import { makeStyles, Theme, Grid, TextField, Typography, Link } from '@material-ui/core'

import { PillButton } from 'components'
import { validateEmail } from 'helpers'
import { AuthFlowSteps } from 'types'

interface ResendCodeProps {
  userEmail: string
  setAuthState: (state: AuthFlowSteps) => void
}

export const ResendCode: FC<ResendCodeProps> = ({ userEmail, setAuthState }) => {
  const classes = useStyles()
  const [email, setEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (userEmail) {
      setEmail(userEmail)
    }
  }, [userEmail])

  const resendCode = async () => {
    if (!email) {
      setEmailError(I18n.get('requiredField'))
    } else if (!validateEmail(email)) {
      setEmailError(I18n.get('invalidEmail'))
    } else {
      setLoading(true)
      try {
        await Auth.resendSignUp(email.toLowerCase())
        setAuthState(AuthFlowSteps.ConfirmSignUp)
      } catch (error) {
        if (error.code === 'UserNotFoundException') {
          setEmailError(I18n.get('emailNotFound'))
        } else if (error.message === 'User is already confirmed.') {
          setEmailError(I18n.get('emailAlreadyRegistered'))
        } else {
          setEmailError(error.message)
        }
      } finally {
        setLoading(false)
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      resendCode()
    }
  }

  return (
    <Grid container direction='column' justify='center' spacing={4}>
      <Grid item>
        <Typography variant='h2' className={classes.heading}>
          {I18n.get('resendCode')}
        </Typography>
      </Grid>
      <Grid item>
        <Link className={classes.inlineButton} component='button' onClick={() => setAuthState(AuthFlowSteps.SignUp)}>
          {I18n.get('signUp')}
        </Link>
        <span> | </span>
        <Link className={classes.inlineButton} component='button' onClick={() => setAuthState(AuthFlowSteps.SignIn)}>
          {I18n.get('signIn')}
        </Link>
      </Grid>
      <Grid item container spacing={4}>
        <Grid item xs={12}>
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
      </Grid>
      <Grid item container spacing={2} justify='space-between'>
        <Grid item>
          <PillButton
            type='submit'
            className={classes.button}
            onClick={() => resendCode()}
            backgroundColor='transparent'
          >
            {I18n.get('submit')}
          </PillButton>
        </Grid>

        <Grid item>
          <PillButton
            loading={loading}
            className={classes.button}
            onClick={() => setAuthState(AuthFlowSteps.ConfirmSignUp)}
            solid
          >
            {I18n.get('back')}
          </PillButton>
        </Grid>
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
    '& fieldset': {
      borderRadius: 0,
      borderColor: '#dadada',
      borderBottomColor: '#000'
    }
  }
}))
