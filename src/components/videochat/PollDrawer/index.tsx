/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import {
  useContentShareState,
  UserActivityProvider,
  useRemoteVideoTileState,
  ContentShare,
  useRosterState,
  VideoTileGrid,
  VideoGrid,
  VideoTile,
  useLocalVideo,
  LocalVideo
} from 'amazon-chime-sdk-component-library-react'

import { Button, Drawer, makeStyles, Tab, Tabs, Toolbar, Typography } from '@material-ui/core'
import { Modal } from '@mvrk-hq/vx360-components'

// import { StyledLayout, StyledContent } from './Styled'

import { RadioButtons, CountdownTimer } from 'components'

import { useAppState, usePollContext, useVideoChatContext } from 'providers'
import { graphQLQuery, graphQLSubscription, graphQLMutation } from 'graphql/helpers'
import { getSessionPolls } from 'graphql/customQueries'
import { createPollAnswer } from 'graphql/mutations'
import { onUpdateSessionPoll } from 'graphql/subscriptions'
import { ISubscriptionObject, IAskedPollQuestion } from 'types'

interface PollDrawerProps {}

export const PollDrawer: FC<PollDrawerProps> = () => {
  const classes = useStyles()
  const { pollState, dispatch } = usePollContext()
  const { videoChatState } = useVideoChatContext()
  const {
    appState: { user }
  } = useAppState()
  let pollUpdatedSubscription = useRef<ISubscriptionObject | null>(null)

  const updateActivePoll = ({ onUpdateSessionPoll }) => {
    if (onUpdateSessionPoll.active === 'true') {
      console.log(onUpdateSessionPoll)

      dispatch({
        type: 'SET_QUESTION',
        payload: {
          question: onUpdateSessionPoll,
          pollOpen: true
        }
      })
    }
  }

  const getInitiallyActiveQuestions = async () => {
    videoChatState.session?.polls?.items?.some?.(q => {
      if (q.active === 'true') {
        // set the found active questino as the poll provider's active question
        dispatch({ type: 'SET_QUESTION', payload: { question: q, pollOpen: true } })
        return true
      }
    })
    pollUpdatedSubscription.current = graphQLSubscription(
      onUpdateSessionPoll,
      { sessionId: videoChatState?.session?.id },
      updateActivePoll
    )
  }

  useEffect(() => {
    getInitiallyActiveQuestions()

    return () => {
      pollUpdatedSubscription?.current?.unsubscribe()
      dispatch({ type: 'SET_ANSWER', payload: '' })
    }
  }, [])

  const handlePollResponse = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_ANSWER', payload: event.target.value })
  }

  const closePoll = () => {
    dispatch({
      type: 'SET_QUESTION',
      payload: {
        question: {},
        pollOpen: false
      }
    })
  }

  const submitQuestionAnswer = async () => {
    await graphQLMutation(createPollAnswer, {
      pollId: pollState.question.id,
      userId: user?.id,
      answer: pollState.answerChoice
    })
    closePoll()
  }

  return (
    <Drawer
      anchor='bottom'
      open={pollState?.pollOpen}
      className={classes.pollDrawer}
      ModalProps={{ hideBackdrop: true }}
      classes={{
        paper: classes.messagePaper
      }}
    >
      <div className={classes.pollHeader}>
        <Typography>{pollState?.question?.question}</Typography>
        <CountdownTimer totalTime={30} onCountdownEnd={() => closePoll()} />
      </div>
      <div className={classes.pollContent}>
        <Typography variant='subtitle1'>{pollState?.question?.question}</Typography>
        <RadioButtons
          value={pollState.answerChoice}
          handleChange={handlePollResponse}
          options={{
            optionA: pollState?.question?.optionA,
            optionB: pollState?.question?.optionB,
            optionC: pollState?.question?.optionC,
            optionD: pollState?.question?.optionD
          }}
        />
        <Button
          className={classes.pollSubmit}
          disabled={!pollState.answerChoice}
          onClick={() => submitQuestionAnswer()}
        >
          Submit
        </Button>
      </div>
    </Drawer>
  )
}

const useStyles = makeStyles(() => ({
  messagePaper: {
    '&.MuiPaper-root': {
      backgroundColor: 'white !important'
    }
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'white',
    minHeight: '60px',
    maxHeight: '60px'
  },
  displayMenu: {
    width: '350px',
    color: 'white',
    height: 'calc(100% - 60px)',
    display: 'flex',
    flexDirection: 'column'
  },
  toolbar: {
    paddingRight: 0,
    paddingLeft: 0,
    alignItems: 'flex-start',
    minHeight: '50px',
    borderBottom: '1px solid #D8DADA'
  },
  black: {
    background: 'black'
  },
  pollDrawer: {
    '&.MuiDrawer-root': {
      left: 'calc(100% - 350px) !important'
    },
    '& .MuiDrawer-paperAnchorBottom': {
      width: 350,
      left: 'calc(100% - 350px)'
    }
  },
  pollHeader: {
    display: 'flex',
    height: '60px',
    alignItems: 'center',
    background: 'black',
    color: 'white',
    justifyContent: 'space-between',
    padding: '0 16px'
  },
  pollContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 24px',
    minHeight: '300px',
    '& h6': {
      marginBottom: '16px'
    }
  },
  pollSubmit: {
    width: '75px',
    borderRadius: '16px',
    background: 'black',
    color: 'white',
    textTransform: 'none',
    padding: '2px 8px',
    marginTop: '16px',
    '&:disabled': {
      color: 'white',
      cursor: 'not-allowed'
    },
    '&:hover': {
      background: 'black',
      color: 'white'
    }
  }
}))
