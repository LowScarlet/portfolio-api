import Link from "next/link";

export default async function Home() {
  return (<>
    <div className="flex justify-center items-center h-svh">
      <div className="flex flex-col items-center">
        <h1 className="font-semibold text-xl">This is a Landing page (WIP)</h1>
        <p>🔥 There some sortcut for you 💢</p>
        <div className="flex gap-x-2 mt-8">
          <Link href={'/auth'} className="btn btn-primary btn-sm">Auth</Link>
          <Link href={'/app'} className="btn btn-primary btn-sm">App</Link>
        </div>
      </div>
    </div>
  </>)
}
