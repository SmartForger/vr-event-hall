import React, { FC } from 'react'
import {
  createStyles,
  makeStyles,
  Theme,
  Button,
  ButtonProps as MuiButtonProps,
  CircularProgress
} from '@material-ui/core'

interface ButtonProps extends MuiButtonProps {
  className?: string
  textColor?: string
  borderColor?: string
  loading?: boolean
  children?: React.ReactNode
  solid?: boolean
  backgroundColor?: string
}

export const PillButton: FC<ButtonProps> = ({
  children,
  className,
  textColor,
  borderColor,
  loading,
  solid,
  backgroundColor,
  ...props
}) => {
  const classes = useStyles({ textColor, borderColor, solid, backgroundColor })

  return (
    <Button
      {...props}
      className={`${classes.pill} ${className || ''}`}
      disabled={loading || props.disabled}
      disableRipple
      disableFocusRipple
      disableTouchRipple
    >
      {children}
      {loading ? <CircularProgress size={24} className={classes.buttonProgress} /> : null}
    </Button>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pill: {
      borderRadius: '24px',
      borderColor: (props: ButtonProps) => props.borderColor || '#000',
      color: (props: ButtonProps) => (props.solid ? '#fff' : props.textColor || '#000'),
      backgroundColor: (props: ButtonProps) =>
        props.solid ? '#000' : props.backgroundColor ? props.backgroundColor : '#fff',
      fontFamily: 'Verizon-Bold',
      borderWidth: '1px',
      borderStyle: 'solid',
      position: 'relative',
      // Verizon branding guidelines dictate the left/right padding has to be the same as the height of the button
      height: '42px',
      padding: '0 42px',
      margin: '42px 0',
      textTransform: 'none',
      '&:disabled': {
        borderRadius: '24px',
        borderColor: (props: ButtonProps) => props.borderColor || 'rgba(0,0,0,0.5)',
        color: (props: ButtonProps) => (props.solid ? 'rgba(255, 255, 255, 0.5)' : props.textColor || 'rgba(0,0,0,0.5)')
      },
      '&:hover': {
        backgroundColor: (props: ButtonProps) => (props.solid ? 'rgba(0,0,0,0.8)' : 'initial')
      }
    },
    buttonProgress: {
      color: 'rgba(0,0,0,0.5)',
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12
    }
  })
)
