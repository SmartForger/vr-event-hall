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
import { listPollAnswerss } from 'graphql/queries'
import { createPollAnswer, updateSessionPoll } from 'graphql/mutations'
import { onUpdateSessionPoll } from 'graphql/subscriptions'
import { ISubscriptionObject, IAskedPollQuestion, EPollDisplayMode, IPollAnswerResults } from 'types'
import { FreeBreakfastOutlined } from '@material-ui/icons'

interface PollDrawerProps {}

export const PollDrawer: FC<PollDrawerProps> = () => {
  const classes = useStyles()

  const { pollState, dispatch } = usePollContext()
  const { videoChatState } = useVideoChatContext()
  const {
    appState: { user }
  } = useAppState()
  let pollInactifyTimer
  let pollUpdatedSubscription = useRef<ISubscriptionObject | null>(null)

  const updateActivePoll = ({ onUpdateSessionPoll }) => {
    if (onUpdateSessionPoll.active === 'true') {
      dispatch({
        type: 'SET_POLL',
        payload: {
          question: onUpdateSessionPoll,
          open: true
        }
      })
    }
  }

  const getInitiallyActiveQuestions = async () => {
    videoChatState.session?.polls?.items?.some?.(q => {
      if (q.active === 'true') {
        // set the found active questino as the poll provider's active question
        dispatch({ type: 'SET_POLL', payload: { question: q, questionId: q.id, open: true } })

        // this should really happen on the moderator instead of the participant.
        // I cant find the moderator piece, so Im putting it here for now
        // so that polls auto-deactivate since Steve called it out specifically.
        pollInactifyTimer = setTimeout(() => {
          graphQLMutation(updateSessionPoll, { id: q.id, active: 'false' })
        }, 30000)
        return true
      }
    })
    pollUpdatedSubscription.current = graphQLSubscription(
      onUpdateSessionPoll,
      { sessionId: videoChatState?.session?.id },
      updateActivePoll
    )
  }

  const getAllUserAnswers = async () => {
    dispatch({ type: 'SET_POLL', payload: { loading: true } })
    const allResponses = await graphQLQuery(listPollAnswerss, 'listPollAnswerss', {
      pollId: pollState.questionId,
      sessionId: videoChatState?.session?.id
    })
    const results: IPollAnswerResults = {
      total: allResponses.length,
      optionA: 0,
      optionB: 0,
      optionC: 0,
      optionD: 0
    }
    allResponses.forEach(response => {
      results[response.answer]++
    })
    dispatch({ type: 'SET_RESULTS', payload: results })
    dispatch({ type: 'SET_MODE', payload: EPollDisplayMode.results })
    dispatch({ type: 'SET_LOADING', payload: false })
  }

  useEffect(() => {
    getInitiallyActiveQuestions()
    // getAllUserAnswers()

    return () => {
      pollUpdatedSubscription?.current?.unsubscribe()
      clearTimeout(pollInactifyTimer)
      dispatch({ type: 'SET_ANSWER', payload: '' })
    }
  }, [])

  const handlePollResponse = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_ANSWER', payload: event.target.value })
  }

  const closePoll = () => {
    dispatch({
      type: 'SET_POLL',
      payload: {
        question: {},
        open: false
      }
    })
  }

  const outOfTime = () => {
    dispatch({ type: 'SET_MODE', payload: EPollDisplayMode.collecting })
    getAllUserAnswers()
  }

  const submitQuestionAnswer = async () => {
    await graphQLMutation(createPollAnswer, {
      pollId: pollState.question.id,
      userId: user?.id,
      answer: pollState.answerChoice
    })
    dispatch({ type: 'SET_MODE', payload: EPollDisplayMode.wait })
  }

  const pollQuestionDisplay = (
    <>
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
      <Button className={classes.pollSubmit} disabled={!pollState.answerChoice} onClick={() => submitQuestionAnswer()}>
        Submit
      </Button>
    </>
  )

  const buildPollResultDisplay = () => {
    const aPercentage = Math.round(pollState?.results?.optionA || 0 / (pollState?.results?.total || 1))
    const bPercentage = Math.round(pollState?.results?.optionB || 0 / (pollState?.results?.total || 1))
    const cPercentage = Math.round(pollState?.results?.optionC || 0 / (pollState?.results?.total || 1))
    const dPercentage = Math.round(pollState?.results?.optionD || 0 / (pollState?.results?.total || 1))
    return (
      <>
        <Typography variant='subtitle1'>{pollState?.question?.question}</Typography>
        {/* A */}
        <div className={classes.answerResponseRow}>
          <div className={classes.answerResponseBar} style={{ width: `${aPercentage}%` }} />
          <span className={classes.answerResponsePercentage}>{aPercentage}% </span>
          <span className={classes.answerResponseText}>{pollState.question.optionA}</span>
        </div>
        {/* B */}
        <div className={classes.answerResponseRow}>
          <div className={classes.answerResponseBar} style={{ width: `${bPercentage}%` }} />
          <span className={classes.answerResponsePercentage}>{bPercentage}% </span>
          <span className={classes.answerResponseText}>{pollState.question.optionB}</span>
        </div>
        {/* C */}
        <div className={classes.answerResponseRow}>
          <div className={classes.answerResponseBar} style={{ width: `${cPercentage}%` }} />
          <span className={classes.answerResponsePercentage}>{cPercentage}% </span>
          <span className={classes.answerResponseText}>{pollState.question.optionC}</span>
        </div>
        {/* D */}
        <div className={classes.answerResponseRow}>
          <div className={classes.answerResponseBar} style={{ width: `${dPercentage}%` }} />
          <span className={classes.answerResponsePercentage}>{dPercentage}% </span>
          <span className={classes.answerResponseText}>{pollState.question.optionD}</span>
        </div>

        <Button className={classes.closePollWindow} onClick={() => closePoll()}>
          Close
        </Button>
      </>
    )
  }

  return (
    <Drawer
      anchor='bottom'
      open={pollState?.open}
      className={classes.pollDrawer}
      ModalProps={{ hideBackdrop: true }}
      classes={{
        paper: classes.messagePaper
      }}
    >
      <div className={pollState.mode === EPollDisplayMode.results ? classes.resultsPollHeader : classes.pollHeader}>
        <div>
          {pollState.mode === EPollDisplayMode.results && <Typography component='span'>Results: </Typography>}
          <span>
            <Typography component='span'>{pollState?.question?.name}</Typography>
          </span>
        </div>
        {pollState.mode !== EPollDisplayMode.results && (
          <CountdownTimer totalTime={30} onCountdownEnd={() => outOfTime()} />
        )}
      </div>
      <div className={classes.pollContent}>
        {pollState.mode === EPollDisplayMode.question && pollQuestionDisplay}
        {(pollState.mode === EPollDisplayMode.wait || pollState.mode === EPollDisplayMode.collecting) && (
          <div className={classes.waiting}>
            <Typography>Collecting Responses</Typography>
          </div>
        )}
        {pollState.mode === EPollDisplayMode.results && buildPollResultDisplay()}
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
    borderBottom: '2px solid black',
    borderTop: '2px solid black',
    justifyContent: 'space-between',
    padding: '0 16px'
  },
  resultsPollHeader: {
    display: 'flex',
    height: '60px',
    alignItems: 'center',
    background: 'white',
    color: 'black',
    borderBottom: '2px solid black',
    borderTop: '2px solid black',
    justifyContent: 'space-between',
    padding: '0 16px'
  },
  pollContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 24px',
    minHeight: '100px',
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
  },
  waiting: {
    height: '60px'
  },
  closePollWindow: {
    width: '75px',
    borderRadius: '16px',
    border: '2px solid black',
    background: 'white',
    color: 'black',
    textTransform: 'none',
    padding: '2px 8px',
    marginTop: '16px',
    '&:disabled': {
      color: 'black',
      cursor: 'not-allowed'
    },
    '&:hover': {
      background: 'white',
      color: 'black'
    }
  },
  answerResponseRow: {
    minHeight: '36px',
    width: '100%',
    position: 'relative'
  },
  answerResponseBar: {
    left: 0,
    top: 0,
    position: 'absolute',
    height: '90%',
    padding: '4px',
    backgroundColor: '#0088CE',
    opacity: '.33'
  },
  answerResponsePercentage: {
    fontWeight: 700,
    marginTop: '-26px',
    marginLeft: '6px'
  },
  answerResponseText: {
    marginTop: '-26px',
    marginLeft: '20px'
  }
}))
