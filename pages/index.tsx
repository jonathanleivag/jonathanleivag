import { GetStaticProps, GetStaticPropsResult, NextPage } from 'next'
import { TiContacts } from 'react-icons/ti'
import { MdOutlineCategory } from 'react-icons/md'
import {
  UiProjectsComponent,
  PageHomeSubTitleComponent,
  PageHomeTitleComponent,
  UiTitleComponent,
  UiFormContactComponent
} from '../components'
import { projects, mentor } from '../database'
import { MainLayout } from '../layouts'
import { SiFrontendmentor } from 'react-icons/si'

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
    <MainLayout
      title='Inicio'
      tags={['inicio', 'portafolio', 'jonathanleivag', 'home']}
      pathname={''}
      description={'Inicio en el portafolio de jonathanleivag'}
    >
      <PageHomeTitleComponent />
      <PageHomeSubTitleComponent />
      <UiTitleComponent
        Icon={MdOutlineCategory}
        title='Proyectos principales '
      />
      <UiProjectsComponent projects={projects.reverse().slice(0, 3)} />
      <UiTitleComponent Icon={SiFrontendmentor} title='Frontend Mentor' />
      <UiProjectsComponent projects={mentor.reverse().slice(0, 3)} />
      <UiTitleComponent tag='h2' Icon={TiContacts} title='Contáctame' />
      <UiFormContactComponent />
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
