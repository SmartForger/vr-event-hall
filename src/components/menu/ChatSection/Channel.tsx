import React, { FC } from 'react'

import { AttentionDot } from 'components'
import { IConversation } from 'types'
import { StyledChannel } from './Styled'

interface IChatChannel {
  data: IConversation
  isUnread?: boolean
  openConversation: (id: string) => void
}

export const Channel: FC<IChatChannel> = ({ data, openConversation, isUnread }) => {
  return (
    <StyledChannel onClick={() => openConversation(data.id)}>
      <AttentionDot showing={isUnread} />
      <span>{data.name}</span>
    </StyledChannel>
  )
}
