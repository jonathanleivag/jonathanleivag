import { createSlice } from '@reduxjs/toolkit'
import reducers from './reducers'

export type TTheme = 'light' | 'dark' | 'system' | false

export interface IinitialStateTheme {
  selected: TTheme
}

const initialState: IinitialStateTheme = {
  selected: false
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers
})

export const { changeTheme } = themeSlice.actions

export default themeSlice.reducer
