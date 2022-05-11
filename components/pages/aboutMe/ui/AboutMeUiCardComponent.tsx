import { FC, ReactNode } from 'react'

export interface IAboutMeUiCardComponentProps {
  title: string
  children: ReactNode
  className?: string
}

export const AboutMeUiCardComponent: FC<IAboutMeUiCardComponentProps> = ({
  title,
  children,
  className
}) => {
  return (
    <section
      className={`w-full min-h-[400px] lg:min-h-[200px] flex flex-col ${className}`}
    >
      <div className='w-full h-[20%] flex flex-row items-center pl-2 border rounded-t-lg'>
        <p> {title} </p>
      </div>
      <div className='w-full h-[80%] pl-2 pt-2 border-l border-b border-r rounded-b-lg'>
        <section className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {children}
        </section>
      </div>
    </section>
  )
}
