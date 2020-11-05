import React, { FC, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useHistory } from 'react-router-dom'

interface IRouteTransition {
  animationTrigger: boolean
  route: string
  timeout?: number
  toastMessage?: string
  setToastMessage?: (message: string | null) => void
}

export const RouteTransition: FC<IRouteTransition> = ({
  animationTrigger,
  route,
  toastMessage,
  setToastMessage,
  timeout
}) => {
  const history = useHistory()
  const [startAnimation, setStartAnimation] = useState<boolean>(false)
  useEffect(() => {
    if (animationTrigger) {
      if (setToastMessage && toastMessage) {
        setToastMessage(toastMessage)
      }
      setTimeout(() => {
        if (setToastMessage && toastMessage) {
          setToastMessage(null)
        }
        setStartAnimation(true)
      }, timeout || 3000)
    }
    // eslint-disable-next-line
  }, [animationTrigger])

  const changeRoute = () => history.push(route)
  return startAnimation ? (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0,
        backgroundColor: '#000',
        zIndex: 9999
      }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      onAnimationComplete={changeRoute}
    ></motion.div>
  ) : null
}
