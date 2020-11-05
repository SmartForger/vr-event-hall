import React, { useReducer, createContext, Dispatch, useContext } from 'react'
import { IConversation, IDemoSession } from 'types'

const baseConversations = {
  1: 'e23af63b-2c83-44e2-87cb-43207209feed',
  2: 'f10f7caa-26e3-4b49-997e-fc046c7cb665',
  3: '9218554c-0bc0-4e61-b6f8-0fef42d984a1',
  4: '5faff25c-bbd7-4503-8747-a29e2e971014',
  5: 'a4870c64-eabb-44a2-9d64-74384570439a',
  6: 'd1a80a79-6524-4ece-9860-85d48338b520',
  7: '6299ec72-2b26-4730-8d9e-f532f1afae63',
  8: '1d26e076-954e-4455-bf28-cc964f633f3d',
  9: 'ccc0fec7-4bdc-4dc4-8356-1406276294dd',
  10: '2c014922-e281-406f-a799-e3f0b3c2eb7d',
  11: '16473c80-47f2-498b-9076-e00b99e00817',
  12: '00b31c6d-7e6f-47e2-a540-07b81b877b92'
}

export enum UserAdminType {
  PRESENTER = 'presenter',
  MODERATOR = 'moderator',
  GUEST = ''
}

interface IChatContextObject {
  conversations: IConversation[]
  loading: boolean
  conversationId: string
  conversationOpen: boolean
  userType: UserAdminType
  pinnedMessageId: string
  session: IDemoSession | null
}

const initialState = {
  conversations: [],
  loading: false,
  conversationId: '',
  conversationOpen: false,
  userType: UserAdminType.GUEST,
  pinnedMessageId: '',
  session: null
}

export const ChatContext = createContext<{
  chatState: IChatContextObject
  dispatch: Dispatch<any>
}>({
  chatState: initialState,
  dispatch: () => null
})

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CONVERSATIONS':
      return {
        ...state,
        conversations: action.payload
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    case 'SET_DETAILS':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export const ChatProvider = props => {
  const [chatState, dispatch] = useReducer(reducer, initialState)

  return <ChatContext.Provider value={{ chatState, dispatch }}>{props.children}</ChatContext.Provider>
}

export const useChatContext = () => useContext(ChatContext)
