import Link from "next/link";
import AppBar from "./_components/AppBar";
import BottomNavbar from "./_components/BottomNavbar";
import { FaHome, FaRegThumbsUp } from "react-icons/fa";
import { MdDashboard, MdQuestionAnswer } from "react-icons/md";
import { LuFileJson } from "react-icons/lu";
import { IoMdSettings } from "react-icons/io";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<>
    <div className="flex h-svh">
      <div className="lg:flex flex-col gap-4 hidden bg-base-300 p-2">
        <div className="flex items-center">
          <h1 className="text-4xl">🔥</h1>
          <div className="p-4">
            <h1 className="font-semibold text-xl">Portfolio API</h1>
            <h4 className="text-xs">By 💢 <a href="https://lowscarlet.my.id/" target="_blank">LowScarlet</a></h4>
          </div>
        </div>
        <div className="grow">
          <ul className="menu">
            <li><a><FaHome /> Home</a></li>
            <li><a><MdQuestionAnswer /> About</a></li>
            <li><a className="active"><MdDashboard /> Dashboard</a></li>
            <li><a><LuFileJson /> Portfolio</a></li>
          </ul>
        </div>
        <div className="dropdown-top dropdown">
          <div tabIndex={0} role="button" className="flex justify-between items-center gap-2 px-2 py-1 rounded-md w-full btn-ghost">
            <div className="avatar">
              <div className="rounded-full w-10">
                <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div>
              <h1 className="font-semibold text-base">LowScarlet</h1>
              <h1 className="text-xs">Member</h1>
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
      <main className="overflow-y-auto grow">
        <AppBar />
        <div className="px-4 py">
          {children}
        </div>
        <footer className="bg-base-200 mt-10 p-10 rounded text-base-content footer footer-center">
          <nav className="gap-4 grid grid-flow-col">
            <Link href={"/"} className="link link-hover">Home</Link>
            <Link href={"/about"} className="link link-hover">About</Link>
            <Link href={"/contact"} className="link link-hover">Contact</Link>
            <Link target="_blank" href={"https://github.com/LowScarlet/portfolio-api"} className="link link-hover">Repository</Link>
          </nav>
          <nav>
            <h1 className="font-semibold text-xl">🔥 Portfolio API 💢</h1>
            <h4>Version Alpha 0.1</h4>
          </nav>
          <aside>
            <p>Copyright © 2024 - All right reserved By 💢 <a href="https://lowscarlet.my.id/" target="_blank">LowScarlet</a></p>
          </aside>
        </footer>
      </main>
    </div>
  </>);
}
