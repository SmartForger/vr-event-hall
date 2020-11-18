import React, { FC } from 'react'
import classnames from 'classnames'

import {
  StyledDirectMessage,
  StyledDirectMessageItem,
  StyledLeftContent,
  StyledUserStatus,
  StyledUserName
} from './Styled'

import { IConvoLink } from 'types'
import { useAppState } from 'providers'
import { AttentionDot } from '../AttentionDot'

interface IChatDirectMessage {
  data: IConvoLink
  openConversation: (id: string) => void
  isUnread?: boolean
}

export const DirectMessage: FC<IChatDirectMessage> = ({ data, openConversation, isUnread }) => {
  const {
    appState: { user }
  } = useAppState()
  const { conversationId, conversation } = data
  const messageUser = conversation?.associated.items.filter(a => a.userId !== user?.id)[0]

  return (
    <StyledDirectMessage onClick={() => openConversation(conversationId)}>
      <StyledDirectMessageItem>
        <StyledLeftContent>
          <StyledUserStatus className={classnames([messageUser?.user?.online ? 'online' : 'offline'])} />
          <StyledUserName>
            {messageUser?.user.firstName} {messageUser?.user.lastName}
          </StyledUserName>
        </StyledLeftContent>
        <AttentionDot showing={isUnread} />
      </StyledDirectMessageItem>
    </StyledDirectMessage>
  )
}
