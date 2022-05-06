import { PayloadAction } from '@reduxjs/toolkit'
import { IinitialStateTheme, TTheme } from './'

const changeTheme = (
  state: IinitialStateTheme,
  action: PayloadAction<TTheme>
) => {
  state.selected = action.payload
}

const reducers = { changeTheme }

export default reducers
