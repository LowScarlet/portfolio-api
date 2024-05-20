'use server'

import { UserProfile, UserProfile_Update, UserProfile_ValidationErrors } from "@/app/_models/rest/UserProfile/UserProfileInterface"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

interface BadRequest {
  message: string,
  validationErrors: UserProfile_ValidationErrors
}

const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/client/@me/profile`

export async function GetUserProfile() {
  const accessToken = cookies().get("accessToken")

  const fetchRes = await fetch(url, {
    next: { tags: ['getMeProfile'] },
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      'Content-Type': 'application/json'
    }
  })

  const fetchResOutput: { userProfile: UserProfile } & BadRequest = await fetchRes.json()

  return {
    ok: fetchRes.ok,
    status: fetchRes.status,
    data: fetchResOutput
  }
}

export async function UpdateUserProfile(body: UserProfile_Update) {
  const accessToken = cookies().get("accessToken")
  
  const fetchRes = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  const fetchResOutput: { userProfile: UserProfile } & BadRequest = await fetchRes.json()

  if (fetchRes.ok) {
    revalidateTag('getMeProfile')
  }

  return {
    ok: fetchRes.ok,
    status: fetchRes.status,
    data: fetchResOutput
  }
}