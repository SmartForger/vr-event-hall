/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Auth, Cache } from 'aws-amplify'

export const useBrowserCache: (cacheKey: string) => [any, (newVal) => void] = cacheKey => {
  const [cachedVar, setCachedVar] = useState(null)

  Cache.getItem(cacheKey, { callback: setCachedVar })

  const updateCache = newVal => {
    Cache.setItem(cacheKey, newVal)
    setCachedVar(newVal)
  }

  return [cachedVar, updateCache]
}
