import { GetStaticProps, GetStaticPropsResult, NextPage } from 'next'
import { MdOutlineCategory } from 'react-icons/md'
import {
  UiProjectsComponent,
  PageHomeSubTitleComponent,
  PageHomeTitleComponent,
  UiTitleComponent
} from '../components'
import { projects } from '../database'
import { MainLayout } from '../layouts'

export interface IProjectHomePage {
  id: string
  image: string
  title: string
  url: string
  description: string
  urlGitHub: string
}
export interface IHomePageProps {
  projects: IProjectHomePage[]
}

const HomePage: NextPage<IHomePageProps> = ({ projects }) => {
  return (
    <MainLayout>
      <PageHomeTitleComponent />
      <PageHomeSubTitleComponent />
      <UiTitleComponent
        Icon={MdOutlineCategory}
        title='Proyectos principales '
      />
      <UiProjectsComponent projects={projects} />
    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps = async ctx => {
  const resp: GetStaticPropsResult<IHomePageProps> = {
    props: {
      projects
    }
  }
  return resp
}

export default HomePage
