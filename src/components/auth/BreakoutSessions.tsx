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
import { AuthFlowSteps, IUser, IOption, IBreakoutSession } from 'types'
import { graphQLQuery, graphQLMutation } from 'graphql/helpers'
import { userByEmail, listSessions } from 'graphql/queries'

interface ISession {
  id: String
  name: String
}

interface BreakoutSessionsProps {
  userEmail: string
  setAuthState: (state: AuthFlowSteps) => void
}

export const BreakoutSessions: FC<BreakoutSessionsProps> = ({ setAuthState, userEmail }) => {
  const classes = useStyles()
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedBreakout, setSelectedBreakout] = useState<string>('')

  const getCurrentUser = async () => {
    const foundUser = await graphQLQuery(userByEmail, 'userByEmail', { userEmail })
    if (!foundUser) {
      setAuthState(AuthFlowSteps.Register)
    }
    return foundUser
  }

  const getBreakoutSessions = async () => {
    setLoading(true)
    try {
      const foundSessions = await graphQLQuery(listSessions, 'listSessions', {})
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
      const sessionsRes = await getBreakoutSessions()
      const sessionsToReserve: ISession[] = sessionsRes.filter((session: ISession) => {
        if (selectedBreakout === session.name) {
          return true
        }
      })
      if (sessionsToReserve.length > 0) {
        await graphQLMutation('createSessionReserv', {
          userId: userRes.id,
          sessionId: sessionsToReserve[0].id
        })
      }

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
              fullWidth
              value={selectedBreakout}
              label={I18n.get('breakoutSession')}
              onChange={(e: React.ChangeEvent<{ value: unknown }>) => setSelectedBreakout(e.target.value as string)}
            >
              <MenuItem value={I18n.get('breakoutSession1Id')}>{I18n.get('breakoutSession1Name')}</MenuItem>
              <MenuItem value={I18n.get('breakoutSession2Id')}>{I18n.get('breakoutSession2Name')}</MenuItem>
              <MenuItem value={I18n.get('breakoutSession3Id')}>{I18n.get('breakoutSession3Name')}</MenuItem>
              <MenuItem value={I18n.get('breakoutSession4Id')}>{I18n.get('breakoutSession4Name')}</MenuItem>
              <MenuItem value={I18n.get('breakoutSession5Id')}>{I18n.get('breakoutSession5Name')}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* session details blurb */}
      <Grid item container alignItems='center'>
        {selectedBreakout === I18n.get('breakoutSession1Id') ? (
          <>
            <Grid item xs={12}>
              {I18n.get('breakoutSession1Presenter') ? (
                <Typography variant='h5' paragraph>
                  {I18n.get('breakoutSession1Presenter')}
                </Typography>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              {I18n.get('breakoutSession1Description') ? (
                <Typography component='p' paragraph>
                  {I18n.get('breakoutSession1Description')}
                </Typography>
              ) : null}
            </Grid>
          </>
        ) : null}
        {selectedBreakout === I18n.get('breakoutSession2Id') ? (
          <>
            <Grid item xs={12}>
              {I18n.get('breakoutSession2Presenter') ? (
                <Typography variant='h5' paragraph>
                  {I18n.get('breakoutSession2Presenter')}
                </Typography>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              {I18n.get('breakoutSession2Description') ? (
                <Typography component='p' paragraph>
                  {I18n.get('breakoutSession2Description')}
                </Typography>
              ) : null}
            </Grid>
          </>
        ) : null}
        {selectedBreakout === I18n.get('breakoutSession3Id') ? (
          <>
            <Grid item xs={12}>
              {I18n.get('breakoutSession3Presenter') ? (
                <Typography variant='h5' paragraph>
                  {I18n.get('breakoutSession3Presenter')}
                </Typography>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              {I18n.get('breakoutSession3Description') ? (
                <Typography component='p' paragraph>
                  {I18n.get('breakoutSession3Description')}
                </Typography>
              ) : null}
            </Grid>
          </>
        ) : null}
        {selectedBreakout === I18n.get('breakoutSession4Id') ? (
          <>
            <Grid item xs={12}>
              {I18n.get('breakoutSession4Presenter') ? (
                <Typography variant='h5' paragraph>
                  {I18n.get('breakoutSession4Presenter')}
                </Typography>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              {I18n.get('breakoutSession4Description') ? (
                <Typography component='p' paragraph>
                  {I18n.get('breakoutSession4Description')}
                </Typography>
              ) : null}
            </Grid>
          </>
        ) : null}
        {selectedBreakout === I18n.get('breakoutSession5Id') ? (
          <>
            <Grid item xs={12}>
              {I18n.get('breakoutSession5Presenter') ? (
                <Typography variant='h5' paragraph>
                  {I18n.get('breakoutSession5Presenter')}
                </Typography>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              {I18n.get('breakoutSession5Description') ? (
                <Typography component='p' paragraph>
                  {I18n.get('breakoutSession5Description')}
                </Typography>
              ) : null}
            </Grid>
          </>
        ) : null}
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
