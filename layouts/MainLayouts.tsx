import { FC, ReactNode } from 'react'
import { UiMenuMobileComponent, UiNavbarComponent } from '../components'

export interface IMainLayoutProps {
  children: ReactNode
}

export const MainLayouts: FC<IMainLayoutProps> = ({ children }) => {
  return (
    <>
      <UiMenuMobileComponent />
      <UiNavbarComponent />
      <main>{children}</main>
    </>
  )
}
