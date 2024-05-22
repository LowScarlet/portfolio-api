'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function FetchError() {
  const router = useRouter()

  useEffect(() => {router.refresh()})

  return (<></>);
}
