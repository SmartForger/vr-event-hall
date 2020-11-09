/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Auth, Cache } from 'aws-amplify'

export const useBrowserCache: (cacheKey) => [boolean, any, (newVal) => void] = cacheKey => {
  const [cachedVar, setCachedVar] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await Cache.getItem(cacheKey)
      setCachedVar(response)
    }
    fetchData()
    setLoading(false)
  }, [cacheKey, cachedVar, loading])

  const updateCache = newVal => {
    Cache.setItem(cacheKey, newVal)
    setCachedVar(newVal)
  }

  return [loading, cachedVar, updateCache]
}
