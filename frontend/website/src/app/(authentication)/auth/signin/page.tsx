import { useEffect } from "react"
import { useAuth } from "../../_context/AuthContext"
import SigninForm from "./_components/SigninForm"
import { redirect } from "next/dist/server/api-utils"

const Page = () => {
  return (
    <div className="flex justify-center min-h-screen">
      <SigninForm />
    </div>
  )
}

export default Page
