import { IAdminUser } from 'types'

export const isAdmin = (id: string, admins: IAdminUser[]) => {
  return admins.find(admin => admin.user.id === id)
}
