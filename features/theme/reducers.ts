import { PayloadAction } from '@reduxjs/toolkit'
import { IinitialStateTheme, TTheme } from './'

const changeTheme = (
  state: IinitialStateTheme,
  action: PayloadAction<TTheme>
) => {
  state.selected = action.payload
}

const changeColorsTheme = (
  state: IinitialStateTheme,
  action: PayloadAction<IinitialStateTheme>
) => {
  state.bg = action.payload.bg
  state.text = action.payload.text
  state.bgButton = action.payload.bgButton
  state.hoverBgLi = action.payload.hoverBgLi
  state.bgLi = action.payload.bgLi
  state.title = action.payload.title
  state.titleSpan = action.payload.titleSpan
  state.gradient = action.payload.gradient
}

const reducers = { changeTheme, changeColorsTheme }

export default reducers
