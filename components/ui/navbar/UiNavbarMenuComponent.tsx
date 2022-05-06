import { FC } from 'react'
import { HiMenu } from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import { changeIsOpen } from '../../../features/menu'

export interface IUiNavbarMenuComponentProps {
  className?: string
}

export const UiNavbarMenuComponent: FC<IUiNavbarMenuComponentProps> = ({
  className
}) => {
  const dispatch = useDispatch()

  return (
    <div
      onClick={() => dispatch(changeIsOpen(true))}
      className={`navbar_button ${className} cursor-pointer`}
    >
      <HiMenu />
    </div>
  )
}
