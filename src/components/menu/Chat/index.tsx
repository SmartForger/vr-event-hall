import React, { FC, useRef, useEffect } from 'react'

// Components
import { MenuTooltip, AttentionDot } from 'components'
import { ChatSection } from '../ChatSection'
import { StyledChat, StyledChatHeader, StyledChatSection } from './Styled'
import { IConvoLink, IUser } from 'types'

import { useAppState } from 'providers'
import { ChatProvider, useChatContext } from 'providers'
import { IConversation, ISubscriptionObject, UserStatus } from 'types'
import { graphQLQuery, graphQLSubscription } from 'graphql/helpers'
import { sessionByConversationId } from 'graphql/queries'
import { onCreateGlobalMessageMin } from 'graphql/customSubscriptions'
import { getConversationBase } from 'graphql/customQueries'

// Images
import liveChatBubbleIcon from 'assets/liveChatBubbleIcon.svg'
import { ChatDrawer } from './ChatDrawer'
import { IconButton } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { onUpdateUserInfo } from 'graphql/customSubscriptions'
import { checkConversationUserOnlineStatus } from 'helpers'

interface ChatProps {
  users?: IUser[]
  drawerOpen: boolean
  conversationId: string
  toggleDrawer: () => void
  showUserList: () => void
  vcOff?: boolean
}

export const Chat: FC<ChatProps> = ({ drawerOpen, conversationId, toggleDrawer, showUserList, vcOff }) => {
  const { chatState, dispatch } = useChatContext()
  const {
    appState: { user },
    setUser
  } = useAppState()
  const totalUnread = Object.keys(chatState?.unreadMessagesByConversation)?.reduce?.(
    (totalUnread: number, convoKey) => {
      totalUnread += chatState?.unreadMessagesByConversation?.[convoKey] || 0
      return totalUnread
    },
    0
  )
  let updateUnreadMessageSubscription = useRef<ISubscriptionObject | null>(null)
  let dmOnlineStatusSubscription = useRef<ISubscriptionObject | null>(null)

  const fetchNewConvoAndPopulateUser = async (convoId: string) => {
    let newRelevantConvo = await graphQLQuery(getConversationBase, 'getConversation', { id: convoId })
    setUser({
      ...user,
      conversations: {
        items: [
          ...(user?.conversations?.items || []),
          {
            user: user as IUser,
            userId: user?.id || '',
            conversationId: newRelevantConvo.id,
            conversation: newRelevantConvo
          }
        ]
      }
    })
    dispatch({
      type: 'INCREMENT_UNREAD_CONVO_MESSAGE',
      payload: { conversationId: convoId }
    })
  }

  useEffect(() => {
    setupUnreadSubscription()
    return () => {
      updateUnreadMessageSubscription?.current?.unsubscribe()
      dmOnlineStatusSubscription?.current?.unsubscribe()
    }
  }, [chatState.conversationId, user?.conversations?.items])

  const checkUserConversations = (newConvoId: string) => {
    return user?.conversations?.items.some(item => item.conversationId === newConvoId) || false
  }

  const checkOpenConversation = (newConvoId: string) => {
    return newConvoId === chatState.conversationId || newConvoId === conversationId
  }

  const updateUnreadConversationMessages = ({ onCreateGlobalMessage }) => {
    if (onCreateGlobalMessage.authorId === user?.id) {
      return
    }
    const newMessageConversationId = onCreateGlobalMessage.conversationId
    // increment the unread messages unless you're on the chat where the new message came in
    if (
      checkUserConversations(newMessageConversationId) &&
      !checkOpenConversation(newMessageConversationId) &&
      onCreateGlobalMessage.conversation?.members?.includes(user?.id)
    ) {
      dispatch({
        type: 'INCREMENT_UNREAD_CONVO_MESSAGE',
        payload: { conversationId: newMessageConversationId }
      })
    }
    // if this is a new conversation for this user, refetch the conversations to populate the list
    if (
      !checkUserConversations(newMessageConversationId) &&
      onCreateGlobalMessage?.conversation?.members?.includes(user?.id)
    ) {
      fetchNewConvoAndPopulateUser(newMessageConversationId)
    }
  }

  const userUpdated = ({ onUpdateUser }) => {
    const updatedConvoLinks = checkConversationUserOnlineStatus(onUpdateUser, user?.conversations?.items || [])
    if (!updatedConvoLinks) {
      return
    } else if (Array.isArray(updatedConvoLinks) && updatedConvoLinks.length > 0) {
      setUser({
        ...user,
        conversations: {
          items: updatedConvoLinks as IConvoLink[]
        }
      })
    }
  }

  const setupUnreadSubscription = async () => {
    updateUnreadMessageSubscription.current?.unsubscribe()
    dmOnlineStatusSubscription.current?.unsubscribe()

    updateUnreadMessageSubscription.current = graphQLSubscription(
      onCreateGlobalMessageMin,
      {},
      updateUnreadConversationMessages
    )

    dmOnlineStatusSubscription.current = graphQLSubscription(onUpdateUserInfo, {}, userUpdated)
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

        {/* re-remove channels */}
        {/* <StyledChatSection className={drawerOpen ? 'drawer-open' : 'drawer-close'}>
          <ChatSection title='Channels' conversationId={conversationId} />
        </StyledChatSection> */}

        <StyledChatSection className={drawerOpen ? 'drawer-open' : 'drawer-close'}>
          <ChatSection title='Direct Messages' conversationId={conversationId} isDirectMessage />
        </StyledChatSection>
      </StyledChat>
      <ChatDrawer vcOff={vcOff} />
    </>
  )
}
