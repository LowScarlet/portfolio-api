"use server"

import { redirect } from "next/navigation"

const Auth= () => {
  redirect(`/auth/signin`)
  return (<></>)
}

export default Auth
