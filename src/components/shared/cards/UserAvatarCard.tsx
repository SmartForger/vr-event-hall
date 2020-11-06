import React, { FC } from 'react'
import { Avatar, Box, IconButton, makeStyles, Theme, Typography } from '@material-ui/core'
import { HighlightOff } from '@material-ui/icons'

import { MuteIcon } from 'assets'
import { IUser } from 'types'

interface UserAvatarCardProps {
  user: IUser
  isRaisedHand?: boolean
  onClick?: () => void
}

export const UserAvatarCard: FC<UserAvatarCardProps> = ({ user, isRaisedHand = false, onClick }) => {
  const classes = useStyles()
  return (
    <div className={`${classes.user} ${onClick ? classes.click : ''}`} {...(onClick ? { onClick } : {})}>
      <Avatar
        alt={`${user.firstName} ${user.lastName}`}
        src={`https://dx2ge6d9z64m9.cloudfront.net/public/${user.avatar}`}
        className={classes.avatar}
      />
      <div className={classes.userInfo}>
        <div className={classes.userActivityCircle} />
        <Typography variant='body1' component='p' align='center'>
          {user.firstName} {user.lastName}
        </Typography>
        {isRaisedHand ? (
          <Box flex={1} display='flex' justifyContent='flex-end' alignItems='center'>
            <IconButton className={classes.muteIcon}>
              <MuteIcon />
            </IconButton>
            <IconButton className={classes.dismissIcon}>
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
    marginRight: '16px'
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
  dismissIcon: {
    padding: 6
  },
  click: {
    cursor: 'pointer'
  }
}))
