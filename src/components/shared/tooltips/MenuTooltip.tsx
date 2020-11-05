import React, { FC, useState } from 'react'
import { withStyles, Tooltip as MuiTooltip, TooltipProps } from '@material-ui/core'

interface MenuTooltipProps extends TooltipProps {
  drawerOpen: boolean
}

const CustomTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: '#fff',
    border: '1px solid #000',
    color: '#000',
    fontSize: '1rem',
    borderRadius: 0,
    fontFamily: 'Verizon-Bold',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
    left: -30,
    padding: '.5rem'
  },
  arrow: {
    color: '#fff',
    '&::before': {
      border: '1px solid #000',
      backgroundColor: '#fff',
      boxSizing: 'border-box'
    }
  }
}))(MuiTooltip)

export const MenuTooltip: FC<MenuTooltipProps> = ({ drawerOpen, children, ...props }) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <CustomTooltip
      {...props}
      arrow
      open={open}
      onMouseEnter={() => !drawerOpen && setOpen(true)}
      onMouseOut={() => !drawerOpen && setOpen(false)}
      disableFocusListener
      disableHoverListener
      disableTouchListener
    >
      {React.cloneElement(children, { onClick: () => setOpen(false) })}
    </CustomTooltip>
  )
}
