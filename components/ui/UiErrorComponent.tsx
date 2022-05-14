import { FC } from 'react'

export interface IUiErrorComponentProps {
  message: string
  isError: boolean
}

export const UiErrorComponent: FC<IUiErrorComponentProps> = ({
  message,
  isError
}) => {
  return (
    <>
      {isError && (
        <div className='px-10 my-3 bg-red-600 rounded-full w-full flex flex-row justify-center items-center'>
          <p className='text-white'> {message} </p>
        </div>
      )}
    </>
  )
}
