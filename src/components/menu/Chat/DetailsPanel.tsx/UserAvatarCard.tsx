import React, { FC } from 'react'
import { Avatar, makeStyles, Theme, Typography } from '@material-ui/core'

import { IUser } from 'types'

interface UserAvatarCardProps {
  user: IUser
  onClick?: () => void
}

export const UserAvatarCard: FC<UserAvatarCardProps> = ({ user }) => {
  const classes = useStyles()

  return (
    <div className={classes.user}>
      <Avatar
        alt={`${user.firstName} ${user.lastName}`}
        src={`https://dx2ge6d9z64m9.cloudfront.net/public/${user.avatar}`}
        className={classes.avatar}
      />
      <div className={classes.userInfo}>
        <Typography variant='body1' component='p' align='center'>
          {user.firstName} {user.lastName}
        </Typography>
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
  }
}))
