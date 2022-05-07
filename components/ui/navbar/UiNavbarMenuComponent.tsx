import { FC } from 'react'
import { HiMenu } from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import { changeIsOpen } from '../../../features/menu'
import { useTheme } from '../../../hooks'

export interface IUiNavbarMenuComponentProps {
  className?: string
}

export const UiNavbarMenuComponent: FC<IUiNavbarMenuComponentProps> = ({
  className
}) => {
  const dispatch = useDispatch()
  const { bgButton } = useTheme()

  return (
    <div
      onClick={() => dispatch(changeIsOpen(true))}
      className={`navbar_button ${className} ${bgButton} cursor-pointer`}
    >
      <HiMenu />
    </div>
  )
}
