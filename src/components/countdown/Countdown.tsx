import React, { FC, useEffect, useState } from 'react'
import { I18n } from 'aws-amplify'
import AccessTimeIcon from '@material-ui/icons/AccessTime'

// Helpers
import { Typography, makeStyles, Theme } from '@material-ui/core'

interface ITimeRemaining {
  days: string
  hours: string
  minutes: string
  seconds: string
}

interface CountdownProps {
  streamStartTime: string
  notifyESS: () => void
  setShowLivestream: (boolean) => void
}

const calcTimeTillTarget = (startDate: string): ITimeRemaining => {
  let dateDiff: number = Number(startDate) - new Date().getTime()
  if (dateDiff <= 0) {
    return {
      days: padTime(0),
      hours: padTime(0),
      minutes: padTime(0),
      seconds: padTime(0)
    }
  }
  let delta = Math.abs(dateDiff) / 1000
  // calculate (and subtract) whole days
  let days = Math.floor(delta / 86400)
  delta -= days * 86400
  // calculate (and subtract) whole hours
  let hours = Math.floor(delta / 3600) % 24
  delta -= hours * 3600
  // calculate (and subtract) whole minutes
  let minutes = Math.floor(delta / 60) % 60
  delta -= minutes * 60
  // what's left is seconds
  let seconds = Math.floor(delta % 60)
  return {
    days: padTime(days),
    hours: padTime(hours),
    minutes: padTime(minutes),
    seconds: padTime(seconds)
  }
}

const padTime = (val: number): string => {
  return ('00' + val).substr(-2, 2)
}

export const Countdown: FC<CountdownProps> = ({ streamStartTime, notifyESS, setShowLivestream }) => {
  const classes = useStyles()
  const initialTimeRemaining = calcTimeTillTarget(streamStartTime)
  const [remainingDays] = useState<string>(initialTimeRemaining.days)
  const [remainingHours, setRemainingHours] = useState<string>(initialTimeRemaining.hours)
  const [remainingMinutes, setRemainingMinutes] = useState<string>(initialTimeRemaining.minutes)
  const [remainingSeconds, setRemainingSeconds] = useState<string>(initialTimeRemaining.seconds)

  useEffect(() => {
    const countdownUpdater = setInterval(() => {
      let rem = calcTimeTillTarget(streamStartTime)

      setRemainingSeconds(rem.days)
      setRemainingHours(rem.hours)
      setRemainingMinutes(rem.minutes)
      setRemainingSeconds(rem.seconds)

      if (new Date(streamStartTime).getTime() - new Date().getTime() <= 0) {
        setShowLivestream(true)
      }
    }, 1000)

    return () => {
      clearInterval(countdownUpdater)
    }
  }, [streamStartTime])

  useEffect(() => {
    // TODO: Change this to reflect the desired
    // minutes before the toast should show
    const minutesTillDisplayEESAlert = 5

    if (
      Number(remainingDays) === 0 &&
      Number(remainingHours) === 0 &&
      Number(remainingMinutes) < minutesTillDisplayEESAlert
    ) {
      // trigger the toast alert
      // for Event Starting Soon
      setShowLivestream(true)
      notifyESS()
    }
  }, [notifyESS, remainingMinutes])

  return (
    <div className={classes.countdown}>
      <AccessTimeIcon fontSize='small' />

      {Number(remainingDays) > 2 ? (
        <>
          {/* Distant Date Remaining Display */}
          <Typography variant='body2' classes={{ root: classes.text }}>
            <span>
              {I18n.get('theEventWillStartOn')} {new Date(streamStartTime).toLocaleDateString()}
            </span>
          </Typography>
        </>
      ) : (
        <>
          {/* Countdown time display */}
          <Typography variant='body2' classes={{ root: classes.text }}>
            <span>{I18n.get('theEventWillBeginIn')}</span>
          </Typography>
          {/* time display */}
          <Typography variant='body2' classes={{ root: classes.timeDisplay }}>
            {remainingDays !== '00' && <span>{remainingDays}:</span>}
            {remainingHours !== '00' && <span>{remainingHours}:</span>}
            <span>{remainingMinutes}:</span>
            <span>{remainingSeconds}</span>
          </Typography>
        </>
      )}
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  countdown: {
    display: 'inline-flex',
    color: 'black',
    marginTop: '-8px',
    marginLeft: '2rem',
    alignItems: 'center',
    width: 305,

    [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
      marginTop: 'unset'
    }
  },
  timeDisplay: {
    margin: '0 0.5rem',
    width: 'auto',
    fontSize: '16px',
    // we need a fixed-width font for this
    // otherwise it will be jumpy
    [theme.breakpoints.down('md')]: {
      fontSize: '14px'
    },
    [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
      marginBottom: 'unset'
    }
  },
  text: {
    marginLeft: '0.5rem',
    fontSize: '16px',
    [theme.breakpoints.down('md')]: {
      fontSize: '14px'
    }
  }
}))
