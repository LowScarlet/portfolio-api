'use server'

import { cookies } from "next/headers"
import { UserProfile, UserProfile_Update, UserProfile_ValidationErrors } from "../_interface/UserProfileInterface"

interface BadRequest {
  message: string,
  validationErrors: UserProfile_ValidationErrors
}

const accessToken = cookies().get("accessToken")
const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/client/@me/profile`

export async function GetUserProfile() {
  const fetchRes = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      'Content-Type': 'application/json'
    },
  })

  const fetchResOutput: { userProfile: UserProfile } & BadRequest = await fetchRes.json()

  return {
    ok: fetchRes.ok,
    status: fetchRes.status,
    data: fetchResOutput
  }
}

export async function UpdateUserProfile(body: UserProfile_Update) {
  const fetchRes = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  const fetchResOutput: { userProfile: UserProfile } & BadRequest = await fetchRes.json()

  return {
    ok: fetchRes.ok,
    status: fetchRes.status,
    data: fetchResOutput
  }
}