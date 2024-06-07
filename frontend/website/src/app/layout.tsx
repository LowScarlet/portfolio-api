import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./(authentication)/_context/AuthContext";
import { GetMe } from "./_models/client/@me/MeHandler";
import "./globals.css";
import { GetMeProfile } from "./_models/client/@me/profile/MeProfileHandler";
import { AuthContextInterface } from "./(authentication)/_interface/AuthContextInterface";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "🔥 Portfolio API",
  description: "Create Your Own Portfolio!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let authData: AuthContextInterface

  try {
    const fetchRes = await GetMe('layout')
    const fetchRes2 = await GetMeProfile('layout')

    if (!fetchRes.ok || !fetchRes2.ok) {
      authData = {
        isAuthenticated: false,
        user: null,
        userProfile: null
      }
    } else {
      const fetchResOutput = fetchRes.data
      const fetchResOutput2 = fetchRes2.data

      authData = {
        isAuthenticated: true,
        user: fetchResOutput.user,
        userProfile: fetchResOutput2.userProfile
      }
    }
  } catch (error) {
    authData = {
      isAuthenticated: false,
      user: null,
      userProfile: null
    }
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider initData={authData}>
          <ToastContainer />
          <NextTopLoader />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
