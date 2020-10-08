import React, { FC, useState } from 'react'
import { IconButton, Collapse, createStyles, makeStyles, Theme } from '@material-ui/core'
import { ExpandMore, MoreHoriz } from '@material-ui/icons'
import classnames from 'classnames'

import { IUser, UserStatus } from 'types'
import {
  StyledChannel,
  StyledChatSection,
  StyledChatSectionItem,
  StyledChatSectionHeader,
  StyledChatSectionHeaderTitle,
  StyledDirectMessage,
  StyledDirectMessageItem,
  StyledLeftContent,
  StyledNotificationIcon,
  StyledUserName,
  StyledUserStatus
} from './Styled'

interface IChatChannels {
  // TODO: Update this when channel logic is implemented
  data: (string | IUser)[]
  title: string
  isDirectMessage?: boolean
  previewCount: number
}
interface IChildComponent {
  data: string | IUser
}
interface IChatChannel {
  name: string
}
interface IChatDirectMessage {
  user: IUser
}

const DirectMessage: FC<IChatDirectMessage> = ({ user }) => {
  // TODO: Remove this when hooking up chat logic
  const notificationCount = Math.floor(Math.random() * 15)

  return (
    <StyledDirectMessage>
      <StyledDirectMessageItem>
        <StyledLeftContent>
          <StyledUserStatus
            className={classnames({
              online: user.status === UserStatus.ONLINE,
              offline: user.status !== UserStatus.ONLINE
            })}
          />
          <StyledUserName>
            {user.firstName} {user.lastName}
          </StyledUserName>
        </StyledLeftContent>

        <div>
          {notificationCount > 0 && (
            <StyledNotificationIcon>
              <span>{notificationCount}</span>
            </StyledNotificationIcon>
          )}
        </div>
      </StyledDirectMessageItem>
      <IconButton edge='end' size='small' onClick={() => console.log('more clicked')}>
        <MoreHoriz />
      </IconButton>
    </StyledDirectMessage>
  )
}

const Channel: FC<IChatChannel> = ({ name }) => (
  <StyledChannel>
    <span>{name}</span>
  </StyledChannel>
)

export const ChatSection: FC<IChatChannels> = ({ data, title, previewCount, isDirectMessage = false }) => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState<boolean>(false)
  const ChildComponent: FC<IChildComponent> = ({ data }) =>
    isDirectMessage ? <DirectMessage user={data as IUser} /> : <Channel name={data as string} />
  return (
    <StyledChatSection>
      <StyledChatSectionHeader>
        <StyledChatSectionHeaderTitle>{title}</StyledChatSectionHeaderTitle>
        <IconButton edge='end' size='small' onClick={() => setExpanded(!expanded)}>
          <ExpandMore
            className={classnames(classes.expandMore, {
              [classes.expanded]: expanded
            })}
          />
        </IconButton>
      </StyledChatSectionHeader>

      {data.slice(0, previewCount).map((data, index) => (
        <StyledChatSectionItem key={`preview-${index}`}>
          <ChildComponent data={data} />
        </StyledChatSectionItem>
      ))}

      <Collapse in={expanded}>
        {data.slice(previewCount).map((data, index) => (
          <StyledChatSectionItem key={`expanded-${index}`}>
            <ChildComponent data={data} />
          </StyledChatSectionItem>
        ))}
      </Collapse>
    </StyledChatSection>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    expandMore: {
      transition: 'transform 0.2s ease-in-out'
    },
    expanded: {
      transform: 'rotate(180deg)'
    }
  })
)
