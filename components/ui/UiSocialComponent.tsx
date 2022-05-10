import { FC } from 'react'
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterSquare,
  AiFillYoutube
} from 'react-icons/ai'

export const UiSocialComponent: FC = () => {
  return (
    <div className='mx-3 flex flex-row items-center gap-2'>
      <AiFillLinkedin className='hover:text-linkedin' />
      <AiFillFacebook className='hover:text-facebook' />
      <AiFillInstagram className='hover:text-instagram' />
      <AiFillTwitterSquare className='hover:text-twitter' />
      <AiFillYoutube className='hover:text-youtube' />
    </div>
  )
}
