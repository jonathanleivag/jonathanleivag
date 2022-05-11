import Image from 'next/image'
import { FC } from 'react'
import { IGithub } from '../../../interfaces'

export interface IPagePortafolioGithubComponentProps {
  github: IGithub
}

export const PagePortafolioGithubComponent: FC<IPagePortafolioGithubComponentProps> = ({
  github
}) => {
  return (
    <div className='w-full flex flex-row justify-center items-center my-10'>
      <div className='w-full flex flex-col gap-3 md:w-[80%]'>
        <div className='flex flex-row justify-end items-center'>
          <a
            className='flex flex-row gap-2'
            href='https://github.com/jonathanleivag'
            target='_blank'
            rel='noreferrer'
          >
            <Image
              className='rounded-full'
              src={github.avatar_url}
              height={30}
              width={30}
              alt={github.bio}
            />
            <h2 className='paragraph'> {github.name} (GitHub) </h2>
          </a>
        </div>
        <p className='paragraph'> {github.bio} </p>
        <div className='w-full flex flex-row justify-center items-center'>
          <div className='w-[80%] flex flex-row'>
            <div className='w-[33%] flex flex-col justify-center items-center'>
              <p>{github.followers}</p>
              <p className='paragraph'>Followers</p>
            </div>
            <div className='w-[33%] flex flex-col justify-center items-center'>
              <p>{github.public_repos}</p>
              <p className='paragraph'>Repos</p>
            </div>
            <div className='w-[33%] flex flex-col justify-center items-center'>
              <p>{github.following}</p>
              <p className='paragraph'>Following</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
