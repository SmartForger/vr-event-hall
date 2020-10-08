import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import { ReactComponent as HamburgerMenu } from 'assets/hamburgerMenu.svg'

import { MenuList } from '../MenuList'
import { Chat } from '../Chat'
import { IUser, ITeleportLocation, AnchorType } from 'types'

interface ProfileMenuProps {
  anchorFlags: Object
  toggleTutorial: () => void
  toggleDrawer: (
    event: React.KeyboardEvent | React.MouseEvent,
    anchor: AnchorType,
    open: boolean,
    location?: string
  ) => void
  teleportLocations: ITeleportLocation[]
  mapLocation: ITeleportLocation
  user?: IUser
  users?: IUser[]
}

export const ProfileMenu: FC<ProfileMenuProps> = ({
  anchorFlags,
  toggleDrawer,
  toggleTutorial,
  teleportLocations,
  mapLocation,
  user,
  users
}) => {
  const classes = useStyles()

  return (
    <div>
      <HamburgerMenu id='menu-icon' className={classes.hamburgerMenu} onClick={e => toggleDrawer(e, 'right', true)} />
      <Drawer
        anchor={'right'}
        open={anchorFlags['right']}
        onClose={(e: React.KeyboardEvent | React.MouseEvent) => toggleDrawer(e, 'right', false)}
      >
        <>
          <MenuList
            anchor='right'
            toggleDrawer={toggleDrawer}
            toggleTutorial={toggleTutorial}
            teleportLocations={teleportLocations}
            mapLocation={mapLocation}
            user={user}
          />
          <Chat user={user} users={users} />
        </>
      </Drawer>
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    hamburgerMenu: {
      position: 'absolute',
      top: '30px',
      right: '45px',
      display: 'inline-block',
      cursor: 'pointer'
    }
  })
)
