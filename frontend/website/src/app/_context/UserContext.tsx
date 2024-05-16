'use client'

import React, { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react"
import { UserInterface } from "../_interface/models/UserInterface"

import { useCookies } from "next-client-cookies"
import { setToken } from "../auth/_utils/token"

interface UserContextType {
  user: UserInterface | null
  setUser: Dispatch<SetStateAction<UserInterface | null>>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const cookies = useCookies()

  const [user, setUser] = useState<UserInterface | null>(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("Where The Provider???? ~LowScarlet")
  }
  return context
}