import React, { FC, useEffect, useState } from 'react'

// Components
import { Video } from 'components/shared'

// Styles
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { makeStyles, Theme, Container, Grid, Typography, Button } from '@material-ui/core'

// Types
import { ISession } from 'helpers/sessions'
import { GameFlowStepsConfig } from '../../helpers/steps'
import { GameFlowSteps } from '../../types'

interface SessionProps {
  session: ISession
  setScene: (sceneTo: GameFlowSteps) => void
}

export const Session: FC<SessionProps> = ({ session, setScene }) => {
  const classes = useStyles()
  const [renderSession, setRenderSession] = useState<boolean>(false)
  const assetUrl = 'https://d1oc551tl862q5.cloudfront.net/'

  useEffect(() => {
    const timeoutTime = GameFlowStepsConfig[GameFlowSteps.Session].animation.time

    setTimeout(() => {
      setRenderSession(true)
    }, timeoutTime)
  }, [])

  return (
    <>
      {renderSession && (
        <Container className={`${classes.root} ${classes.transition}`} component='main' maxWidth={false}>
          <Grid container justify={'space-between'} spacing={2}>
            <Grid container item direction='column' alignItems='flex-start' justify='center' xs={5}>
              <Typography className={classes.marginBottom} component='h5' variant='h5' color='textPrimary' gutterBottom>
                Session
              </Typography>
              <Typography className={classes.marginBottom} component='h1' variant='h2' color='textPrimary' gutterBottom>
                {session.side.header}
              </Typography>
              <Typography component='h6' variant='h5' color='textPrimary' gutterBottom>
                {session.side.schedule}
              </Typography>
              {session.side.speakers &&
                session.side.speakers.map(speaker => {
                  return (
                    <Typography className={classes.marginBottom} component='p' color='textPrimary'>
                      {speaker}
                    </Typography>
                  )
                })}
              <Typography component='p' variant='body2' color='textPrimary' gutterBottom>
                {session.side.body}
              </Typography>
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => {
                  setScene(GameFlowSteps.BackToSessions)
                }}
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={7} className={classes.contentContainer}>
              {session.video && <Video posterSrc={session.image || ''} videoSrc={`${assetUrl}${session.video}`} />}
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '0 3rem',
    height: 'calc(100% - 115px)',
    width: 'calc(100% - 64px)',
    top: '115px',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'transparent',
    color: '#000',
    '& .MuiGrid-item': {
      padding: '3rem'
    },
    [theme.breakpoints.down('sm')]: {
      height: 'auto'
    },
    [`${theme.breakpoints.down('sm')}, screen and (max-height: 740px)`]: {
      top: '55px'
    }
  },
  preEventVidPlaceholderImg: {
    width: '100%'
  },
  contentContainer: {
    margin: 'auto'
  },
  marginBottom: {
    marginBottom: 17
  },
  transition: {
    opacity: 1,
    animationName: '$fadeInOpacity',
    animationIterationCount: 1,
    animationTimingFunction: 'ease-in',
    animationDuration: '0.75s'
  },
  '@keyframes fadeInOpacity': {
    '0%': {
      opacity: 0
    },
    '100%': {
      opacity: 1
    }
  }
}))
