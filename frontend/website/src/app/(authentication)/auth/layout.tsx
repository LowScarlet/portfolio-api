'use client'

import { useEffect } from "react";
import { useAuth } from "../_context/AuthContext";
import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { auth } = useAuth()

  useEffect(() => {
    if (auth?.isAuthenticated === true) {
      redirect('/dashboard')
    }
  })

  return (<>
    {children}
  </>
  );
}
