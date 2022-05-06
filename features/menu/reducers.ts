import { PayloadAction } from '@reduxjs/toolkit'
import { IinitialStateMenu } from '.'

const changeIsOpen = (
  state: IinitialStateMenu,
  acation: PayloadAction<boolean>
) => {
  state.isOpen = acation.payload
}

const reducers = { changeIsOpen }

export default reducers
