"use client"

import { useState, FormEvent } from 'react'
import { setToken } from '@/app/auth/_utils/token'

interface TokenInterface {
  token: string,
  expiredAt: string
}

interface UserInterface {
  id: string,
  username: string,
  role: string,
  isActive: boolean,
  createdAt: string,
  updatedAt: string
}

interface SuccessResponseInterface {
  "message": string,
  "data": {
    "user": UserInterface,
    "accessToken": TokenInterface,
    "refreshToken": TokenInterface
  }
}

const SignUp = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    const response: SuccessResponseInterface = await res.json()

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    const { message, data } = response
    const { accessToken, refreshToken } = data

    setToken({
      accessToken: accessToken,
      refreshToken: refreshToken
    })
  }

  return (
    <div className="mx-auto mt-8 px-4 max-w-md">
      <h1 className="mb-4 font-bold text-2xl">Sign In</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block">Username:</label>
          <input
            id='username'
            name="username"
            type="text"
            value={formData.username}
            onChange={handleFormChange}
            required
            className="border-gray-300 px-3 py-2 border focus:border-blue-500 rounded-md w-full focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label htmlFor="email" className="block">Email:</label>
          <input
            id='email'
            name="email"
            type="email"
            value={formData.email}
            onChange={handleFormChange}
            required
            className="border-gray-300 px-3 py-2 border focus:border-blue-500 rounded-md w-full focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label htmlFor="password" className="block">Password:</label>
          <input
            id='password'
            name="password"
            type="password"
            value={formData.password}
            onChange={handleFormChange}
            required
            className="border-gray-300 px-3 py-2 border focus:border-blue-500 rounded-md w-full focus:outline-none focus:ring"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 px-4 py-2 rounded-md w-full text-white focus:outline-none"
        >
          Sign In
        </button>
      </form>
    </div>

  )
}

export default SignUp
