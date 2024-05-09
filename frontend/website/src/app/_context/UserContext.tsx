'use client'

import React, { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { UserInterface } from "../_interface/UserInterface";

import { useCookies } from "next-client-cookies";
import { setToken } from "../auth/_utils/setToken";

interface UserContextType {
  user: UserInterface | null;
  setUser: Dispatch<SetStateAction<UserInterface | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cookies = useCookies();

  const [user, setUser] = useState<UserInterface | null>(null);

  useEffect(() => {
    (async () => {
      let accessToken = cookies.get('accessToken')
      const refreshToken = cookies.get('refreshToken')

      try {
        if (!accessToken) {
          const response = await fetch('http://localhost:5000/api/auth/verify', {
            next: { tags: ['verify-user'] },
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              refreshToken
            })
          });

          if (!response.ok) {
            return
          }

          const { data } = await response.json();

          accessToken = data.token
          setToken({ accessToken: data })
        }

        if (!user) {
          const response = await fetch('http://localhost:5000/api/client/@me', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
          });

          if (!response.ok) {
            return
          }

          const { user: gguser } = await response.json();

          console.log("ggwp")

          setUser(gguser)
        }
      } catch (error) {
        console.log(error)
      }
    })()
  })

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Where The Provider???? ~LowScarlet");
  }
  return context;
};