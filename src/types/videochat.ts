import { IMessage } from './chat'
import { IUser } from './user'

export interface IMeetingInfo {
  MeetingId: string
  [key: string]: string
}

export interface IBaseSdkProps {
  /** Optional css */
  css?: string
  /** Optional class names to apply to the element */
  className?: string
}

export type IPollAnswerValue = 'optionA' | 'optionB' | 'optionC' | 'optionD'

export interface IPollObject {
  id?: string
  sessionId?: string
  active?: string
  name: string
  question: string
  optionA: string
  optionB: string
  optionC: string
  optionD: string
  answer: IPollAnswerValue
  createdAt?: string
  updatedAt?: string
}

export interface IQuestionObject {
  id?: string
  userId?: string
  sessionId?: string
  user?: IUser
  answered: string
  content: string
  createdAt: string
  updatedAt: string
}

interface IAdminUser {
  id: string
  userId: string
  sessionId: string
  user?: IUser
  userType: string
}

interface IAdminUserList {
  items: IAdminUser[]
}

interface IPollObjectList {
  items: IPollObject[]
}

export interface IParticipant {
  id: string
  userId: string
  sessionId: string
  user?: IUser
}

export interface ISession {
  id?: string
  name: string
  description: string
  active?: string
  conversationId: string
  icId: string
  muted?: boolean
  qaActive?: boolean
  polls?: IPollObjectList
  pinnedMessageId: string
  pinnedMessage: IMessage
  presenterPins: string[]
  admins: IAdminUserList
  participants?: { items: IParticipant[] }
}

export interface IVideoChatInvite {
  id: string
  userId: string
  invitingUserId: string
  conversationId: string
  invitingUser: IUser
  declined: boolean
}
