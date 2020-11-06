import React, { FC, useEffect, useRef, useState } from 'react'
import { VariableSizeProps } from 'react-window'
import { makeStyles } from '@material-ui/core'

import { MessageInput } from './MessageInput'
import { MessageList } from './MessageList'

import { graphQLQuery, graphQLSubscription } from 'graphql/helpers'
import { useAppState, useVideoChatContext } from 'providers'
import { ISubscriptionObject } from 'types'
import { getConversationFiltered } from 'graphql/customQueries'
import { onCreateMessageWithAuthor, onUpdateMessageWithAuthor } from 'graphql/customSubscriptions'

interface ChatMessagesProps {
  internal?: boolean
}

export const ChatMessages: FC<ChatMessagesProps> = ({ internal }) => {
  const classes = useStyles()
  const {
    appState: { user }
  } = useAppState()
  const { videoChatState } = useVideoChatContext()

  let [messages, setMessages] = useState<any>([])
  const listRef = useRef<VariableSizeProps>()

  let subscription = useRef<ISubscriptionObject | null>(null)
  let updateSubscription = useRef<ISubscriptionObject | null>(null)

  const addNewMessage = ({ onCreateMessage }) => {
    setMessages(prevMessageList => [...prevMessageList, onCreateMessage])
  }

  const messageUpdated = ({ onUpdateMessage }) => {
    if (onUpdateMessage.deleted === 'true') {
      setMessages(prevMessages => prevMessages.filter(message => message.id !== onUpdateMessage.id))
    }
  }

  const getConversationDetails = async () => {
    const conversation = await graphQLQuery(getConversationFiltered, 'getConversation', {
      id: videoChatState?.session?.conversationId || videoChatState.conversationId
    })
    setMessages(conversation.messages.items.filter(message => message.deleted !== 'true'))

    subscription.current = graphQLSubscription(
      onCreateMessageWithAuthor,
      { conversationId: videoChatState?.session?.conversationId || videoChatState.conversationId },
      addNewMessage
    )

    updateSubscription.current = graphQLSubscription(
      onUpdateMessageWithAuthor,
      { conversationId: videoChatState?.session?.conversationId || videoChatState.conversationId },
      messageUpdated
    )
  }

  useEffect(() => {
    if (videoChatState?.session?.conversationId || videoChatState.conversationId) {
      getConversationDetails()
    }
    // eslint-disable-next-line
  }, [videoChatState?.session?.conversationId || videoChatState.conversationId])

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom()
    }
    // eslint-disable-next-line
  }, [messages])

  useEffect(() => {
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
      <MessageList listRef={listRef} messages={messages} />
      <MessageInput userId={user?.id || ''} internal={internal} />
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