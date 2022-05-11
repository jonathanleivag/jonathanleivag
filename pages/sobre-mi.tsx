import React from 'react'
import { NextPage } from 'next'
import { MainLayout } from '../layouts'
import {
  AboutMeEducationComponent,
  AboutMeInterestsComponent,
  AboutMeKnowledgeComponent,
  AboutMeOtherEducationComponent,
  AboutMeProfileComponent,
  AboutMeSkillsComponent,
  UiTitleComponent
} from '../components'

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
