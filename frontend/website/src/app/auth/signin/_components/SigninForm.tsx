"use client"

import { setToken } from '@/app/auth/_utils/token'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { FaUser } from "react-icons/fa"
import { MdEmail, MdPassword } from 'react-icons/md'
import { toast } from 'react-toastify'
import { handleAuth, useAuth } from '../../_models/auth/Auth'
import AltButtons from './AltButtons'
import LoadingScreen from '@/app/_components/LoadingScreen'

const defaultFormData = { username: '', email: '', password: '' }
const defaultBadError = { username: '', email: '', password: '' }

const SigninForm = () => {
  const router = useRouter()
  const { setAuth } = useAuth()

  const [formBy, setFormBy] = useState(true)

  const [signinLoading, setSigninLoading] = useState(false)
  const [successLoading, setSuccessLoading] = useState<boolean | null>(false)

  const [formData, setFormData] = useState(defaultFormData)
  const [badError, setBadError] = useState(defaultBadError)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleFormBy = () => {
    setFormBy(!formBy);
    setFormData(defaultFormData)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSigninLoading(true)
    setSuccessLoading(null)
    setBadError(defaultBadError)

    try {
      const response = await handleAuth({ type: 'LOGIN', formData })

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
          router.push('/app')
          setSuccessLoading(true)
        })
      } else {
        if (validationErrors) {
          Object.entries(validationErrors).forEach(([key, value]) => {
            setBadError((prevData) => ({
              ...prevData,
              [key]: value
            }))
          })
        }
        toast.error(message)
        setSuccessLoading(null)
      }
    } catch (error) {
      console.log(error)
      toast.error("An unexpected error occurred (key: try and catch)")
    } finally {
      setSigninLoading(false)
    }
  }

  if (successLoading) {
    return (<LoadingScreen />)
  }

  return (
    <div className="hero">
      <div className="sm:flex-row flex-col hero-content">
        <div className="max-w-sm card shrink-0">
          <form className="card-body" onSubmit={handleSubmit} method='POST'>
            <div className="mb-3 text-center">
              <h1 className="font-bold text-2xl">Sign-In</h1>
            </div>
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">{formBy ? <><FaUser className='inline' /> Username</> : <><MdEmail className='inline' /> Email</>}</span>
                  <span className="label-text-alt"></span>
                </div>
                <div className='flex gap-x-3'>
                  <input
                    id={formBy ? 'username' : 'email'}
                    name={formBy ? 'username' : 'email'}
                    type={formBy ? 'text' : 'email'}
                    value={formBy ? formData.username : formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder={formBy ? 'Username...' : 'Email...'}
                    className="input-bordered w-full input"
                  />
                  <button
                    type='button'
                    onClick={handleFormBy}
                    className="btn btn-primary"
                  >
                    {formBy ? <MdEmail /> : <FaUser />}
                  </button>
                </div>
                {
                  badError.username || badError.email ? (
                    <div className="label">
                      <span className="label-text-alt">{formBy ? badError.username : badError.email}</span>
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
                  onChange={handleInputChange}
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
                {signinLoading ? <span className="loading loading-spinner" /> : undefined} Sign-In
              </button>
              <span className='block text-center text-xs'>Doesnt have Account?</span>
              <Link
                href={'/auth/signup'}
                className="btn-block btn btn-neutral"
              >
                Sign-Up
              </Link>
              <div className="lg:hidden">
                <span className='block py-3 text-center text-xs'>Or Sign-in with a Third Party Account</span>
                <AltButtons />
              </div>
            </div>
          </form>
        </div>
        <div className="lg:flex hidden divider divider-horizontal">OR</div>
        <div className="card">
          <div className="lg:block hidden card-body">
            <div className='py-3 text-center'>
              <h1 className='font-bold text-xl'>Sign-in</h1>
              <span className='block text-xs'>With a Third Party Account</span>
            </div>
            <AltButtons />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SigninForm
