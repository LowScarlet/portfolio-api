'use client'

import SigninForm from "./_components/SigninForm"
import { useSearchParams } from 'next/navigation'

const Page = () => {
  const searchParams = useSearchParams()

  let queryString = "";
  searchParams.forEach((value, key) => {
    queryString += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
  });
  queryString = queryString.slice(0, -1);

  return (
    <div className="flex justify-center min-h-screen">
      <SigninForm />
    </div>
  )
}

export default Page
