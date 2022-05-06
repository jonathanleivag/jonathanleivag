import { FC } from 'react'
import { IUiNavbarMenuComponentProps } from '../..'

export interface IUiNavbarMenuOptionComponentProps
  extends IUiNavbarMenuComponentProps {}

export const UiNavbarMenuOptionComponent: FC<IUiNavbarMenuOptionComponentProps> = ({
  className
}) => {
  return (
    <ul className={`${className} gap-3`}>
      <li className='navbar_menu_li'>Inicio</li>
      <li className='navbar_menu_li'>Portafolio</li>
      <li className='navbar_menu_li'>Sobre mí</li>
      <li className='navbar_menu_li'>Contactame</li>
    </ul>
  )
}
