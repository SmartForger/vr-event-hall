import React, { useReducer, createContext, Dispatch, useContext } from 'react'
import { IUser } from 'types'

interface IAppContextObject {
  user: IUser | null
  postStream: boolean
}

const initialState = {
  user: null,
  postStream: false
}

export const AppContext = createContext<{
  appState: IAppContextObject
  dispatch: Dispatch<any>
  setUser: (payload: IUser) => void
  setPostLiveStream: (payload: boolean) => void
}>({
  appState: initialState,
  dispatch: () => null,
  setUser: () => null,
  setPostLiveStream: () => null
})

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      }
    case 'SET_POST_LIVE_STREAM':
      return {
        ...state,
        postStream: action.payload
      }
    default:
      return state
  }
}

export const AppStateProvider = props => {
  const [appState, dispatch] = useReducer(reducer, initialState)

  const setUser = (payload: IUser) => {
    return dispatch({ type: 'SET_USER', payload })
  }

  const setPostLiveStream = (isPostLS: boolean) => {
    return dispatch({ type: 'SET_POST_LIVE_STREAM', payload: isPostLS })
  }

  return (
    <AppContext.Provider value={{ appState, dispatch, setUser, setPostLiveStream }}>
      {props.children}
    </AppContext.Provider>
  )
}

export const useAppState = () => useContext(AppContext)
