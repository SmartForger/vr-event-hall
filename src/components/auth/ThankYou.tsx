import React, { FC } from 'react'
import { makeStyles, Theme, Grid, Typography } from '@material-ui/core'

import { PillButton } from 'components'

interface ThankYouProps {}

export const ThankYou: FC<ThankYouProps> = () => {
  const classes = useStyles()

  return (
    <Grid container direction='column' justify='center' spacing={2}>
      <Grid item>
        <Typography variant='h2' className={classes.heading}>
          We look forward to seeing you!
        </Typography>
      </Grid>
      <Grid item>
        <Typography component='p' paragraph>
          Your registration is complete! We look forward to seeing you at the GSMA Thrive on October 27–29, 2020.
        </Typography>

        <Typography component='p' paragraph>
          Please check your email for the registration confirmation and for updates as the event approaches.
        </Typography>
      </Grid>
      <Grid item container spacing={1}>
        <Grid item xs={12} sm={6}>
          <PillButton
            className={classes.button}
            backgroundColor='transparent'
            href='https://www.verizon.com/business/virtual-events/thrive-mobile-technology-event/'
          >
            Event Info
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
    width: 200
  },
  inlineButton: {
    color: '#000',
    margin: '0 .5rem',
    fontFamily: 'Verizon-Regular',
    textDecoration: 'underline'
  }
}))
