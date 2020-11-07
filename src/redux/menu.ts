import { RootState } from 'configs/redux-store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MenuState {
  drawerOpen: boolean
}

const initialState: MenuState = {
  drawerOpen: false
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleDrawer: (state, action: PayloadAction<boolean>) => {
      state.drawerOpen = action.payload
    }
  }
})

export const { toggleDrawer } = menuSlice.actions

export const menuDrawerOpen = (state: RootState) => state.menu.drawerOpen

export default menuSlice.reducer
