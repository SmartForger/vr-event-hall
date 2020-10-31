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

interface HaveAQuestionProps {
  userEmail: string
  setAuthState: (state: AuthFlowSteps) => void
}

export const HaveAQuestion: FC<HaveAQuestionProps> = ({ userEmail, setAuthState }) => {
  const classes = useStyles()
  const [loading, setLoading] = useState<boolean>(false)
  const [question, setQuestion] = useState<ISurveyQuestion>({
    id: '',
    name: '',
    userAnswer: ''
  })

  useEffect(() => {
    getSurveyQuestion()
  }, [])

  const getCurrentUser = async () => {
    const foundUser = await graphQLQuery(userByEmail, 'userByEmail', { email: userEmail })
    if (!foundUser) {
      setAuthState(AuthFlowSteps.Register)
    }
    return foundUser
  }

  const getSurveyQuestion = async () => {
    setLoading(true)
    try {
      const foundQuestions: ISurveyQuestion[] = await graphQLQuery(listSurveyQuestions, 'listSurveyQuestions', {})
      const q = foundQuestions.find(question => question.name === 'industrySpecificQuestion')
      q && setQuestion(q)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const submitSurvey = async () => {
    setLoading(true)
    try {
      const userRes = await getCurrentUser()
      if (question) {
        await graphQLMutation(createSurveyAnswer, {
          userId: userRes.id,
          questionId: question.id,
          answer: question.userAnswer
        })
      }
      setAuthState(AuthFlowSteps.Survey)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Grid container direction='column' justify='center' spacing={2}>
      <Grid item>
        <Typography variant='h2' className={classes.heading}>
          Have a question?
        </Typography>
      </Grid>
      <Grid item>
        <Typography component='p' display='inline'>
          If you have an industry-specific 5G question you would like addressed during the breakout, let us know here!
        </Typography>
      </Grid>
      <Grid item container spacing={2}>
        <TextField
          id='have-a-question'
          fullWidth
          multiline
          rows={4}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuestion({ ...question, userAnswer: e.target.value })
          }
          variant='outlined'
          inputProps={{
            placeholder: 'Enter question'
          }}
        />
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
