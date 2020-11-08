import React, { FC } from 'react'

// Components
import { MenuTooltip } from 'components'
import { ChatSection } from '../ChatSection'
import { StyledChat, StyledChatHeader, StyledChatSection } from './Styled'

import { IUser } from 'types'

// Images
import liveChatBubbleIcon from 'assets/liveChatBubbleIcon.svg'
import { ChatDrawer } from './ChatDrawer'

interface ChatProps {
  user?: IUser
  users?: IUser[]
  drawerOpen: boolean
  conversationId: string
  toggleDrawer: () => void
}

export const Chat: FC<ChatProps> = ({ drawerOpen, conversationId, toggleDrawer }) => {
  return (
    <>
      <StyledChat>
        <StyledChatHeader
          onClick={() => {
            !drawerOpen && toggleDrawer()
          }}
        >
          <MenuTooltip drawerOpen={drawerOpen} title='Live Chat' placement='left'>
            <img className='header-icon' src={liveChatBubbleIcon} alt='Livechat icon' width='24' />
          </MenuTooltip>
          <h2 className='header-title'>Live Chat</h2>
        </StyledChatHeader>

        <StyledChatSection className={drawerOpen ? 'drawer-open' : 'drawer-close'}>
          <ChatSection title='Channels' conversationId={conversationId} />
        </StyledChatSection>

        {/* TODO: This needs to be populated with user DMs */}
        <StyledChatSection className={drawerOpen ? 'drawer-open' : 'drawer-close'}>
          <ChatSection title='Direct Messages' conversationId={conversationId} />
        </StyledChatSection>
      </StyledChat>
      <ChatDrawer />
    </>
  )
}
