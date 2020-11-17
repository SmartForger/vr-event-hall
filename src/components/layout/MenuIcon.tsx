import React, { FC } from 'react'
import classnames from 'classnames'

import { Theme, makeStyles } from '@material-ui/core'

interface Props {
  opened?: boolean
}

export const MenuIcon: FC<Props> = ({ opened }) => {
  const classes = useStyles()

  return (
    <div className={classnames(classes.root, opened && 'opened')}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    width: 16,
    height: 15,

    '& span': {
      display: 'block',
      width: '100%',
      height: 1,
      background: 'black',
      position: 'absolute',
      transition: 'all ease 0.3s',

      '&:nth-child(1)': {
        top: 0
      },

      '&:nth-child(2)': {
        top: 7
      },

      '&:nth-child(3)': {
        bottom: 0
      }
    },

    '&.opened': {
      '& span': {
        width: 18,

        '&:nth-child(1)': {
          top: 7,
          transform: 'rotate(45deg)'
        },

        '&:nth-child(2)': {
          transform: 'rotate(-45deg)'
        },

        '&:nth-child(3)': {
          display: 'none'
        }
      }
    }
  }
}))
