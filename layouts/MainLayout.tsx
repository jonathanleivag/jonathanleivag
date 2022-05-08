import { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { LoadLayout } from '.'
import { RootState } from '../app/store'
import { UiMenuMobileComponent, UiNavbarComponent } from '../components'

export interface IMainLayoutProps {
  children: ReactNode
}

export const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
  const { bg, text } = useSelector((state: RootState) => state.theme)

  return (
    <LoadLayout>
      <section className={`min-w-full min-h-screen ${bg} ${text}`}>
        <UiMenuMobileComponent />
        <UiNavbarComponent />
        <main className='px-5 md:px-20'>{children}</main>
      </section>
    </LoadLayout>
  )
}
