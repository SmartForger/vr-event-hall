import React, { FC, MutableRefObject, useRef, useCallback, useState, useEffect } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeList, VariableSizeProps } from 'react-window'
import { makeStyles } from '@material-ui/core'

import { ChatRow } from './ChatRow'

import { ChatListContext, useAppState, useChatContext, useVideoChatContext } from 'providers'
import { useWindowSize } from 'hooks/useWindowSize'
import { graphQLMutation } from 'graphql/helpers'
import { updateMessage, updateSession } from 'graphql/mutations'
import { IMessage, IUser, ISession } from 'types'
import { DialogCard } from './DialogCard'

type TPinAction = 'pin' | 'unpin' | 'delete'

interface MessageListProps {
  user?: IUser
  listRef?: MutableRefObject<VariableSizeProps>
  messages: IMessage[]
  isInternal?: boolean
  isVideoChat?: boolean
}
// TODO: localize with i18n
const dialogInfo = {
  pin: {
    title: 'Pin new message',
    message: 'You are about to pin a new message and replace the current one.',
    messageLine2: 'Are you sure?'
  },
  unpin: {
    title: 'Unpin message',
    message: 'You are about to unpin a message.',
    messageLine2: 'Are you sure?'
  },
  delete: {
    title: 'Delete this message',
    message: 'You are about to delete this message',
    messageLine2: 'Are you sure?'
  }
}

export const MessageList: FC<MessageListProps> = ({ messages, listRef, isInternal, isVideoChat }) => {
  const classes = useStyles()
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [dialogType, setDialogType] = useState<string>('')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isAdmin, setAdmin] = useState<boolean>(false)
  const [pinnedMessageSize, setPinnedMessageSize] = useState<number>(0)
  const {
    appState: { user }
  } = useAppState()
  const { chatState, dispatch } = useChatContext()
  const { videoChatState, dispatch: videoChatDispatch } = useVideoChatContext()
  const { width: windowWidth } = useWindowSize()

  const sizeMap = useRef({})
  const setSize = useCallback((index, size) => (sizeMap.current = { ...sizeMap.current, [index]: size }), [])

  const getItemSize = row => {
    const text = row.content

    let rowHeight: number

    if (!text || text.length < 35) {
      rowHeight = 100
    } else if (text.length > 35 && text.length < 100) {
      rowHeight = 150
    } else if (text.length > 100 && text.length < 200) {
      rowHeight = text.length * 0.8
    } else if (text.length > 300) {
      rowHeight = text.length * 0.7
    } else {
      rowHeight = text.length
    }

    return rowHeight
  }

  const filteredMessages = messages
    .filter(message => message.id !== chatState?.session?.pinnedMessageId && message?.deleted !== 'true')
    .map((message, idx) => {
      setSize(idx, message.content.length * 2.25)
      return message
    })

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
    } else if (videoChatState?.session?.admins?.items) {
      setAdmin(videoChatState?.session?.admins?.items.some(admin => admin.userId === user?.id))
    } else if (verizonList.includes(lowerCaseEmail)) {
      setAdmin(true)
    }
  }, [])

  const openDialog = (index: number, type: TPinAction) => {
    setSelectedIndex(index)
    setDialogType(type)
    setShowDialog(true)
  }

  const onPin = (index: number) => {
    openDialog(index, 'pin')
  }

  const unPin = async index => {
    openDialog(index, 'unpin')
  }

  const unPinConfirm = async () => {
    dispatch({
      type: 'SET_DETAILS',
      payload: { session: { ...videoChatState.session, [isInternal ? 'icPinnedMessage' : 'pinnedMessage']: null } }
    })
    const session = await graphQLMutation(updateSession, {
      id: videoChatState?.session?.id,
      [isInternal ? 'icPinnedMessageId' : 'pinnedMessageId']: '0'
    })
    dispatch({ type: 'SET_DETAILS', payload: { session } })
    resetDialog()
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
        payload: {
          session: { ...chatState.session, [isInternal ? 'icPinnedMessage' : 'pinnedMessage']: messages[selectedIndex] }
        }
      })
      let update: Partial<ISession> = {
        id: videoChatState?.session?.id || ''
      }
      if (isInternal) {
        update.icPinnedMessageId = messages[selectedIndex].id
      } else {
        update.pinnedMessageId = messages[selectedIndex].id
      }
      debugger
      const session = await graphQLMutation(updateSession, update, 'updateSession')
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

  const getPinnedMessage = () => {
    const message = document.getElementById('pinnedMessage')
    if (message) {
      return message.offsetHeight
    }
    return 0
  }

  useEffect(() => {
    if (videoChatState?.session?.pinnedMessage) {
      const message = document.getElementById('pinnedMessage')
      if (message) {
        return setPinnedMessageSize(message.offsetHeight)
      }
    }
    setPinnedMessageSize(0)
  }, [videoChatState?.session?.pinnedMessage])

  const displayPinnedMessage = (message: IMessage) => {
    if (message) {
      return (
        <ChatRow
          data={message}
          index={0}
          skipSetSize={true}
          isPinned={true}
          className={classes.pinnedMessage}
          id='pinnedMessage'
        />
      )
    }
    return null
  }

  const icPinnedMessageAvail = isInternal && isAdmin && videoChatState?.session?.icPinnedMessage
  const pinnedMessageAvail = !isInternal && videoChatState?.session?.pinnedMessage

  return (
    <ChatListContext.Provider value={{ setSize, windowWidth, onPin, onDelete, unPin, isAdmin, isVideoChat }}>
      {showDialog ? (
        <DialogCard
          title={dialogInfo[dialogType || ''].title}
          message={dialogInfo[dialogType || ''].message}
          messageLine2={dialogInfo[dialogType || ''].messageLine2}
          onConfirm={dialogType === 'pin' ? onPinConfirm : dialogType === 'unpin' ? unPinConfirm : onDeleteConfirm}
          onCancel={onCancel}
          containerHeight={listRef?.current?.offsetHeight}
        />
      ) : null}
      {icPinnedMessageAvail ? displayPinnedMessage(videoChatState?.session?.icPinnedMessage!) : null}
      {pinnedMessageAvail ? displayPinnedMessage(videoChatState?.session?.pinnedMessage!) : null}
      <AutoSizer>
        {({ height, width }) => (
          <VariableSizeList
            height={
              (icPinnedMessageAvail || pinnedMessageAvail ? height - 80 - pinnedMessageSize : height - 80) -
              (isInternal ? 60 : 0)
            }
            width={width}
            itemSize={i => getItemSize(filteredMessages[i])}
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
