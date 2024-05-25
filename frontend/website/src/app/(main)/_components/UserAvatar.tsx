'use client'

import { useAuth } from "@/app/(authentication)/_context/AuthContext";
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
    if (auth && auth.userProfile && auth.userProfile.avatar) {
      const avatar = auth.userProfile.avatar;
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
