import axios from 'axios'
import { GetStaticProps, GetStaticPropsResult, NextPage } from 'next'
import { MdOutlineCategory } from 'react-icons/md'
import { IHomePageProps } from '.'
import {
  PagePortafolioGithubComponent,
  UiProjectsComponent,
  UiTitleComponent
} from '../components'
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
      <PagePortafolioGithubComponent github={github} />
      <UiTitleComponent tag='h1' Icon={MdOutlineCategory} title='Proyectos' />
      <UiProjectsComponent projects={projects} />
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
        projects: [
          {
            id: '1',
            image:
              'https://raw.githubusercontent.com/jonathanleivag/teslo-shop-web/main/img.png',
            title: 'teslo-shop-web',
            url: 'https://teslo-shop.jonathanleivag.cl/',
            description:
              'Imitación de la web de tesla shop (https://shop.tesla.com/es_es/category/ropa)',
            urlGitHub: 'https://github.com/jonathanleivag/teslo-shop-web'
          },
          {
            id: '2',
            image:
              'https://github.com/jonathanleivag/nintendo/raw/master/demo.png',
            title: 'Nintendo',
            url: 'https://nintendo.jonathanleivag.cl/',
            description:
              'Imitación e inspiración de la web de Nintendo (https://www.nintendo.com/es-es/games/switch), Imitación e inspiración de la web de Nintendo (https://www.nintendo.com/es-es/games/switch), Imitación e inspiración de la web de Nintendo (https://www.nintendo.com/es-es/games/switch),Imitación e inspiración de la web de Nintendo (https://www.nintendo.com/es-es/games/switch)',
            urlGitHub: 'https://github.com/jonathanleivag/nintendo'
          },
          {
            id: '3',
            image:
              'https://raw.githubusercontent.com/jonathanleivag/favorite-pokemon/main/img.png',
            title: 'favorite-pokemon',
            url: 'https://favoritepokemon.jonathanleivag.cl/',
            description:
              'Guarda tus Pokémon favoritos en una web personalizada',
            urlGitHub: 'https://github.com/jonathanleivag/favorite-pokemon'
          }
        ],
        github: data
      }
    }
  } catch (error) {
    console.error(error)
  }

  return resp
}

export default PortafolioPage
