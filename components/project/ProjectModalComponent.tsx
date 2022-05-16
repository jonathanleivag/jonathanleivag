import Image from 'next/image'
import { Dispatch, FC, SetStateAction } from 'react'
import { FiGithub } from 'react-icons/fi'
import { MdWeb } from 'react-icons/md'
import { UiModalComponent, UiTitleComponent } from '..'
import { IProjectHomePage } from '../../pages'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'

export interface IProjectModalComponentProps {
  isOpenModal: boolean
  setIsOpenModal: Dispatch<SetStateAction<boolean>>
  scrollX0: number
  scrollY0: number
  project: IProjectHomePage | undefined
}

export const ProjectModalComponent: FC<IProjectModalComponentProps> = ({
  isOpenModal,
  setIsOpenModal,
  scrollX0,
  scrollY0,
  project
}) => {
  const { border, text } = useSelector((state: RootState) => state.theme)

  return (
    <UiModalComponent
      className='w-screen h-screen md:w-[90vw] md:h-[60vh] text-black'
      isOpen={isOpenModal}
      setIsOpen={setIsOpenModal}
      scrollX0={scrollX0}
      scrollY0={scrollY0}
    >
      {project && (
        <section className='w-full h-screen md:h-[50vh] flex flex-col md:flex-row gap-4'>
          <div className='h-[30%] md:w-1/2 md:h-[50vh] w-full relative'>
            <Image
              src={project!.image}
              alt={project!.description}
              objectFit='contain'
              layout='fill'
            />
          </div>
          <div className='h-[70%] md:w-1/2 md:h-[50vh] w-full flex flex-col md:justify-center md:items-center overflow-y-auto'>
            <UiTitleComponent tag='h1' title={project!.title} />
            <p className='paragraph'> {project!.description} </p>
            <div className='w-full flex flex-col md:flex-row gap-4 justify-center items-center my-5'>
              <a
                href={project.url}
                target='_blank'
                rel='noreferrer'
                className='button_modal border border-green-600 text-green-600'
              >
                <MdWeb />
                <span>Web</span>
              </a>
              <a
                href={project.urlGitHub}
                target='_blank'
                rel='noreferrer'
                className={`button_modal ${text} ${border}`}
              >
                <FiGithub />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </section>
      )}
    </UiModalComponent>
  )
}
