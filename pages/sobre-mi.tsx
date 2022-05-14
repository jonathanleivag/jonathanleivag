import { NextPage } from 'next'
import {
  AboutMeEducationComponent,
  AboutMeInterestsComponent,
  AboutMeKnowledgeComponent,
  AboutMeOtherEducationComponent,
  AboutMeProfileComponent,
  AboutMeSkillsComponent,
  UiTitleComponent
} from '../components'
import { MainLayout } from '../layouts'

const AboutMePage: NextPage = () => {
  return (
    <MainLayout>
      <UiTitleComponent tag='h1' title='Sobre mí' />
      <AboutMeProfileComponent />
      <AboutMeEducationComponent />
      <AboutMeOtherEducationComponent />
      <AboutMeSkillsComponent />
      <AboutMeInterestsComponent />
      <AboutMeKnowledgeComponent />
    </MainLayout>
  )
}

export default AboutMePage
