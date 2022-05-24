import { NextPage } from 'next'
import { MainLayout } from '../layouts'

const CustomNoFoundPage: NextPage = () => {
  return (
    <MainLayout
      title={'Page not found'}
      description={'No hay nada para mostrar'}
      tags={[]}
      pathname={''}
    >
      <div className='w-full h-[calc(100vh-200px)] flex flex-col md:flex-row justify-center items-center'>
        <h1 className='text-6xl font-bold'>
          <span className='flex flex-row justify-center items-center gap-2'>
            404 <span className='hidden md:block'> | </span>
          </span>
        </h1>
        <p className='ml-4 font-light'>Página no encontrada</p>
      </div>
    </MainLayout>
  )
}

export default CustomNoFoundPage
