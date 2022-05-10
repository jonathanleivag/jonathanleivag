import React from 'react'
import { GetStaticProps, GetStaticPropsResult, NextPage } from 'next'
import { MainLayout } from '../layouts'
import { IHomePageProps } from '.'
import { UiProjectsComponent, UiTitleComponent } from '../components'
import { MdOutlineCategory } from 'react-icons/md'

export interface IPortafolioPageProps extends IHomePageProps {}

const PortafolioPage: NextPage<IPortafolioPageProps> = ({ projects }) => {
  return (
    <MainLayout>
      <UiTitleComponent tag='h1' Icon={MdOutlineCategory} title='Proyectos' />
      <UiProjectsComponent projects={projects} />
    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps = async ctx => {
  const resp: GetStaticPropsResult<IPortafolioPageProps> = {
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

export default PortafolioPage
