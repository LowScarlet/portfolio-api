'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { LuFileJson } from "react-icons/lu";
import { MdDashboard, MdQuestionAnswer } from "react-icons/md";
import UserAvatar from "./models/UserAvatar";
import { Transition } from "@headlessui/react";
import { useAuth } from "@/app/auth/_models/auth/Auth";

export default function Drawer({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean,
  setIsOpen: (e: boolean) => void
}) {
  const { auth, setAuth } = useAuth()

  const pathname = usePathname()

  return (<>
    <Transition
      show={isOpen}
      enter="transition-transform duration-200"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
      leave="transition-transform duration-200"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
    >
      <div className="md:flex flex-col gap-4 hidden bg-base-300 p-2 h-full">
        <div className="flex items-center">
          <h1 className="text-4xl">🔥</h1>
          <div className="p-4">
            <h1 className="font-semibold text-xl">Portfolio API</h1>
            <h4 className="text-xs">By 💢 <a href="https://lowscarlet.my.id/" target="_blank">LowScarlet</a></h4>
          </div>
        </div>
        <div className="grow">
          <ul className="menu">
            <li><Link href={"/"}><FaHome /> Home</Link></li>
            <li><Link href={"/about"}><MdQuestionAnswer /> About</Link></li>
            <li><Link className={pathname.startsWith("/app/dashboard") ? "active" : ""} href={"/app/dashboard"}>
              <MdDashboard /> Dashboard
            </Link></li>
            <li><Link className={pathname.startsWith("/app/portfolio") ? "active" : ""} href={"/app/portfolio"}>
              <LuFileJson /> Portfolio
            </Link></li>
            <li><Link className={pathname.startsWith("/app/admin") ? "active" : ""} href={"/app/admin"}>
              <LuFileJson /> Admin
            </Link></li>
          </ul>
        </div>
        {
          auth?.user ? (
            <div className="dropdown-top dropdown">
              <div tabIndex={0} role="button" className="flex justify-between items-center gap-2 px-2 py-1 rounded-md w-full btn-ghost">
                <div className="avatar">
                  <div className="rounded-full w-10">
                    <UserAvatar
                      width={500}
                      height={500}
                    />
                  </div>
                </div>
                <div>
                  <h1 className="font-semibold text-sm">{auth.user.username}</h1>
                  <h1 className="text-xs">{auth.user.role}</h1>
                </div>
                <div className="pe-4 ps-8">
                  <IoMdSettings />
                </div>
              </div>
              <ul tabIndex={0} className="z-[1] bg-base-100 shadow mt-3 p-2 rounded-box w-52 dropdown-content menu menu-sm">
                <li>
                  <Link href={"/app/profile"}>
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link href={"/app/settings"}>
                    Settings
                  </Link>
                </li>
                <li>
                  <button>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (undefined)
        }
      </div>
    </Transition>
  </>);
}
