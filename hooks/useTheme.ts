import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { useState, useEffect } from 'react'

export const useTheme = () => {
  const theme = useSelector((state: RootState) => state.theme.selected)

  const [bg, setBg] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [bgButton, setBgButton] = useState<string>('')

  useEffect(() => {
    switch (theme) {
      case 'dark':
        setBg('bg-dark')
        setText('text-dark-text')
        setBgButton('bg-dark-button')
        break
      case 'light':
        setBg('bg-white')
        setText('text-light-text')
        setBgButton('bg-light-button')
        break
      case 'system':
        setBg('bg-white dark:bg-dark')
        setText('text-light-text dark:text-dark-text')
        setBgButton('bg-light-button dark:bg-dark-button')
        break
      default:
        setBg('bg-white')
        setText('text-light-text')
        break
    }
    return () => {}
  }, [theme])

  return { bg, text, bgButton }
}
