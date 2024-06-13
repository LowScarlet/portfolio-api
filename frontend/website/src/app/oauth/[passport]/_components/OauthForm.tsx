"use client"

import { setToken } from '@/app/auth/_utils/token'
import { toast } from 'react-toastify'
import { useAuth } from '@/app/auth/_context/AuthContext'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { handleAuth } from '@/app/auth/_utils/handleAuth'
import Link from 'next/link'


const OauthForm = ({
  passport
}: {
  passport: string
}) => {
  const router = useRouter()
  const { setAuth } = useAuth()

  const [loading, setLoading] = useState(false)

  const searchParams = useSearchParams()

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
          toast.error("An unexpected error occurred")
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
          router.push('/app')
        })
      } else {
        toast.error(message)
      }
    } catch (error) {
      toast.error("An unexpected error occurred 2")
    } finally {
      setLoading(false)
    }
  }

  return (<>
    <div className='flex justify-center items-center'>
      <div className='flex flex-col items-center space-y-2'>
        <h1 className="text-4xl">🔥</h1>
        <h4 className="font-semibold text-2xl">Success!</h4>
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
