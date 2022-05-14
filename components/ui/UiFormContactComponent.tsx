import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  UiErrorComponent,
  UiFullScreenLoadingUiComponent,
  UiSocialComponent
} from '..'
import { contactGql } from '../../gql'
import profile from '../../public/images/profile0.jpg'
import { axiosGraphqlUtils, toastUtil } from '../../utils'
import { contactValidation } from '../../validations'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export interface IUiFormContact {
  name: string
  email: string
  message: string
}

export const UiFormContactComponent: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<IUiFormContact>({
    defaultValues: {
      name: '',
      email: '',
      message: ''
    },
    resolver: yupResolver(contactValidation),
    mode: 'onChange'
  })

  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = handleSubmit(async data => {
    setLoading(true)
    try {
      const axios = await axiosGraphqlUtils({
        query: contactGql,
        variables: { input: data }
      })
      if (!axios.errors) {
        toastUtil({ message: axios.data.contact, type: 'success' })
        reset()
        setLoading(false)
      } else {
        toastUtil({ message: axios.errors.message[0], type: 'error' })
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
      toastUtil({ message: 'Error al enviar el mensaje', type: 'error' })
      setLoading(false)
    }
  })

  return (
    <section className='flex flex-col lg:flex-row relative'>
      <ToastContainer />
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
      {loading && (
        <UiFullScreenLoadingUiComponent className='w-full lg:w-[60%] h-96' />
      )}
      {!loading && (
        <form
          className='w-full lg:w-[60%] flex flex-row justify-center items-center'
          onSubmit={onSubmit}
        >
          <div className='w-full sm:w-[60%] flex flex-col gap-4 py-5'>
            <div className='w-full flex flex-col'>
              <label htmlFor='name'>Nombre:</label>
              <input
                type='text'
                id='name'
                className='h-10 focus:outline-none bg-transparent border px-2 py-1'
                placeholder='Ingrese su nombre'
                {...register('name')}
              />
              <UiErrorComponent
                isError={errors.name !== undefined}
                message={errors.name?.message || ''}
              />
            </div>
            <div className='w-full flex flex-col'>
              <label htmlFor='email'>Correo:</label>
              <input
                className='h-10 focus:outline-none bg-transparent border px-2 py-1'
                type='email'
                placeholder='Ingrese su correo'
                id='email'
                {...register('email')}
              />
              <UiErrorComponent
                isError={errors.email !== undefined}
                message={errors.email?.message || ''}
              />
            </div>
            <div className='w-full flex flex-col'>
              <label htmlFor='message'>Mensaje:</label>
              <textarea
                className='focus:outline-none bg-transparent border resize-none px-2 py-1'
                placeholder='Ingrese su mensaje'
                rows={5}
                id='message'
                {...register('message')}
              />
              <UiErrorComponent
                isError={errors.message !== undefined}
                message={errors.message?.message || ''}
              />
            </div>
            <button type='submit' className='w-full h-12 border'>
              Enviar mensaje
            </button>
          </div>
        </form>
      )}
    </section>
  )
}
