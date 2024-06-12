'use client'

import { useAuth } from "@/app/auth/_context/AuthContext";
import Drawer from "./_components/Drawer";
import AppBar from "./_components/AppBar";
import Footer from "./_components/Footer";
import FetchError from "./_components/FetchError";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { auth, setAuth } = useAuth()

  const [drawerOpen, setDrawerOpen] = useState(true)

  if (!auth || !auth.isAuthenticated || !auth.user) {
    return <FetchError />;
  }

  return (<>
    <div className="flex h-svh">
      {/* Drawer */}
      <div className="bg-base-300">
        <Drawer isOpen={drawerOpen} setIsOpen={setDrawerOpen} />
      </div>
      {/* App */}
      <main className="flex flex-col overflow-y-auto grow">
        {/* AppBar */}
        <AppBar isOpen={drawerOpen} setIsOpen={setDrawerOpen} />
        {/* Context */}
        <div className="px-2 sm:px-4 grow py">
          {children}
        </div>
        {/* Footer */}
        <Footer />
      </main>
    </div>
  </>);
}
