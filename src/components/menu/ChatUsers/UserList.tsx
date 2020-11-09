import React, { FC, MutableRefObject, useRef, useCallback, useState } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeList, VariableSizeProps } from 'react-window'

import { UserRow } from './UserRow'

import { UserListContext, useVideoChatContext } from 'providers'
import { IUser, ToggleDrawer } from 'types'
import { useWindowSize } from 'hooks/useWindowSize'
import { createNewConversation } from 'graphql/helpers'

interface UserListProps {
  user?: IUser | null
  listRef?: MutableRefObject<VariableSizeProps>
  users: IUser[]
  toggleDrawer?: ToggleDrawer
}

export const UserList: FC<UserListProps> = ({ user, users, listRef, toggleDrawer }) => {
  const { dispatch } = useVideoChatContext()
  const sizeMap = useRef({})
  const setSize = useCallback((index, size) => {
    sizeMap.current = { ...sizeMap.current, [index]: size }
  }, [])
  const getSize = useCallback(index => sizeMap.current[index] || 50, [])
  const { width: windowWidth } = useWindowSize()

  const createConversation = async (index: number) => {
    if (user) {
      const conversationId = await createNewConversation(user, users[index], `${user.id}-${users[index].id}`)
      dispatch({
        type: 'SET_DETAILS',
        payload: { conversationId, conversationUser: users[index] }
      })
      if (toggleDrawer) {
        toggleDrawer(null, 'rightOverlay', true)
        setTimeout(() => {
          toggleDrawer(null, 'rightChatUserList', false)
        }, 300)
      }
    }
  }

  return (
    <UserListContext.Provider value={{ setSize, windowWidth, createConversation }}>
      <AutoSizer>
        {({ height, width }) => (
          <VariableSizeList height={height} width={width} itemSize={getSize} itemCount={users.length} ref={listRef}>
            {({ index, style }) => (
              <div style={style}>
                <UserRow index={index} data={users[index]} />
              </div>
            )}
          </VariableSizeList>
        )}
      </AutoSizer>
    </UserListContext.Provider>
  )
}
