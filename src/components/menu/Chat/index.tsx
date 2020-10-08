import React, { FC } from 'react'
import { IconButton } from '@material-ui/core'
import { Add } from '@material-ui/icons'

import { ChatSection } from '../ChatSection'
import { StyledChat, StyledChatHeader } from './Styled'

import { IUser } from 'types'

interface ChatProps {
  user?: IUser
  users?: IUser[]
}

export const Chat: FC<ChatProps> = () => {
  return (
    <StyledChat>
      <StyledChatHeader>
        <h2>Live Chat</h2>
        <IconButton size='medium' onClick={() => console.log('add clicked')} edge='end'>
          <Add />
        </IconButton>
      </StyledChatHeader>

      <ChatSection data={fakeChannels} title='Channels' previewCount={3} />
      <ChatSection data={fakeUsers} title='Direct Messages' isDirectMessage={true} previewCount={3} />
    </StyledChat>
  )
}

const fakeChannels = ['General', 'Test Channel', 'Help', 'Nom Nom Nom', 'Development']

const fakeUsers: IUser[] = [
  {
    id: '1',
    firstName: 'Jesse',
    lastName: 'Slavens',
    email: 'jslavens@mvrk.co',
    status: 'Online',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    firstName: 'Logan',
    lastName: 'Arnett',
    email: 'larnett@mvrk.co',
    status: 'Offline',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    firstName: 'David',
    lastName: 'Bane',
    email: 'dbane@mvrk.co',
    status: 'Online',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    firstName: 'Alex',
    lastName: 'Soper',
    email: 'asoper@mvrk.co',
    status: 'Online',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    firstName: 'Bruno',
    lastName: 'Franco',
    email: 'bfranco@mvrk.co',
    status: 'Offline',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]
