import { FC } from 'react'
import {
  UiNavbarLogoComponent,
  UiNavbarMenuComponent,
  UiNavbarMenuOptionComponent,
  UiThemeComponent
} from '../..'

export const UiNavbarComponent: FC = () => {
  return (
    <nav className='w-full h-[110px] md:h-[150px] flex flex-row justify-center items-center'>
      <div className='w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] h-full flex flex-row justify-center items-center'>
        <div className='w-[30%] md:w-[15%] h-full flex flex-row justify-center items-center'>
          <UiNavbarMenuComponent className='md:hidden' />
          <UiNavbarLogoComponent className='hidden md:flex' />
        </div>
        <div className='w-[70%] h-full flex flex-row justify-center items-center'>
          <UiNavbarLogoComponent className='md:hidden' />
          <UiNavbarMenuOptionComponent className='hidden md:flex flex-row gap-3' />
        </div>
        <div className='w-[30%] md:w-[15%] h-full flex flex-row justify-center items-center'>
          <UiThemeComponent />
        </div>
      </div>
    </nav>
  )
}
