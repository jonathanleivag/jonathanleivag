import { FC } from 'react'
import { IUiNavbarMenuComponentProps } from '..'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { useRouter } from 'next/router'
import { changeIsOpen } from '../../features/menu'

export interface IUiNavbarMenuOptionComponentProps
  extends IUiNavbarMenuComponentProps {
  isMobile?: boolean
}

export const UiNavbarMenuOptionComponent: FC<IUiNavbarMenuOptionComponentProps> = ({
  className,
  isMobile = false
}) => {
  const { hoverBgLi, bgLi } = useSelector((state: RootState) => state.theme)
  const { pathname, push } = useRouter()
  const dispatch = useDispatch()

  const changePage = (router: string) => {
    dispatch(changeIsOpen(false))
    setTimeout(
      () => {
        push(router)
      },
      isMobile ? 1000 : 0
    )
  }

  return (
    <ul className={`${className}`}>
      <li
        onClick={() => changePage('/')}
        className={`navbar_menu_li ${pathname === '/' && bgLi} ${hoverBgLi}`}
      >
        Inicio
      </li>
      <li
        onClick={() => changePage('/portafolio')}
        className={`navbar_menu_li ${pathname === '/portafolio' &&
          bgLi} ${hoverBgLi}`}
      >
        Portafolio
      </li>
      <li
        onClick={() => changePage('/sobre-mi')}
        className={`navbar_menu_li ${pathname === '/sobre-mi' &&
          bgLi} ${hoverBgLi}`}
      >
        Sobre mí
      </li>
      <li
        onClick={() => changePage('/contactame')}
        className={`navbar_menu_li ${pathname === '/contactame' &&
          bgLi} ${hoverBgLi}`}
      >
        Contactame
      </li>
    </ul>
  )
}
