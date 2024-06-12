'use client'

import { useAuth } from "@/app/auth/_context/AuthContext";
import { deleteToken } from "@/app/auth/_utils/token";
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FaSearch } from "react-icons/fa"
import { FaBarsStaggered } from "react-icons/fa6"
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md"
import UserAvatar from "./UserAvatar";

export default function AppBar() {
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
    <div className="top-0 z-40 sticky bg-base-100 navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
            <FaBarsStaggered />
          </div>
          <ul tabIndex={0} className="z-[1] bg-base-100 shadow mt-3 p-2 rounded-box w-52 dropdown-content menu menu-sm">
            <li><a>Homepage</a></li>
            <li><a>Portfolio</a></li>
            <li><a>About</a></li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="lg:hidden text-xl btn btn-ghost">🔥 Portfolio API</a>
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
              <Link href={"/account"}>
                Account
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link href={"/account/settings"}>
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
