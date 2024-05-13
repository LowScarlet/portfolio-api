'use client'

import { redirect } from "next/navigation";
import { useAuth } from "./_context/AuthContext";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { auth } = useAuth()

  useEffect(() => {
    if (auth?.isAuthenticated === true) {
      console.log("test")
      redirect('/dashboard')
    }
  })

  return (<>
    {children}
  </>
  );
}
