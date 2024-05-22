'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { LuFileJson } from "react-icons/lu";
import { MdDashboard, MdQuestionAnswer } from "react-icons/md";
import UserAvatar from "./UserAvatar";
import { useAuth } from "@/app/(authentication)/_context/AuthContext";

export default function Drawer() {
  const { auth, setAuth } = useAuth()

  const pathname = usePathname()
  
  if (!auth) {
    return <>No Auth!</>
  }

  return (<>
    <div className="lg:flex flex-col gap-4 hidden bg-base-300 p-2 h-full">
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
          <li><Link className={pathname.startsWith("/dashboard") ? "active" : ""} href={"/dashboard"}>
            <MdDashboard /> Dashboard
          </Link></li>
          <li><Link className={pathname.startsWith("/portfolio") ? "active" : ""} href={"/portfolio"}>
            <LuFileJson /> Portfolio
          </Link></li>
        </ul>
      </div>
      <div className="dropdown-top dropdown">
        <div tabIndex={0} role="button" className="flex justify-between items-center gap-2 px-2 py-1 rounded-md w-full btn-ghost">
          <div className="avatar">
            <div className="rounded-full w-10">
              <UserAvatar
                width={500}
                height={500}
                src={"1716391888667-2e92ff1f-5176-4f44-aaae-771f38ed656b.png"}
              />
            </div>
          </div>
          <div>
            <h1 className="font-semibold text-base">{auth.user?.username}</h1>
            <h1 className="text-xs capitalize">{auth.user?.role}</h1>
          </div>
          <div className="pe-4 ps-8">
            <IoMdSettings />
          </div>
        </div>
        <ul tabIndex={0} className="z-[1] bg-base-100 shadow mt-3 p-2 rounded-box w-52 dropdown-content menu menu-sm">
          <li>
            <Link href={"/profile"}>
              Profile
              <span className="badge">New</span>
            </Link>
          </li>
          <li>
            <Link href={"/settings"}>
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
    </div>
  </>);
}
