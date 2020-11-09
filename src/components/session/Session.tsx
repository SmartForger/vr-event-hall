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
import { GameFlowSteps, IUser } from 'types'
import { useSessionDetails } from 'hooks/useSessionDetails'
import { useAppState, UserAdminType, useVideoChatContext } from 'providers'
import { graphQLQuery, graphQLMutation } from 'graphql/helpers'
import { getAttendeeInfo } from 'graphql/customQueries'
import { updateSession } from 'graphql/mutations'

interface SessionProps {
  session: ISession
  setScene: (sceneTo: GameFlowSteps) => void
}

export const Session: FC<SessionProps> = ({ session, setScene }) => {
  const classes = useStyles()
  const meetingManager = useMeetingManager()
  const { videoChatState, dispatch } = useVideoChatContext()
  const sessionDetails = useSessionDetails(session.id)
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
    if (videoChatState.presenterPins.includes(user?.id as string)) {
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

    meetingManager.getAttendee = async (chimeAttendeeId: string, externalUserId?: string) => {
      if (externalUserId) {
        const user = await graphQLQuery(getAttendeeInfo, 'getUser', { id: externalUserId })

        return {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          avatar: user.avatar,
          title: user.title || '',
          company: user.company || ''
        }
      }
      return { name: '', avatar: '', email: '', title: '', company: '' }
    }

    await meetingManager.join(joinData)

    await graphQLMutation(updateSession, {
      id: sessionDetails.id,
      active: true
    })

    dispatch({
      type: 'SET_DETAILS',
      payload: {
        visible: true,
        isClassroom: true,
        attendeeId: attendee.Attendee.AttendeeId,
        meetingId: meeting.Meeting.MeetingId
      }
    })
  }

  const isSessionAdmin = sessionDetails.admins?.items.some(u => u.userId === user?.id)
  const sessionActive = sessionDetails.active === 'true'

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
                {(isSessionAdmin || sessionActive) && (
                  <Button onClick={joinClassRoom} variant='outlined'>
                    Join Session
                  </Button>
                )}
                <Typography className={classes.availableSeatsMessage}>25 Seats Available</Typography>
                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={() => {
                    setScene(GameFlowSteps.BackToSessions)
                  }}
                >
                  Back
                </Button>
              </Box>
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
    backgroundColor: 'transparent',
    color: '#000',
    '& .MuiGrid-item': {
      padding: '3rem',
      position: 'fixed',
      right: '70px',
      top: '115px'
    },
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      '& .MuiGrid-item': {
        right: '30px',
        top: '65px'
      }
    },
    [`${theme.breakpoints.down('sm')}, screen and (max-height: 740px)`]: {
      top: '55px'
    }
  },
  availableSeatsMessage: {
    fontSize: '14px',
    margin: '10px 30px 0 30px'
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
