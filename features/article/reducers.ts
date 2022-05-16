import { PayloadAction } from '@reduxjs/toolkit'
import { IinitialStateMenu } from '.'

const changeMenu = (
  state: IinitialStateMenu,
  acation: PayloadAction<boolean>
) => {
  state.menu = acation.payload
}

const reducers = { changeMenu }

export default reducers
