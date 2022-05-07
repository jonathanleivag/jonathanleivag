import { FC } from 'react'
import { IUiNavbarMenuComponentProps } from '..'
import { useTheme } from '../../hooks'

export interface IUiNavbarMenuOptionComponentProps
  extends IUiNavbarMenuComponentProps {}

export const UiNavbarMenuOptionComponent: FC<IUiNavbarMenuOptionComponentProps> = ({
  className
}) => {
  const { hoverBgLi } = useTheme()

  return (
    <ul className={`${className}`}>
      <li className={`navbar_menu_li ${hoverBgLi}`}>Inicio</li>
      <li className={`navbar_menu_li ${hoverBgLi}`}>Portafolio</li>
      <li className={`navbar_menu_li ${hoverBgLi}`}>Sobre mí</li>
      <li className={`navbar_menu_li ${hoverBgLi}`}>Contactame</li>
    </ul>
  )
}
