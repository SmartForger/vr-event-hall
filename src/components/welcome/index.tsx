import React, { FC } from 'react'
import { I18n } from 'aws-amplify'
import { makeStyles, Theme } from '@material-ui/core'
import { PillButton } from 'components/shared'
import { AuthFlowSteps } from 'types'

interface WelcomeProps {
  setAuthState: (state: AuthFlowSteps) => void
}

export const Welcome: FC<WelcomeProps> = ({ setAuthState }) => {
  const classes = useStyles()

  return (
    <section className={classes.root}>
      <div className={classes.container}>
        <div>
          <h1 className={classes.title}>
            Welcome to <br />
            Vx360 by MVRK
          </h1>
          <div className={classes.actions}>
            <PillButton className={classes.pill} onClick={() => setAuthState(AuthFlowSteps.SignUp)}>
              {I18n.get('signUp')}
            </PillButton>
            <PillButton className={classes.pill} onClick={() => setAuthState(AuthFlowSteps.SignIn)}>
              {I18n.get('signIn')}
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'flex-start',
    zIndex: 1
  },
  container: {
    width: '100%',
    paddingLeft: '13%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    zIndex: 1,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '5%'
    }
  },
  logo: {
    marginTop: 50,
    position: 'absolute',
    top: 0,
    [theme.breakpoints.down('xs')]: {
      marginTop: 30
    }
  },
  title: {
    fontSize: '4rem',
    marginTop: 100,
    zIndex: 2,
    color: '#000',
    [theme.breakpoints.down('xs')]: {
      fontSize: '3rem',
      marginTop: 50
    }
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& > button': {
      marginTop: 0
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      '& > button': {
        marginTop: 24
      }
    }
  },
  pill: {
    width: '200px',
    marginRight: '16px',
    padding: '4px',
    height: '50px',
    fontSize: '0.75rem',
    lineHeight: '0.75rem'
  }
}))
