import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const verifyRefreshToken = async ({
  request,
  refreshToken
}: {
  request: NextRequest,
  refreshToken: RequestCookie
}) => {
  const fetchRes = await fetch('http://localhost:5000/api/auth/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      refreshToken: refreshToken?.value
    })
  })

  if (!fetchRes.ok) {
    const res = NextResponse.redirect(new URL('/auth/signin', request.url))
    return res
  }

  const fetchResOutput = await fetchRes.json()

  const { token, expiredAt } = fetchResOutput.data

  const currentDate = new Date()
  const currentTime = currentDate.getTime()

  const res = NextResponse.next()

  res.cookies.set('accessToken', token, {
    httpOnly: true,
    secure: true,
    maxAge: (Date.parse(expiredAt) - currentTime) / 1000
  })

  return res
}

// Main
export default async function DashboardMiddleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');

  if (!refreshToken?.value) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  if (!accessToken?.value) {
    return await verifyRefreshToken({ request, refreshToken });
  }

  return NextResponse.next();
}