import { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'

export const PageHomeTitleComponent: FC = () => {
  const { title, titleSpan } = useSelector((state: RootState) => state.theme)
  return (
    <h1 className={`title ${title}`}>
      Hola, soy <span className={`title ${titleSpan}`}>JonathanLeivaG</span>.
    </h1>
  )
}
