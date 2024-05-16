import type { NextApiRequest, NextApiResponse } from 'next'

export function GET(
  req: NextApiRequest,
) {
  return Response.json({ message: 'Hello from Next.js!' })
}