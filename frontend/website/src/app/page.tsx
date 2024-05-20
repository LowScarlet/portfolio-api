'use client'

import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href={'/home2'}>Next Page</Link>
    </main>
  );
}
