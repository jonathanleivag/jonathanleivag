import Image from 'next/image'
import { FC } from 'react'
import { IUiNavbarMenuComponentProps } from '../..'
import { useRouter } from 'next/router'

export interface IUiNavbarLogoComponentProps
  extends IUiNavbarMenuComponentProps {}

export const UiNavbarLogoComponent: FC<IUiNavbarLogoComponentProps> = ({
  className
}) => {
  const { push } = useRouter()
  return (
    <div onClick={() => push('/')} className={`${className} cursor-pointer`}>
      <Image
        src='/logo/logoColor.png'
        height={70}
        width={70}
        alt='Logo de jonathanleivag'
      />
    </div>
  )
}
