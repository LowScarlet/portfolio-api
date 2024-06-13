'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function FetchError() {
  const router = useRouter()

  useEffect(() => { router.refresh() })

  return (<>
    <div className='flex justify-center items-center h-svh'>
      <div className='flex flex-col items-center space-y-2'>
        <h1 className="text-4xl">🔥</h1>
        <span className="loading loading-ball loading-lg"></span>
        <p>Refresh manually if this Page still appears</p>
        <div className='flex space-x-2 pt-4'>
          <button
            className='btn btn-primary'
            onClick={() => router.refresh()}
          >
            🔥 Reload
          </button>
        </div>
      </div>
    </div>
  </>);
}
