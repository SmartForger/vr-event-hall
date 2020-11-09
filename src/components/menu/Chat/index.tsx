import React, { FC, useRef, useEffect } from 'react'

// Components
import { MenuTooltip, AttentionDot } from 'components'
import { ChatSection } from '../ChatSection'
import { StyledChat, StyledChatHeader, StyledChatSection } from './Styled'
import { IUser } from 'types'

import { ChatProvider, useChatContext } from 'providers'
import { IConversation, ISubscriptionObject, UserStatus } from 'types'
import { graphQLQuery, graphQLSubscription } from 'graphql/helpers'
import { sessionByConversationId } from 'graphql/queries'
import { onCreateGlobalMessageMin } from 'graphql/customSubscriptions'

// Images
import liveChatBubbleIcon from 'assets/liveChatBubbleIcon.svg'
import { ChatDrawer } from './ChatDrawer'

interface ChatProps {
  user?: IUser
  users?: IUser[]
  drawerOpen: boolean
  conversationId: string
  toggleDrawer: () => void
}

export const Chat: FC<ChatProps> = ({ drawerOpen, conversationId, toggleDrawer }) => {
  const { chatState, dispatch } = useChatContext()

  const someUnread = Object.keys(chatState?.unreadMessagesByConversation)?.some?.(convoKey => {
    return chatState?.unreadMessagesByConversation?.[convoKey] > 0
  })
  let updateUnreadMessageSubscription = useRef<ISubscriptionObject | null>(null)

  useEffect(() => {
    setupUnreadSubscription()
    return () => {
      updateUnreadMessageSubscription?.current?.unsubscribe()
    }
  }, [])

  const updateUnreadConversationMessages = ({ onCreateGlobalMessage }) => {
    // increment the unread messages unless you're on the chat where the new message came in
    if (onCreateGlobalMessage.conversationId !== chatState.conversationId) {
      dispatch({
        type: 'INCREMENT_UNREAD_CONVO_MESSAGE',
        payload: { conversationId: onCreateGlobalMessage.conversationId }
      })
    }
  }

  const setupUnreadSubscription = async () => {
    updateUnreadMessageSubscription.current = graphQLSubscription(
      onCreateGlobalMessageMin,
      {},
      updateUnreadConversationMessages
    )
  }

  return (
    <>
      <StyledChat>
        <StyledChatHeader
          onClick={() => {
            !drawerOpen && toggleDrawer()
          }}
        >
          <MenuTooltip drawerOpen={drawerOpen} title='Live Chat' placement='left'>
            <img className='header-icon' src={liveChatBubbleIcon} alt='Livechat icon' width='24' />
          </MenuTooltip>
          <AttentionDot showing={someUnread} />
          <h2 className='header-title'>Live Chat</h2>
        </StyledChatHeader>

        <StyledChatSection className={drawerOpen ? 'drawer-open' : 'drawer-close'}>
          <ChatSection title='Channels' conversationId={conversationId} />
        </StyledChatSection>

        {/* TODO: This needs to be populated with user DMs */}
        <StyledChatSection className={drawerOpen ? 'drawer-open' : 'drawer-close'}>
          <ChatSection title='Direct Messages' conversationId={conversationId} />
        </StyledChatSection>
      </StyledChat>
      <ChatDrawer />
    </>
  )
}
