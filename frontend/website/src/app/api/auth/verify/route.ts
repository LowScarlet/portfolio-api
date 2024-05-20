'use server'

import { NextRequest, NextResponse } from 'next/server';

const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/verify`
const resHeaders = { 'Content-Type': 'application/json' }

export async function GET(request: NextRequest, res: NextResponse) {
  const currentDate = new Date()
  const currentTime = currentDate.getTime()

  try {
    const token = request.cookies.get('refreshToken')
    const fetchRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        refreshToken: token?.value
      })
    })

    const data = fetchRes.ok ? { message: "ok" } : { message: "not-ok" }

    let okHeaders = ""

    if (fetchRes.ok) {
      const fetchResponse = await fetchRes.json()
      const { data } = fetchResponse
      okHeaders = `accessToken=${data.token};path=/;HttpOnly;Max-Age=${(Date.parse(data.expiredAt) - currentTime) / 1000};Expires=${Date.parse(data.expiredAt)}`
    }

    return new Response(JSON.stringify(data), {
      status: fetchRes.status,
      headers: {
        ...resHeaders,
        'Set-Cookie': okHeaders,

      },
    })
  } catch (error) {
    return new Response("ERROR KONTOL!!!", {
      status: 500,
      headers: resHeaders,
    })
  }
}
