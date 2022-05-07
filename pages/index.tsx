import { NextPage } from 'next'
import {
  PageHomeSubTitleComponent,
  PageHomeTitleComponent
} from '../components'
import { MainLayouts } from '../layouts'

const HomePage: NextPage = () => {
  // Todo: agregar link en mi nombre de sobre mi

  return (
    <MainLayouts>
      <PageHomeTitleComponent />
      <PageHomeSubTitleComponent />
    </MainLayouts>
  )
}

export default HomePage
