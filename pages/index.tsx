import { NextPage } from 'next'
import {
  PageHomeSubTitleComponent,
  PageHomeTitleComponent
} from '../components'
import { MainLayout } from '../layouts'

const HomePage: NextPage = () => {
  // Todo: agregar link en mi nombre de sobre mi

  return (
    <MainLayout>
      <PageHomeTitleComponent />
      <PageHomeSubTitleComponent />
    </MainLayout>
  )
}

export default HomePage
