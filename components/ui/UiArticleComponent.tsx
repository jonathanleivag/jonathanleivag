import Image from 'next/image'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { IProject } from '../../pages'

export interface IUiArticleComponentProps {
  project: IProject
}

export const UiArticleComponent: FC<IUiArticleComponentProps> = ({
  project
}) => {
  const bgButton = useSelector((state: RootState) => state.theme.bgButton)
  return (
    <article
      className={`w-full h-80 ${bgButton} rounded-md px-2 flex flex-col shadow-md transform ease-in-out duration-500 hover:scale-105`}
      key={project.id}
    >
      <div className='w-full h-[20%] flex flex-row justify-start items-center'>
        <h3 className='text-sm md:text-md xl:text-lg 2xl:text-xl'>
          {project.title}
        </h3>
      </div>
      <div className='w-full h-[50%] relative'>
        <Image
          src={project.image}
          alt={project.description}
          layout='fill'
          objectFit='cover'
        />
      </div>
      <div className='w-full h-[30%] overflow-hidden'>
        <p className='p-2 text-xs md:text-sm xl:text-base'>
          {project.description.length >= 100
            ? `${project.description.substring(0, 100)}...`
            : project.description}
        </p>
      </div>
    </article>
  )
}
