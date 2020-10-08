import React from 'react'
import { Toolbar, Grid, makeStyles, AppBar, Theme } from '@material-ui/core'
import { ReactComponent as Logo } from 'assets/verizon-logo.svg'

export const Header = () => {
  const classes = useStyles()
  return (
    <AppBar className={classes.header} position='relative'>
      <Toolbar disableGutters>
        <Grid container>
          <Grid item>
            <Logo />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 90,
    padding: '1rem 4rem',
    boxShadow: 'none',
    [theme.breakpoints.down('sm')]: {
      padding: '1rem'
    }
  }
}))
