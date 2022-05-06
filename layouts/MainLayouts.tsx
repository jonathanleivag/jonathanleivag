import { FC, ReactNode } from 'react'
import { UiNavbarComponent } from '../components'

export interface IMainLayoutProps {
  children: ReactNode
}

export const MainLayouts: FC<IMainLayoutProps> = ({ children }) => {
  return (
    <>
      <UiNavbarComponent />
      <main>{children}</main>
    </>
  )
}
