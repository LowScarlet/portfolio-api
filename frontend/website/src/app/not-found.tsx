import Link from 'next/link'
import { headers } from 'next/headers'
 
export default async function NotFound() {
  const headersList = headers()
  const domain = headersList.get('host')
  return (
    <div className="flex justify-center items-center h-svh">
      <div className="flex flex-col items-center">
        <h1 className="font-semibold text-xl">(404) Page Not Found!</h1>
        <p>🔥 There some sortcut for you 💢</p>
        <div className="flex gap-x-2 mt-8">
          <Link href={'/auth'} className="btn btn-primary btn-sm">Auth</Link>
          <Link href={'/app'} className="btn btn-primary btn-sm">App</Link>
        </div>
      </div>
    </div>
  )
}