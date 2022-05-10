import { FC } from 'react'
import { UiArticleComponent } from '../..'
import { IHomePageProps } from '../../../pages'

export interface IPageHomeProjectsComponentProps extends IHomePageProps {}

export const PageHomeProjectsComponent: FC<IPageHomeProjectsComponentProps> = ({
  projects
}) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 pt-3 pb-5'>
      {projects.map(project => (
        <UiArticleComponent key={project.id} project={project} />
      ))}
    </div>
  )
}
