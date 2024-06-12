'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function FetchError() {
  const router = useRouter()

  useEffect(() => {router.refresh()})

  return (<>Please Refresh this Manual Page if you still dont automatically Refresh!</>);
}
