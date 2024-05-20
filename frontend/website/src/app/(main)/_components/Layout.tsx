'use client'

import { useAuth } from "@/app/(authentication)/_context/AuthContext";
import AppBar from "./AppBar";
import Drawer from "./Drawer";
import Footer from "./Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { auth, setAuth } = useAuth()

  if (!auth) {
    return "Auth null / undefined!"
  }

  if (!auth.isAuthenticated) {
    return "User Tidak Terotorasi!"
  }

  if (!auth.user) {
    return "User Missing!"
  }

  return (<>
    <div className="flex h-svh">
      {/* Drawer */}
      <div>
        <Drawer />
      </div>
      {/* App */}
      <main className="flex flex-col overflow-y-auto grow">
        {/* AppBar */}
        <AppBar />
        {/* Context */}
        <div className="px-4 grow py">
          {children}
        </div>
        {/* Footer */}
        <Footer />
      </main>
    </div>
  </>);
}
