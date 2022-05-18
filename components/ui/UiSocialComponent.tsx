import { FC } from 'react'
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterSquare,
  AiFillYoutube
} from 'react-icons/ai'
import {
  NEXT_PUBLIC_FACEBOOK,
  NEXT_PUBLIC_INSTAGRAM,
  NEXT_PUBLIC_LINKEDIN,
  NEXT_PUBLIC_TWITTER,
  NEXT_PUBLIC_YOUTUBE
} from '../../utils'

export interface IUiSocialComponentProps {
  className?: string
}

export const UiSocialComponent: FC<IUiSocialComponentProps> = ({
  className = ''
}) => {
  return (
    <div className='mx-3 flex flex-row items-center gap-2'>
      <a href={NEXT_PUBLIC_LINKEDIN} target='_blank' rel='noreferrer'>
        <AiFillLinkedin className={`hover:text-linkedin ${className}`} />
      </a>

      <a href={NEXT_PUBLIC_FACEBOOK} target='_blank' rel='noreferrer'>
        <AiFillFacebook className={`hover:text-facebook ${className}`} />
      </a>

      <a href={NEXT_PUBLIC_INSTAGRAM} target='_blank' rel='noreferrer'>
        <AiFillInstagram className={`hover:text-instagram ${className}`} />
      </a>

      <a href={NEXT_PUBLIC_TWITTER} target='_blank' rel='noreferrer'>
        <AiFillTwitterSquare className={`hover:text-twitter ${className}`} />
      </a>

      <a href={NEXT_PUBLIC_YOUTUBE} target='_blank' rel='noreferrer'>
        <AiFillYoutube className={`hover:text-youtube ${className}`} />
      </a>
    </div>
  )
}
