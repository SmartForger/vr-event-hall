import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authReducer from 'redux/auth'
import chatReducer from 'redux/chat'
import menuReducer from 'redux/menu'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    menu: menuReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
