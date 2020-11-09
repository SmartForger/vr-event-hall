import React, { FC, useEffect, useRef, useState } from 'react'
import { VariableSizeProps } from 'react-window'
import { makeStyles } from '@material-ui/core'

import { UserList } from './UserList'

import { graphQLQuery, graphQLSubscription } from 'graphql/helpers'
import { listUsers } from 'graphql/queries'
import { onCreateUser } from 'graphql/subscriptions'
import { useAppState } from 'providers'
import { sortBy } from 'helpers'
import { AnchorType, ISubscriptionObject, IUser, ToggleDrawer } from 'types'
import { UserSearch } from './UserSearch'

interface ChatUsersProps {
  internal?: boolean
  toggleDrawer?: ToggleDrawer
}

export const ChatUsers: FC<ChatUsersProps> = ({ toggleDrawer }) => {
  const classes = useStyles()
  const {
    appState: { user }
  } = useAppState()

  let [users, setUsers] = useState<IUser[]>([])
  let [filteredUsers, setFilteredUsers] = useState<IUser[]>([])
  const listRef = useRef<VariableSizeProps>()

  let subscription = useRef<ISubscriptionObject | null>(null)

  const addNewUser = ({ onCreateUser }) => {
    setUsers(prevUserList => sortBy([...prevUserList, onCreateUser], 'firstName'))
  }

  const getUsers = async () => {
    const users = await graphQLQuery(listUsers, 'listUsers', {})
    const userList = sortBy(
      users.filter(
        u =>
          u.id !== user?.id &&
          !user?.conversations?.items?.some(convo => convo?.conversation?.members.includes(u.id as string))
      ),
      'firstName'
    )
    setUsers(userList)
    setFilteredUsers(userList)

    subscription.current = graphQLSubscription(onCreateUser, {}, addNewUser)
  }

  useEffect(() => {
    getUsers()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    return () => subscription?.current?.unsubscribe()
  }, [])

  return (
    <>
      <UserSearch users={users} setUsers={setFilteredUsers} />
      <div className={classes.root}>
        <UserList user={user} listRef={listRef} users={filteredUsers} toggleDrawer={toggleDrawer} />
      </div>
    </>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    maxWidth: 350,
    backgroundColor: theme.palette.background.paper,
    position: 'relative'
  }
}))
