import { IAdminUser, IConvoLink, IUser } from 'types'

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

export const checkConversationUserOnlineStatus = (
  updatedUser: IUser,
  conversationItems: IConvoLink[]
): IConvoLink[] | boolean => {
  let convosChanged = false
  const updatedConvoItems = conversationItems.map(item => {
    const index = item.conversation.associated.items.findIndex(a => a.userId === updatedUser.id)
    if (index >= 0) {
      convosChanged = true
      item.conversation.associated.items[index].user = updatedUser
    }
    return item
  })

  if (convosChanged) {
    return updatedConvoItems
  } else {
    return false
  }
}
