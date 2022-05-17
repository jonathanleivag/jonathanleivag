import { FC, useState } from 'react'
import { ProjectModalComponent, UiArticleComponent } from '..'
import { IHomePageProps, IProjectHomePage } from '../../pages'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../app/store'
import { changeMenu } from '../../features/article'

export interface IPageHomeProjectsComponentProps extends IHomePageProps {}
export type TProjectSelected = IProjectHomePage | undefined

export const UiProjectsComponent: FC<IPageHomeProjectsComponentProps> = ({
  projects
}) => {
  const menu = useSelector((state: RootState) => state.article.menu)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const dispatch = useDispatch()
  const [projectSelected, setProjectSelected] = useState<TProjectSelected>()

  const handleIsOpenModal = (project: IProjectHomePage) => {
    setIsOpenModal(true)
    setProjectSelected(project)
  }

  return (
    <>
      {menu && (
        <div
          onClick={() => dispatch(changeMenu(false))}
          className='fixed z-40 inset-0 min-h-screen'
        />
      )}

      <ProjectModalComponent
        project={projectSelected}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        scrollX0={window.scrollX}
        scrollY0={window.scrollY}
      />

      <div className='w-full flex flex-row justify-center items-center'>
        <div className='w-full md:w-[90%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 pt-3 pb-5'>
          {projects.map(project => (
            <UiArticleComponent
              onClick={handleIsOpenModal}
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </div>
    </>
  )
}
