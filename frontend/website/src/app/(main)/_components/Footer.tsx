'use client'

import Link from "next/link";

export default function Footer() {
  return (<>

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
  </>);
}
