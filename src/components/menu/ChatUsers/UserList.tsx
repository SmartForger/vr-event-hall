import React, { FC, MutableRefObject, useRef, useCallback, useState } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeList, VariableSizeProps } from 'react-window'

import { UserRow } from './UserRow'

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
  const sizeMap = useRef({})
  const setSize = useCallback((index, size) => {
    sizeMap.current = { ...sizeMap.current, [index]: size }
  }, [])
  const getSize = useCallback(index => sizeMap.current[index] || 50, [])
  const { width: windowWidth } = useWindowSize()

  const createConversation = async (index: number) => {
    if (user) {
      const conversationId = await createNewConversation(user, users[index], `${user.id}-${users[index].id}`)
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
          conversationUser: users[index],
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
