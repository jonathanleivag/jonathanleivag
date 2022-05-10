import { createSlice } from '@reduxjs/toolkit'
import reducers from './reducers'

export type TTheme = 'light' | 'dark' | 'system' | false

export interface IinitialStateTheme {
  selected: TTheme
  bg: string
  text: string
  bgButton: string
  bgLi: string
  hoverBgLi: string
  title: string
  titleSpan: string
  gradient: string
}

const initialState: IinitialStateTheme = {
  selected: false,
  bg: '',
  text: '',
  bgButton: '',
  bgLi: '',
  hoverBgLi: '',
  title: '',
  titleSpan: '',
  gradient: ''
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers
})

export const { changeTheme, changeColorsTheme } = themeSlice.actions

export default themeSlice.reducer
