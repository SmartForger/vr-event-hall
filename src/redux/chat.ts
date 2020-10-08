import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'configs/redux-store'
import { cloneDeep } from 'lodash'

import { IConversation, IActiveConversation, IPerson, IMessage } from 'types'

export const defaultActiveConversation = {
  id: '',
  name: '',
  messages: [],
  offline: false
}

interface ChatState {
  conversations: Array<IConversation>
  activeConversation: IActiveConversation
  notifications: { [key: string]: number }
  persons: Array<IPerson>
}

const initialState: ChatState = {
  conversations: [],
  activeConversation: defaultActiveConversation,
  notifications: {},
  persons: []
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveConversation: (state, action: PayloadAction<IActiveConversation>) => {
      state.activeConversation = { ...action.payload }
    },
    setActiveConversationMessages: (state, action: PayloadAction<IMessage>) => {
      state.activeConversation = {
        ...state.activeConversation,
        messages: [...state.activeConversation.messages, action.payload]
      }
    },
    setConversations: (state, action: PayloadAction<Array<IConversation>>) => {
      state.conversations = [...action.payload]
    },
    addConversation: (state, action: PayloadAction<IConversation>) => {
      if (action.payload && action.payload.id) {
        state.conversations = [...state.conversations, action.payload]

        // When we receive a new conversation, find the related person and add the ID
        const members = action.payload.members

        for (let i = 0; i < state.persons.length; i++) {
          const person = state.persons[i]

          if (members.includes(person && person.id!)) {
            const personsClone = cloneDeep(state.persons)
            personsClone[i].conversationId = action.payload.id
            state.persons = personsClone
            break
          }
        }
      }
    },
    setPersons: (state, action: PayloadAction<Array<IPerson>>) => {
      state.persons = [...action.payload].sort((a, b) => a.name!.localeCompare(b.name!))
    },
    updatePerson: (state, action: PayloadAction<IPerson>) => {
      const index = state.persons.findIndex((p: IPerson) => p.id === action.payload.id)
      if (index >= 0) {
        state.persons[index] = action.payload
      }
    },
    addPerson: (state, action: PayloadAction<IPerson>) => {
      state.persons = [...state.persons, action.payload]
    },
    incrementNotification: (state, action: PayloadAction<string>) => {
      const foundConversation =
        action.payload === '23b0403b-b6ee-43d0-94da-6b51714219ad' ||
        state.conversations.find(conversation => conversation.id === action.payload)
      if (!foundConversation || !action.payload || action.payload === state.activeConversation.id) return
      const val = (state.notifications[action.payload] || 0) + 1
      state.notifications = { ...state.notifications, [action.payload]: val }
    },
    closeActiveConversation: state => {
      state.activeConversation = { ...defaultActiveConversation }
    },
    resetNotification: (state, action: PayloadAction<string>) => {
      state.notifications = { ...state.notifications, [action.payload]: 0 }
    }
  }
})

export const {
  setActiveConversation,
  setActiveConversationMessages,
  setConversations,
  addConversation,
  setPersons,
  updatePerson,
  addPerson,
  incrementNotification,
  closeActiveConversation,
  resetNotification
} = chatSlice.actions

export const getConversations = (state: RootState) => state.chat.conversations
export const getActiveConversation = (state: RootState) => ({
  ...state.chat.activeConversation
})
export const getNotifications = (state: RootState) => state.chat.notifications
export const getPersons = (state: RootState) => state.chat.persons

export default chatSlice.reducer
