import { TTheme } from '../features/theme'

export const themeValidUtil = (theme: string): TTheme => {
  if (theme === 'light' || theme === 'dark' || theme === 'system') {
    return theme
  } else {
    return 'system'
  }
}
