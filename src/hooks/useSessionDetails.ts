import { useState, useEffect } from 'react'
import { graphQLQuery } from 'graphql/helpers'
import { getSessionOverviewById } from 'graphql/customQueries'

export const useSessionDetails = (sessionId: string) => {
  const [sessionDetails, setSessionDetails] = useState<any>({})

  useEffect(() => {
    async function getData() {
      const response = await graphQLQuery(getSessionOverviewById, 'getSession', { id: sessionId })
      setSessionDetails(response)
    }

    getData()
  }, [])

  return sessionDetails
}
