import Image from 'next/image'
import { FC, useState, useEffect } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { UiArticleMenuComponent } from '../..'
import { RootState } from '../../../app/store'
import { changeMenu } from '../../../features/article'
import { IProjectHomePage } from '../../../pages'

export interface IUiArticleComponentProps {
  project: IProjectHomePage
  onClick: (project: IProjectHomePage) => void
}

export const UiArticleComponent: FC<IUiArticleComponentProps> = ({
  project,
  onClick
}) => {
  const bgButton = useSelector((state: RootState) => state.theme.bgButton)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const menu = useSelector((state: RootState) => state.article.menu)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!menu) setIsOpen(false)
    return () => {}
  }, [menu])

  const handleIsOpen = () => {
    setIsOpen(true)
    dispatch(changeMenu(true))
  }

  return (
    <article
      className={`w-full h-80 ${bgButton} rounded-md p-2 flex flex-col shadow-md ${!menu &&
        'transform ease-in-out duration-500 hover:scale-[1.01]'}`}
      key={project.id}
    >
      <div className='w-full h-[20%] flex flex-row justify-start items-center gap-2 relative'>
        <h3 className='w-[95%] text-sm md:text-md xl:text-lg 2xl:text-xl'>
          {project.title}
        </h3>
        <div onClick={handleIsOpen} className='w-[5%] cursor-context-menu'>
          <BsThreeDotsVertical />
        </div>
        <UiArticleMenuComponent
          onClick={() => onClick(project)}
          project={project}
          isOpen={isOpen}
        />
      </div>

      <div
        onClick={() => onClick(project)}
        className='h-[80%] flex flex-col cursor-pointer'
      >
        <div className='w-full h-[60%] relative'>
          <Image
            src={project.image}
            alt={project.description}
            layout='fill'
            objectFit='cover'
          />
        </div>
        <div className='w-full h-[40%] overflow-hidden'>
          <p className='p-2 text-xs md:text-sm xl:text-base'>
            {project.description.length >= 100
              ? `${project.description.substring(0, 100)}...`
              : project.description}
          </p>
        </div>
      </div>
    </article>
  )
}
