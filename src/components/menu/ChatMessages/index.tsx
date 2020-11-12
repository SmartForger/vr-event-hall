import React, { FC, useEffect, useRef, useState } from 'react'
import { VariableSizeProps } from 'react-window'
import { makeStyles } from '@material-ui/core'

import { MessageInput } from './MessageInput'
import { MessageList } from './MessageList'

import { graphQLQuery, graphQLSubscription } from 'graphql/helpers'
import { useAppState, useVideoChatContext, useChatContext } from 'providers'
import { ISubscriptionObject } from 'types'
import { getConversationFiltered } from 'graphql/customQueries'
import { onCreateMessageWithAuthor, onUpdateMessageWithAuthor } from 'graphql/customSubscriptions'

interface ChatMessagesProps {
  internal?: boolean
  videoChat?: boolean
}

export const ChatMessages: FC<ChatMessagesProps> = ({ internal, videoChat }) => {
  const classes = useStyles()
  const {
    appState: { user }
  } = useAppState()
  const { videoChatState } = useVideoChatContext()
  const { chatState, dispatch } = useChatContext()

  const isUserAdmin = user => {
    return videoChatState?.session?.admins.items.some(adminUser => adminUser.userId === user.id)
  }

  let [messages, setMessages] = useState<any>([])
  let [currentConversationId, setConversationId] = useState<string>(
    internal && isUserAdmin(user)
      ? videoChatState?.session?.icId || ''
      : videoChat
      ? videoChatState?.session?.conversationId || ''
      : chatState?.conversationId || ''
  )
  const listRef = useRef<VariableSizeProps>()

  let subscription = useRef<ISubscriptionObject | null>(null)
  let updateSubscription = useRef<ISubscriptionObject | null>(null)

  const addNewMessage = ({ onCreateMessage }) => {
    if (internal && videoChat && onCreateMessage.conversationId === videoChatState?.session?.icId) {
      setMessages(prevMessageList => [...prevMessageList, onCreateMessage])
    } else if (videoChat && onCreateMessage.conversationId === videoChatState?.session?.conversationId) {
      setMessages(prevMessageList => [...prevMessageList, onCreateMessage])
    } else if (!videoChat && onCreateMessage.conversationId === chatState?.conversationId) {
      setMessages(prevMessageList => [...prevMessageList, onCreateMessage])
    }
  }

  const messageUpdated = ({ onUpdateMessage }) => {
    if (internal && videoChat && onUpdateMessage.conversationId === videoChatState?.session?.icId) {
      setMessages(prevMessages => prevMessages.filter(message => message.id !== onUpdateMessage.id))
    } else if (videoChat && onUpdateMessage.conversationId === videoChatState?.session?.conversationId) {
      setMessages(prevMessages => prevMessages.filter(message => message.id !== onUpdateMessage.id))
    } else if (!videoChat && onUpdateMessage.conversationId === chatState?.conversationId) {
      setMessages(prevMessages => prevMessages.filter(message => message.id !== onUpdateMessage.id))
    }
  }

  const getConversationDetails = async () => {
    const conversation = await graphQLQuery(getConversationFiltered, 'getConversation', {
      id: currentConversationId
    })
    if (conversation && conversation.messages) {
      setMessages(conversation.messages.items.filter(message => message.deleted !== 'true'))
    }

    subscription.current = graphQLSubscription(
      onCreateMessageWithAuthor,
      { conversationId: currentConversationId },
      addNewMessage
    )

    updateSubscription.current = graphQLSubscription(
      onUpdateMessageWithAuthor,
      { conversationId: currentConversationId },
      messageUpdated
    )
  }

  useEffect(() => {
    if (currentConversationId) {
      subscription?.current?.unsubscribe()
      updateSubscription?.current?.unsubscribe()
      getConversationDetails()
      dispatch({ type: 'CLEAR_UNREAD_CONVO_MESSAGE', payload: { conversationId: currentConversationId } })
    }
    // eslint-disable-next-line
  }, [currentConversationId])

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom()
    }
    // eslint-disable-next-line
  }, [messages])

  useEffect(() => {
    listRef?.current?.resetAfterIndex(0)
    return () => {
      subscription?.current?.unsubscribe()
      updateSubscription?.current?.unsubscribe()
    }
  }, [])

  const scrollToBottom = () => {
    listRef?.current?.resetAfterIndex(0)
    listRef?.current?.scrollToItem(messages.length - 1, 'end')
  }

  return (
    <div className={classes.root}>
      <MessageList listRef={listRef} messages={messages} isVideoChat={videoChat} />
      <MessageInput userId={user?.id || ''} internal={internal} conversationId={currentConversationId} />
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    maxWidth: 350,
    backgroundColor: theme.palette.background.paper,
    position: 'relative'
  }
}))
