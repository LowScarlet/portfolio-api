'use client'

import { useVerifyAccess } from "../app/_models/auth/VerifyToken";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useVerifyAccess()

  return (<>{ children }</>)
}
