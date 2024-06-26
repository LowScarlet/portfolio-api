'use client'

import { useAuth } from "@/app/auth/_models/auth/Auth";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa6";

export default function UserAvatar({
  className,
  width,
  height,
}: {
  className?: string,
  width: number,
  height: number,
}) {
  const { auth } = useAuth();
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (auth && auth.user && auth.user.avatar) {
      const avatar = auth.user.avatar;
      const fullSrc = `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/uploads/images/avatars/${avatar}`;
      setSrc(fullSrc);
    }
  }, [auth]);

  if (!src) {
    return (<>
      <div className="flex justify-center items-center bg-base-200 h-full">
        <FaUser className="text-xl" />
      </div>
    </>)
  }

  return (
    <Image
      className={className}
      width={width}
      height={height}
      src={src}
      alt={"User Avatar"}
    />
  );
}
