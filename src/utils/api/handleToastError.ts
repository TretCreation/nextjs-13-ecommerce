import { toast } from 'react-toastify'

export const toastError = (error: any, title?: string) => {
  console.log('handleToastError: ', error)
  toast.error(title || 'Error request', error)
}
