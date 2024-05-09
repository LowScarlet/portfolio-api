'use client'

import { useUser } from "@/app/_context/UserContext";
import Link from "next/link";

export default function Dashboard() {
  const {user, setUser} = useUser()
  return (
    <main>
      <h1>Dashboard Page 2</h1>
      <div>
        {user?.username}
      </div>
      <Link href={"/dashboard"}>
        Pre
      </Link>
    </main>
  );
}
