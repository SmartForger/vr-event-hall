import React, { useEffect, useRef, useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Button, List, ListItem, Typography } from '@material-ui/core'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import { ExpandMore, ExpandLess } from '@material-ui/icons'

import { useVideoChatContext } from 'providers'
import { graphQLQuery, graphQLMutation, graphQLSubscription } from 'graphql/helpers'
import { getSessionQuestionsAndPolls } from 'graphql/customQueries'
import { ChatMessages } from 'components/menu/ChatMessages'
import { IPollObject, IQuestionObject, ISubscriptionObject } from 'types'
import { updateSession, updateSessionPoll, updateSessionQuestion } from 'graphql/mutations'
import { DialogCard } from 'components/shared'
import { onCreateSessionPoll, onCreateSessionQuestion } from 'graphql/subscriptions'

export const ToolsPanel = () => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState<string | false>('')
  const [nestedExpanded, setNestedExpanded] = useState<string | false>('')
  const [questions, setQuestions] = useState<IQuestionObject[]>([])
  const [polls, setPolls] = useState<IPollObject[]>([])
  const [dialogType, setDialogType] = useState<string>('')
  const [selectedPoll, setSelectedPoll] = useState<string>('')

  const { videoChatState } = useVideoChatContext()

  let questionSubscription = useRef<ISubscriptionObject | null>(null)
  let pollSubscription = useRef<ISubscriptionObject | null>(null)

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false)
  }

  const handleNestedChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setNestedExpanded(newExpanded ? panel : false)
  }

  const newQuestion = ({ onCreateSessionQuestion }) => {
    setQuestions([...questions, onCreateSessionQuestion])
  }

  const newPoll = ({ onCreateSessionPoll }) => {
    setPolls([...polls, onCreateSessionPoll])
  }

  const getSessionQuestionsAndPollsInfo = async () => {
    const session = await graphQLQuery(getSessionQuestionsAndPolls, 'getSession', {
      id: videoChatState?.session?.id || videoChatState.sessionId
    })
    setQuestions(session.questions.items)
    setPolls(session.polls.items)

    questionSubscription.current = graphQLSubscription(
      onCreateSessionQuestion,
      { sessionId: videoChatState?.session?.id },
      newQuestion
    )
    pollSubscription.current = graphQLSubscription(
      onCreateSessionPoll,
      { sessionId: videoChatState?.session?.id },
      newPoll
    )
  }

  useEffect(() => {
    getSessionQuestionsAndPollsInfo()

    return () => {
      questionSubscription.current?.unsubscribe()
      pollSubscription.current?.unsubscribe()
    }
  }, [])

  const openQA = () => {
    setDialogType(`${videoChatState?.session?.qaActive ? 'close' : 'open'}QA`)
  }

  const toggleQA = async () => {
    await graphQLMutation(updateSession, {
      id: videoChatState?.session?.id || videoChatState.sessionId,
      qaActive: !videoChatState?.session?.qaActive
    })
  }

  const selectPoll = (id: string) => {
    setSelectedPoll(id)
    setDialogType('poll')
  }

  const activatePoll = async () => {
    if (selectedPoll) {
      await graphQLMutation(updateSessionPoll, {
        id: selectedPoll,
        active: 'true'
      })
    }
  }

  const onQAConfirm = async () => {
    await toggleQA()
    onCancel()
  }

  const onPollConfirm = async () => {
    await activatePoll()
    onCancel()
  }

  const onCancel = () => {
    setDialogType('')
  }

  const handleClearQA = async (question: IQuestionObject) => {
    await graphQLMutation(updateSessionQuestion, {
      id: question.id,
      answered: 'true'
    })
    setQuestions(questions.filter(x => x.id !== question.id))
  }

  return (
    <>
      <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
          <Typography className={classes.title} variant='body1'>
            Q&A
          </Typography>
          <Button
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation()
              openQA()
            }}
            variant='outlined'
            className={`${classes.roundedButton} ${classes.qaButton}`}
          >
            {videoChatState?.session?.qaActive ? 'Close' : 'Open'} Q&A
          </Button>
        </AccordionSummary>
        <AccordionDetails className={classes.qaList}>
          <List>
            {questions
              .filter(question => question.answered === 'false')
              .map(question => (
                <ListItem className={classes.questionListItem} key={question.id}>
                  <section className={classes.userInfo}>
                    <Typography variant='subtitle1' className={classes.subtitle}>
                      {question?.user?.firstName} {question?.user?.lastName}
                    </Typography>
                    <Button
                      variant='outlined'
                      className={`${classes.roundedButton} ${classes.clearButton}`}
                      onClick={(e: React.MouseEvent) => {
                        handleClearQA(question)
                      }}
                    >
                      Clear
                    </Button>
                  </section>
                  <Typography className={classes.questionContent}>{question.content}</Typography>
                </ListItem>
              ))}
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls='panel2d-content' id='panel2d-header'>
          <Typography className={classes.title} variant='body1'>
            Polls available
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.nestedAccordion}>
          {polls.map((poll, idx) => (
            <NestedAccordion
              square
              expanded={nestedExpanded === `poll${idx}`}
              onChange={handleNestedChange(`poll${idx}`)}
              key={poll.id}
            >
              <NestedAccordionSummary aria-controls={`poll${idx}d-content`} id={`poll${idx}d-header`}>
                <Typography className={classes.nestedTitle} variant='body1'>
                  {poll.question}
                </Typography>
                <Button
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation()
                    selectPoll(poll?.id || '')
                  }}
                  variant='outlined'
                  className={`${classes.roundedButton} ${classes.pollButton}`}
                >
                  Send
                </Button>
                {nestedExpanded === `poll${idx}` ? <ExpandLess /> : <ExpandMore />}
              </NestedAccordionSummary>
              <NestedAccordionDetails>
                <Typography className={classes.pollContent}>{poll.question}</Typography>
                <Typography className={classes.pollContent}>Answer: {poll[poll.answer]}</Typography>
              </NestedAccordionDetails>
            </NestedAccordion>
          ))}
        </AccordionDetails>
      </Accordion>
      {videoChatState.icId ? (
        <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary aria-controls='panel3d-content' id='panel3d-header'>
            <Typography className={classes.title} variant='body1'>
              Internal chat
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.internalChat}>
            <ChatMessages internal videoChat={true} />
          </AccordionDetails>
        </Accordion>
      ) : null}
      {dialogType ? (
        <DialogCard
          title={dialogInfo[dialogType || ''].title}
          message={dialogInfo[dialogType || ''].message}
          messageLine2={dialogInfo[dialogType || ''].messageLine2}
          onConfirm={dialogType === 'poll' ? onPollConfirm : onQAConfirm}
          onCancel={onCancel}
          className={classes.dialog}
        />
      ) : null}
    </>
  )
}

