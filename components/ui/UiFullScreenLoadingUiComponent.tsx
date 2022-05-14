import { FC } from 'react'

export interface IUiFullScreenLoadingUiComponent {
  className?: string
}

export const UiFullScreenLoadingUiComponent: FC<IUiFullScreenLoadingUiComponent> = ({
  className = 'h-screen w-screen'
}) => {
  return (
    <section
      className={`${className} flex flex-col justify-center items-center`}
    >
      <h2 className='font-light text-[#ccc]'>Cargando</h2>
      <div className='lds-dual-ring' />
    </section>
  )
}
