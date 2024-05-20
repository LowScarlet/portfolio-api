import { cookies } from "next/headers"
import { User, User_ValidationErrors } from "../../rest/User/UserInterface"

interface BadRequest {
  message: string,
  validationErrors: User_ValidationErrors
}

const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/client/@me`

export async function GetUser() {
  'use server'
  const accessToken = cookies().get("accessToken")
  const fetchRes = await fetch(url, {
    next: { tags: ['getMe'] },
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      'Content-Type': 'application/json'
    }
  })

  const fetchResOutput: { user: User } & BadRequest = await fetchRes.json()

  return {
    ok: fetchRes.ok,
    status: fetchRes.status,
    data: fetchResOutput
  }
}