import { IAdminUser } from 'types'

export const isAdmin = (id: string, admins: IAdminUser[]) => {
  return admins.find(admin => admin.user.id === id)
}

export const sortBy = (list: any[], key: string) => {
  return list.sort((a, b) => (a[key] > b[key] ? 1 : -1))
}

export const debounce = (func: Function, timeout?: number) => {
  let timer: number | undefined
  return (...args: any[]) => {
    const next = () => func(...args)
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(next, typeof timeout === 'number' && timeout > 0 ? timeout : 300)
  }
}
