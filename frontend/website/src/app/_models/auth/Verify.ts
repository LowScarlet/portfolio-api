import { setToken } from "@/app/(authentication)/_utils/token"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

interface BadRequest {
  message: string,
  validationErrors: {
    refreshToken?: string
  }
}

const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/verify`

export async function Verify(query = '') {
  const refreshToken = cookies().get("refreshToken")

  const fetchRes = await fetch(url + '?' + query, {
    next: { tags: ['verifyRefreshToken'] },
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      refreshToken: refreshToken?.value
    })
  })

  const fetchResOutput: { data: { token: string, expiredAt: string } } & BadRequest = await fetchRes.json()

  if (fetchRes.ok) {
    await setToken({
      accessToken: fetchResOutput.data
    }).then(() => {
      revalidateTag('client')
    })
  }

  return {
    ok: fetchRes.ok,
    status: fetchRes.status,
    data: fetchResOutput
  }
}