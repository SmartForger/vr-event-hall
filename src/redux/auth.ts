import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'configs/redux-store'

interface AuthState {
  initialState: string
}

const initialState: AuthState = {
  initialState: 'signIn'
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setInitialState: (state, action: PayloadAction<string>) => {
      state.initialState = action.payload
    }
  }
})

export const { setInitialState } = authSlice.actions

export const authStateSelector = (state: RootState) => state.auth.initialState

export default authSlice.reducer
