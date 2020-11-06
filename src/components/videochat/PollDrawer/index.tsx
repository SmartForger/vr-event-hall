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
import { graphQLQuery, graphQLSubscription } from 'graphql/helpers'
import { getSessionPolls } from 'graphql/customQueries'
import { onUpdateSessionPoll } from 'graphql/subscriptions'
import { ISubscriptionObject, IAskedPollQuestion } from 'types'

interface PollDrawerProps {}

export const PollDrawer: FC<PollDrawerProps> = () => {
  const classes = useStyles()
  const { pollState, dispatch } = usePollContext()
  const { videoChatState } = useVideoChatContext()
  let pollUpdatedSubscription = useRef<ISubscriptionObject | null>(null)

  const updateActivePoll = ({ onUpdateSessionPoll }) => {
    dispatch({ type: 'SET_QUESTION', payload: onUpdateSessionPoll })
  }

  const getInitiallyActiveQuestions = async () => {
    // const pollQs = await graphQLQuery(getSessionPolls, 'getSession')
    videoChatState.session?.polls
    pollQs.some(q => {
      if (q.active === 'true') {
        // set the found active questino as the poll provider's active question
        dispatch({ type: 'SET_QUESTION', payload: q })
        return true
      }
    })
    pollUpdatedSubscription.current = graphQLSubscription(
      onUpdateSessionPoll,
      { id: videoChatState?.sessionId },
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

  return (
    <Drawer
      anchor='bottom'
      open={pollState?.question !== null}
      className={classes.pollDrawer}
      ModalProps={{ hideBackdrop: true }}
      classes={{
        paper: classes.messagePaper
      }}
    >
      <div className={classes.pollHeader}>
        <Typography>{pollState?.question?.question}</Typography>
        <CountdownTimer totalTime={30} />
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
          onClick={() => dispatch({ type: 'SET_QUESTION', payload: null })}
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
