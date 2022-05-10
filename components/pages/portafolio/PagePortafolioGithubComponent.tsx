import Image from 'next/image'
import { FC } from 'react'
import { IGithub } from '../../../interfaces'

export interface IPagePortafolioGithubComponentProps {
  github: IGithub
}

export const PagePortafolioGithubComponent: FC<IPagePortafolioGithubComponentProps> = ({
  github
}) => {
  return (
    <div className='w-full flex flex-col md:flex-row justify-center items-center gap-4 my-10'>
      <div className='w-full md:w-[30%] xl:w-[15%] 2xl:w-[40%] flex flex-row justify-center 2xl:justify-end 2xl:pr-5 items-center'>
        <div className='w-[150px] h-[150px] shadow-md rounded-full relative'>
          <Image
            className='rounded-full'
            src={github.avatar_url}
            alt={github.bio}
            layout='fill'
            objectFit='cover'
          />
        </div>
      </div>
      <div className='w-full md:w-[70%] xl:w-[85%] 2xl:w-[60%] felx flex-col justify-center items-center md:items-start'>
        <h2 className='text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl border-b mb-2'>
          Github
        </h2>
        <p className='paragraph 2xl:pr-[30%]'>{github.bio}</p>
      </div>
    </div>
  )
}
