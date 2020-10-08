import { IUser } from './user'

export interface IChatChannels {
  // TODO: Update this when channel logic is implemented
  data: (string | IUser)[]
  title: string
  isDirectMessage?: boolean
  previewCount: number
}

export interface IChildComponent {
  data: string | IUser
}

export interface IChatChannel {
  name: string
}

export interface IMessageInput {
  id: string
  createdAt: string | number
  messageConversationId: string
  content: string
  authorId?: string
}

export interface IConversation {
  id: string
  name: string
  members: Array<string>
}

export interface IActiveConversation {
  id: string
  name: string
  messages: Array<IMessage>
  offline: boolean
}

export interface IPerson {
  name?: string
  id?: string
  conversationId?: string
  selected?: boolean
}

export interface IMessage {
  content: string
  author: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
}
