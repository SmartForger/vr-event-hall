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
  companySize?: string
  companyAddress1?: string
  companyCity?: string
  companyState?: string
  companyPostalCode?: string
  createdAt?: string
  updatedAt?: string
}

export enum UserStatus {
  ONLINE = 'Online',
  OFFLINE = 'Offline'
}
