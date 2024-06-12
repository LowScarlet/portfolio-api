'use client'

import { useAuth } from "@/app/auth/_context/AuthContext";
import Image from "next/image";
import { useState, useEffect } from "react";

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
  const [src, setSrc] = useState('/images/no-profile.png');

  useEffect(() => {
    if (auth && auth.user && auth.user.avatar) {
      const avatar = auth.user.avatar;
      const fullSrc = `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/uploads/images/avatars/${avatar}`;
      setSrc(fullSrc);
    }
  }, [auth]);

  const handleError = () => {
    setSrc('/images/no-profile.png');
  };

  return (
    <Image
      className={className}
      width={width}
      height={height}
      src={src}
      alt={"User Avatar"}
      onError={handleError}
    />
  );
}
