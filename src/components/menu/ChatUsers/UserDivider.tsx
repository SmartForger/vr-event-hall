import React, { useEffect } from 'react'
import { makeStyles, Theme, Typography } from '@material-ui/core'

import { useUserListContext } from 'providers'

export const UserDivider = ({ letter, index }) => {
  const classes = useStyles()
  const { setSize, count, windowWidth } = useUserListContext()

  useEffect(() => {
    setSize(index, 30)
    // eslint-disable-next-line
  }, [windowWidth, count])

  return (
    <div className={classes.root}>
      <div className={classes.line}></div>
      <div className={classes.letter}>{letter}</div>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  line: {
    height: 1,
    flex: '1 1 auto',
    backgroundColor: '#D8DADA'
  },
  letter: {
    color: '#D8DADA',
    fontSize: 18,
    fontWeight: 700,
    padding: '0 17px',
    background: 'white'
  }
}))
