import React, { FC, useState, useEffect } from 'react'
import { I18n, Auth } from 'aws-amplify'
import {
  makeStyles,
  Theme,
  Grid,
  TextField,
  Link,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core'

import { PillButton, PasswordRequirementsTooltip } from 'components'
import { AuthFlowSteps, IUser, IOption } from 'types'
import { graphQLQuery, graphQLMutation } from 'graphql/helpers'
import { createSessionReservation } from 'graphql/mutations'
import { userByEmail, listSessions } from 'graphql/queries'

interface IBreakoutSession {
  id: string
  name: string
}

interface BreakoutSessionsProps {
  userEmail: string
  setAuthState: (state: AuthFlowSteps) => void
}

export const BreakoutSessions: FC<BreakoutSessionsProps> = ({ setAuthState, userEmail }) => {
  const classes = useStyles()
  const [loading, setLoading] = useState<boolean>(false)
  const [breakoutSessions, setBreakoutSessions] = useState<Map<string, IBreakoutSession>>(new Map())
  const [selectedBreakoutId, setSelectedBreakoutId] = useState<string>('')

  useEffect(() => {
    getBreakoutSessions()
    return () => setSelectedBreakoutId('')
  }, [])

  const getCurrentUser = async () => {
    const foundUser = await graphQLQuery(userByEmail, 'userByEmail', { email: userEmail })
    if (!foundUser) {
      setAuthState(AuthFlowSteps.Register)
    }
    return foundUser
  }

  const getBreakoutSessions = async () => {
    setLoading(true)
    try {
      const foundSessions: IBreakoutSession[] = await graphQLQuery(listSessions, 'listSessions', {})
      const sessionMap = new Map()

      foundSessions.forEach((q: IBreakoutSession) => {
        if (!sessionMap.get(q.name)) {
          sessionMap.set(q.name, q)
        }
      })
      setBreakoutSessions(sessionMap)
      setLoading(false)
      return foundSessions
    } catch (error) {
      console.log(error)
    }
  }

  const reserveBreakout = async () => {
    setLoading(true)
    try {
      const userRes = await getCurrentUser()
      await graphQLMutation(createSessionReservation, {
        userId: userRes.id,
        sessionId: selectedBreakoutId
      })
      setAuthState(AuthFlowSteps.Survey)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Grid container direction='column' justify='center' spacing={2}>
      <Grid item>
        <Typography variant='h2' className={classes.heading} paragraph>
          <span dangerouslySetInnerHTML={{ __html: I18n.get('registerForABreakout') }}></span>
        </Typography>
      </Grid>
      <Grid item container alignItems='center'>
        <Typography component='p' paragraph>
          {I18n.get('reserveYourBreakoutBlurb')}
        </Typography>
      </Grid>
      <Grid item container spacing={2} justify='center'>
        <Grid item xs={12}>
          <FormControl fullWidth variant='outlined' className={classes.input}>
            <InputLabel id='breakout-session-input'>{I18n.get('breakoutSession')}</InputLabel>
            <Select
              labelId='breakout-session-id'
              name='select-breakout-session'
              fullWidth
              value={selectedBreakoutId}
              label={I18n.get('breakoutSession')}
              onChange={(e: React.ChangeEvent<{ value: unknown }>) => setSelectedBreakoutId(e.target.value as string)}
            >
              {Array.from(breakoutSessions).map(([sessionName, session], index: number) => (
                <MenuItem value={session.id} key={`${index}-${sessionName}`}>
                  {I18n.get(`breakoutSessionName-${session.name}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* session details blurb */}
      <Grid item container alignItems='center'>
        {Array.from(breakoutSessions).map(([sessionName, session], index: number) => {
          if (session.id === selectedBreakoutId) {
            // If we've set presenter and description text for the session, show it
            // Note: We are expecting to set these values after the initial deployment.
            // Once the values are added to the en.ts locale file they will display appropriately.
            return (
              <>
                <Grid item xs={12}>
                  {I18n.get(`breakoutSessionPresenter-${sessionName}`, false) ? (
                    <Typography variant='h5' paragraph>
                      {I18n.get(`breakoutSessionPresenter-${sessionName}`)}
                    </Typography>
                  ) : null}
                </Grid>
                <Grid item xs={12}>
                  {I18n.get(`breakoutSessionDescription-${sessionName}`, false) ? (
                    <Typography component='p' paragraph>
                      {I18n.get(`breakoutSessionDescription-${sessionName}`)}
                    </Typography>
                  ) : null}
                </Grid>
              </>
            )
          }
        })}
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <PillButton
            loading={loading}
            type='submit'
            onClick={() => reserveBreakout()}
            solid
            className={classes.button}
          >
            {I18n.get('finish')}
          </PillButton>
        </Grid>
        <Grid item xs={12} sm={6}>
          <PillButton
            loading={loading}
            type='submit'
            onClick={() => setAuthState(AuthFlowSteps.Survey)}
            backgroundColor='transparent'
            className={classes.button}
          >
            {I18n.get('skip')}
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
  },
  inlineButton: {
    color: '#000',
    margin: '0 .5rem',
    fontFamily: 'Verizon-Regular',
    textDecoration: 'underline'
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
  }
}))
