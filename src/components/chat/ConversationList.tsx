import React, { FC, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { forEach, get, toLower } from 'lodash'
import { IconButton, TextField } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'
import { useMeetingManager } from 'amazon-chime-sdk-component-library-react'

import { Spinner } from 'components'

import { graphQLQuery, graphQLMutation, graphQLSubscription, createNewConversation } from 'graphql/helpers'
import { createMessage } from 'graphql/mutations'
import { getConversation } from 'graphql/queries'
import { onCreateMessage } from 'graphql/subscriptions'
import { createChimeMeeting } from 'helpers'

import { ReactComponent as Send } from 'assets/send.svg'
import { ReactComponent as Arrow } from 'assets/rightArrow.svg'
import { ReactComponent as Channel } from 'assets/channel.svg'
import { ReactComponent as People } from 'assets/people.svg'
import { IUser, IMessageInput, ISubscriptionObject } from 'types'
import {
  resetNotification,
  getActiveConversation,
  getPersons,
  updatePerson,
  getNotifications,
  setActiveConversation,
  closeActiveConversation,
  setActiveConversationMessages
} from 'redux/chat'

const cloudfrontBase = 'https://dx2ge6d9z64m9.cloudfront.net/public/'
const videoChatKey = 'vx360-video-chat-created'

interface ConversationListProps {
  user?: IUser
  users?: IUser[]
  conversationID?: string
  setVideoChatVisible?: (value: boolean) => void
  setVideoChatLoading?: (value: boolean) => void
  setMeetingInfo?: (info: string) => void
}

const Views = {
  LIST: 'list',
  CHANNELS: 'channels',
  PEOPLE: 'people',
  CONVERSATION: 'conversation',
  SELECT_PEOPLE: 'select_people'
}

const GeneralConversationID = '23b0403b-b6ee-43d0-94da-6b51714219ad'

export const ConversationList: FC<ConversationListProps> = ({
  user,
  users,
  conversationID,
  setVideoChatVisible,
  setVideoChatLoading,
  setMeetingInfo
}) => {
  // Just a conversation window, no list view
  const singleChatMode: boolean = !!conversationID
  const dispatch = useDispatch()

  // State
  const [newMessage, setNewMessage] = useState<string>('')
  const [filter, setFilter] = useState<string>('')
  const [chatLoading, setChatLoading] = useState<boolean>(false)
  const [view, setView] = useState<string>(Views.LIST)
  const [previousView, setPreviousView] = useState<string>('')
  const [userLookup, setUserLookup] = useState<object>({})
  const [peopleNotificationCount, setPeopleNotificationCount] = useState<number>(0)
  // eslint-disable-next-line
  const [newVideoChatRequest, setNewVideoChatRequest] = useState<string>('')

  // Selector
  const notifications = useSelector(getNotifications, shallowEqual)
  const persons = useSelector(getPersons)
  const activeConversation = useSelector(getActiveConversation, shallowEqual)

  // Ref
  const subscription = useRef<ISubscriptionObject | null>(null)
  const messageDivRef = useRef<HTMLDivElement | null>(null)

  // Chime
  const meetingManager = useMeetingManager()

  useEffect(() => {
    if (conversationID) {
      selectConversation(conversationID)
    }

    updateUserLookup()

    return () => {
      setViewToList()
      backToList()
    }
    // eslint-disable-next-line
  }, [])

  const scrollToBottom = () => {
    if (messageDivRef.current && messageDivRef.current.scrollHeight) {
      messageDivRef.current.scrollTop = messageDivRef.current.scrollHeight
    }
  }

  //@ts-ignore
  useEffect(scrollToBottom, [activeConversation.messages])
  useEffect(updateNotificationCount, [notifications])

  function updateNotificationCount() {
    let notificationValue = 0
    forEach(notifications, (val, key) => {
      if (key !== GeneralConversationID) {
        notificationValue = notificationValue + val
      }
    })
    setPeopleNotificationCount(notificationValue)
  }

  useEffect(updateUserLookup, [users])

  function updateUserLookup() {
    const newUserLookup = {}
    users &&
      users.forEach(usr => {
        newUserLookup[usr.id!] = {
          avatar: usr.avatar
        }
      })

    setUserLookup(newUserLookup)
  }

  const selectConversation = async (conversationID, defaultName?, nameOverride?) => {
    if (conversationID) {
      setChatLoading(true)

      const conversationData = await graphQLQuery(getConversation, 'getConversation', { id: conversationID })
      dispatch(
        setActiveConversation({
          id: conversationData.id,
          name: nameOverride || conversationData.name || defaultName,
          messages: conversationData.messages.items || [],
          offline: false
        })
      )
      dispatch(resetNotification(conversationData.id))
      subscription.current = graphQLSubscription(
        onCreateMessage,
        { messageConversationId: conversationData.id },
        addNewMessage
      )
      setChatLoading(false)
    } else {
      dispatch(
        setActiveConversation({
          id: '',
          name: nameOverride || defaultName,
          messages: [],
          offline: true
        })
      )
    }

    setView(Views.CONVERSATION)
    scrollToBottom()
  }

  const selectChannel = async (channel, defaultName) => {
    setPreviousView(Views.CHANNELS)
    await selectConversation(channel, defaultName)
  }

  const selectPerson = async person => {
    setView(Views.CONVERSATION)
    setPreviousView(Views.PEOPLE)
    setChatLoading(true)
    if (person.conversationId) {
      await selectConversation(person.conversationId, '', person.name)
    } else {
      // @ts-ignore
      if (user) {
        const conversationID = await createNewConversation(user, person, `${get(user, 'id')}-${person.id}`)
        await selectConversation(conversationID, '', person.name)
      }
    }
  }

  const backToList = () => {
    setView(previousView)
    dispatch(closeActiveConversation())

    if (subscription.current && subscription.current.unsubscribe) {
      subscription.current.unsubscribe()
      subscription.current = null
    }
  }

  const addNewMessage = ({ onCreateMessage }) => {
    if (onCreateMessage.content.includes(videoChatKey) && onCreateMessage.authorId !== user?.id) {
      const meetingId = onCreateMessage.content.split(':')[1]
      return setNewVideoChatRequest(meetingId)
    }
    dispatch(setActiveConversationMessages(onCreateMessage))
    scrollToBottom()
  }

  const setViewToList = () => {
    setView(Views.LIST)
    setPreviousView('')
    setFilter('')
  }

  const listFilterFunc = name => {
    return !filter || toLower(name).includes(toLower(filter))
  }

  const channels = [
    {
      name: 'General',
      messages: [],
      id: GeneralConversationID
    },
    {
      name: 'Event Staff',
      id: '',
      messages: []
    },
    {
      name: 'Help',
      id: '',
      messages: []
    }
  ]

  const sendMessage = async e => {
    if (e.key && e.key !== 'Enter') {
      return
    }
    if (newMessage === '') return

    const message: IMessageInput = {
      id: uuid(),
      createdAt: Date.now(),
      messageConversationId: activeConversation.id,
      content: newMessage,
      authorId: user?.id as string
    }

    await graphQLMutation(createMessage, message)
    // scrollToBottom();
    setNewMessage('')
  }

  // const createVideoChat = async (meetingId?: string) => {
  //   setVideoChatLoading && setVideoChatLoading(true)
  //   const {
  //     data: { meeting, attendee }
  //   } = await createChimeMeeting({ meetingId })

  //   setMeetingInfo && setMeetingInfo(meeting.Meeting)

  //   const message: IMessageInput = {
  //     id: uuid(),
  //     createdAt: Date.now(),
  //     messageConversationId: activeConversation.id,
  //     content: `${videoChatKey}:${meeting.Meeting.MeetingId}`,
  //     authorId: user?.id as string
  //   }

  //   await graphQLMutation(createMessage, message)

  //   const joinData = {
  //     meetingInfo: meeting.Meeting,
  //     attendeeInfo: attendee.Attendee
  //   }

  //   await meetingManager.join(joinData)
  //   await meetingManager.start()

  //   setVideoChatVisible && setVideoChatVisible(true)
  // }

  // const joinVideoChat = async () => {
  //   setVideoChatLoading && setVideoChatLoading(true)
  //   const {
  //     data: { meeting, attendee }
  //   } = await joinChimeMeeting(newVideoChatRequest)

  //   setMeetingInfo && setMeetingInfo(meeting.Meeting)

  //   const joinData = {
  //     meetingInfo: meeting.Meeting,
  //     attendeeInfo: attendee.Attendee
  //   }

  //   await meetingManager.join(joinData)
  //   await meetingManager.start()

  //   setVideoChatVisible && setVideoChatVisible(true)
  //   setNewVideoChatRequest('')
  // }

  const sendGroupVideoChatLink = async (person, meetingId: string) => {
    const currentUser = user as IUser
    let conversationId = ''
    if (person.conversationId) {
      conversationId = person.conversationId
    } else {
      conversationId = await createNewConversation(currentUser, person, `${currentUser.id}-${person.id}`)
    }

    const message: IMessageInput = {
      id: uuid(),
      createdAt: Date.now(),
      messageConversationId: conversationId,
      content: `${videoChatKey}-group:${meetingId}`,
      authorId: currentUser.id
    }

    await graphQLMutation(createMessage, message)
  }

  const createGroupVideoChat = async (meetingId?: string) => {
    const videoGroupList = persons.filter(p => p.selected)
    if (videoGroupList && videoGroupList.length > 0) {
      setVideoChatLoading && setVideoChatLoading(true)
      const {
        data: { meeting, attendee }
      } = await createChimeMeeting({ meetingId })

      setMeetingInfo && setMeetingInfo(meeting.Meeting)

      videoGroupList.map(person => sendGroupVideoChatLink(person, meeting.Meeting.MeetingId))

      const joinData = {
        meetingInfo: meeting.Meeting,
        attendeeInfo: attendee.Attendee
      }

      await meetingManager.join(joinData)
      await meetingManager.start()

      setVideoChatVisible && setVideoChatVisible(true)
    }
  }

  return (
    <>
      <div id='conversation-list' className={view === Views.CONVERSATION ? 'conversation-active' : ''}>
        {!singleChatMode && (
          <section id='list-section' className={view === Views.LIST ? 'active' : ''}>
            <div className='top-section'>
              <div
                className='user-avatar'
                style={{
                  backgroundImage: `url('${cloudfrontBase}${user?.avatar}')`
                }}
              />
              <h1>Messaging</h1>
            </div>
            <div id='list-container'>
              <div className='list-item'>
                <div className='list-icon' onClick={() => setView(Views.CHANNELS)}>
                  <Channel />
                </div>
                <div className='list-title'>
                  <h3 onClick={() => setView(Views.CHANNELS)}>Channel browser</h3>
                </div>
                {notifications && notifications[GeneralConversationID] ? (
                  <div className='notifications'>{notifications[GeneralConversationID]}</div>
                ) : (
                  ''
                )}
              </div>
              <div className='list-item'>
                <div className='list-icon' onClick={() => setView(Views.PEOPLE)}>
                  <People />
                </div>
                <div className='list-title'>
                  <h3 onClick={() => setView(Views.PEOPLE)}>People</h3>
                </div>
                {peopleNotificationCount ? <div className='notifications'>{peopleNotificationCount}</div> : ''}
              </div>
              {/* <div className='list-item'>
                <div className='list-icon text-center' onClick={() => setView(Views.PEOPLE)}>
                  <Video width='20' />
                </div>
                <div className='list-title'>
                  <h3 onClick={() => setView(Views.SELECT_PEOPLE)}>Start Group Video Call</h3>
                </div>
                {peopleNotificationCount ? <div className='notifications'>{peopleNotificationCount}</div> : ''}
              </div> */}
            </div>
          </section>
        )}
        {!singleChatMode && (
          <section
            id='channels-section'
            className={view === Views.CHANNELS || previousView === Views.CHANNELS ? 'active' : ''}
          >
            <div className='top-section'>
              <Arrow className='left-arrow' onClick={() => setViewToList()} />
              <h1>Channels</h1>
            </div>
            <TextField
              label='Search'
              variant='outlined'
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className='input'
              type='text'
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => {
                      setFilter('')
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                )
              }}
            />
            <div id='channels-container'>
              {channels
                .filter(channel => channel.name !== 'Stream Chat' && listFilterFunc(channel.name))
                .map((channel, ind) => (
                  <div key={ind}>
                    <div className='channel-name' onClick={() => selectChannel(channel.id, channel.name)}>
                      {channel.name}
                    </div>
                    {notifications && notifications[channel.id] ? (
                      <div className='notifications'>{notifications[channel.id]}</div>
                    ) : (
                      ''
                    )}
                  </div>
                ))}
            </div>
          </section>
        )}
        {!singleChatMode && (
          <section
            id='people-section'
            className={view === Views.PEOPLE || previousView === Views.PEOPLE ? 'active' : ''}
          >
            <div className='top-section'>
              <Arrow className='left-arrow' onClick={() => setViewToList()} />
              <h1>People</h1>
            </div>
            <TextField
              label='Search'
              variant='outlined'
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className='input'
              type='text'
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => {
                      setFilter('')
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                )
              }}
            />
            <div id='persons-container'>
              {persons &&
                persons
                  .filter(person => listFilterFunc(person.name))
                  .map((person, ind) => (
                    <div key={ind}>
                      <div className='channel-name' onClick={() => selectPerson(person)}>
                        {person.name}
                      </div>
                      {notifications && person.conversationId && notifications[person.conversationId] ? (
                        <div className='notifications'>{notifications[person.conversationId]}</div>
                      ) : (
                        ''
                      )}
                    </div>
                  ))}
            </div>
          </section>
        )}
        {!singleChatMode && (
          <section
            id='people-section'
            className={view === Views.SELECT_PEOPLE || previousView === Views.SELECT_PEOPLE ? 'active' : ''}
          >
            <div className='top-section'>
              <Arrow className='left-arrow' onClick={() => setViewToList()} />
              <h1>Select People</h1>
            </div>
            <TextField
              label='Search'
              variant='outlined'
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className='input'
              type='text'
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => {
                      setFilter('')
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                )
              }}
            />
            <button onClick={() => createGroupVideoChat()}>Start Call</button>
            <div id='persons-container'>
              {persons &&
                persons
                  .filter(person => listFilterFunc(person.name))
                  .map((person, ind) => (
                    <div key={ind}>
                      <div
                        className={`channel-name ${person.selected ? 'selected' : ''}`}
                        onClick={() =>
                          dispatch(
                            updatePerson({
                              ...person,
                              selected: person.selected ? false : true
                            })
                          )
                        }
                      >
                        {person.name}
                      </div>
                      {notifications && person.conversationId && notifications[person.conversationId] ? (
                        <div className='notifications'>{notifications[person.conversationId]}</div>
                      ) : (
                        ''
                      )}
                    </div>
                  ))}
            </div>
          </section>
        )}
        <section
          id='conversation-container'
          className={singleChatMode || chatLoading || view === Views.CONVERSATION ? 'active' : ''}
        >
          <div className='top-section'>
            {previousView && <Arrow className='left-arrow' onClick={() => backToList()} />}
            <h3>{activeConversation.name}</h3>
            {/* <Video className='right-video' onClick={() => createVideoChat()} /> */}
          </div>
          <div className='messages' ref={div => (messageDivRef.current = div)}>
            {activeConversation.offline && (
              <div id='offline-message'>
                We're sorry, but there is currently nobody online in these channels. Please check back later or check
                out the "Help" section in the menu.
              </div>
            )}
            {chatLoading && <Spinner />}
            {!chatLoading && activeConversation.messages.length
              ? activeConversation.messages
                  .filter(message => !message.content.includes(videoChatKey))
                  .map((message, ind) => (
                    <div key={ind}>
                      <div className={message.author.id === user?.id ? 'my-message' : 'message'}>
                        {message.author.id === user?.id ? (
                          <div
                            className='user-avatar'
                            style={{
                              backgroundImage: `url('${cloudfrontBase}${user?.avatar}')`
                            }}
                          />
                        ) : (
                          <div
                            className='user-avatar'
                            style={{
                              backgroundImage: `url('${cloudfrontBase}${userLookup[message.author.id]?.avatar}')`
                            }}
                          />
                        )}
                        <p className='message-name'>{message.author.firstName}</p>
                        <p className='message-content'>{message.content}</p>
                      </div>
                    </div>
                  ))
              : null}
            {/* {newVideoChatRequest ? (
              <>
                <button onClick={joinVideoChat}>New Chat Request</button>
              </>
            ) : null} */}
          </div>
          <div className='text-section'>
            <textarea
              disabled={activeConversation.offline}
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyPress={sendMessage}
              placeholder='Start typing...'
            />
            <Send
              className={activeConversation.offline ? 'disabled' : ''}
              id='send-btn'
              onClick={e => {
                !activeConversation.offline && sendMessage(e)
              }}
            />
          </div>
        </section>
      </div>
    </>
  )
}
