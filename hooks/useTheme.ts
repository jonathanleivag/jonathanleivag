import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { useState, useEffect } from 'react'

export const useTheme = () => {
  const theme = useSelector((state: RootState) => state.theme.selected)

  const [bg, setBg] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [bgButton, setBgButton] = useState<string>('')
  const [hoverBgLi, setHoverBgLi] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [titleSpan, setTitleSpan] = useState<string>('')
  const [gradient] = useState<string>(
    'text-transparent bg-clip-text bg-gradient-to-l from-[#00F260] to-[#0575E6]'
  )

  useEffect(() => {
    switch (theme) {
      case 'dark':
        setBg('bg-dark')
        setText('text-dark-text')
        setBgButton('bg-dark-button')
        setHoverBgLi('hover:bg-dark-button')
        setTitle('bg-gradient-to-l from-[#00F260] to-[#0575E6]')
        setTitleSpan('')
        break
      case 'light':
        setBg('bg-white')
        setText('text-light-text')
        setBgButton('bg-light-button')
        setHoverBgLi('hover:bg-light-button')
        setTitle('bg-gradient-to-l from-[#213547] to-[#213547]')
        setTitleSpan('bg-gradient-to-l from-[#00F260] to-[#0575E6]')
        break
      case 'system':
        setBg('bg-white dark:bg-dark')
        setText('text-light-text dark:text-dark-text')
        setBgButton('bg-light-button dark:bg-dark-button')
        setHoverBgLi('hover:bg-light-button dark:hover:bg-dark-button')
        break
      default:
        setBg('bg-white')
        setText('text-light-text')
        setTitle(
          'bg-gradient-to-l from-[#213547] to-[#213547] dark:from-[#00F260] dark:to-[#0575E6]'
        )
        setTitleSpan(
          'bg-gradient-to-l from-[#00F260] to-[#0575E6]  dark:from-transparent dark:to-transparent'
        )
        break
    }
    return () => {}
  }, [theme])

  return { bg, text, bgButton, hoverBgLi, title, titleSpan, gradient }
}
