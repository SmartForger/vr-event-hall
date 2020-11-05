import { useLayoutEffect, useState } from 'react'

export const useWindowSize = () => {
  let [width, setWidth] = useState(0)
  let [height, setHeight] = useState(0)

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return { width, height }
}
