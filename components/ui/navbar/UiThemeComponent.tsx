import React, { FC } from 'react'
import { IUiNavbarMenuComponentProps } from '../..'
import { FaMoon } from 'react-icons/fa'

export interface IUiThemeComponent extends IUiNavbarMenuComponentProps {}

export const UiThemeComponent: FC<IUiThemeComponent> = ({ className }) => {
  return (
    <div className={`navbar_button ${className}`}>
      <FaMoon />
    </div>
  )
}
