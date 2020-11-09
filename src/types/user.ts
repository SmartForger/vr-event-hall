import { IConvoLink } from './chat'

export interface IUser {
  id?: string
  firstName?: string
  lastName?: string
  email?: string
  phoneNumber?: string
  companySize?: string
  title?: string
  company?: string
  avatar?: string
  conversations?: UserConversationList
  messages?: object[]
  status?: string
  address1?: string
  postalCode?: string
  city?: string
  state?: string
  country?: string
  companyAddress1?: string
  companyPostalCode?: string
  companyCity?: string
  companyState?: string
  companyCountry?: string
  createdAt?: string
  updatedAt?: string
}

interface UserConversationList {
  items: IConvoLink[]
}

export enum UserStatus {
  ONLINE = 'Online',
  OFFLINE = 'Offline'
}
