import { createContext, useContext } from 'react'

export const UserListContext = createContext<{ [key: string]: any }>({})

export const useUserListContext = () => useContext(UserListContext)
