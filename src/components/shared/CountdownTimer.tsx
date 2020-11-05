import React, { FC } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Box, CircularProgress, CircularProgressProps, Typography } from '@material-ui/core'

interface CountdownTimerProps extends CircularProgressProps {
  totalTime: number
  timerColor?: string
  labelColor?: string
}

export const CountdownTimer: FC<CountdownTimerProps> = ({
  totalTime,
  timerColor = 'white',
  labelColor = 'white',
  ...props
}) => {
  const classes = useStyles()
  const [timeLeft, setTimeLeft] = React.useState(100)
  const [timeValue, setTimeValue] = React.useState(totalTime)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeValue(prevValue => (prevValue >= 1 ? prevValue - 1 : totalTime))
      setTimeLeft(prevTime => (prevTime >= 100 + (100 / totalTime) * totalTime ? 100 : prevTime + 100 / totalTime))
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className={classes.root}>
      <Box position='relative' display='inline-flex'>
        <CircularProgress variant='static' value={timeLeft} style={{ color: timerColor }} {...props} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position='absolute'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Typography variant='caption' component='div' style={{ color: labelColor }}>
            {timeValue}
          </Typography>
        </Box>
      </Box>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  }
}))
