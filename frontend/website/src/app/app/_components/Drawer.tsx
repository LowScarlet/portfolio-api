'use client'

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { LuFileJson } from "react-icons/lu";
import { MdDashboard, MdQuestionAnswer } from "react-icons/md";
import UserAvatar from "./models/UserAvatar";
import { Transition } from "@headlessui/react";
import { useAuth } from "@/app/auth/_models/auth/Auth";
import { IoClose } from "react-icons/io5";

export default function Drawer({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean,
  setIsOpen: (e: boolean) => void
}) {
  const router = useRouter()
  const { auth, setAuth } = useAuth()

  const pathname = usePathname()

  const handleLink = (href: string) => {
    router.push(href)
    setIsOpen(isOpen)
    return
  }

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
      <div className="flex flex-col gap-4 bg-base-300 p-4 h-full">
        <div className="flex justify-between">
          <div className="flex items-center">
            <h1 className="text-4xl">🔥</h1>
            <div className="p-4">
              <h1 className="font-semibold text-xl">Portfolio API</h1>
              <h4 className="text-xs">By 💢 <a href="https://lowscarlet.my.id/" target="_blank">LowScarlet</a></h4>
            </div>
          </div>
          <div className="md:hidden">
            <button
              className="text-2xl btn btn-circle btn-ghost"
              onClick={() => setIsOpen(true)}
            >
              <IoClose />
            </button>
          </div>
        </div>
        <div className="grow">
          <ul className="menu">
            <li>
              <button onClick={() => handleLink('/')}><FaHome /> Home</button>
            </li>
            <li>
              <button onClick={() => handleLink('/about')}><MdQuestionAnswer /> About</button>
            </li>
            <li>
              <button className={pathname.startsWith("/app/dashboard") ? "active" : ""} onClick={() => handleLink('/app/dashboard')}>
                <MdDashboard /> Dashboard
              </button>
            </li>
            <li>
              <button className={pathname.startsWith("/app/portfolio") ? "active" : ""} onClick={() => handleLink('/app/portfolio')}>
                <LuFileJson /> Portfolio
              </button>
            </li>
            <li>
              <button className={pathname.startsWith("/app/admin") ? "active" : ""} onClick={() => handleLink('/app/admin')}>
                <LuFileJson /> Admin
              </button>
            </li>
          </ul>
        </div>
        {
          auth?.user ? (
            <div className="dropdown-top dropdown">
              <div tabIndex={0} role="button" className="flex justify-between items-center px-2 py-1 rounded-md w-full btn-ghost">
                <div className="flex gap-2">
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
                </div>
                <div className="pe-4 ps-8">
                  <IoMdSettings />
                </div>
              </div>
              <ul tabIndex={0} className="z-[1] bg-base-100 shadow mt-3 p-2 rounded-box w-52 dropdown-content menu menu-sm">
                <li>
                  <button onClick={() => handleLink('/app/profile')}>
                    Profile
                    <span className="badge">New</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleLink('/app/settings')}>
                    Settings
                  </button>
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
