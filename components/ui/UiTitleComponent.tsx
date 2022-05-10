import React, { FC } from 'react'
import { IconType } from 'react-icons'

export interface IUiTitleComponentProps {
  title: string
  Icon: IconType
}

export const UiTitleComponent: FC<IUiTitleComponentProps> = ({
  Icon,
  title
}) => {
  return (
    <div className='py-10 flex flex-col items-start justify-center gap-2'>
      <div className='flex flex-row justify-start items-center gap-2 text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl'>
        <Icon />
        <h2> {title} </h2>
      </div>
      <div className='w-full border' />
    </div>
  )
}
