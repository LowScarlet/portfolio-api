'use client'

import React, { Dispatch, SetStateAction, createContext, useContext, useState } from "react"
import { AuthContextInterface } from "../_models/interface/AuthContextInterface"

interface AuthContextType {
  auth: AuthContextInterface | null
  setAuth: Dispatch<SetStateAction<AuthContextInterface | null>>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({
  children,
  initData
}: {
  children: React.ReactNode,
  initData: AuthContextInterface
}) => {
  const [auth, setAuth] = useState<AuthContextInterface | null>(initData)

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}