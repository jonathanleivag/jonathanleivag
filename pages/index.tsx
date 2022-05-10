import { GetStaticProps, GetStaticPropsResult, NextPage } from 'next'
import { MdOutlineCategory } from 'react-icons/md'
import {
  PageHomeProjectsComponent,
  PageHomeSubTitleComponent,
  PageHomeTitleComponent,
  UiTitleComponent
} from '../components'
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
      <PageHomeProjectsComponent projects={projects} />
    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps = async ctx => {
  const resp: GetStaticPropsResult<IHomePageProps> = {
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
          description: 'Guarda tus Pokémon favoritos en una web personalizada',
          urlGitHub: 'https://github.com/jonathanleivag/favorite-pokemon'
        }
      ]
    }
  }
  return resp
}

export default HomePage
