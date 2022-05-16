import { Dispatch, FC, SetStateAction, ReactNode, useEffect } from 'react'
import { IoMdClose } from 'react-icons/io'
import Modal from 'react-modal'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'

export interface IUiModalComponentProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  children: ReactNode
  className?: string
  scrollY0: number
  scrollX0: number
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'transparent',
    border: 'none'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  }
}

export const UiModalComponent: FC<IUiModalComponentProps> = ({
  isOpen,
  setIsOpen,
  children,
  className,
  scrollY0,
  scrollX0
}) => {
  const { bg, text } = useSelector((state: RootState) => state.theme)

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
      document.body.classList.add('h-screen')
      window.scrollTo(0, 0)
    }
    return () => {
      document.body.classList.remove('h-screen')
      document.body.classList.remove('overflow-hidden')
      window.scrollTo(scrollX0, scrollY0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      ariaHideApp={false}
      style={customStyles}
      contentLabel='Modal de proyectos'
    >
      <section className={`${className} md:rounded-lg relative ${bg} ${text}`}>
        <div className='absolute z-50 w-full p-2 text-red-600 text-2xl top-0 flex flex-row justify-end items-center'>
          <IoMdClose
            onClick={() => setIsOpen(false)}
            className='cursor-pointer'
          />
        </div>
        <div className='p-3'>{children}</div>
      </section>
    </Modal>
  )
}
