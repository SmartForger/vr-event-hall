import React, { FC, useState } from 'react'
import { IconButton, Collapse } from '@material-ui/core'
import { ExpandMore, MoreHoriz } from '@material-ui/icons'

import { IUser, IChatChannels, IChildComponent, IChatChannel, UserStatus } from '../../types'

interface ChatDirectMessageProps {
  user: IUser
}

const DirectMessage: FC<ChatDirectMessageProps> = ({ user }) => {
  // TODO: Remove this when hooking up chat logic
  const notificationCount = Math.floor(Math.random() * 15)
  return (
    <div className='chat-section-item direct-message'>
      <div className='direct-message-item'>
        <div className='left-content'>
          <span className={`user-status ${user.status === UserStatus.ONLINE ? 'online' : 'offline'}`}></span>
          <span className='user-name'>{`${user.firstName} ${user.lastName}`}</span>
        </div>
        <div>
          {notificationCount > 0 && (
            <div className='notification-icon'>
              <span>{notificationCount}</span>
            </div>
          )}
        </div>
      </div>
      <IconButton edge='end' size='small' onClick={() => console.log('more clicked')}>
        <MoreHoriz />
      </IconButton>
    </div>
  )
}

const Channel: FC<IChatChannel> = ({ name }) => (
  <div className='chat-section-item channel'>
    <span>{name}</span>
  </div>
)

export const ChatSection: FC<IChatChannels> = ({ data, title, previewCount, isDirectMessage = false }) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  const ChildComponent: FC<IChildComponent> = ({ data }) =>
    isDirectMessage ? <DirectMessage user={data as IUser} /> : <Channel name={data as string} />
  return (
    <div className='chat-section'>
      <div className='chat-section-header'>
        <h3>{title}</h3>
        <IconButton edge='end' size='small' onClick={() => setExpanded(!expanded)}>
          <ExpandMore className={`expand-more ${expanded ? 'expanded' : ''}`} />
        </IconButton>
      </div>
      {data.slice(0, previewCount).map((data, index) => {
        return <ChildComponent data={data} key={`preview-${index}`} />
      })}
      <Collapse in={expanded}>
        {data.slice(previewCount).map((data, index) => {
          return <ChildComponent data={data} key={`expanded-${index}`} />
        })}
      </Collapse>
    </div>
  )
}
