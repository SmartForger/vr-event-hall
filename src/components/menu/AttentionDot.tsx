import React, { FC, useEffect, useRef, useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core'
import classnames from 'classnames'

interface IAttentionDotProps {
  showing?: boolean
  number?: number
  maxNumber?: number
}

export const AttentionDot: FC<IAttentionDotProps> = ({ showing, number = 0, maxNumber = 9 }) => {
  const classes = useStyles({ showing, number })
  return (
    <div className={classes.unreadIndicator}>
      {showing && number ? (number > maxNumber ? `${maxNumber}+` : number) : ''}
    </div>
  )
}

const useStyles = makeStyles({
  unreadIndicator: (props: IAttentionDotProps) => ({
    position: 'absolute',
    height: props.showing ? (props.number ? '16px' : '8px') : '0px',
    width: props.showing ? (props.number ? '16px' : '8px') : '0px',
    marginTop: props.number ? '-10px' : '0px',
    marginLeft: '-10px',
    borderRadius: '50% 50%',
    fontSize: '10px',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: '14px',
    background: 'red',
    tranform: '200ms'
  })
})
