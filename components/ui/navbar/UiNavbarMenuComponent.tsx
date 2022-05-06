import { FC } from 'react'
import { HiMenu } from 'react-icons/hi'

export interface IUiNavbarMenuComponentProps {
  className?: string
}

export const UiNavbarMenuComponent: FC<IUiNavbarMenuComponentProps> = ({
  className
}) => {
  return (
    <div className={`navbar_button ${className}`}>
      <HiMenu />
    </div>
  )
}
