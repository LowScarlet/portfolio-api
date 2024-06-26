"use client"

import { setToken } from '@/app/auth/_utils/token'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { handleAuth, useAuth } from '@/app/auth/_models/auth/Auth'

const OauthForm = ({
  passport
}: {
  passport: string
}) => {
  const router = useRouter()
  const { auth, setAuth } = useAuth()

  const [loading, setLoading] = useState(false)

  const searchParams = useSearchParams()

  if (auth?.isAuthenticated) {
    router.push('/app')
    return;
  }

  if (!searchParams.get('code')) {
    router.push('/auth')
    return;
  }

  let queryString = "";
  searchParams.forEach((value, key) => {
    queryString += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
  });
  queryString = queryString.slice(0, -1);

  const confirmButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    setLoading(true)

    try {
      const response = await handleAuth({ type: 'OAUTH_GOOGLE', params: queryString })

      const { status, message, auth, token, validationErrors } = response

      if (status === 200) {
        if (!token || !auth) {
          toast.error("An unexpected error occurred (key: token and auth)")
          return
        }
        const { accessToken, refreshToken } = token
        const { isAuthenticated, user } = auth

        await setToken({ accessToken, refreshToken }).then(() => {
          setAuth({
            isAuthenticated,
            user: {
              id: user.id,
              username: user.username,
              role: user.role,
              avatar: user.avatar
            }
          })
          toast.success(message)
        })
      } else {
        toast.error(message)
      }
    } catch (error) {
      console.log(error)
      toast.error("An unexpected error occurred (key: try and catch)")
    } finally {
      setLoading(false)
    }
  }

  return (<>
    <div className='flex justify-center items-center'>
      <div className='flex flex-col items-center space-y-2'>
        <h1 className="text-4xl">🔥</h1>
        <h4 className="font-semibold text-2xl">The link is ready!</h4>
        <p>Click the Button below to continue!</p>
        <div className='flex space-x-2 pt-4'>
          <button
            className='btn btn-primary'
            onClick={confirmButton}
            disabled={loading}
          >
            🔥 Signin
          </button>
          <Link
            className='btn btn-error btn-outline'
            href={'/auth/'}
          >
            💢 Cancel
          </Link>
        </div>
      </div>
    </div>
  </>)
}

export default OauthForm
