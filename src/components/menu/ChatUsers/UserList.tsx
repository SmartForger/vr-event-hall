import React, { FC, MutableRefObject, useRef, useCallback, useEffect } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeList, VariableSizeProps } from 'react-window'
import { groupBy } from 'lodash'

import { UserRow } from './UserRow'
import { UserDivider } from './UserDivider'

import { UserListContext, useVideoChatContext, useChatContext } from 'providers'
import { IUser, ToggleDrawer } from 'types'
import { useWindowSize } from 'hooks/useWindowSize'

import { createNewConversation, graphQLQuery } from 'graphql/helpers'
import { getConversationWithAssociated } from 'graphql/customQueries'

interface UserListProps {
  user?: IUser | null
  listRef?: MutableRefObject<VariableSizeProps>
  users: IUser[]
  toggleDrawer?: ToggleDrawer
}

export const UserList: FC<UserListProps> = ({ user, users, listRef, toggleDrawer }) => {
  const { dispatch: videoChatDispatch } = useVideoChatContext()
  const { dispatch: chatDispatch } = useChatContext()

  const tmpUsers = users.map(user => ({
    ...user,
    nameInitial: user.firstName?.substr(0, 1)
  }))

  const tmp = groupBy(tmpUsers, 'nameInitial')
  const groupedUsers: Array<IUser | string> = []
  Object.keys(tmp).forEach(initial => {
    groupedUsers.push(initial)
    groupedUsers.push(...tmp[initial])
  })

  const sizeMap = useRef({})

  useEffect(() => {
    if (listRef?.current) {
      listRef.current.resetAfterIndex(0)
    }
    sizeMap.current = {}
  }, [groupedUsers])

  const setSize = useCallback(
    (index, size) => {
      sizeMap.current = { ...sizeMap.current, [index]: size }
    },
    [groupedUsers]
  )
  const getSize = useCallback(
    index => {
      const defaultSize = typeof groupedUsers[index] === 'string' ? 30 : 46
      return sizeMap.current[index] || defaultSize
    },
    [groupedUsers]
  )
  const { width: windowWidth } = useWindowSize()

  const createConversation = async (index: number) => {
    if (user) {
      const selectedUser = groupedUsers[index] as IUser
      const conversationId = await createNewConversation(user, selectedUser, `${user.id}-${selectedUser.id}`)
      const conversationDetails = await graphQLQuery(getConversationWithAssociated, 'getConversation', {
        id: conversationId
      })

      // i really hate that we have multiple chat contexts,
      // and i dont want to go down this route, but i am worried
      // that i will break something if i remove the videoChatContext
      // from here. For now, dispatching to both to be safe :(
      const dispatchValue = {
        type: 'SET_DETAILS',
        payload: {
          conversationId,
          conversation: conversationDetails,
          conversationUser: selectedUser,
          conversationOpen: true
        }
      }
      videoChatDispatch(dispatchValue)
      chatDispatch(dispatchValue)
      if (toggleDrawer) {
        toggleDrawer(null, 'rightChatUserList', false)
      }
    }
  }

  return (
    <UserListContext.Provider value={{ setSize, count: groupedUsers.length, windowWidth, createConversation }}>
      <AutoSizer>
        {({ height, width }) => (
          <VariableSizeList
            height={height}
            width={width}
            itemSize={getSize}
            itemCount={groupedUsers.length}
            ref={listRef}
          >
            {({ index, style }) => (
              <div style={style}>
                {typeof groupedUsers[index] === 'string' ? (
                  <UserDivider index={index} letter={groupedUsers[index]} />
                ) : (
                  <UserRow index={index} data={groupedUsers[index]} />
                )}
              </div>
            )}
          </VariableSizeList>
        )}
      </AutoSizer>
    </UserListContext.Provider>
  )
}
