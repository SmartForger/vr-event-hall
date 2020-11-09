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
import { IconButton } from '@material-ui/core'
import { Add } from '@material-ui/icons'

interface ChatProps {
  user?: IUser
  users?: IUser[]
  drawerOpen: boolean
  conversationId: string
  toggleDrawer: () => void
  showUserList: () => void
}

export const Chat: FC<ChatProps> = ({ drawerOpen, conversationId, toggleDrawer, showUserList }) => {
  const { chatState, dispatch } = useChatContext()

  const totalUnread = Object.keys(chatState?.unreadMessagesByConversation)?.reduce?.(
    (totalUnread: number, convoKey) => {
      totalUnread += chatState?.unreadMessagesByConversation?.[convoKey] || 0
      return totalUnread
    },
    0
  )
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
          <AttentionDot showing={totalUnread > 0} number={totalUnread} />
          <h2 className='header-title'>Live Chat</h2>
          <IconButton size='medium' onClick={showUserList} edge='end'>
            <Add style={{ color: 'white' }} />
          </IconButton>
        </StyledChatHeader>

        <StyledChatSection className={drawerOpen ? 'drawer-open' : 'drawer-close'}>
          <ChatSection title='Channels' conversationId={conversationId} />
        </StyledChatSection>

        {/* TODO: This needs to be populated with user DMs */}
        <StyledChatSection className={drawerOpen ? 'drawer-open' : 'drawer-close'}>
          <ChatSection title='Direct Messages' conversationId={conversationId} isDirectMessage />
        </StyledChatSection>
      </StyledChat>
      <ChatDrawer />
    </>
  )
}
