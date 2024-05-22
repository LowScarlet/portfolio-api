'use client'

import Image from "next/image";

export default function UserAvatar({
  src,
  width,
  height,
}: {
  src: string,
  width: number,
  height: number,
}) {
  const fullSrc = `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/uploads/images/avatars/${src}`
  console.log(fullSrc)
  return (<>
    <Image
      width={width}
      height={height}
      src={fullSrc}
      alt={"User Avatar"}
    />
  </>);
}
