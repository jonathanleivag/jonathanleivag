import Image from 'next/image'
import { FC } from 'react'
import { FaUserAstronaut } from 'react-icons/fa'
import { UiTitleComponent } from '../..'
import profile from '../../../public/images/profile.jpg'

export const AboutMeProfileComponent: FC = () => {
  return (
    <>
      <UiTitleComponent
        tag='h2'
        Icon={FaUserAstronaut}
        title='Perfil personal'
      />
      <section className='w-full flex flex-row justify-center items-center'>
        <div className='w-full 2xl:w-[80%] flex flex-col lg:flex-row gap-5'>
          <div className='w-full lg:w-[30%] xl:w-[25%] 2xl:w-[15%] flex flex-row justify-center items-center'>
            <div className='relative w-[200px] h-[200px] rounded-full'>
              <Image
                className='rounded-full'
                src={profile}
                alt='Imagen de Jonathan Leiva Gómez'
                layout='fill'
                placeholder='blur'
                objectFit='cover'
              />
            </div>
          </div>
          <div className='w-full flex flex-row justify-center items-center lg:w-[70%] xl:w-[75%] 2xl:w-[85%]'>
            <p className='paragraph text-justify'>
              Soy egresado del instituto profesional CIISA, en donde
              primeramente cursé la carrera técnico profesional en Programación
              Computacional y posteriormente la carrera profesional de
              Ingeniería Computacional e Informática. Me considero una persona
              proactiva, dando siempre lo mejor de mí para cumplir y alcanzar
              las metas que me proponga. Además, mi principal objetivo es estar
              en constante perfeccionamiento, con el fin de aprender cosas
              nuevas y así poder ampliar mi conocimiento y experiencia laboral.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
