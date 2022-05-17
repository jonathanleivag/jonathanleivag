import React from 'react'
import { NextPage } from 'next'
import { MainLayout } from '../layouts'
import { UiFormContactComponent, UiTitleComponent } from '../components'

const ContactMePage: NextPage = () => {
  return (
    <MainLayout
      title='Cantactame'
      tags={['contactame', 'jonathanleivag', 'portafolio', 'contacto']}
      pathname={'contactame'}
      description={'Contactame'}
    >
      <div className='w-full min-h-[65vh] flex flex-row justify-center items-center'>
        <div className='w-full h-full'>
          <UiTitleComponent tag='h1' title='Contáctame' />
          <UiFormContactComponent />
        </div>
      </div>
    </MainLayout>
  )
}

export default ContactMePage
