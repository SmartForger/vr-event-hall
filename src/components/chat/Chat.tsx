import React, { FC, useEffect, useState } from 'react'
import { ReactComponent as ChatBubble } from 'assets/chatBubble.svg'
import { ConversationList } from './ConversationList'
import { get, forEach } from 'lodash'

// Helpers
import { IUser, IMeetingInfo } from 'types'
import { graphQLSubscription } from 'graphql/helpers'
import { onCreateGlobalMessage } from 'graphql/subscriptions'
import { useDispatch, useSelector } from 'react-redux'
import { getNotifications, setConversations, setPersons, incrementNotification } from 'redux/chat'
import { VideoChatModal } from 'components/videochat/Meeting'
import { Loader } from 'components/shared'

interface ChatProps {
  user?: IUser
  users?: IUser[]
}

export const Chat: FC<ChatProps> = ({ user, users }) => {
  const dispatch = useDispatch()
  const notifications = useSelector(getNotifications)
  const [chatOpen, setChatOpen] = useState<boolean>(false)
  // Key for conversations should be the conversation ID for easy lookup
  const [notificationCount, setNotificationCount] = useState<number>(0)
  const [videoChatIsVisible, setVideoChatVisible] = useState<boolean>(false)
  const [videoChatLoading, setVideoChatLoading] = useState<boolean>(false)
  const [meetingInfo, setMeetingInfo] = useState<IMeetingInfo | unknown>(null)

  useEffect(() => {
    const userConversations = get(user, 'conversations.items', []).map(conversation => {
      return {
        id: get(conversation, 'conversation.id', ''),
        name: get(conversation, 'conversation.name', ''),
        members: get(conversation, 'conversation.members', [])
      }
    })

    dispatch(setConversations(userConversations))

    const persons =
      (users &&
        users
          .map(usr => {
            const foundConversation = userConversations.find(conversation => conversation.members.includes(usr.id))
            return {
              name: `${usr.firstName} ${usr.lastName}`,
              id: usr.id,
              conversationId: get(foundConversation, 'id', '')
            }
          })
          .filter(usr => usr.id !== get(user, 'id'))
          .sort((a, b) => get(a, 'name', '').localeCompare(get(b, 'name')))) ||
      []

    dispatch(setPersons(persons))

    const newMessageCreated = data => {
      const conversationId = data.onCreateGlobalMessage.messageConversationId
      // Ignore the message if: it isn't for this user, it was created by this user, or it is from livestream
      if (data.onCreateGlobalMessage.authorId === user!.id || conversationId === '8ec185f0-e5c2-423d-8164-f5439a24cf0d')
        return

      dispatch(incrementNotification(conversationId))
    }

    const subscription = graphQLSubscription(onCreateGlobalMessage, {}, newMessageCreated)

    return () => {
      // unsubscribe on unmount
      subscription.unsubscribe()
    }
    // eslint-disable-next-line
  }, [])

  useEffect(updateNotificationCount, [notifications])

  function updateNotificationCount() {
    let notificationValue = 0
    forEach(notifications, val => (notificationValue = notificationValue + val))
    setNotificationCount(notificationValue)
  }

  return (
    <>
      <ChatBubble id='chat-icon' onClick={() => setChatOpen(!chatOpen)} />
      {notificationCount && !chatOpen && <div id='notification-icon'>{notificationCount}</div>}
      {chatOpen && (
        <>
          <span id='chat-caret' />
          <div className='chat-overlay'>Please rotate device to see chat</div>
          <div className='chat-wrapper' onClick={() => setChatOpen(false)}>
            <div id='chat-container' onClick={e => e.stopPropagation()}>
              <ConversationList
                user={user}
                users={users}
                setVideoChatVisible={setVideoChatVisible}
                setVideoChatLoading={setVideoChatLoading}
                setMeetingInfo={setMeetingInfo}
              />
            </div>
          </div>
        </>
      )}
      {videoChatLoading ? <Loader /> : null}
      {videoChatIsVisible && (
        <VideoChatModal
          visible={videoChatIsVisible}
          setVisible={setVideoChatVisible}
          meetingInfo={meetingInfo as IMeetingInfo}
          setLoading={setVideoChatLoading}
        />
      )}
    </>
  )
}
