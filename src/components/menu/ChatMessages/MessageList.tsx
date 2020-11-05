import React, { FC, MutableRefObject, useRef, useCallback, useState, useEffect } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeList, VariableSizeProps } from 'react-window'
import { makeStyles } from '@material-ui/core'

import { ChatRow } from './ChatRow'
// import { DialogCard } from 'components'

import { ChatListContext, useAppState, useChatContext } from 'providers'
import { useWindowSize } from 'hooks'
import { graphQLMutation } from 'graphql/helpers'
import { updateMessage, updateSession } from 'graphql/mutations'
import { IMessage, IUser } from 'types'
import { DialogCard } from './DialogCard'

interface MessageListProps {
  user?: IUser
  listRef?: MutableRefObject<VariableSizeProps>
  messages: IMessage[]
}
// TODO: localize with i18n
const dialogInfo = {
  pin: {
    title: 'Pin new message',
    message: 'You are about to pin a new message and replace the current one.',
    messageLine2: 'Are you sure?'
  },
  delete: {
    title: 'Delete this message',
    message: 'You are about to delete this message',
    messageLine2: 'Are you sure?'
  }
}

export const MessageList: FC<MessageListProps> = ({ messages, listRef }) => {
  const classes = useStyles()
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [dialogType, setDialogType] = useState<string>('')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isAdmin, setAdmin] = useState<boolean>(false)
  const {
    appState: { user }
  } = useAppState()
  const { chatState, dispatch } = useChatContext()

  const filteredMessages = messages.filter(
    message => message.id !== chatState?.session?.pinnedMessageId && message?.deleted !== 'true'
  )

  const sizeMap = useRef({})
  const setSize = useCallback((index, size) => (sizeMap.current = { ...sizeMap.current, [index]: size }), [])
  const getSize = useCallback(
    index => sizeMap.current[index] || setTimeout(() => sizeMap.current[index] || calculateSize(index), 50),
    []
  )
  const [windowWidth] = useWindowSize()

  const calculateSize = index => {
    if (filteredMessages[index] && filteredMessages[index].content.length) {
      return filteredMessages[index].content.length * 2.25
    }
    return 100
  }

  useEffect(() => {
    const verizonList = [
      'amelia.powell@verizonwireless.com',
      'brent.eiler@verizon.com',
      'christian.a.bergrud@verizon.com',
      'david.strumwasser@verizonwireless.com',
      'roy.van.teyens@verizon.com',
      'edward.luna@verizon.com',
      'gabor.illes@verizon.com',
      'jason.barton@verizonwireless.com',
      'jason.lebrecht@verizon.com',
      'matthew.conte@verizon.com',
      'matthew.windt@verizon.com',
      'nevin.jones@verizon.com',
      'rohit.saraf@verizon.com',
      'stefan.schmitt@verizon.com',
      'steph.tsang@civic-us.com',
      'victor.romo-aledo@verizon.com'
    ]

    const lowerCaseEmail = (user?.email || '').toLowerCase()

    if (chatState?.session?.admins?.items) {
      setAdmin(chatState?.session?.admins?.items.some(admin => admin.userId === user?.id))
    } else if (user?.email?.includes('mvrk.co')) {
      setAdmin(true)
    } else if (verizonList.includes(lowerCaseEmail)) {
      setAdmin(true)
    }
  }, [])

  const openDialog = (index: number, type: 'pin' | 'delete') => {
    setSelectedIndex(index)
    setDialogType(type)
    setShowDialog(true)
  }

  const onPin = (index: number) => {
    openDialog(index, 'pin')
  }

  const unPin = async () => {
    dispatch({ type: 'SET_DETAILS', payload: { session: { ...chatState.session, pinnedMessage: null } } })
    const session = await graphQLMutation(updateSession, { id: chatState?.session?.id, pinnedMessageId: '0' })
    dispatch({ type: 'SET_DETAILS', payload: { session } })
  }

  const onDelete = (index: number) => {
    openDialog(index, 'delete')
  }

  const resetDialog = () => {
    setShowDialog(false)
    setDialogType('')
    setSelectedIndex(null)
  }

  const onPinConfirm = async () => {
    if (selectedIndex !== null && selectedIndex >= 0) {
      dispatch({
        type: 'SET_DETAILS',
        payload: { session: { ...chatState.session, pinnedMessage: messages[selectedIndex] } }
      })
      const session = await graphQLMutation(updateSession, {
        id: chatState?.session?.id,
        pinnedMessageId: messages[selectedIndex].id
      })
      dispatch({ type: 'SET_DETAILS', payload: { session } })
      resetDialog()
    }
  }

  const onCancel = () => {
    resetDialog()
  }

  const onDeleteConfirm = async () => {
    if (selectedIndex !== null && selectedIndex >= 0) {
      await graphQLMutation(updateMessage, {
        id: messages[selectedIndex].id,
        deleted: 'true',
        createdAt: messages[selectedIndex]?.createdAt
      })
      resetDialog()
    }
  }

  return (
    <ChatListContext.Provider value={{ setSize, windowWidth, onPin, onDelete, unPin, isAdmin }}>
      {showDialog ? (
        <DialogCard
          title={dialogInfo[dialogType || ''].title}
          message={dialogInfo[dialogType || ''].message}
          messageLine2={dialogInfo[dialogType || ''].messageLine2}
          onConfirm={dialogType === 'pin' ? onPinConfirm : onDeleteConfirm}
          onCancel={onCancel}
          containerHeight={listRef?.current?.offsetHeight}
        />
      ) : null}
      {chatState?.session?.pinnedMessage ? (
        <ChatRow
          data={chatState?.session?.pinnedMessage}
          index={0}
          skipSetSize={true}
          isPinned={true}
          className={classes.pinnedMessage}
        />
      ) : null}
      <AutoSizer>
        {({ height, width }) => (
          <VariableSizeList
            height={height - 80}
            width={width}
            itemSize={getSize}
            itemCount={filteredMessages.length}
            ref={listRef}
          >
            {({ index, style }) => (
              <div style={style}>
                <ChatRow index={index} data={filteredMessages[index]} />
              </div>
            )}
          </VariableSizeList>
        )}
      </AutoSizer>
    </ChatListContext.Provider>
  )
}

const useStyles = makeStyles(() => ({
  pinnedMessage: {
    background: '#f6f6f6',
    borderBottom: '1px solid #d8dada',
    marginTop: '-6px',
    padding: '4px 24px 8px'
  }
}))
