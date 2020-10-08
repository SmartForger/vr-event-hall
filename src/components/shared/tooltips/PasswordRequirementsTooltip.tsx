import React, { FC, useState, useEffect } from 'react'
import { makeStyles, Theme, Tooltip } from '@material-ui/core'
import { I18n } from 'aws-amplify'
import classnames from 'classnames'

import { ReactComponent as CheckIcon } from 'assets/checkmark.svg'

interface PasswordRequirementsTooltipProps {
  open: boolean
  password: string
  children: React.ReactNode
}

export const PasswordRequirementsTooltip: FC<PasswordRequirementsTooltipProps> = ({ open, password, children }) => {
  const classes = useStyles()
  const [lengthCheck, setLengthCheck] = useState<boolean>(false)
  const [upperCaseCheck, setUpperCaseCheck] = useState<boolean>(false)
  const [lowerCaseCheck, setLowerCaseCheck] = useState<boolean>(false)
  const [numberCheck, setNumberCheck] = useState<boolean>(false)
  const [symbolCheck, setSymbolCheck] = useState<boolean>(false)

  useEffect(() => {
    setLengthCheck(password.length >= 12)
    setUpperCaseCheck(/([A-Z])+/.test(password))
    setLowerCaseCheck(/([a-z])+/.test(password))
    setNumberCheck(/([1-9])+/.test(password))
    setSymbolCheck(/([!@#$%^&*()\-_+~=])+/.test(password))
  }, [password])

  return (
    <Tooltip
      arrow
      open={open}
      placement='top'
      classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
      title={
        <div className={classes.tooltipContainer}>
          <div className={classes.title}>
            <span>{I18n.get('passwordMustContain')}</span>
          </div>
          <div className={classes.tooltipItem}>
            <span className={classes.icon}>
              <CheckIcon className={classnames(lengthCheck && classes.successCheck)} />
            </span>
            <span>{I18n.get('passwordReqLength')}</span>
          </div>
          <div className={classes.tooltipItem}>
            <span className={classes.icon}>
              <CheckIcon className={classnames(upperCaseCheck && classes.successCheck)} />
            </span>
            <span>{I18n.get('passwordReqUpperCase')}</span>
          </div>
          <div className={classes.tooltipItem}>
            <span className={classes.icon}>
              <CheckIcon className={classnames(lowerCaseCheck && classes.successCheck)} />
            </span>
            <span>{I18n.get('passwordReqLowerCase')}</span>
          </div>
          <div className={classes.tooltipItem}>
            <span className={classes.icon}>
              <CheckIcon className={classnames(numberCheck && classes.successCheck)} />
            </span>
            <span>{I18n.get('passwordReqNumber')}</span>
          </div>
          <div className={classes.tooltipItem}>
            <span className={classes.icon}>
              <CheckIcon className={classnames(symbolCheck && classes.successCheck)} />
            </span>
            <span>{I18n.get('passwordReqSymbol')}</span>
          </div>
        </div>
      }
    >
      <div>{children}</div>
    </Tooltip>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  arrow: {
    color: '#000'
  },
  icon: {
    marginRight: '.25rem',
    height: '1rem',
    width: '1rem',
    '& svg': {
      height: '1rem',
      width: '1rem'
    }
  },
  title: {
    marginBottom: '.5rem',
    '& span': {
      fontWeight: 'bold',
      fontSize: '.75rem',
      color: '#000'
    }
  },
  tooltip: {
    backgroundColor: '#fff',
    border: '1px solid #000',
    borderRadius: 0,
    padding: '1rem'
  },
  tooltipContainer: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column'
  },
  tooltipItem: {
    color: '#000',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '.5rem'
  },
  successCheck: {
    '& path': {
      stroke: theme.palette.success.main
    },
    '& rect': {
      stroke: theme.palette.success.main
    }
  }
}))
