import React, { FC } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface ToastProps {
  position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center'
  autoClose?: number | false
  hideProgressBar?: boolean
}

// types of toast
// 'info',
// 'success',
// 'warning',
// 'error',
// 'default'
// usage in component
// import { toast } from 'react-toastify';
// import { Toast } from 'components/shared';
// const showToast = () => {
//   toast.info('Your message here');
// }
// in render <Toast position='bottom-left' etc />

export const Toast: FC<ToastProps> = ({ position = 'bottom-right', autoClose = 5000, hideProgressBar = false }) => {
  return (
    <ToastContainer
      position={position}
      autoClose={autoClose}
      hideProgressBar={hideProgressBar}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
    />
  )
}
