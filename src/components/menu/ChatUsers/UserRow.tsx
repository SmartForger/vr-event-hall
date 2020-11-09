import React, { useEffect, useRef } from 'react'
import { makeStyles, Theme, Typography } from '@material-ui/core'

import { useUserListContext } from 'providers'
import { UserAvatarCard } from 'components'

export const UserRow = ({ data, index, ...props }) => {
  const classes = useStyles()
  const { setSize, windowWidth, createConversation } = useUserListContext()
  const root = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setSize(index, root?.current?.getBoundingClientRect().height)
    // eslint-disable-next-line
  }, [windowWidth])

  return (
    <div ref={root} className={classes.root} {...props}>
      <UserAvatarCard user={data} onClick={() => createConversation(index)} />
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: 'flex-start',
    paddingLeft: theme.spacing(2)
  },
  bold: {
    fontWeight: 'bold'
  },
  inline: {
    display: 'inline'
  }
}))
