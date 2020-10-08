import React, { FC, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Auth } from 'aws-amplify'

// Components
import { Loader } from 'components/shared'

// Helpers
import { setInitialState } from 'redux/auth'
import { graphQLQuery } from 'graphql/helpers'
import { userByEmail } from 'graphql/queries'
import { IUser } from 'types'

interface UserAuthenticatedRoutesProps {
  user: IUser | undefined
  setUser: (user: IUser | undefined) => void
  children?: React.ReactNode
}

export const UserAuthenticatedRoutes: FC<UserAuthenticatedRoutesProps> = ({ user, setUser, children }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          attributes: { email }
        } = await Auth.currentAuthenticatedUser()
        const foundUser = await graphQLQuery(userByEmail, 'userByEmail', {
          email
        })
        if (foundUser && foundUser.id) {
          dispatch(setInitialState('signedIn'))
          setUser(foundUser)
        }
      } catch (err) {
        setUser(undefined)
      }
      setLoading(false)
    }

    checkUser()
    // eslint-disable-next-line
  }, [])

  return user ? <>{children}</> : loading ? <Loader /> : <Redirect to='/' />
}
