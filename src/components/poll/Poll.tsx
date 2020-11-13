import React, { FC, useState } from 'react'
import { IUser, IPoll } from 'types'
import { Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import { PillButton } from 'components'
import classnames from 'classnames'
import { graphQLMutation, graphQLQuery } from '../../graphql/helpers'
import { createPollAnswer } from '../../graphql/mutations'
import { v4 as uuid } from 'uuid'
import { answersByPoll } from '../../graphql/queries'

interface IPollProps {
  user?: IUser
  poll: IPoll
}

export const Poll: FC<IPollProps> = ({ user, poll }) => {
  const classes = useStyles()
  const [selectedOption, setSelectedOption] = useState<{ label?: string; results?: number }>()
  const [showThankYou, setShowThankYou] = useState<boolean>(false)
  const [showResults, setShowResults] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const selectOption = option => {
    setSelectedOption(option)
  }

  const submitAnswer = async () => {
    const pollAnswer = {
      id: uuid(),
      pollId: poll?.id,
      userId: user?.id,
      answer: selectedOption?.label
    }

    if (selectedOption) {
      setLoading(true)
      try {
        await graphQLMutation(createPollAnswer, pollAnswer)
      } catch (e) {
        console.error(e)
      }
    }

    try {
      const pollAnswers = await graphQLQuery(answersByPoll, 'answersByPoll', { pollId: pollAnswer.pollId })
      const results: { [key: string]: number } = {}
      pollAnswers.forEach(answerObj => {
        results[answerObj.answer] = typeof results[answerObj.answer] === 'number' ? results[answerObj.answer] + 1 : 1
      })

      poll.options.forEach(option => {
        option.results = results[option.label] > 0 ? Math.round((results[option.label] / pollAnswers.length) * 100) : 0
      })
      setShowResults(true)
      setLoading(false)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Grid container direction='row' className={classnames(classes.poll, { [classes.thankYou]: showThankYou })}>
      <Grid item xs={12}>
        <Typography variant='h6' className={classes.quickpoll}>
          Quick Poll
        </Typography>
      </Grid>
      {!showThankYou && (
        <>
          <Grid item xs={12}>
            {poll && poll.header && (
              <Typography variant='h1' className={classes.heading}>
                {poll.header}
              </Typography>
            )}
          </Grid>
          {poll &&
            poll.options &&
            poll.options.map(option => {
              return (
                <Grid item xs={12} className={classes.optionWrapper}>
                  {showResults && (
                    <Typography
                      component='span'
                      className={classnames(classes.option, {
                        [classes.selected]: selectedOption?.label === option.label
                      })}
                    >
                      {option.results}%
                    </Typography>
                  )}
                  <Typography
                    component='span'
                    className={classnames(classes.option, {
                      [classes.selected]: selectedOption?.label === option.label
                    })}
                    onClick={() => selectOption(option)}
                  >
                    {option.label}
                  </Typography>
                </Grid>
              )
            })}
          {!showResults && (
            <Grid item xs={12}>
              <PillButton
                className={classes.button}
                borderColor='white'
                backgroundColor='transparent'
                onClick={() => submitAnswer()}
              >
                Submit
              </PillButton>
            </Grid>
          )}
          {showResults && poll.qrImg && (
            <Grid item xs={12}>
              <PillButton
                className={classes.button}
                borderColor='white'
                backgroundColor='transparent'
                onClick={() => setShowThankYou(true)}
              >
                Next
              </PillButton>
            </Grid>
          )}
        </>
      )}
      {showThankYou && (
        <>
          <Grid item xs={12}>
            <Typography variant='h1' className={classnames(classes.heading, classes.thankYouHeading)}>
              Thank you for taking our poll.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.qr} component='p'>
              {poll.qrText}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <img className={classes.qr} src={require(`assets/demo/${poll.qrImg}`)} alt='QR Code' />
          </Grid>
        </>
      )}
    </Grid>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  poll: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'white',
    padding: '5rem',
    [theme.breakpoints.down('md')]: {
      padding: '3rem'
    }
  },
  quickpoll: {
    fontSize: '20px',
    lineHeight: '20px',
    fontWeight: 700,
    marginBottom: 22
  },
  thankYou: {
    alignContent: 'start'
  },
  heading: {
    fontWeight: 700,
    paddingRight: '20%',
    fontSize: '34px',
    lineHeight: '34px',
    marginBottom: 45,
    [theme.breakpoints.down('md')]: {
      fontSize: '2rem !important',
      lineHeight: '2rem',
      paddingBottom: '1rem'
    }
  },
  thankYouHeading: {
    paddingTop: '3rem'
  },
  optionWrapper: {
    marginBottom: '1rem'
  },
  option: {
    cursor: 'pointer',
    lineHeight: '1.2',
    paddingRight: '1rem',
    [theme.breakpoints.down('md')]: {
      lineHeight: '2rem'
    }
  },
  selected: {
    fontFamily: 'Verizon-bold'
  },
  button: {
    width: 100,
    fontWeight: 600,
    color: 'white',
    position: 'relative',
    left: '-10px'
  },
  qr: {
    paddingTop: '3rem'
  }
}))
