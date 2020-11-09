import React, { FC, useEffect, useRef, useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core'
import classnames from 'classnames'

interface IAttentionDotProps {
  showing?: boolean
}

export const AttentionDot: FC<IAttentionDotProps> = ({ showing }) => {
  const classes = useStyles()
  return <div className={showing ? classes.unreadIndicator : ''}></div>
}

const useStyles = makeStyles(() =>
  createStyles({
    unreadIndicator: {
      position: 'absolute',
      borderRadius: '50% 50%',
      marginLeft: '-12px',
      background: 'red',
      marginTop: '6px',
      height: '8px',
      width: '8px',
      tranform: '200ms'
    }
  })
)
