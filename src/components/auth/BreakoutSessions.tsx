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

interface BreakoutSessionsProps {
  userEmail: string
  setAuthState: (state: AuthFlowSteps) => void
}

export const BreakoutSessions: FC<BreakoutSessionsProps> = ({ setAuthState, userEmail }) => {
  const classes = useStyles()
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedBreakout, setSelectedBreakout] = useState<string>('')

  // TODO: come back to this once we know how to register for breakouts
  const reserveBreakout = async () => {
    setLoading(true)
    try {
      // await Auth.reserveBreakoutSessions({
      //   username: email.toLowerCase(),
      //   sessionId: selectedBreakout.id
      // })
      setAuthState(AuthFlowSteps.ThankYou)
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
          {I18n.get('reserverYourBreakoutBlurb')}
        </Typography>
      </Grid>
      <Grid item container spacing={2} justify='center'>
        <Grid item xs={12}>
          <FormControl fullWidth variant='outlined' className={classes.input}>
            <InputLabel id='company-size-input'>{I18n.get('breakoutSession')}</InputLabel>
            <Select
              labelId='breakout-session-id'
              fullWidth
              value={selectedBreakout}
              label={I18n.get('breakoutSession')}
              onChange={(e: React.ChangeEvent<{ value: unknown }>) => setSelectedBreakout(e.target.value as string)}
            >
              {/* {I18n.get('breakouts').map((sessionDetails: IBreakoutSession, index: number) => (
                <MenuItem key={index} value={sessionDetails.id}>{sessionDetails.name}</MenuItem>
              ))} */}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* session details blurb */}
      <Grid item container alignItems='center'>
        {/* {I18n.get('breakouts').map((breakoutDetails: IBreakoutSession) => {
          return (
            <>
              {selectedBreakout === breakoutDetails.id ?
                <>
                  <Typography component='h5' paragraph>
                    {breakoutDetails.presenter}
                  </Typography>
                  <Typography component='p' paragraph>
                    {breakoutDetails.description}
                  </Typography>
                </>
              : null }
            </>
          );
        })} */}
      </Grid>

      <Grid item container xs={12} sm={6}>
        <PillButton loading={loading} type='submit' onClick={() => reserveBreakout()} className={classes.button}>
          {I18n.get('finish')}
        </PillButton>
      </Grid>
      <Grid item container xs={12} sm={6}>
        <PillButton
          loading={loading}
          type='submit'
          onClick={() => setAuthState(AuthFlowSteps.ThankYou)}
          backgroundColor='transparent'
          className={classes.button}
        >
          {I18n.get('skip')}
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
