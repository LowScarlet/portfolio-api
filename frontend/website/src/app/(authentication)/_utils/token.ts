'use server'

import { cookies } from 'next/headers'

interface TokenInterface {
  token: string,
  expiredAt: string
}

async function setToken({
  accessToken,
  refreshToken
}: {
  accessToken?: TokenInterface,
  refreshToken?: TokenInterface
}) {
  const currentDate = new Date()
  const currentTime = currentDate.getTime()

  if (accessToken) {
    cookies().set('accessToken', accessToken.token, {
      httpOnly: false,
      secure: false,
      maxAge: (Date.parse(accessToken.expiredAt) - currentTime) / 1000,
    })
  }
  
  if (refreshToken) {
    cookies().set('refreshToken', refreshToken.token, {
      httpOnly: true,
      secure: true,
      maxAge: (Date.parse(refreshToken.expiredAt) - currentTime) / 1000
    })
  }
}

async function deleteToken() {
  const refreshToken = cookies().get('refreshToken')

  cookies().delete("accessToken")
  cookies().delete("refreshToken")
}

export {
  setToken,
  deleteToken
};