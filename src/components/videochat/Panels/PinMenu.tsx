import React, { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { MoreHoriz } from '@material-ui/icons'

export const PinMenu = ({ user, handlePin, handleUnPin, isPinned, totalPins }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const pin = () => {
    close()
    handlePin(user?.externalUserId || '')
  }
  const unpin = () => {
    close()
    handleUnPin(user?.externalUserId || '')
  }

  const close = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton onClick={handleClick} aria-controls={`${user?.externalUserId}-menu`}>
        <MoreHoriz />
      </IconButton>
      <Menu
        id={`${user?.externalUserId}-menu`}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={close}
      >
        {!isPinned ? (
          <MenuItem onClick={pin} disabled={totalPins === 4}>
            Pin Video
          </MenuItem>
        ) : (
          <MenuItem onClick={unpin}>Unpin Video</MenuItem>
        )}
        <MenuItem onClick={close}>Cancel</MenuItem>
      </Menu>
    </>
  )
}
