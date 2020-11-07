import React, { useReducer, createContext, Dispatch, useContext } from 'react'
import { IAskedPollQuestion } from 'types'

// export enum UserAdminType {
//   PRESENTER = 'presenter',
//   MODERATOR = 'moderator',
//   GUEST = ''
// }

interface IPollContextObject {
  question: Partial<IAskedPollQuestion>
  answerChoice: string
  loading: boolean
  pollQuestionId: string
  pollOpen: boolean
  pollMsRemaining: number
  // userType: UserAdminType
}

const initialState: IPollContextObject = {
  loading: false,
  pollQuestionId: '',
  question: {},
  answerChoice: '',
  pollOpen: false,
  pollMsRemaining: 30000 // 30 seconds
  // userType: UserAdminType.GUEST,
}

export const PollContext = createContext<{
  pollState: IPollContextObject
  dispatch: Dispatch<any>
}>({
  pollState: initialState,
  dispatch: () => null
})

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_QUESTION':
      return {
        ...state,
        ...action.payload
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    case 'SET_OPEN':
      return {
        ...state,
        pollOpen: action.payload
      }
    case 'SET_ANSWER':
      return {
        ...state,
        answerChoice: action.payload
      }
    default:
      return state
  }
}

export const PollProvider = props => {
  const [pollState, dispatch] = useReducer(reducer, initialState)

  return <PollContext.Provider value={{ pollState, dispatch }}>{props.children}</PollContext.Provider>
}

export const usePollContext = () => useContext(PollContext)
