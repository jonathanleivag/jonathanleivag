import { createSlice } from '@reduxjs/toolkit'
import reducers from './reducers'

export interface IinitialState {
  isOpen: boolean
}

const initialState: IinitialState = {
  isOpen: false
}

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers
})

export const { changeIsOpen } = menuSlice.actions

export default menuSlice.reducer
