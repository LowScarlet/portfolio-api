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
  accessToken: TokenInterface,
  refreshToken: TokenInterface
}) {
  const currentDate = new Date()
  const currentTime = currentDate.getTime()

  cookies().set('accessToken', accessToken.token, {
    secure: true,
    maxAge: (Date.parse(accessToken.expiredAt) - currentTime)/1000
  })
  cookies().set('refreshToken', refreshToken.token, {
    secure: true,
    maxAge: (Date.parse(refreshToken.expiredAt) - currentTime)/1000
  })
}

export {
  setToken
};