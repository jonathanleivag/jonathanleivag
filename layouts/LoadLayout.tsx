import Cookies from 'js-cookie'
import { FC, ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { UiFullScreenLoadingUiComponent } from '../components'
import { changeColorsTheme, changeTheme, TTheme } from '../features/theme'

export interface ILoadLayoutProps {
  children: ReactNode
}

export const LoadLayout: FC<ILoadLayoutProps> = ({ children }) => {
  const dispatch = useDispatch()
  const theme = useSelector((state: RootState) => state.theme.selected)

  useEffect(() => {
    if (!Cookies.get('theme')) {
      dispatch(changeTheme('system'))
    } else {
      dispatch(changeTheme(Cookies.get('theme')! as TTheme))
    }
    return () => {}
  }, [dispatch])

  useEffect(() => {
    switch (theme) {
      case 'dark':
        dispatch(
          changeColorsTheme({
            selected: theme,
            bg: 'bg-dark',
            text: 'text-dark-text',
            bgButton: 'bg-dark-button',
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
            gradient:
              'text-transparent bg-clip-text bg-gradient-to-l from-[#00F260] to-[#0575E6]'
          })
        )
        break
    }

    return () => {}
  }, [theme, dispatch])

  if (!theme) return <UiFullScreenLoadingUiComponent />

  return <>{children}</>
}
