import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { serialize } from 'cookie';

interface VerifyResponse {
  message: string;
  data: {
    token: string;
    expiredAt: string;
  };
}

export async function GET(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) {
      return new NextResponse(JSON.stringify({ message: 'refreshToken is required' }), { status: 400 });
    }

    const cookies = Object.fromEntries(cookieHeader.split('; ').map(c => c.split('=')));
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) {
      return new NextResponse(JSON.stringify({ message: 'refreshToken is required' }), { status: 400 });
    }

    const response = await axios.post<VerifyResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/verify`, { refreshToken });

    if (response.status === 200) {
      const { token, expiredAt } = response.data.data;

      const res = new NextResponse(JSON.stringify({ message: 'Berhasil Register.' }), { status: 200 });
      res.headers.set('Set-Cookie', serialize('accessToken', token, {
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(expiredAt),
        path: '/',
      }));

      return res;
    } else {
      return new NextResponse(JSON.stringify({ message: 'Verification failed' }), { status: response.status });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
}
