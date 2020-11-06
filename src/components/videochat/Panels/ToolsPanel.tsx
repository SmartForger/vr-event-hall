import React, { useEffect, useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Button, List, ListItem, Typography } from '@material-ui/core'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import { ExpandMore, ExpandLess } from '@material-ui/icons'

import { useVideoChatContext } from 'providers'
import { graphQLQuery } from 'graphql/helpers'
import { getSessionQuestionsAndPolls } from 'graphql/customQueries'
import { ChatMessages } from 'components/menu/ChatMessages'
import { IPollObject, IQuestionObject } from 'types'

export const ToolsPanel = () => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState<string | false>('')
  const [nestedExpanded, setNestedExpanded] = useState<string | false>('')
  const [questions, setQuestions] = useState<IQuestionObject[]>([])
  const [polls, setPolls] = useState<IPollObject[]>([])
  const [qaOpen, setQAOpen] = useState<boolean>(false)

  const { videoChatState } = useVideoChatContext()

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false)
  }

  const handleNestedChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setNestedExpanded(newExpanded ? panel : false)
  }

  const getSessionQuestionsAndPollsInfo = async () => {
    const session = await graphQLQuery(getSessionQuestionsAndPolls, 'getSession', { id: videoChatState.sessionId })
    setQuestions(session.questions.items)
    setPolls(session.polls.items)
  }

  useEffect(() => {
    getSessionQuestionsAndPollsInfo()
  }, [])

  return (
    <>
      <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
          <Typography className={classes.title} variant='body1'>
            Q&A
          </Typography>
          <Button
            onClick={(e: React.MouseEvent) => {
              if (qaOpen || expanded === 'panel1') {
                e.stopPropagation()
              }
              setQAOpen(!qaOpen)
            }}
            variant='outlined'
            className={`${classes.roundedButton} ${classes.qaButton}`}
          >
            {qaOpen ? 'Close' : 'Open'} Q&A
          </Button>
        </AccordionSummary>
        <AccordionDetails className={classes.qaList}>
          <List>
            {questions
              .filter(question => !question.answered)
              .map(question => (
                <ListItem className={classes.questionListItem}>
                  <section className={classes.userInfo}>
                    <Typography variant='subtitle1' className={classes.subtitle}>
                      {question?.user?.firstName} {question?.user?.lastName}
                    </Typography>
                    <Button variant='outlined' className={`${classes.roundedButton} ${classes.clearButton}`}>
                      Clear
                    </Button>
                  </section>
                  <Typography>{question.content}</Typography>
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
            >
              <NestedAccordionSummary aria-controls={`poll${idx}d-content`} id={`poll${idx}d-header`}>
                <Typography className={classes.nestedTitle} variant='body1'>
                  {poll.question}
                </Typography>
                <Button
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation()
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
            <ChatMessages internal />
          </AccordionDetails>
        </Accordion>
      ) : null}
    </>
  )
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
    fontSize: '1.15rem'
  },
  qaList: {
    maxHeight: '250px'
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
  }
}))

const Accordion = withStyles({
  root: {
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
