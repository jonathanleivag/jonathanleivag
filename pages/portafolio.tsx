import axios from 'axios'
import { GetStaticProps, GetStaticPropsResult, NextPage } from 'next'
import { MdOutlineCategory } from 'react-icons/md'
import { IHomePageProps } from '.'
import {
  PagePortafolioGithubComponent,
  UiProjectsComponent,
  UiTitleComponent
} from '../components'
import { projects } from '../database'
import { IGithub } from '../interfaces'
import { MainLayout } from '../layouts'

export interface IPortafolioPageProps extends IHomePageProps {
  github: IGithub
}

const PortafolioPage: NextPage<IPortafolioPageProps> = ({
  projects,
  github
}) => {
  return (
    <MainLayout>
      <UiTitleComponent tag='h1' Icon={MdOutlineCategory} title='Proyectos' />
      <PagePortafolioGithubComponent github={github} />
      <UiProjectsComponent projects={projects} />
      <div className='w-full flex flex-row justify-center'>
        <a
          href='https://github.com/jonathanleivag?tab=repositories'
          target='_blank'
          rel='noreferrer'
          className='px-5 py-1 border border-green-600 text-green-600 rounded-full'
        >
          Ver mas
        </a>
      </div>
    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps = async ctx => {
  let resp: GetStaticPropsResult<IPortafolioPageProps | {}> = {
    props: {}
  }

  try {
    const { data } = await axios.get<IGithub>(
      'https://api.github.com/users/jonathanleivag'
    )
    resp = {
      props: {
        projects,
        github: data
      }
    }
  } catch (error) {
    console.error(error)
  }

  return resp
}

export default PortafolioPage
