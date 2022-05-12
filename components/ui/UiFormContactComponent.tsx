import Image from 'next/image'
import { FC } from 'react'
import { UiSocialComponent } from '..'
import profile from '../../public/images/profile0.jpg'

export const UiFormContactComponent: FC = () => {
  return (
    <section className='flex flex-col lg:flex-row'>
      <div className='w-full hidden lg:flex flex-row justify-center items-center md:w-[40%] relative'>
        <Image
          src={profile}
          placeholder='blur'
          layout='fill'
          objectFit='cover'
          alt='Foto de Jonathan Leiva Gómez'
        />
        <div className='w-full absolute flex flex-col bottom-0 py-3 px-3 bg-gray-500 bg-opacity-75 text-white'>
          <h3 className='mx-3 text-2xl'>Jonathan Leiva Gómez</h3>
          <UiSocialComponent className='text-2xl' />
        </div>
      </div>
      <form className='w-full lg:w-[60%] flex flex-row justify-center items-center'>
        <div className='w-full sm:w-[60%] flex flex-col gap-4 py-5'>
          <div className='w-full flex flex-col'>
            <label htmlFor='name'>Nombre:</label>
            <input
              type='text'
              name='name'
              id='name'
              className='h-10 focus:outline-none bg-transparent border px-2 py-1'
              placeholder='Ingrese su nombre'
            />
          </div>
          <div className='w-full flex flex-col'>
            <label htmlFor='email'>Correo:</label>
            <input
              className='h-10 focus:outline-none bg-transparent border px-2 py-1'
              type='email'
              placeholder='Ingrese su correo'
              name='email'
              id='email'
            />
          </div>
          <div className='w-full flex flex-col'>
            <label htmlFor='message'>Mensaje:</label>
            <textarea
              className='focus:outline-none bg-transparent border resize-none px-2 py-1'
              name='message'
              placeholder='Ingrese su mensaje'
              rows={5}
              id='message'
            />
          </div>
          <button type='submit' className='w-full h-12 border'>
            Enviar mensaje
          </button>
        </div>
      </form>
    </section>
  )
}
