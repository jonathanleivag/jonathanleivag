import React, { FC } from 'react'
import { IconType } from 'react-icons'

export type TTag = 'h1' | 'h2'
export interface IUiTitleComponentProps {
  title: string
  Icon: IconType
  tag?: TTag
}

export const UiTitleComponent: FC<IUiTitleComponentProps> = ({
  Icon,
  title,
  tag = 'h2'
}) => {
  return (
    <div className='py-10 flex flex-col items-start justify-center gap-2'>
      <div className='flex flex-row justify-start items-center gap-2 text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl'>
        <Icon
          className={`${tag === 'h1' &&
            'text-[2rem] md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl'}`}
        />
        {tag === 'h2' && <h2> {title} </h2>}
        {tag === 'h1' && (
          <h1 className='text-[2rem] md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl'>
            {title}
          </h1>
        )}
      </div>
      <div className='w-full border' />
    </div>
  )
}
