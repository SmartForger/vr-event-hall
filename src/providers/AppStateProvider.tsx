import React, { useReducer, createContext, Dispatch, useContext } from 'react'
import { IUser } from 'types'

interface IAppContextObject {
  user: IUser | null
}

const initialState = {
  user: null
}

export const AppContext = createContext<{
  appState: IAppContextObject
  dispatch: Dispatch<any>
  setUser: (payload: IUser) => void
}>({
  appState: initialState,
  dispatch: () => null,
  setUser: () => null
})

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
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

  return <AppContext.Provider value={{ appState, dispatch, setUser }}>{props.children}</AppContext.Provider>
}

export const useAppState = () => useContext(AppContext)
