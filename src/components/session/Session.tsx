import React, { FC, useEffect, useState } from 'react'
import { useMeetingManager } from 'amazon-chime-sdk-component-library-react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { makeStyles, Theme, Container, Grid, Typography, Button, Box } from '@material-ui/core'

// Components
import { Video } from 'components/shared'

// Types
import { createChimeMeeting } from 'helpers'
import { ISession } from 'helpers/sessions'
import { GameFlowStepsConfig } from 'helpers/steps'
import { GameFlowSteps } from 'types'
import { useAppState, UserAdminType, useVideoChatContext } from 'providers'

interface SessionProps {
  session: ISession
  setScene: (sceneTo: GameFlowSteps) => void
}

export const Session: FC<SessionProps> = ({ session, setScene }) => {
  const classes = useStyles()
  const meetingManager = useMeetingManager()
  const { videoChatState, dispatch } = useVideoChatContext()
  const {
    appState: { user }
  } = useAppState()
  const [renderSession, setRenderSession] = useState<boolean>(false)
  const assetUrl = 'https://d1oc551tl862q5.cloudfront.net/'

  useEffect(() => {
    const timeoutTime = GameFlowStepsConfig[GameFlowSteps.Session].animation.time

    setTimeout(() => {
      setRenderSession(true)
    }, timeoutTime)
  }, [])

  const joinClassRoom = async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    if (videoChatState.presenters.includes(user?.id as string)) {
      dispatch({ type: 'SET_DETAILS', payload: { adminType: UserAdminType.PRESENTER } })
    } else if (videoChatState.moderators.includes(user?.id as string)) {
      dispatch({ type: 'SET_DETAILS', payload: { adminType: UserAdminType.MODERATOR } })
    }
    const {
      data: { meeting, attendee }
    } = await createChimeMeeting({ meetingId: videoChatState.meetingId, userId: user?.id })

    const joinData = {
      meetingInfo: meeting.Meeting,
      attendeeInfo: attendee.Attendee
    }

    await meetingManager.join(joinData)
    dispatch({ type: 'SET_DETAILS', payload: { visible: true, isClassroom: true } })
  }

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
              <Box display='flex'>
                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={() => {
                    setScene(GameFlowSteps.BackToSessions)
                  }}
                >
                  Back
                </Button>
                <Button onClick={joinClassRoom} variant='outlined'>
                  Join Session
                </Button>
              </Box>
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
