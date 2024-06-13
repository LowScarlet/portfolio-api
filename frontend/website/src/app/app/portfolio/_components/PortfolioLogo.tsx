'use client'

import { useAuth } from "@/app/auth/_context/AuthContext";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function PortfolioLogo({
  className,
  width,
  height,
  value,
}: {
  className?: string,
  width: number,
  height: number,
  value: string,
}) {
  const defaultSrc = '/images/no-profile.png';
  const [src, setSrc] = useState(defaultSrc);

  useEffect(() => {
    if (value) {
      const fullSrc = `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/uploads/images/portfolios/logo/${value}`;
      setSrc(fullSrc);
    }
  }, [value]);

  const handleError = () => {
    setSrc(defaultSrc);
  };

  return (
    <Image
      className={className}
      width={width}
      height={height}
      src={src}
      alt={"Portfolio Logo"}
      onError={handleError}
    />
  );
}