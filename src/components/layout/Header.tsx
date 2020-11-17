import React, { FC } from 'react'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { menuDrawerOpen, toggleDrawer } from 'redux/menu'

// Styles
import { MenuIcon } from './MenuIcon'
import { Theme, Toolbar, IconButton, makeStyles, AppBar, Grid } from '@material-ui/core'

// Images
import { ReactComponent as Logo } from 'assets/verizon-logo.svg'

interface HeaderProps {
  preventFade?: boolean
}

export const Header: FC<HeaderProps> = ({ children, preventFade }) => {
  const dispatch = useDispatch()
  const classes = useStyles(!!preventFade)

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
        <div className={classes.button} onClick={handleToggleDrawer}>
          <MenuIcon opened={drawerOpen} />
        </div>
      </Toolbar>
    </AppBar>
  )
}

const fadeInAnimationConfig = {
  animationName: '$fadeInOpacity',
  animationIterationCount: 1,
  animationTimingFunction: 'ease-in',
  animationDuration: '0.75s'
}
const useStyles = makeStyles((theme: Theme) => ({
  root: (preventFade: boolean) => ({
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
    ...(preventFade ? {} : fadeInAnimationConfig),

    [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
      backgroundColor: theme.palette.common.white,
      boxShadow: 'inset 0 -1px 0 #D8DADA',
      minHeight: 52,
      padding: '0 25px 0 30px',
      top: 0,
      zIndex: 1300
    }
  }),
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

    [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
      display: 'block'
    }
  }
}))
