'use client'

import { deleteToken } from "@/app/auth/_utils/token";
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FaSearch } from "react-icons/fa"
import { FaBars, FaBarsStaggered } from "react-icons/fa6"
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md"
import UserAvatar from "./models/UserAvatar";
import { useAuth } from "@/app/auth/_models/auth/Auth";

export default function AppBar({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean,
  setIsOpen: (e: boolean) => void
}) {
  const router = useRouter()

  const { auth, setAuth } = useAuth()

  const handleLogout = async () => {
    await deleteToken().then(() => {
      setAuth({
        isAuthenticated: false,
        user: null,
      })
      router.push('/auth')
      window.location.reload()
    })
  }

  return (
    <div className="top-0 z-20 sticky bg-base-100 navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn btn-circle btn-ghost"
          >
            {isOpen ? <FaBarsStaggered /> : <FaBars />}
          </button>
        </div>
      </div>
      <div className="navbar-center">
        <Link href={'/app'} className="lg:hidden text-xl btn btn-ghost">🔥 Portfolio API</Link>
        <div className="lg:block hidden min-w-96 join">
          <label className="flex items-center gap-2 input-bordered rounded-full input input-sm">
            <input type="text" className="grow" placeholder="Find in Community.." />
            <FaSearch />
          </label>
        </div>
      </div>
      <div className="gap-2 navbar-end">
        <button className="sm:flex items-center hidden lg:hidden btn btn-circle btn-ghost">
          <FaSearch />
        </button>
        <div className="sm:block hidden">
          <label className="swap-rotate text-xl btn btn-circle btn-ghost swap">

            {/* this hidden checkbox controls the state */}
            <input type="checkbox" className="theme-controller" value="light" />

            {/* sun icon */}
            <MdOutlineLightMode className="swap-off fill-current" />

            {/* moon icon */}
            <MdOutlineDarkMode className="swap-on fill-current" />
          </label>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="avatar btn btn-circle btn-ghost">
            <div className="rounded-full w-10">
              <UserAvatar
                width={500}
                height={500}
              />
            </div>
          </div>
          <ul tabIndex={0} className="z-[1] bg-base-100 shadow mt-3 p-2 rounded-box w-52 dropdown-content menu menu-sm">
            <li>
              <Link href={"/app/account"}>
                Account
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link href={"/app/account/settings"}>
                Settings
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
