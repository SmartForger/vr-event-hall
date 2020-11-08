import React, { FC, useEffect, useRef, useState } from 'react'
import { IconButton, Collapse, createStyles, makeStyles } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import classnames from 'classnames'

import {
  StyledChannel,
  StyledChatSection,
  StyledChatSectionItem,
  StyledChatSectionHeader,
  StyledChatSectionHeaderTitle
} from './Styled'

import { Channel } from './Channel'

import { useChatContext } from 'providers/ChatProvider'
import { IConversation, ISubscriptionObject, IUser, UserStatus } from 'types'
import { graphQLQuery, graphQLSubscription } from 'graphql/helpers'
import { listConversations, sessionByConversationId, getConversation } from 'graphql/queries'
import { onUpdateSession } from 'graphql/subscriptions'

export const sortBy = (list: any[], key: string) => {
  return list.sort((a, b) => (a[key] > b[key] ? 1 : -1))
}

interface IChatChannels {
  title: string
  previewCount?: number
  conversationId: string
}

export const ChatSection: FC<IChatChannels> = ({ title, previewCount, conversationId }) => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState<boolean>(false)
  const { chatState, dispatch } = useChatContext()
  const someUnread = Object.keys(chatState?.unreadMessagesByConversation)?.some?.(convoKey => {
    return chatState?.unreadMessagesByConversation?.[convoKey] > 0
  })

  let updateSessionSubscription = useRef<ISubscriptionObject | null>(null)

  const getConversationList = async () => {
    const conversations = await graphQLQuery(listConversations, 'listConversations')
    dispatch({ type: 'SET_CONVERSATIONS', payload: sortBy(conversations, 'createdAt') })
  }

  useEffect(() => {
    if (chatState.conversations.length === 0) {
      getConversationList()
    }

    return () => {
      updateSessionSubscription?.current?.unsubscribe()
    }
  }, [])

  const updateSessionInfo = ({ onUpdateSession }) => {
    dispatch({ type: 'SET_DETAILS', payload: { session: onUpdateSession } })
  }

  const openConversation = async (conversationId: string) => {
    dispatch({ type: 'SET_DETAILS', payload: { conversationId, conversationOpen: true } })
    const conversation = await graphQLQuery(getConversation, 'getConversation', { id: conversationId })
    dispatch({ type: 'SET_DETAILS', payload: { conversation } })
    // updateSessionSubscription.current = graphQLSubscription(onUpdateSession, { id: session.id }, updateSessionInfo)
  }

  useEffect(() => {
    if (conversationId) {
      openConversation(conversationId)
    }
  }, [conversationId])

  return (
    <StyledChatSection>
      <StyledChatSectionHeader>
        <StyledChatSectionHeaderTitle>
          <div className={classes.unreadIndicator}></div>
          <span>{title}</span>
        </StyledChatSectionHeaderTitle>
        {Number.isInteger(previewCount) && (
          <IconButton edge='end' size='small' color='inherit' onClick={() => setExpanded(!expanded)}>
            <ExpandMore
              className={classnames(classes.expandMore, {
                [classes.expanded]: expanded
              })}
            />
          </IconButton>
        )}
      </StyledChatSectionHeader>

      {chatState.conversations.slice(0, previewCount).map((data, index) => {
        const unreadInChannel = chatState.unreadMessagesByConversation[data.id] > 0
        return (
          <StyledChatSectionItem key={`expanded-${index}`}>
            <Channel data={data} openConversation={openConversation} isUnread={unreadInChannel} />
          </StyledChatSectionItem>
        )
      })}

      {Number.isInteger(previewCount) &&
        chatState.conversations.slice(previewCount).map((data, index) => {
          const unreadInChannel = chatState.unreadMessagesByConversation[data.id] > 0
          return (
            <StyledChatSectionItem key={`expanded-${index}`}>
              <Channel data={data} openConversation={openConversation} isUnread={unreadInChannel} />
            </StyledChatSectionItem>
          )
        })}
    </StyledChatSection>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    expandMore: {
      transition: 'transform 0.2s ease-in-out'
    },
    expanded: {
      transform: 'rotate(180deg)'
    },
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
