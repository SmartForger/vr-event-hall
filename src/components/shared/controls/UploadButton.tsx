import React, { ChangeEventHandler, ReactNode } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core'
import { PillButton } from 'components'

interface UploadButtonProps {
  accept?: string
  children?: ReactNode
  idInput?: string
  multiple?: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const UploadButton = ({
  accept = 'image/*',
  children = 'Upload Image',
  idInput = 'contained-button-file',
  multiple = false,
  onChange
}: UploadButtonProps) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <input
        accept={accept}
        className={classes.input}
        id={idInput}
        multiple={multiple}
        onChange={onChange}
        type='file'
      />

      <label htmlFor={idInput}>
        <PillButton variant='contained' color='primary' component='span'>
          {children}
        </PillButton>
      </label>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1)
      }
    },
    input: {
      display: 'none'
    }
  })
)
