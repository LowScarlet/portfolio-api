import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Main
export default async function AuthMiddleware(request: NextRequest) {
  const url = request.nextUrl

  if (url.pathname === '/auth') {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  return NextResponse.next();
}