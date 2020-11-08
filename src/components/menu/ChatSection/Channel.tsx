import React, { FC, useEffect, useRef, useState } from 'react'
import { IconButton, Collapse, createStyles, makeStyles } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import classnames from 'classnames'

import { IConversation } from 'types'
import {
  StyledChannel,
  StyledChatSection,
  StyledChatSectionItem,
  StyledChatSectionHeader,
  StyledChatSectionHeaderTitle
} from './Styled'

interface IChatChannel {
  data: IConversation
  isUnread?: boolean
  openConversation: (id: string) => void
}

export const Channel: FC<IChatChannel> = ({ data, openConversation, isUnread }) => {
  const classes = useStyles()
  return (
    <StyledChannel onClick={() => openConversation(data.id)}>
      <div className={isUnread ? classes.unreadIndicator : ''}></div>
      <span>{data.name}</span>
    </StyledChannel>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    unreadIndicator: {
      position: 'absolute',
      borderRadius: '50% 50%',
      marginLeft: '-12px',
      background: 'red',
      marginTop: '6px',
      height: '8px',
      width: '8px',
      tranform: '200ms'
    }
  })
)
