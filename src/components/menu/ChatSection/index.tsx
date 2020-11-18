import React, { FC, useEffect, useState } from 'react'
import { IconButton, createStyles, makeStyles } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import classnames from 'classnames'

import {
  StyledChatSection,
  StyledChatSectionItem,
  StyledChatSectionHeader,
  StyledChatSectionHeaderTitle
} from './Styled'

import { Channel } from './Channel'

import { useChatContext } from 'providers/ChatProvider'
import { graphQLQuery } from 'graphql/helpers'
import { listConversations } from 'graphql/queries'
import { DirectMessage } from './DirectMessage'
import { useAppState } from 'providers'
import { getConversationWithAssociated } from 'graphql/customQueries'

export const sortBy = (list: any[], key: string) => {
  return list.sort((a, b) => (a[key] > b[key] ? 1 : -1))
}

interface IChatChannels {
  title: string
  previewCount?: number
  conversationId?: string
  isDirectMessage?: boolean
}

export const ChatSection: FC<IChatChannels> = ({ title, previewCount, conversationId, isDirectMessage }) => {
  const classes = useStyles()
  const {
    appState: { user }
  } = useAppState()
  const [expanded, setExpanded] = useState<boolean>(false)
  const { chatState, dispatch } = useChatContext()

  const getConversationList = async () => {
    const conversations = await graphQLQuery(listConversations, 'listConversations')
    dispatch({
      type: 'SET_CONVERSATIONS',
      payload: sortBy(
        conversations.filter(c => c.members.length === 0),
        'createdAt'
      )
    })
  }

  useEffect(() => {
    getConversationList()
  }, [Object.keys(chatState.unreadMessagesByConversation).length])

  useEffect(() => {
    if (chatState.conversations.length === 0) {
      getConversationList()
    }
  }, [])

  const openConversation = async (conversationId: string) => {
    dispatch({ type: 'SET_DETAILS', payload: { conversationId, conversationOpen: true } })
    const conversation = await graphQLQuery(getConversationWithAssociated, 'getConversation', { id: conversationId })
    if (conversation) {
      dispatch({ type: 'SET_DETAILS', payload: { conversationId, conversation } })
    }
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
      {!isDirectMessage ? (
        <>
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
        </>
      ) : (
        <>
          {user?.conversations?.items
            ?.filter(item => item?.conversation?.members.length === 2)
            .slice(0, previewCount)
            .map((data, index) => {
              const unreadInChannel = chatState.unreadMessagesByConversation[data.conversationId] > 0
              return (
                <StyledChatSectionItem key={`expanded-${index}`}>
                  <DirectMessage data={data} openConversation={openConversation} isUnread={unreadInChannel} />
                </StyledChatSectionItem>
              )
            })}
        </>
      )}
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
    }
  })
)
