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
      <div className='w-[90%] md:w-[96%] h-full flex flex-row justify-center items-center'>
        <div className='w-[30%] md:w-[15%] h-full flex flex-row justify-center items-center'>
          <UiNavbarMenuComponent className='md:hidden' />
          <UiNavbarLogoComponent className='hidden md:flex' />
        </div>
        <div className='w-[50%] h-full flex flex-row justify-center items-center'>
          <UiNavbarLogoComponent className='md:hidden' />
          <UiNavbarMenuOptionComponent className='hidden md:flex flex-row' />
        </div>
        <div className='w-[30%] md:w-[10%] h-full flex flex-row justify-center items-center'>
          <UiThemeComponent />
        </div>
      </div>
    </nav>
  )
}
