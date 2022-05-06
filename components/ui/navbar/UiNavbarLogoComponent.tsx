import Image from 'next/image'
import { FC } from 'react'
import { IUiNavbarMenuComponentProps } from '../..'

export interface IUiNavbarLogoComponentProps
  extends IUiNavbarMenuComponentProps {}

export const UiNavbarLogoComponent: FC<IUiNavbarLogoComponentProps> = ({
  className
}) => {
  return (
    <div className={`${className}`}>
      <Image
        src='/logo/logoColor.png'
        height={70}
        width={70}
        alt='Logo de jonathanleivag'
      />
    </div>
  )
}
