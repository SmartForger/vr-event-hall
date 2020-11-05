import { createContext, useContext } from 'react'

export const ChatListContext = createContext<{ [key: string]: any }>({})

export const useChatListContext = () => useContext(ChatListContext)
