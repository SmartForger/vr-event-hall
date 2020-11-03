import React, { FC, useState, useEffect } from 'react'
import { I18n } from 'aws-amplify'
import { makeStyles, Theme, Grid, TextField, Typography } from '@material-ui/core'

import { PillButton } from 'components'
import { graphQLQuery, graphQLMutation } from 'graphql/helpers'
import { userByEmail, listSurveyQuestions } from 'graphql/queries'
import { createSurveyAnswer } from 'graphql/mutations'
import { AuthFlowSteps } from 'types'

interface ISurveyQuestion {
  id: string
  name: string
  userAnswer?: string
}

interface SurveyProps {
  userEmail: string
  setAuthState: (state: AuthFlowSteps) => void
}

export const Survey: FC<SurveyProps> = ({ userEmail, setAuthState }) => {
  const classes = useStyles()
  const [loading, setLoading] = useState<boolean>(false)
  const [surveyQuestions, setSurveyQuestions] = useState<Map<string, ISurveyQuestion>>(new Map())

  useEffect(() => {
    getSurveyQuestions()

    return () => {
      setSurveyQuestions(new Map())
    }
  }, [])

  const getCurrentUser = async () => {
    const foundUser = await graphQLQuery(userByEmail, 'userByEmail', { email: userEmail })
    if (!foundUser) {
      setAuthState(AuthFlowSteps.Register)
    }
    return foundUser
  }

  const getSurveyQuestions = async () => {
    setLoading(true)
    try {
      const foundQuestions: ISurveyQuestion[] = await graphQLQuery(listSurveyQuestions, 'listSurveyQuestions', {})
      const questionMap = new Map()

      foundQuestions.forEach((q: ISurveyQuestion) => {
        if (!questionMap.get(q.name)) {
          questionMap.set(q.name, q)
        }
      })
      setSurveyQuestions(questionMap)
      setLoading(false)
      return foundQuestions
    } catch (error) {
      console.log(error)
    }
  }

  const submitSurvey = async () => {
    setLoading(true)
    try {
      const userRes = await getCurrentUser()
      if (surveyQuestions.size > 0) {
        // eslint-disable-next-line
        for (let [_, question] of Array.from(surveyQuestions)) {
          // if we have an answer for the question in state,
          // create the answer on the backend
          if (question.userAnswer) {
            await graphQLMutation(createSurveyAnswer, {
              userId: userRes.id,
              questionId: question.id,
              answer: question.userAnswer
            })
          }
        }
      }
      setAuthState(AuthFlowSteps.ThankYou)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const answerSurveyQuestion = (question: ISurveyQuestion, answer: string): void => {
    question.userAnswer = answer
    surveyQuestions.set(question.name, question)
    setSurveyQuestions(surveyQuestions)
  }

  return (
    <Grid container direction='column' justify='center' spacing={2}>
      <Grid item>
        <Typography variant='h2' className={classes.heading}>
          {I18n.get('surveyTitle')}
        </Typography>
      </Grid>
      <Grid item>
        <Typography component='p' display='inline'>
          {I18n.get('surveyInstructions')}
        </Typography>
      </Grid>
      <Grid item container spacing={2}>
        {Array.from(surveyQuestions).map(([qName, question], index: number) => (
          <>
            {qName !== 'keynoteSpeaker' && qName !== 'industrySpecificQuestion' ? (
              <Grid item xs={12} key={index}>
                <Typography component='p' paragraph>
                  {I18n.get(`question-${qName}`)}
                </Typography>
                <TextField
                  fullWidth
                  className={classes.input}
                  multiline
                  id={`survey-answer-${qName}`}
                  variant='outlined'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => answerSurveyQuestion(question, e.target.value)}
                />
              </Grid>
            ) : null}
          </>
        ))}
      </Grid>
      <Grid item>
        <PillButton
          type='submit'
          loading={loading}
          className={classes.button}
          onClick={() => submitSurvey()}
          backgroundColor='transparent'
        >
          {I18n.get('continue')}
        </PillButton>
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    width: 165
  },
  heading: {
    fontWeight: 700,
    fontSize: '3.125rem',
    lineHeight: '3.125rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '3rem',
      lineHeight: '3rem'
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '2rem'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '2rem',
      lineHeight: '2rem'
    }
  },
  inlineButton: {
    color: '#000',
    margin: '0 .5rem',
    fontFamily: 'Verizon-Regular',
    textDecoration: 'underline'
  },
  input: {
    color: '#000',
    borderRadius: 0,
    '& .MuiInputBase-root': {
      backgroundColor: '#fff'
    },
    '& label': {
      color: theme.palette.grey[500]
    },
    '& fieldset': {
      borderRadius: 0,
      borderColor: '#dadada',
      borderBottomColor: '#000'
    }
  }
}))
