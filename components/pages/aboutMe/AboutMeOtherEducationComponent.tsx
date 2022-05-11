import { FC } from 'react'
import { HiOutlineCursorClick } from 'react-icons/hi'
import { UiTitleComponent } from '../../ui'

export const AboutMeOtherEducationComponent: FC = () => {
  return (
    <>
      <UiTitleComponent
        tag='h2'
        Icon={HiOutlineCursorClick}
        title='Cursos en linea'
      />
      <section className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-center gap-4'>
        <p className='paragraph border p-1'>
          <span className='font-black block'>
            MASTER EN JAVASCRIPT: APRENDER JS, JQUERY, NODEJS - Víctor Robles,
            Desarrollador web y profesor de Udemy
          </span>
          En este curso adquirí un amplio conocimiento de JavaScript y su
          principales framework de desarrollo frontend y backend.
        </p>
        <p className='paragraph border p-1'>
          <span className='font-black block'>
            REACT: DE CERO A EXPERTO ( HOOKS Y MERN ) - Fernando Herrera A
            Full-Stack Developer & Teacher
          </span>{' '}
          En este curso robustecí el conocimiento adquirido del lenguaje de
          programación JavaScript y la librería de JavaScript React.
        </p>
        <p className='paragraph border p-1'>
          <span className='font-black block'>
            REACT NATIVE - CREA APLICACIONES PARA ANDROID Y IOS C/ REACT - Juan
            Pablo De la torre Valdez
          </span>{' '}
          En este curso aprendí cómo realizar aplicaciones móviles con la
          tecnología web que ofrece React, realizando aplicaciones móviles
          híbridas con características nativas de cada dispositivo móvil.
        </p>
        <p className='paragraph border p-1'>
          <span className='font-black block'>
            Vue.js: De cero a experto - Fernando Herrera A Full-Stack Developer
            & Teacher
          </span>{' '}
          Con este curso aprendí a utilizar Vue 3 - aplicar Vue en proyectos
          existente y realizar proyecto desde cero.
        </p>

        <p className='paragraph border p-1'>
          <span className='font-black block'>
            Next.js: El framework de React para producción - Fernando Herrera A
            Full-Stack Developer & Teacher
          </span>{' '}
          Next.js te brinda una excelente experiencia de desarrollo con todas
          las funciones que necesita para la producción: renderizado híbrido
          estático y de servidor, agrupación inteligente, precarga de rutas
        </p>
      </section>
    </>
  )
}
