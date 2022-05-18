import React, { FC } from 'react'
import { UiTitleComponent } from '../../ui'
import { GiSkills } from 'react-icons/gi'

export const AboutMeSkillsComponent: FC = () => {
  return (
    <>
      <UiTitleComponent tag='h2' Icon={GiSkills} title='Habilidades' />
      <section className='w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4'>
        <p className='paragraph text-justify md:text-left lg:text-justify'>
          <span className='font-black block'>
            AUTOADIDACTA - AUTOAPRENDIZAJE:
          </span>
          Tecnologías de mi agrado, lo cual me ha ayudado desarrollar la
          habilidad de aprender rápidamente las tecnologias de desarrollo web.
        </p>

        <p className='paragraph text-justify md:text-left lg:text-justify'>
          <span className='font-black block'>CREATIVIDAD:</span>
          Al momento de enfrentarme con diversos problemas intento buscar más
          que una solución a estos, llevándolo a cabo de la mejor manera
          posible.
        </p>

        <p className='paragraph text-justify md:text-left lg:text-justify md:col-span-2 2xl:col-span-1'>
          <span className='font-black block'>PERSISTENCIA Y CONSTANCIA:</span>
          En cada instancia doy lo mejor de mí, tanto en el plano personal como
          profesional, por lo que, me enfoco en la meta que deseo alcanzar, no
          rindiéndome ante las dificultades que se presenten.
        </p>
      </section>
    </>
  )
}
