import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import DashboardMiddleware from '@/app/dashboard/_utils/middleware'
import AuthMiddleware from './app/auth/_utils/middleware';

// Main
export default async function mainMiddleware(request: NextRequest) {
  const url = request.nextUrl;

  if (url.pathname.startsWith('/auth')) {
    return AuthMiddleware(request)
  }

  if (url.pathname.startsWith('/dashboard')) {
    return DashboardMiddleware(request)
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}