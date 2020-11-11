import React, { FC } from 'react'

// Components
import { MenuTooltip } from 'components'

// Types
import { AnchorType, GameFlowSteps, IUser } from 'types'

// Styles
import { Avatar } from '@material-ui/core'
import {
  StyledMenuList,
  StyledMenuListHeader,
  StyledMenuListIcon,
  StyledMenuListItem,
  StyledOpenRightDrawer
} from './Styled'

// Images
import homeIcon from 'assets/homeIcon.svg'
import demoTvIcon from 'assets/demoTvIcon.svg'
import mailIcon from 'assets/mailIcon.svg'
import sessionIcon from 'assets/breakout.svg'
import infoIcon from 'assets/infoIcon.svg'
import gradCapIcon from 'assets/gradCapIcon.svg'
import supportIcon from 'assets/supportIcon.svg'

interface MenuListProps {
  user?: IUser
  anchor: AnchorType
  drawerOpen: boolean
  toggleMenuDrawer: () => void
  toggleTutorial: () => void
  toggleProfileDrawer: () => void
  toggleIntroTutorial: () => void
  setGameState: (state: GameFlowSteps) => void
}

export const MenuList: FC<MenuListProps> = ({
  drawerOpen,
  toggleMenuDrawer,
  user,
  setGameState,
  toggleIntroTutorial,
  toggleProfileDrawer
}) => {
  const openProfileDrawer = () => {
    if (!drawerOpen) {
      toggleMenuDrawer()
    }
    toggleProfileDrawer()
  }

  return (
    <StyledOpenRightDrawer>
      <div onClick={() => openProfileDrawer()}>
        <StyledMenuListHeader>
          <Avatar className='header-avatar' src={user?.avatar} alt={user?.firstName}>
            {user?.firstName?.substring(0, 1)}
          </Avatar>
          <aside>
            <span className='header-title'>Welcome, {user?.firstName}</span>
            <small className='header-subtitle'>{user?.company}</small>
          </aside>
        </StyledMenuListHeader>
      </div>

      <StyledMenuList className={drawerOpen ? 'drawer-open' : 'drawer-close'}>
        <StyledMenuListItem onClick={() => setGameState(GameFlowSteps.Welcome)}>
          <MenuTooltip drawerOpen={drawerOpen} title='Welcome' placement='left'>
            <StyledMenuListIcon>
              <img src={homeIcon} alt='Home icon' width='25' />
            </StyledMenuListIcon>
          </MenuTooltip>
          Welcome
        </StyledMenuListItem>
        <StyledMenuListItem onClick={() => setGameState(GameFlowSteps.Explore)}>
          <MenuTooltip drawerOpen={drawerOpen} title='Explore' placement='left'>
            <StyledMenuListIcon>
              <img src={demoTvIcon} alt='Tv icon' width='23' />
            </StyledMenuListIcon>
          </MenuTooltip>
          Explore
        </StyledMenuListItem>
        <StyledMenuListItem onClick={() => setGameState(GameFlowSteps.Sessions)}>
          <MenuTooltip drawerOpen={drawerOpen} title='Sessions' placement='left'>
            <StyledMenuListIcon>
              <img src={sessionIcon} alt='Session icon' width='16' />
            </StyledMenuListIcon>
          </MenuTooltip>
          Breakout Sessions
        </StyledMenuListItem>
        <StyledMenuListItem onClick={() => setGameState(GameFlowSteps.Connect)}>
          <MenuTooltip drawerOpen={drawerOpen} title='Connect' placement='left'>
            <StyledMenuListIcon>
              <img src={mailIcon} alt='Mail icon' width='19' />
            </StyledMenuListIcon>
          </MenuTooltip>
          Connect
        </StyledMenuListItem>
        <StyledMenuListItem onClick={() => window.postMessage('{"command":"about"}', '*')}>
          <MenuTooltip drawerOpen={drawerOpen} title='About the event' placement='left'>
            <StyledMenuListIcon>
              <img src={infoIcon} alt='Info icon' width='19' />
            </StyledMenuListIcon>
          </MenuTooltip>
          About the event
        </StyledMenuListItem>
        <StyledMenuListItem onClick={() => toggleIntroTutorial()}>
          <MenuTooltip drawerOpen={drawerOpen} title='Tutorial' placement='left'>
            <StyledMenuListIcon>
              <img src={gradCapIcon} alt='Grad cap icon' width='24' />
            </StyledMenuListIcon>
          </MenuTooltip>
          Tutorial
        </StyledMenuListItem>
        <StyledMenuListItem onClick={() => window.postMessage('{"command":"support"}', '*')}>
          <MenuTooltip drawerOpen={drawerOpen} title='Support' placement='left'>
            <StyledMenuListIcon>
              <img src={supportIcon} alt='Support icon' width='19' />
            </StyledMenuListIcon>
          </MenuTooltip>
          Support
        </StyledMenuListItem>
      </StyledMenuList>
    </StyledOpenRightDrawer>
  )
}
