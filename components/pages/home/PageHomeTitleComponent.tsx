import { FC } from 'react'
import { useTheme } from '../../../hooks'

export const PageHomeTitleComponent: FC = () => {
  const { title, titleSpan } = useTheme()
  return (
    <h1 className={`title ${title}`}>
      Hola, soy <span className={`title ${titleSpan}`}>JonathanLeivaG</span>.
    </h1>
  )
}