const dialogInfo = {
  openQA: {
    title: 'Open Q&A',
    message: 'You are about to open question submission for all users in this session.',
    messageLine2: 'Are you sure?'
  },
  closeQA: {
    title: 'Close Q&A',
    message: 'You are about to close question submission for all users in this session.',
    messageLine2: 'Are you sure?'
  },
  poll: {
    title: 'Send Poll',
    message: 'You are about to send a poll to all users in this session',
    messageLine2: 'Are you sure?'
  }
}

const useStyles = makeStyles(() => ({
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '8px',
    width: '100%'
  },
  roundedButton: {
    borderRadius: '16px',
    textTransform: 'none',
    padding: '1px 15px',
    fontWeight: 'bold'
  },
  qaButton: {
    borderColor: 'white',
    color: 'white'
  },
  clearButton: {
    borderColor: 'black',
    color: 'black'
  },
  title: {
    fontWeight: 'bold',
    color: 'white'
  },
  nestedTitle: {
    color: 'black'
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: '1.15rem',
    color: 'black'
  },
  questionContent: {
    color: 'black',
    fontSize: '1rem',
    width: '100%'
  },
  qaList: {
    maxHeight: '250px',
    '& > ul': {
      width: '100%'
    }
  },
  questionListItem: {
    display: 'flex',
    flexDirection: 'column',
    '&:not(:last-child)': {
      borderBottom: '1px solid lightgray'
    }
  },
  nestedAccordion: {
    flexDirection: 'column'
  },
  pollButton: {
    borderColor: 'black',
    color: 'black',
    marginLeft: 'auto',
    marginRight: '8px'
  },
  pollContent: {
    padding: '8px 16px'
  },
  internalChat: {
    height: '500px'
  },
  dialog: {
    position: 'fixed',
    top: 0
  }
}))

const Accordion = withStyles({
  root: {
    backgroundColor: 'black',
    color: 'white',
    borderBottom: '1px solid white',
    boxShadow: 'none',
    '&:last-child': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    },
    '&$expanded': {
      margin: 'auto'
    }
  },
  expanded: {}
})(MuiAccordion)

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56
    },
    '& .MuiAccordionSummary-content': {
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  },
  content: {
    '&$expanded': {
      margin: '12px 0'
    }
  },
  expanded: {}
})(MuiAccordionSummary)

const AccordionDetails = withStyles(theme => ({
  root: {
    padding: 0,
    backgroundColor: 'white',
    overflow: 'scroll'
  }
}))(MuiAccordionDetails)

const NestedAccordion = withStyles({
  root: {
    borderBottom: '1px solid white',
    boxShadow: 'none',
    '&:last-child': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    }
  },
  expanded: {}
})(MuiAccordion)

const NestedAccordionSummary = withStyles({
  root: {
    backgroundColor: 'white',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56
    },
    '& .MuiAccordionSummary-content': {
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  },
  content: {
    '&$expanded': {
      margin: '12px 0'
    }
  },
  expanded: {}
})(MuiAccordionSummary)

const NestedAccordionDetails = withStyles(theme => ({
  root: {
    padding: 0,
    backgroundColor: 'white',
    maxHeight: '250px',
    overflow: 'scroll',
    flexDirection: 'column'
  }
}))(MuiAccordionDetails)
