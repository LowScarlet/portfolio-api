import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import MainPageMiddleware from './app/(main)/_utils/middleware';

// Main
export default async function mainMiddleware(request: NextRequest) {
  const url = request.nextUrl;

  console.log(request.cookies.get("accessToken"))

  if (url.pathname.startsWith('/auth')) {
    // return AuthMiddleware(request)
  }

  if (
    url.pathname.startsWith('/dashboard') ||
    url.pathname.startsWith('/portfolio') ||
    url.pathname.startsWith('/account')
  ) {
    // return MainPageMiddleware(request)
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}