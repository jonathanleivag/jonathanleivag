import { createSlice } from '@reduxjs/toolkit'
import reducers from './reducers'

export interface IinitialStateMenu {
  menu: boolean
}

const initialState: IinitialStateMenu = {
  menu: false
}

const menuSlice = createSlice({
  name: 'article',
  initialState,
  reducers
})

export const { changeMenu } = menuSlice.actions

export default menuSlice.reducer
