import React, { FC } from 'react'
import { Avatar, Card, CardContent, CardMedia, IconButton, makeStyles, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'

import FeatureImage from 'assets/featureImage'
import { AnchorType, IUser, ToggleDrawer } from 'types'
import { useVideoChatContext } from 'providers'

interface UserInfoCardProps {
  user?: IUser
  toggleDrawer: ToggleDrawer
}

export const UserInfoCard: FC<UserInfoCardProps> = ({ user, toggleDrawer }) => {
  const classes = useStyles()
  const { videoChatState } = useVideoChatContext()

  return (
    <Card className={classes.cardRoot}>
      <CardMedia className={classes.media}>
        <IconButton
          onClick={(e: React.KeyboardEvent | React.MouseEvent) => toggleDrawer(e, 'rightOverlay', false)}
          style={{
            position: 'absolute',
            top: '0',
            right: '0'
          }}
        >
          <Close />
        </IconButton>
        <FeatureImage />
      </CardMedia>
      <CardContent className={classes.content}>
        <div className={classes.avatarContainer}>
          <Avatar
            alt={`${videoChatState.conversationUser?.firstName} ${videoChatState.conversationUser?.lastName}`}
            src={`https://dx2ge6d9z64m9.cloudfront.net/public/${videoChatState.conversationUser?.avatar}`}
            className={classes.avatar}
          />
        </div>
        <Typography variant='h6' component='h3' align='center' className={classes.username}>
          {videoChatState.conversationUser?.firstName} {videoChatState.conversationUser?.lastName}
        </Typography>
        <Typography variant='body2' component='p' align='center'>
          {videoChatState.conversationUser?.title || ''}
        </Typography>
      </CardContent>
    </Card>
  )
}

const useStyles = makeStyles(() => ({
  cardRoot: {
    maxWidth: 350,
    borderRadius: 0
  },
  media: {
    position: 'relative',
    height: 140
  },
  content: {
    backgroundColor: 'white',
    position: 'relative'
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-56px'
  },
  avatar: {
    width: '80px',
    height: '80px',
    fontSize: '2.5rem'
  },
  username: {
    fontWeight: 'bold'
  }
}))
