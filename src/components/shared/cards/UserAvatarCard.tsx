import React, { FC } from 'react'
import { Avatar, Box, IconButton, makeStyles, Theme, Typography } from '@material-ui/core'
import { HighlightOff } from '@material-ui/icons'

import { MuteIcon } from 'assets'
import { IUser } from 'types'
import { useAttendeeAudioStatus } from 'amazon-chime-sdk-component-library-react'

const colors = ['red', 'orange', 'purple', 'green', 'brown', 'grey', 'blue']

interface UserAvatarCardProps {
  user: IUser
  isRaisedHand?: boolean
  onClick?: () => void
  handleMute?: (muted: boolean) => void
  handleDismiss?: () => void
  attendeeId?: string
}

export const UserAvatarCard: FC<UserAvatarCardProps> = ({
  user,
  isRaisedHand = false,
  onClick,
  handleMute,
  handleDismiss,
  attendeeId = ''
}) => {
  const classes = useStyles()
  const { muted } = useAttendeeAudioStatus(attendeeId)

  // we'll include a special marking next to a user's name
  // if they are a duplciate mvrk user with a `+numebr@mvkr.co`
  // email to help avoid confusion
  const plusMvrkUserIndicator = user?.email?.match?.(/\+(.*)@mvrk\.co/i)
  const userValFromName = (user?.firstName?.charCodeAt(0) || 0) + (user?.lastName?.charCodeAt(0) || 0)
  return (
    <div className={`${classes.user} ${onClick ? classes.click : ''}`} {...(onClick ? { onClick } : {})}>
      <Avatar
        alt={`${user.firstName} ${user.lastName}`}
        src={`https://dx2ge6d9z64m9.cloudfront.net/public/${user.avatar}`}
        className={`${classes.avatar} ${colors[userValFromName % colors.length]}`}
      />
      <div className={classes.userInfo}>
        {/* <div className={classes.userActivityCircle} /> */}
        <Typography variant='body1' component='p' align='center'>
          {user.firstName} {user.lastName}{' '}
          {plusMvrkUserIndicator?.[1] ? <span className={classes.secondary}>+{plusMvrkUserIndicator?.[1]}</span> : ''}
        </Typography>
        {isRaisedHand ? (
          <Box flex={1} display='flex' justifyContent='flex-end' alignItems='center'>
            <IconButton
              className={`${classes.muteIcon} ${muted ? classes.redMute : ''}`}
              onClick={() => handleMute && handleMute(muted)}
            >
              <MuteIcon fill={muted ? '#fff' : '#000'} />
            </IconButton>
            <IconButton className={classes.dismissIcon} onClick={handleDismiss}>
              <HighlightOff />
            </IconButton>
          </Box>
        ) : null}
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    width: '36px',
    height: '36px',
    fontSize: '1.5rem',
    marginLeft: '16px',
    marginRight: '16px',

    '&.red': {
      backgroundColor: 'red'
    },
    '&.orange': {
      backgroundColor: 'orange'
    },
    '&.purple': {
      backgroundColor: 'purple'
    },
    '&.green': {
      backgroundColor: 'green'
    },
    '&.brown': {
      backgroundColor: 'brown'
    },
    '&.grey': {
      backgroundColor: 'grey'
    },
    '&.blue': {
      backgroundColor: 'blue'
    }
  },
  user: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    color: 'black',
    marginBottom: '8px',
    width: '100%'
  },
  userInfo: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    '& .MuiTypography-body1': {
      fontWeight: 300
    }
  },
  secondary: {
    fontSize: '10px',
    color: 'grey'
  },
  userActivityCircle: {
    backgroundColor: theme.palette.success.main,
    width: 12,
    height: 12,
    borderRadius: '50%',
    marginRight: '16px'
  },
  muteIcon: {
    padding: 4,
    border: '1px solid black',
    height: 23,
    width: 23
  },
  redMute: {
    backgroundColor: 'red',
    border: '1px solid white'
  },
  dismissIcon: {
    padding: 6
  },
  click: {
    cursor: 'pointer'
  }
}))
