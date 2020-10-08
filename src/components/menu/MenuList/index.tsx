import React, { FC } from 'react'
import { Auth } from 'aws-amplify'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import mapIcon from 'assets/mapIcon.svg'

import { IUser, ITeleportLocation, IMapLocation, AnchorType } from 'types'
import {
  StyledDropdownIcon,
  StyledDropdownItem,
  StyledMenuList,
  StyledMenuListHeader,
  StyledMenuListHeaderPortrait,
  StyledOpenRightDrawer,
  StyledSvgWrapper
} from './Styled'

interface MenuListProps {
  toggleDrawer: (
    event: React.KeyboardEvent | React.MouseEvent,
    anchor: AnchorType,
    open: boolean,
    location?: string
  ) => void
  anchor: AnchorType
  user?: IUser
  teleportLocations: ITeleportLocation[]
  mapLocation: IMapLocation
  toggleTutorial: () => void
}

const cloudfrontBase = 'https://dx2ge6d9z64m9.cloudfront.net/public/'

export const MenuList: FC<MenuListProps> = ({
  toggleDrawer,
  anchor,
  user,
  teleportLocations,
  mapLocation,
  toggleTutorial
}) => {
  const history = useHistory()

  const showHelpToast = () => {
    toast.info('Coming Soon!')
  }

  const signOut = async () => {
    await Auth.signOut({ global: true })
    history.push('/')
  }
  return (
    <StyledOpenRightDrawer onKeyDown={e => toggleDrawer(e, anchor, false)}>
      <StyledMenuListHeader>
        <StyledMenuListHeaderPortrait>
          <div
            className='user-avatar'
            style={{
              backgroundImage: `url('${cloudfrontBase}${user?.avatar}')`
            }}
          />
          <div className='d-title'>
            <p className='mt-0 mb-2 text-24 font-weight-bold'>
              Welcome, <span>{user?.firstName}</span>
            </p>
            <p className='my-0'>{user?.company}</p>
          </div>
        </StyledMenuListHeaderPortrait>

        <StyledSvgWrapper onClick={e => toggleDrawer(e, anchor, false)}>
          <svg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M26 1.3L24.7 0L13 11.7L1.3 0L0 1.3L11.7 13L0 24.7L1.3 26L13 14.3L24.7 26L26 24.7L14.3 13L26 1.3Z'
              fill='white'
            />
            <path
              d='M26 1.3L24.7 0L13 11.7L1.3 0L0 1.3L11.7 13L0 24.7L1.3 26L13 14.3L24.7 26L26 24.7L14.3 13L26 1.3Z'
              stroke='white'
            />
          </svg>
        </StyledSvgWrapper>
      </StyledMenuListHeader>

      <StyledMenuList>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMore />} aria-controls='panel1a-content' id='panel1a-header'>
            <div className='text-24 font-weight-bold'>Points of Interest</div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              {teleportLocations.map(item => {
                return (
                  <StyledDropdownItem
                    key={`ProfileMenu-${item.babylonParam}`}
                    onClick={e => toggleDrawer(e, anchor, false, item.babylonParam)}
                  >
                    {item.babylonParam === mapLocation.babylonParam && <StyledDropdownIcon src={mapIcon} alt='map' />}
                    {item.name}
                  </StyledDropdownItem>
                )
              })}
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMore />} aria-controls='panel2a-content' id='panel2a-header'>
            <div className='text-24 font-weight-bold'>Event Info</div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              Welcome to the MVRK Vx360 Demo Environment. This virtual space is used to showcase a few features the
              Vx360 platform has to offer.
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <div className='px-8 mt-6 cursor-pointer text-24 font-weight-bold' onClick={() => showHelpToast()}>
          Help
        </div>
        <div className='px-8 mt-12 cursor-pointer text-24 font-weight-bold' onClick={() => toggleTutorial()}>
          Tutorial
        </div>
        <div className='px-8 mt-12 text-24 font-weight-bold pointer' onClick={() => signOut()}>
          Logout
        </div>
      </StyledMenuList>
    </StyledOpenRightDrawer>
  )
}
