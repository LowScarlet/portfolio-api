'use client'

import { useAuth } from "@/app/auth/_context/AuthContext";
import { deleteToken } from "@/app/auth/_utils/token";
import { useRouter } from "next/navigation";

export default function TestLogout() {
  const router = useRouter()

  const { auth, setAuth } = useAuth()

  const handleLogout = async () => {
    await deleteToken().then(() => {
      setAuth({
        isAuthenticated: false,
        user: null,
      })
      router.push('/auth')
    })
  }

  return (
    <a className="btn btn-primary" onClick={handleLogout}>
      Logout
    </a>
  );
}
