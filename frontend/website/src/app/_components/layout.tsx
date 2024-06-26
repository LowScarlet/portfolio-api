'use client'

import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../globals.css";
import { AuthContextInterface } from "../auth/_models/interface/AuthContextInterface";
import { AuthProvider } from "../auth/_context/AuthContext";
import LoadingScreen from "./LoadingScreen";
import { useUser } from "../app/_models/client/user/User";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let authData: AuthContextInterface

  const user = useUser()

  if (user.isLoading) return <LoadingScreen />

  if (user.isError) {
    authData = {
      isAuthenticated: false,
      user: null,
    }
  }

  else if (user.data) {
    const { id, username, role, UserProfile } = user.data.user
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
