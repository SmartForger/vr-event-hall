import React, { FC, useEffect, useState } from 'react'

// Components
import { ContactForm } from 'components/shared'

// Styles
import { makeStyles, Theme, Container, Box, Typography } from '@material-ui/core'

// Helpers
import { GameFlowStepsConfig } from '../../helpers/steps'

// Types
import { GameFlowSteps, IUser } from '../../types'

interface ConnectProps {
  transition: boolean
  user?: IUser
  setErrorMessage: (message: string | null) => void
  setSuccessMessage: (message: string | null) => void
}

export const Connect: FC<ConnectProps> = ({ transition, user, setSuccessMessage, setErrorMessage }) => {
  const classes = useStyles()
  const [loading, setLoading] = useState<boolean>(transition)

  useEffect(() => {
    if (transition) {
      setTimeout(() => {
        setLoading(false)
      }, GameFlowStepsConfig[GameFlowSteps.Connect].animation.time)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {!loading && (
        <Container className={classes.root} component='main' maxWidth={false}>
          <Box className={classes.box}>
            <Typography className={classes.title} component='h1' variant='h1' color='textPrimary' gutterBottom>
              Contact us.
            </Typography>
            <Typography component='p' variant='body2' color='textPrimary' gutterBottom>
              The fourth industrial revolution is here, ready to transform industry and open doors to new opportunities.
              But this transformation requires an advanced kind of network—one that’s ready to help your business
              innovate. Have questions? Let us help.
            </Typography>
            <ContactForm
              isHelpRequest={false}
              setSuccessMessage={setSuccessMessage}
              setErrorMessage={setErrorMessage}
              messageHelper='Let us know how we can help.'
              user={user}
            />
          </Box>
        </Container>
      )}
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 'calc(100vh - 105px)', // Viewport height minus header and footer
    width: 'calc(50% - 32px)',
    padding: '0 12.5%',
    top: '105px',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'transparent',

    opacity: 1,
    animationName: '$fadeInOpacity',
    animationIterationCount: 1,
    animationTimingFunction: 'ease-in',
    animationDuration: '0.75s',

    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      paddingBottom: '120px'
    },

    [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
      flexDirection: 'row',
      overflowY: 'auto',
      height: '100%',
      textAlign: 'left',
      justifyContent: 'flex-start'
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
  box: {
    maxWidth: '473px'
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '44px'
    }
  }
}))
