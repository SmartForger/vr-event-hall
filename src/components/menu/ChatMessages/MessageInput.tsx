import React, { FC, useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { IconButton, InputBase, Paper } from '@material-ui/core'
import { SendOutlined as Send, Mood as Smile } from '@material-ui/icons'

import { createMessage } from 'graphql/mutations'
import { graphQLMutation } from 'graphql/helpers'
import { IMessageInput } from 'types'
import { useChatContext, useVideoChatContext } from 'providers'

interface MessageInputProps {
  userId: string
  internal?: boolean
}

export const MessageInput: FC<MessageInputProps> = ({ userId, internal }) => {
  const classes = useStyles()
  const [newMessage, setNewMessage] = useState<string>('')
  const { videoChatState } = useVideoChatContext()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value)
  }

  const sendMessage = async e => {
    if (e.key && e.key !== 'Enter') {
      return
    }
    if (newMessage === '') return

    const message: IMessageInput = {
      createdAt: new Date().toISOString(),
      conversationId: videoChatState?.session?.conversationId || videoChatState?.conversationId,
      content: newMessage,
      authorId: userId,
      deleted: 'false'
    }

    await graphQLMutation(createMessage, message)
    setNewMessage('')
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <InputBase
          className={classes.input}
          placeholder='New Message'
          inputProps={{ 'aria-label': 'new message input' }}
          value={newMessage}
          multiline
          onChange={handleChange}
          onKeyDown={sendMessage}
        />
        <div className={classes.icons}>
          <IconButton
            className={`${classes.iconButton} ${classes.submitButton}`}
            aria-label='send'
            onClick={sendMessage}
          >
            <Send />
          </IconButton>
        </div>
      </Paper>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '80px',
    width: '100%',
    position: 'absolute',
    bottom: 0
  },
  paper: {
    padding: '2px 4px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderRadius: 0,
    borderTop: '1px solid rgba(0, 0, 0, 0.54)',
    boxShadow: 'none',
    '&.MuiPaper-root': {
      backgroundColor: 'white !important'
    }
  },
  icons: {
    position: 'absolute',
    bottom: 0,
    right: 5
  },
  input: {
    padding: `5px ${theme.spacing(1)}px`,
    width: 'calc(100% - 40px)',
    overflow: 'hidden',
    height: 80,
    '& .MuiInputBase-input': {
      border: 'none',
      width: '100%',
      maxHeight: 80,
      overflowY: 'auto!important'
    }
  },
  iconButton: {
    padding: 8
  },
  submitButton: {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: 'white'
    }
  }
}))
