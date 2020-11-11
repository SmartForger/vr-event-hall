import React, { FC } from 'react'
import classnames from 'classnames'

import {
  StyledDirectMessage,
  StyledDirectMessageItem,
  StyledLeftContent,
  StyledUserStatus,
  StyledUserName,
  StyledNotificationIcon
} from './Styled'

import { IConvoLink } from 'types'
import { IconButton, makeStyles } from '@material-ui/core'
import { MoreHoriz } from '@material-ui/icons'
import { useAppState } from 'providers'
import { AttentionDot } from '../AttentionDot'

interface IChatDirectMessage {
  data: IConvoLink
  openConversation: (id: string) => void
  isUnread?: boolean
}

export const DirectMessage: FC<IChatDirectMessage> = ({ data, openConversation, isUnread }) => {
  const classes = useStyles()

  const {
    appState: { user }
  } = useAppState()
  const { conversationId, conversation } = data
  const messageUser = conversation.associated.items.filter(a => a.userId !== user?.id)[0]

  return (
    <StyledDirectMessage onClick={() => openConversation(conversationId)}>
      <StyledDirectMessageItem>
        <StyledLeftContent>
          <StyledUserStatus
            className={classnames({
              online: messageUser.user.online === true,
              offline: messageUser.user.online !== false
            })}
          />
          <StyledUserName>
            {messageUser?.user.firstName} {messageUser?.user.lastName}
          </StyledUserName>
        </StyledLeftContent>
        <AttentionDot showing={isUnread} />
      </StyledDirectMessageItem>
      <IconButton edge='end' size='small' onClick={() => console.log('more clicked')}>
        <MoreHoriz className={classes.moreHorizontal} />
      </IconButton>
    </StyledDirectMessage>
  )
}

const useStyles = makeStyles({
  moreHorizontal: {
    color: '#fff'
  }
})
