import { PayloadAction } from '@reduxjs/toolkit'
import { IinitialState } from '.'

const changeIsOpen = (
  state: IinitialState,
  acation: PayloadAction<boolean>
) => {
  state.isOpen = acation.payload
}

const reducers = { changeIsOpen }

export default reducers
