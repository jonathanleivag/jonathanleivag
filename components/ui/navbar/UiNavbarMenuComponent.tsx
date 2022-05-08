import { FC } from 'react'
import { HiMenu } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { changeIsOpen } from '../../../features/menu'

export interface IUiNavbarMenuComponentProps {
  className?: string
}

export const UiNavbarMenuComponent: FC<IUiNavbarMenuComponentProps> = ({
  className
}) => {
  const dispatch = useDispatch()
  const { bgButton } = useSelector((state: RootState) => state.theme)

  return (
    <div
      onClick={() => dispatch(changeIsOpen(true))}
      className={`navbar_button ${className} ${bgButton} cursor-pointer`}
    >
      <HiMenu />
    </div>
  )
}
