import { verifyRefreshToken } from '@/app/app/_utils/middleware';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Main
export default async function AuthMiddleware(request: NextRequest) {
  const url = request.nextUrl

  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');

  if (accessToken?.value || refreshToken?.value) {
    return NextResponse.redirect(new URL('/app', request.url))
  }

  if (url.pathname === '/auth') {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  return NextResponse.next();
}