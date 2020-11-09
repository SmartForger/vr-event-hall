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
  id?: string
  createdAt: string | number
  conversationId: string
  content: string
  authorId?: string
  deleted?: string
}

interface IAssociatedList {
  items: IConvoLink[]
}

export interface IConversation {
  id: string
  name: string
  members: Array<string>
  associated: IAssociatedList
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
  id: string
  content: string
  author: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
  deleted?: string
  createdAt?: string
  updatedAt?: string
}

export interface IAdminUser {
  userType: 'sme' | 'moderator'
  user: IUser
  userId: string
}

export interface IAdminUserItems {
  items: IAdminUser[]
}

export interface IUserItems {
  items: IUser[]
}

export interface IDemoSession {
  id
  name: string
  description: string
  active?: string
  conversationId: string
  conversation?: IConversation
  admins: IAdminUserItems
  users: IUserItems
  pinnedMessageId: string
  pinnedMessage: IMessage
}

export interface IConvoLink {
  conversationId: string
  userId: string
  user: IUser
  conversation: IConversation
}
