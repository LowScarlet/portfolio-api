'use server'

import { Portfolio } from "@/app/_models/rest/Portfolio/PortfolioInterface"
import { cookies } from "next/headers"

interface BadRequest {
  message: string,
}

const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/client/@me/portfolio`

export async function GetMePortfolio(query = '') {
  const accessToken = cookies().get("accessToken")
  const fetchRes = await fetch(url + '?' + query, {
    next: { tags: ['getMePortfolio'] },
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      'Content-Type': 'application/json'
    }
  })

  const fetchResOutput: { portfolio: Array<Portfolio> } & BadRequest = await fetchRes.json()

  return {
    ok: fetchRes.ok,
    status: fetchRes.status,
    data: fetchResOutput
  }
}