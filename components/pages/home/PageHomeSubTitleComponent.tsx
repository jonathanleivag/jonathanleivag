import { FC } from 'react'
import { useTheme } from '../../../hooks'

export const PageHomeSubTitleComponent: FC = () => {
  const { gradient } = useTheme()
  return (
    <p className='text-xl md:px-14 2xl:px-40 3xl:px-96 font-light'>
      Bienvenido a mi web, mi nombre es{' '}
      <a className={`${gradient}`}>Jonathan Leiva</a>, soy egresado del
      instituto profesional{' '}
      <a
        href='https://ciisa.cl/'
        target='_blank'
        rel='noreferrer'
        className={`${gradient}`}
      >
        CIISA
      </a>
      , en donde cursé la carrera Programación Computacional y la Ingeniería
      Computacional e Informática. Aquí sabras más de mi y mis conocimientos e
      intereses.
    </p>
  )
}
