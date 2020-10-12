import React, { FC, useState, useEffect } from 'react'
import { I18n, Auth } from 'aws-amplify'
import { makeStyles, Theme, Grid, TextField, Link, Typography } from '@material-ui/core'

import { PillButton } from 'components'
import { validateEmail } from 'helpers'
import { graphQLQuery, graphQLMutation } from 'graphql/helpers'
import { userByEmail } from 'graphql/queries'
import { AuthFlowSteps } from 'types'

interface ISurveyQuestion {
  id: string
  name: string
}

interface SurveyProps {
  userEmail: string
  setAuthState: (state: AuthFlowSteps) => void
}

export const Survey: FC<SurveyProps> = ({ userEmail, setAuthState }) => {
  const classes = useStyles()
  const [loading, setLoading] = useState<boolean>(false)
  const [answer1, setAnswer1] = useState<string>('')
  const [answer2, setAnswer2] = useState<string>('')

  const hideSurveyQuestion1: boolean = true

  useEffect(() => {
    return () => {
      setAnswer1('')
      setAnswer2('')
    }
  }, [])

  const getCurrentUser = async () => {
    const foundUser = await graphQLQuery(userByEmail, 'userByEmail', { userEmail })
    if (!foundUser) {
      setAuthState(AuthFlowSteps.Register)
    }
    return foundUser
  }

  const getSurveyQuestions = async () => {
    setLoading(true)
    try {
      const foundQuestions = await graphQLQuery(listSurveyQuestions, 'listSurveyQuestions', {})
      setLoading(false)
      return foundQuestions
    } catch (error) {
      console.log(error)
    }
  }

  const submitSurvey = async () => {
    setLoading(true)
    // try {
    //   const userRes = await getCurrentUser()
    //   const questionsRes = await getSurveyQuestions();
    //   if (questionsRes.length > 0) {
    //     for (const question of questionsRes) {
    //       // if we have an answer for the question in state,
    //       // create the answer on the backend
    //       if ([`answer${question.name}`]) {
    //         await graphQLMutation('createSurveyAnswer', {
    //           userId: userRes.id,
    //           questionId: question.id,
    //           answer: [`answer${question.name}`]
    //         });
    //       }
    //     }
    //   }
    //   setAuthState(AuthFlowSteps.Survey)
    // } catch (error) {
    //   console.log(error)
    // } finally {
    //   setLoading(false)
    // }
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
        <Grid item xs={12} sm={6} md={12} lg={6}>
          <TextField
            fullWidth
            className={classes.input}
            multiline
            id='survey-answer-1'
            label={I18n.get('question1')}
            variant='outlined'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAnswer1(e.target.value)}
            defaultValue={userEmail}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={12} lg={6}>
          <TextField
            fullWidth
            className={classes.input}
            multiline
            id='survey-answer-1'
            label={I18n.get('question2')}
            variant='outlined'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAnswer2(e.target.value)}
          />
        </Grid>
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
