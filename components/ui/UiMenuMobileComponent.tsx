import { FC, useEffect, useState } from 'react'
import { GrFormClose } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'
import { UiNavbarMenuOptionComponent } from '..'
import { RootState } from '../../app/store'
import { changeIsOpen } from '../../features/menu'

export const UiMenuMobileComponent: FC = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector((state: RootState) => state.menu.isOpen)
  const [className, setClassName] = useState<string>('right-0')

  useEffect(() => {
    setClassName(isOpen ? 'right-0' : 'right-full')
    return () => {}
  }, [isOpen])

  return (
    <section
      className={`fixed flex flex-col justify-center w-screen h-screen z-50 transform ease-in-out duration-1000 ${className} md:hidden bg-green-600`}
    >
      <div className='fixed top-0 w-full flex flex-row justify-center items-center'>
        <div className='w-[90%] h-[100px] flex flex-row justify-start items-center'>
          <div
            onClick={() => dispatch(changeIsOpen(false))}
            className='navbar_button ml-5  cursor-pointer'
          >
            <GrFormClose />
          </div>
        </div>
      </div>
      <UiNavbarMenuOptionComponent className='flex flex-col gap-5 px-20 text-center text-7xl' />
    </section>
  )
}
