import { toast, ToastOptions } from 'react-toastify'

export interface IToastUtil {
  message: string
  type?: TType
}

export type TType = 'success' | 'error'

const options: ToastOptions = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
}

export const toastUtil = ({ message, type }: IToastUtil) => {
  switch (type) {
    case 'success':
      toast.success(message, options)
      break
    case 'error':
      toast.error(message, options)
      break
    default:
      toast(message, options)
      break
  }
}
