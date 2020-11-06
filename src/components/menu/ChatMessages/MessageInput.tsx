import React, { FC, useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { IconButton, InputBase, Paper } from '@material-ui/core'
import { SendOutlined as Send, Mood as Smile } from '@material-ui/icons'

import { createMessage, createSessionQuestion } from 'graphql/mutations'
import { graphQLMutation } from 'graphql/helpers'
import { IMessageInput } from 'types'
import { useChatContext, useVideoChatContext } from 'providers'
import { QuestionDisabledIcon, QuestionIcon } from 'assets'

interface MessageInputProps {
  userId: string
  internal?: boolean
}

export const MessageInput: FC<MessageInputProps> = ({ userId, internal }) => {
  const classes = useStyles()
  const { videoChatState } = useVideoChatContext()
  const [newMessage, setNewMessage] = useState<string>('')
  const [questionMode, setQuestionMode] = useState<boolean>(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value)
  }

  const sendMessage = async e => {
    if (e.key && e.key !== 'Enter') {
      return
    }
    if (newMessage === '') return

    if (questionMode) {
      const question = {
        sessionId: videoChatState?.session?.id || videoChatState?.sessionId,
        answered: 'false',
        content: newMessage,
        userId: userId
      }

      await graphQLMutation(createSessionQuestion, question)
      return setNewMessage('')
    }

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

  const toggleQuestionMode = () => {
    setQuestionMode(prevState => !prevState)
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
          <IconButton disabled={!videoChatState?.session?.qaActive} onClick={toggleQuestionMode}>
            {videoChatState?.session?.qaActive && questionMode ? <QuestionIcon /> : <QuestionDisabledIcon />}
          </IconButton>
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
