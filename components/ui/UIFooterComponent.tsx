import { FC } from 'react'
import { UiSocialComponent } from '..'

export const UIFooterComponent: FC = () => {
  return (
    <footer className='w-full h-32 flex flex-row justify-center items-center'>
      <p>&copy; {new Date().getFullYear()} Jonathanleivag</p>
      <UiSocialComponent />
    </footer>
  )
}
