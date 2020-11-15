import React, { useReducer, createContext, Dispatch, useContext } from 'react'
import { IMessage, IUser, ISession } from 'types'
import { UserAdminType } from './ChatProvider'

interface IVideoChatContextObject {
  meetingId: string
  attendeeId: string
  loading: boolean
  error: Error | null
  visible: boolean
  isClassroom: boolean
  conversationId: string | null
  icId: string
  conversationUser: IUser | null
  adminType: UserAdminType
  sessionId: string
  session: ISession | null
  globalMute: boolean
  presenterPins: string[]
  moderators: string[]
  pinnedMessage: IMessage | null
  isAttendee: boolean
  attendees: IUser[]
}

const initialState = {
  meetingId: 'bc6d2bb4-4d33-42e2-8fcb-96acb469830e',
  attendeeId: '',
  loading: false,
  error: null,
  visible: false,
  isClassroom: false,
  conversationId: '',
  icId: '',
  conversationUser: null,
  adminType: UserAdminType.GUEST,
  sessionId: '4a9b328b-85b5-4393-a232-550ac67962f9',
  session: null,
  globalMute: false,
  presenterPins: [],
  moderators: [],
  attendees: [],
  pinnedMessage: null,
  isAttendee: true
}

export const VideoChatContext = createContext<{
  videoChatState: IVideoChatContextObject
  dispatch: Dispatch<any>
}>({
  videoChatState: initialState,
  dispatch: () => null
})

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_MEETING_ID':
      return {
        ...state,
        meetingId: action.payload
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    case 'SET_VISIBLE':
      return {
        ...state,
        visible: action.payload
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      }
    case 'SET_DETAILS':
      return {
        ...state,
        ...action.payload
      }
    case 'CLEAR_CONVO_REFS':
      return {
        ...state,
        ...initialState
      }
    default:
      return state
  }
}

export const VideoChatProvider = props => {
  const [videoChatState, dispatch] = useReducer(reducer, initialState)

  return <VideoChatContext.Provider value={{ videoChatState, dispatch }}>{props.children}</VideoChatContext.Provider>
}

export const useVideoChatContext = () => useContext(VideoChatContext)
