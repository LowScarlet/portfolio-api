'use client'

import { useAuth } from "@/app/auth/_context/AuthContext";
import Drawer from "./_components/Drawer";
import AppBar from "./_components/AppBar";
import Footer from "./_components/Footer";
import FetchError from "./_components/FetchError";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { auth, setAuth } = useAuth()

  if (!auth || !auth.isAuthenticated || !auth.user) {
    return <FetchError />;
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
        <div className="px-2 sm:px-4 grow py">
          {children}
        </div>
        {/* Footer */}
        <Footer />
      </main>
    </div>
  </>);
}
