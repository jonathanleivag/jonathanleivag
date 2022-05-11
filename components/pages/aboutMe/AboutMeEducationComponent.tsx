import { FC } from 'react'
import { FiBook } from 'react-icons/fi'
import { UiTitleComponent } from '../../ui'

export const AboutMeEducationComponent: FC = () => {
  return (
    <>
      <UiTitleComponent tag='h2' Icon={FiBook} title='Educación' />
      <section className='w-full flex flex-col md:flex-row justify-center items-center gap-4'>
        <p className='paragraph'>
          <span className='font-black'>
            INSTITUTO PROFESIONAL CIISA, SANTIAGO
          </span>{' '}
          Técnico en programación computacional, Enero de 2018
        </p>
        <p className='paragraph'>
          <span className='font-black'>
            INSTITUTO PROFESIONAL CIISA, SANTIAGO
          </span>{' '}
          Ingeniería en computación e informática, Noviembre de 2020
        </p>
      </section>
    </>
  )
}
