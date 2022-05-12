import { FC } from 'react'
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterSquare,
  AiFillYoutube
} from 'react-icons/ai'

export interface IUiSocialComponentProps {
  className?: string
}

export const UiSocialComponent: FC<IUiSocialComponentProps> = ({
  className = ''
}) => {
  return (
    <div className='mx-3 flex flex-row items-center gap-2'>
      <AiFillLinkedin className={`hover:text-linkedin ${className}`} />
      <AiFillFacebook className={`hover:text-facebook ${className}`} />
      <AiFillInstagram className={`hover:text-instagram ${className}`} />
      <AiFillTwitterSquare className={`hover:text-twitter ${className}`} />
      <AiFillYoutube className={`hover:text-youtube ${className}`} />
    </div>
  )
}
