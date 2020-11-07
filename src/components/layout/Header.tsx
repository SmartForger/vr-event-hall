import React, { FC } from 'react'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { menuDrawerOpen, toggleDrawer } from 'redux/menu'

// Styles
import MenuIcon from '@material-ui/icons/Menu'
import { Theme, Toolbar, IconButton, makeStyles, AppBar, Grid } from '@material-ui/core'

// Images
import { ReactComponent as Logo } from 'assets/verizon-logo.svg'

interface HeaderProps {}

export const Header: FC<HeaderProps> = ({ children }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  // Selectors
  const drawerOpen = useSelector(menuDrawerOpen)

  const handleToggleDrawer = () => dispatch(toggleDrawer(!drawerOpen))

  return (
    <AppBar className={classes.root} position='relative'>
      <Toolbar disableGutters className={classes.toolbar}>
        <Grid container justify='space-between'>
          <Grid item>
            <Logo className={classes.logo} />
          </Grid>
          {children}
        </Grid>
        <IconButton className={classes.button} color='default' aria-label='menu' onClick={handleToggleDrawer}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'absolute',
    top: '30px',
    left: '0',
    width: '100%',
    backgroundColor: 'transparent',
    padding: '1rem 4rem',
    boxShadow: 'unset',
    'z-index': '1200',
    minHeight: '74px',

    opacity: 1,
    animationName: '$fadeInOpacity',
    animationIterationCount: 1,
    animationTimingFunction: 'ease-in',
    animationDuration: '0.75s',

    [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
      top: 0,
      'z-index': '1300'
    }
  },
  '@keyframes fadeInOpacity': {
    '0%': {
      opacity: 0
    },
    '100%': {
      opacity: 1
    }
  },
  toolbar: {
    flexGrow: 1,
    justifyContent: 'space-between',
    minHeight: 'unset',

    [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
      minHeight: 'unset'
    }
  },
  logo: {
    position: 'relative',
    width: '150px',

    [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
      width: '102px',
      height: '26px'
    }
  },
  button: {
    display: 'none',
    padding: '9px',

    [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
      display: 'block'
    }
  }
}))
