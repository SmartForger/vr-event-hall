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
  conversations?: object[]
  messages?: object[]
  status?: string
  personalAddress1?: string
  personalPostalCode?: string
  personalCity?: string
  personalState?: string
  personalCountry?: string
  companyAddress1?: string
  companyPostalCode?: string
  companyCity?: string
  companyState?: string
  companyCountry?: string
  createdAt?: string
  updatedAt?: string
}

export enum UserStatus {
  ONLINE = 'Online',
  OFFLINE = 'Offline'
}
