'use client'

import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../globals.css";
import { useGet_ClientUser } from "../app/_models/client/user/GetClientUser";
import { AuthContextInterface } from "../auth/_interface/AuthContextInterface";
import { AuthProvider } from "../auth/_context/AuthContext";
import LoadingScreen from "./LoadingScreen";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let authData: AuthContextInterface

  const useClientUser = useGet_ClientUser()

  if (useClientUser.isLoading) return <LoadingScreen />

  if (useClientUser.isError) {
    authData = {
      isAuthenticated: false,
      user: null,
    }
  }

  else if (useClientUser.data) {
    const { id, username, role, UserProfile } = useClientUser.data.user
    const { avatar } = UserProfile
    authData = {
      isAuthenticated: true,
      user: {
        id,
        username,
        role,
        avatar
      },
    }
  } else {
    authData = {
      isAuthenticated: false,
      user: null,
    }
  }

  return (
    <AuthProvider initData={authData}>
      <ToastContainer
        position="bottom-right"
        closeOnClick
      />
      <NextTopLoader />
      {children}
    </AuthProvider>
  )
}
