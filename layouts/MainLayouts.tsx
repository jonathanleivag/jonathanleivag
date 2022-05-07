import Cookies from 'js-cookie'
import { FC, ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import {
  UiFullScreenLoadingUiComponent,
  UiMenuMobileComponent,
  UiNavbarComponent
} from '../components'
import { changeTheme } from '../features/theme'
import { useTheme } from '../hooks'
import { themeValidUtil } from '../utils'

export interface IMainLayoutProps {
  children: ReactNode
}

export const MainLayouts: FC<IMainLayoutProps> = ({ children }) => {
  const theme = useSelector((state: RootState) => state.theme.selected)
  const dispatch = useDispatch()
  const { bg, text } = useTheme()

  useEffect(() => {
    if (!Cookies.get('theme')) {
      dispatch(changeTheme('system'))
    } else {
      dispatch(changeTheme(themeValidUtil(Cookies.get('theme')!)))
    }
    return () => {}
  }, [dispatch])

  if (!theme) return <UiFullScreenLoadingUiComponent />

  return (
    <section className={`min-w-full min-h-screen ${bg} ${text}`}>
      <UiMenuMobileComponent />
      <UiNavbarComponent />
      <main className='px-5 md:px-20'>{children}</main>
    </section>
  )
}
