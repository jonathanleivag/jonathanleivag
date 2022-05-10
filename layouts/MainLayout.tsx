import Cookies from 'js-cookie'
import { FC, ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import {
  UIFooterComponent,
  UiFullScreenLoadingUiComponent,
  UiMenuMobileComponent,
  UiNavbarComponent
} from '../components'
import { changeColorsTheme, changeTheme, TTheme } from '../features/theme'

export interface IMainLayoutProps {
  children: ReactNode
}

export const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
  const dispatch = useDispatch()
  const theme = useSelector((state: RootState) => state.theme.selected)
  const { bg, text } = useSelector((state: RootState) => state.theme)

  /* Checking if the cookie is set. If it is not set, it will set the theme to system. If it is set, it
  will set the theme to the cookie value. */
  useEffect(() => {
    if (!Cookies.get('theme')) {
      dispatch(changeTheme('system'))
    } else {
      dispatch(changeTheme(Cookies.get('theme')! as TTheme))
    }
    return () => {}
  }, [dispatch])

  /* Changing the theme of the app. */
  useEffect(() => {
    switch (theme) {
      case 'dark':
        dispatch(
          changeColorsTheme({
            selected: theme,
            bg: 'bg-dark',
            text: 'text-dark-text',
            bgButton: 'bg-dark-button',
            bgLi: 'bg-dark-button',
            hoverBgLi: 'hover:bg-dark-button',
            title: 'bg-gradient-to-l from-[#00F260] to-[#0575E6]',
            titleSpan: 'bg-gradient-to-l from-[#00F260] to-[#0575E6]',
            gradient:
              'text-transparent bg-clip-text bg-gradient-to-l from-[#00F260] to-[#0575E6]'
          })
        )
        break
      case 'light':
        dispatch(
          changeColorsTheme({
            selected: theme,
            title: 'bg-gradient-to-l from-[#213547] to-[#213547]',
            titleSpan: 'bg-gradient-to-l from-[#00F260] to-[#0575E6]',
            bg: 'bg-white',
            text: 'text-light-text',
            bgButton: 'bg-light-button',
            bgLi: 'bg-light-button',
            hoverBgLi: 'hover:bg-light-button',
            gradient:
              'text-transparent bg-clip-text bg-gradient-to-l from-[#00F260] to-[#0575E6]'
          })
        )
        break
      case 'system':
        dispatch(
          changeColorsTheme({
            selected: theme,
            title:
              'bg-gradient-to-l from-[#213547] to-[#213547] dark:from-[#00F260] dark:to-[#0575E6]',
            titleSpan: 'bg-gradient-to-l from-[#00F260] to-[#0575E6]',
            bg: 'bg-white dark:bg-dark',
            text: 'text-light-text dark:text-dark-text',
            bgButton: 'bg-light-button dark:bg-dark-button',
            hoverBgLi: 'hover:bg-light-button dark:hover:bg-dark-button',
            bgLi: 'bg-light-button dark:bg-dark-button',
            gradient:
              'text-transparent bg-clip-text bg-gradient-to-l from-[#00F260] to-[#0575E6]'
          })
        )
        break
      default:
        dispatch(
          changeColorsTheme({
            selected: 'system',
            title:
              'bg-gradient-to-l from-[#213547] to-[#213547] dark:from-[#00F260] dark:to-[#0575E6]',
            titleSpan:
              'bg-gradient-to-l from-[#00F260] to-[#0575E6]  dark:from-transparent dark:to-transparent',
            bg: 'bg-white dark:bg-dark',
            text: 'text-light-text dark:text-dark-text',
            bgButton: 'bg-light-button dark:bg-dark-button',
            hoverBgLi: 'hover:bg-light-button dark:hover:bg-dark-button',
            bgLi: 'bg-light-button dark:bg-dark-button',
            gradient:
              'text-transparent bg-clip-text bg-gradient-to-l from-[#00F260] to-[#0575E6]'
          })
        )
        break
    }

    return () => {}
  }, [theme, dispatch])

  /* Adding the class names to the body tag. */
  useEffect(() => {
    document.body.className = `${bg} ${text} transform ease-in-out duration-500`
    return () => {}
  }, [bg, text])

  if (!theme) return <UiFullScreenLoadingUiComponent />

  return (
    <>
      <UiMenuMobileComponent />
      <UiNavbarComponent />
      <main className='px-5 md:px-20'>{children}</main>
      <UIFooterComponent />
    </>
  )
}
