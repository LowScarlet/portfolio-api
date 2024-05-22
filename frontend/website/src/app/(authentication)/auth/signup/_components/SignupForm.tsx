"use client"

import { ResponseInterface } from '@/app/(authentication)/_interface/ResponseInterface'
import { setToken } from '@/app/(authentication)/_utils/token'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { FaUser } from "react-icons/fa"
import { MdEmail, MdPassword } from 'react-icons/md'
import { toast } from 'react-toastify'
import { useAuth } from '../../../_context/AuthContext'
import AltButtons from '../../signin/_components/AltButtons'

const SignupForm = () => {
  const router = useRouter()

  const { auth, setAuth } = useAuth()

  const defaultFormData = { username: '', email: '', password: '' }
  const defaultBadError = { username: '', email: '', password: '' }

  const [signinLoading, setSigninLoading] = useState(false)

  const [formData, setFormData] = useState(defaultFormData)
  const [badError, setBadError] = useState(defaultBadError)

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSigninLoading(true)
    setBadError(defaultBadError)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const response: ResponseInterface = await res.json()
      
      setSigninLoading(false)

      if (res.status === 429) {
        const { resetTime } = response

        const now = new Date();
        const diffMs = new Date(resetTime).getTime() - now.getTime();
      
        if (diffMs <= 0) {
          return
        }
      
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);

        toast.error(`Your IP has been banned for the next ${diffMinutes} minutes and ${diffSeconds} seconds!`)
        return
      }

      if (!res.ok) {
        const { message, validationErrors } = response

        Object.entries(validationErrors).forEach(([key, value]) => {
          setBadError((prevData) => ({
            ...prevData,
            [key]: value,
          }))
        })

        toast.error(message)
        return
      }

      const { message, data } = response

      setToken(data).then(() => {
        setAuth({
          isAuthenticated: true,
          user: data.user,
          userProfile: data.user.UserProfile
        })
        router.push('/dashboard')
        toast.success(message)
      })
    } catch (error) {
      setSigninLoading(false)
    }
  }

  return (
    <div className="hero">
      <div className="sm:flex-row flex-col hero-content">
        <div className="max-w-sm card shrink-0">
          <form className="card-body" onSubmit={handleSubmit} method='POST'>
            <div className="mb-3 text-center">
              <h1 className="font-bold text-2xl">Sign-Up</h1>
            </div>
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text"><FaUser className='inline' /> Username</span>
                  <span className="label-text-alt"></span>
                </div>
                <input
                  id='username'
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleFormChange}
                  required
                  placeholder="Username.."
                  className="input-bordered w-full input"
                />
                {
                  badError.username ? (
                    <div className="label">
                      <span className="label-text-alt">{badError.username}</span>
                    </div>
                  ) : undefined
                }
              </label>
            </div>
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text"><MdEmail className='inline' /> Email</span>
                  <span className="label-text-alt"></span>
                </div>
                <input
                  id='email'
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  placeholder="Email.."
                  className="input-bordered w-full input"
                />
                {
                  badError.email ? (
                    <div className="label">
                      <span className="label-text-alt">{badError.email}</span>
                    </div>
                  ) : undefined
                }
              </label>
            </div>
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text"><MdPassword className='inline' /> Password</span>
                  <span className="label-text-alt"></span>
                </div>
                <input
                  id='password'
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleFormChange}
                  required
                  placeholder="Password.."
                  className="input-bordered w-full input"
                />
                {
                  badError.password ? (
                    <div className="label">
                      <span className="label-text-alt">{badError.password}</span>
                    </div>
                  ) : undefined
                }
              </label>
            </div>
            <div>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div className="space-y-3 form-control mt-3">
              <button
                type="submit"
                className="btn-block btn btn-primary"
                disabled={signinLoading}
              >
                {signinLoading ? <span className="loading loading-spinner" /> : undefined} Sign-Up
              </button>
              <span className='block text-center text-xs'>Already Have Account?</span>
              <Link
                href={'/auth/signin'}
                className="btn-block btn btn-neutral"
              >
                Sign-In
              </Link>
              <div className="lg:hidden">
                <span className='block py-3 text-center text-xs'>Or Sign-up with a Third Party Account</span>
                <AltButtons />
              </div>
            </div>
          </form>
        </div>
        <div className="lg:flex hidden divider divider-horizontal">OR</div>
        <div className="card">
          <div className="lg:block hidden card-body">
            <div className='py-3 text-center'>
              <h1 className='font-bold text-xl'>Sign-up</h1>
              <span className='block text-xs'>With a Third Party Account</span>
            </div>
            <AltButtons />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupForm
