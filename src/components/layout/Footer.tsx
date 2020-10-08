import React from 'react'
import { makeStyles, Grid, Link, Typography, Theme } from '@material-ui/core'

import { ReactComponent as Logo } from 'assets/verizon-logo-white.svg'

export const Footer = () => {
  const classes = useStyles()
  return (
    <footer className={classes.footer}>
      <Grid container className={classes.container}>
        <Grid item xs={12} sm>
          <Logo />
        </Grid>
        <Grid item xs={12} sm>
          <Typography component='p' className={classes.textLink}>
            &copy; 2020 Verizon
          </Typography>
        </Grid>

        <Grid item xs={12} sm>
          <Link
            className={classes.textLink}
            component='a'
            href='https://www.verizon.com/about/privacy/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Privacy Policy
          </Link>
        </Grid>

        <Grid item xs={12} sm>
          <Link
            className={classes.textLink}
            component='a'
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.verizon.com/about/terms-conditions/overview'
          >
            Terms &amp; Conditions
          </Link>
        </Grid>
      </Grid>
    </footer>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    width: '100%',
    height: '125px',
    position: 'relative',
    backgroundColor: '#000',
    padding: '2rem 4rem',
    [theme.breakpoints.down('sm')]: {
      padding: '2rem'
    },
    [theme.breakpoints.down('xs')]: {
      padding: '1rem 2rem',
      height: 200
    }
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '40%',
    [theme.breakpoints.down('md')]: {
      width: '70%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      alignItems: 'flex-start',
      height: '100%'
    }
  },
  textLink: {
    color: theme.palette.grey[700],
    fontSize: '.75rem'
  },
  displayMobile: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block'
    }
  },
  hideMobile: {
    display: 'block',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  }
}))
