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
    <MainLayout
      title='Sobre mí'
      tags={[
        'sobre mi',
        'conocimiento',
        'educación',
        'habilidades',
        'intereses',
        'herramientas'
      ]}
      pathname={'sobre-mi'}
      description={
        'Aquí encontrarás toda la información sobre mí, mis intereses, habilidades,conocimiento, etc.'
      }
    >
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
