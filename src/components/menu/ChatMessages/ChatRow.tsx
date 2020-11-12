import React, { useEffect, useRef } from 'react'
import { format } from 'date-fns'
import { Box, IconButton, makeStyles, Theme, Typography } from '@material-ui/core'

import { useChatListContext, UserAdminType, useChatContext, useAppState } from 'providers'
import { PinIcon, TrashIcon } from 'assets'
import { isAdmin } from 'helpers'
import { PersonInfoItem } from './PersonInfoItem'

export const ChatRow = ({ data, index, skipSetSize = false, isPinned = false, ...props }) => {
  const classes = useStyles()
  const { setSize, windowWidth, onPin, onDelete, unPin, isAdmin, isVideoChat } = useChatListContext()
  const root = useRef<HTMLDivElement | null>(null)
  const { chatState } = useChatContext()
  const {
    appState: { user }
  } = useAppState()

  let Wrapper = user?.id && isAdmin ? Box : React.Fragment
  let wrapperProps =
    user?.id && isAdmin ? { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } : {}

  useEffect(() => {
    if (!skipSetSize) {
      setSize(index, root?.current?.getBoundingClientRect().height)
    }
    // eslint-disable-next-line
  }, [windowWidth])

  const pinMessage = () => {
    if (isPinned) {
      unPin(-1)
    } else {
      onPin(index)
    }
  }
  const deleteMessage = () => {
    onDelete(index)
  }

  return (
    <div ref={root} className={classes.root} {...props}>
      <Wrapper {...wrapperProps}>
        <Typography variant='subtitle2' color='textPrimary'>
          {data.author && <PersonInfoItem user={data.author} date={format(new Date(data.createdAt), 'p')} />}
        </Typography>
        {isAdmin ? (
          <Box display='flex'>
            {isVideoChat ? (
              <IconButton onClick={pinMessage}>
                <PinIcon />
              </IconButton>
            ) : null}
            {isVideoChat || data.authorId === user?.id ? (
              <IconButton onClick={deleteMessage}>
                <TrashIcon />
              </IconButton>
            ) : null}
          </Box>
        ) : null}
      </Wrapper>
      <Typography component='span' variant='body2' color='textPrimary' className={classes.inline}>
        {data.content}
      </Typography>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: 'flex-start',
    paddingLeft: theme.spacing(3),
    paddingBottom: theme.spacing(2)
  },
  inline: {
    display: 'inline',
    fontSize: '1rem',

    [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
      fontSize: '0.8rem'
    }
  }
}))
