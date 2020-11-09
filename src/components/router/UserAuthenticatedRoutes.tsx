import React, { FC, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Auth } from 'aws-amplify'

// Components
import { Loader } from 'components/shared'

// Helpers
import { setInitialState } from 'redux/auth'
import { graphQLQuery } from 'graphql/helpers'
import { IUser } from 'types'
import { useAppState } from 'providers'
import { userByEmailBase } from 'graphql/customQueries'

interface UserAuthenticatedRoutesProps {
  user: IUser | undefined
  setUser: (user: IUser | undefined) => void
  children?: React.ReactNode
}

export const UserAuthenticatedRoutes: FC<UserAuthenticatedRoutesProps> = ({ user, setUser, children }) => {
  const dispatch = useDispatch()
  const { dispatch: contextDispatch } = useAppState()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          attributes: { email }
        } = await Auth.currentAuthenticatedUser()
        const foundUser = await graphQLQuery(userByEmailBase, 'userByEmail', {
          email
        })
        if (foundUser && foundUser.id) {
          dispatch(setInitialState('signedIn'))
          setUser(foundUser)
          contextDispatch({ type: 'SET_USER', payload: foundUser })
        }
      } catch (err) {
        setUser(undefined)
      }
      setLoading(false)
    }

    checkUser()

    // Prevent user to navigate back
    const browserNavigationHandle = () => window.history.pushState(null, '', document.URL)
    window.history.pushState(null, '', document.URL)
    window.addEventListener('popstate', browserNavigationHandle)
    return () => window.removeEventListener('popstate', browserNavigationHandle)
    // eslint-disable-next-line
  }, [])

  return user ? <>{children}</> : loading ? <Loader /> : <Redirect to='/' />
}
