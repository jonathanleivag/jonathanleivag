import { FC } from 'react'

export const UiFullScreenLoadingUiComponent: FC = () => {
  return (
    <section className='h-screen w-screen flex flex-col justify-center items-center'>
      <h2 className='font-light text-[#ccc]'>Cargando</h2>
      <div className='lds-dual-ring' />
    </section>
  )
}
