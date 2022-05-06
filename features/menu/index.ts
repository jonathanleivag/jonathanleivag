import { createSlice } from '@reduxjs/toolkit'
import reducers from './reducers'

export interface IinitialStateMenu {
  isOpen: boolean
}

const initialState: IinitialStateMenu = {
  isOpen: false
}

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers
})

export const { changeIsOpen } = menuSlice.actions

export default menuSlice.reducer
