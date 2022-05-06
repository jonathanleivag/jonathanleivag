import Cookies from 'js-cookie'
import { FC } from 'react'
import { BsFillSunFill } from 'react-icons/bs'
import { FaMoon } from 'react-icons/fa'
import { MdBrightnessAuto } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { IUiNavbarMenuComponentProps } from '../..'
import { RootState } from '../../../app/store'
import { changeTheme } from '../../../features/theme'

export interface IUiThemeComponent extends IUiNavbarMenuComponentProps {}

export const UiThemeComponent: FC<IUiThemeComponent> = ({ className }) => {
  const theme = useSelector((state: RootState) => state.theme.selected)
  const dispatch = useDispatch()

  const setTheme = () => {
    switch (theme) {
      case 'light':
        dispatch(changeTheme('dark'))
        Cookies.set('theme', 'dark')
        break
      case 'dark':
        dispatch(changeTheme('system'))
        Cookies.set('theme', 'system')
        break
      case 'system':
        dispatch(changeTheme('light'))
        Cookies.set('theme', 'light')
        break
      default:
        dispatch(changeTheme('system'))
        Cookies.set('theme', 'system')
        break
    }
  }

  return (
    <div
      onClick={setTheme}
      className={`navbar_button cursor-pointer ${className}`}
    >
      {theme === 'dark' && <FaMoon />}
      {theme === 'light' && <BsFillSunFill />}
      {theme === 'system' && <MdBrightnessAuto />}
    </div>
  )
}
