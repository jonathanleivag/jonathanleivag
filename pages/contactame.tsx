import React from 'react'
import { NextPage } from 'next'
import { MainLayout } from '../layouts'
import { UiFormContactComponent, UiTitleComponent } from '../components'

const ContactMePage: NextPage = () => {
  return (
    <MainLayout>
      <UiTitleComponent tag='h1' title='Contáctame' />
      <UiFormContactComponent />
    </MainLayout>
  )
}

export default ContactMePage
