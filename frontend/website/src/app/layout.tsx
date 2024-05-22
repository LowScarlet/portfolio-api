import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./(authentication)/_context/AuthContext";
import { GetMe } from "./_models/client/@me/MeHandler";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let authData

  try {
    const fetchRes = await GetMe('layout')

    if (!fetchRes.ok) {
      authData = {
        isAuthenticated: false,
        user: null
      }
    } else {
      const fetchResOutput = fetchRes.data

      authData = {
        isAuthenticated: true,
        user: fetchResOutput.user
      }
    }
  } catch (error) {
    authData = {
      isAuthenticated: false,
      user: null
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
