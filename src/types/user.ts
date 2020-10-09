export interface IUser {
  id?: string
  firstName?: string
  lastName?: string
  email?: string
  phoneNumber?: string
  city?: string
  state?: string
  country?: string
  title?: string
  company?: string
  avatar?: string
  conversations?: object[]
  messages?: object[]
  status?: string
  street?: string
  postalCode?: string
  createdAt?: string
  updatedAt?: string
}

export enum UserStatus {
  ONLINE = 'Online',
  OFFLINE = 'Offline'
}
