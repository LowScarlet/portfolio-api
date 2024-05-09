import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { revalidateTag } from 'next/cache'
import { setToken } from './app/auth/_utils/setToken';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  const accessToken = cookies().get("accessToken")
  const refreshToken = cookies().get("refreshToken")

  if (url.pathname.startsWith('/dashboard')) {
    try {
      if (!accessToken) {
        const response = await fetch('http://localhost:5000/api/auth/verify', {
          next: { tags: ['verify-user'] },
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            refreshToken
          })
        });

        if (!response.ok) {
          return
        }

        const { data } = await response.json();

        setToken({ accessToken: data })
      }
    } catch (error) {
      console.log(error)
    }
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}