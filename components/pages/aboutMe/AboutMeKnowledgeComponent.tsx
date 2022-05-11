import React, { FC } from 'react'
import { UiTitleComponent } from '../../ui'
import { GrGraphQl, GrReactjs } from 'react-icons/gr'
import {
  SiApollographql,
  SiExpo,
  SiExpress,
  SiNextdotjs,
  SiPostman,
  SiTypescript,
  SiVisualstudiocode
} from 'react-icons/si'
import { IoLogoJavascript } from 'react-icons/io'
import { RiVuejsFill } from 'react-icons/ri'
import { ImHtmlFive } from 'react-icons/im'
import { DiMongodb, DiMysql } from 'react-icons/di'
import { AboutMeUiCardComponent } from './ui'
import { FaNodeJs } from 'react-icons/fa'
import { AiFillGithub } from 'react-icons/ai'

export const AboutMeKnowledgeComponent: FC = () => {
  return (
    <>
      <UiTitleComponent tag='h2' Icon={GrReactjs} title='Conocimiento' />
      <section className='w-full grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <AboutMeUiCardComponent title='Front-end'>
          <a
            href='https://reactjs.org/'
            target='_blank'
            rel='noreferrer'
            className='w-full flex flex-col justify-center items-center hover:text-react'
          >
            <GrReactjs className='w-[40px] h-[40px]' />
            <p>React</p>
          </a>

          <a
            href='https://developer.mozilla.org/es/docs/Web/JavaScript'
            target='_blank'
            rel='noreferrer'
            className='w-full flex flex-col justify-center items-center hover:text-javascript'
          >
            <IoLogoJavascript className='w-[40px] h-[40px]' />
            <p>JavaScript</p>
          </a>

          <a
            href='https://www.typescriptlang.org/'
            target='_blank'
            rel='noreferrer'
            className='w-full flex flex-col justify-center items-center hover:text-typescript'
          >
            <SiTypescript className='w-[40px] h-[40px]' />
            <p>TypeScript</p>
          </a>

          <a
            href='https://vuejs.org/'
            target='_blank'
            rel='noreferrer'
            className='w-full flex flex-col justify-center items-center hover:text-vue'
          >
            <RiVuejsFill className='w-[40px] h-[40px]' />
            <p>Vue</p>
          </a>

          <a
            href='https://nextjs.org/'
            target='_blank'
            rel='noreferrer'
            className='w-full flex flex-col justify-center items-center hover:text-next'
          >
            <SiNextdotjs className='w-[40px] h-[40px]' />
            <p>Next Js</p>
          </a>

          <a
            href='https://expo.dev/'
            target='_blank'
            rel='noreferrer'
            className='w-full flex flex-col justify-center items-center hover:text-react'
          >
            <SiExpo className='w-[40px] h-[40px]' />
            <p>Expo RN</p>
          </a>

          <a
            href='https://developer.mozilla.org/es/docs/Learn/Getting_started_with_the_web/HTML_basics'
            target='_blank'
            rel='noreferrer'
            className='w-full flex flex-col justify-center items-center hover:text-html'
          >
            <ImHtmlFive className='w-[40px] h-[40px]' />
            <p>HTML</p>
          </a>
        </AboutMeUiCardComponent>

        <AboutMeUiCardComponent title='Back-end'>
          <a
            href='https://nodejs.org/'
            target='_blank'
            rel='noreferrer'
            className='w-full flex flex-col justify-center items-center hover:text-node'
          >
            <FaNodeJs className='w-[40px] h-[40px]' />
            <p>Node js</p>
          </a>

          <a
            href='https://graphql.org/'
            target='_blank'
            rel='noreferrer'
            className='w-full flex flex-col justify-center items-center hover:text-graphql'
          >
            <GrGraphQl className='w-[40px] h-[40px]' />
            <p>Graphql</p>
          </a>

          <a
            href='https://www.apollographql.com/'
            target='_blank'
            rel='noreferrer'
            className='w-full flex flex-col justify-center items-center hover:text-graphql'
          >
            <SiApollographql className='w-[40px] h-[40px]' />
            <p>Apollo server</p>
          </a>

          <a
            href='https://expressjs.com/'
            target='_blank'
            rel='noreferrer'
            className='w-full flex flex-col justify-center items-center hover:text-express'
          >
            <SiExpress className='w-[40px] h-[40px]' />
            <p>Express</p>
          </a>
        </AboutMeUiCardComponent>

        <AboutMeUiCardComponent title='Base de datos'>
          <a
            href='https://www.mongodb.com/'
            target='_blank'
            rel='noreferrer'
            className='w-full flex flex-col justify-center items-center hover:text-mongo'
          >
            <DiMongodb className='w-[40px] h-[40px]' />
            <p>Mongo db</p>
          </a>

          <a
            href='https://www.mysql.com/'
            target='_blank'
            rel='noreferrer'
            className='w-full flex flex-col justify-center items-center hover:text-mysql'
          >
            <DiMysql className='w-[40px] h-[40px]' />
            <p>MySql</p>
          </a>
        </AboutMeUiCardComponent>

        <AboutMeUiCardComponent title='Herramientas'>
          <a
            href='https://code.visualstudio.com/'
            target='_blank'
            rel='noreferrer'
            className='w-full flex flex-col justify-center items-center hover:text-vscode'
          >
            <SiVisualstudiocode className='w-[40px] h-[40px]' />
            <p>VsCode</p>
          </a>

          <a
            href='https://www.postman.com/'
            target='_blank'
            rel='noreferrer'
            className='w-full flex flex-col justify-center items-center hover:text-postman'
          >
            <SiPostman className='w-[40px] h-[40px]' />
            <p>PostMan</p>
          </a>

          <a
            href='https://git-scm.com/'
            target='_blank'
            rel='noreferrer'
            className='w-full flex flex-col justify-center items-center hover:text-git'
          >
            <AiFillGithub className='w-[40px] h-[40px]' />
            <p>GIT</p>
          </a>
        </AboutMeUiCardComponent>
      </section>
    </>
  )
}
