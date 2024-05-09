"use server"

import { redirect } from "next/navigation"

const Auth= () => {
  redirect(`/auth/signin`)
}

export default Auth
