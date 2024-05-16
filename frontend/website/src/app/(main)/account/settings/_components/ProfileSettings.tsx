import Image from "next/image";
import Link from "next/link";
import { IoMdSettings } from "react-icons/io";
import UploadAvatar from "./UploadAvatar";
import { cookies } from "next/headers";
import ProfileForm from "./ProfileForm";
import { FormEvent } from "react";

interface UserProfileInterface {
  id: string
  avatar: string
  fullName: string
  bio: string
  userId: string
  createdAt: string
  updatedAt: string
}

export default async function ProfileSettings(): Promise<JSX.Element> {
  const accessToken = cookies().get("accessToken")

  const fetchRes = await fetch('http://localhost:5000/api/client/@me/profile', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
      'Content-Type': 'application/json'
    },
  })

  if (!fetchRes.ok) {
    return <>Error While Fetching Profile!</>
  }

  const fetchResOutput: { userProfile: UserProfileInterface } = await fetchRes.json()

  const { userProfile } = fetchResOutput

  return (<>
    <div className="shadow-md h-full card card-compact">
      <figure>
        <Image width={500} height={500} className="w-full h-36 object-cover" src="/images/portfolio_icon.png" alt="Shoes" />
      </figure>
      <div className="-mt-36">
        <div className="flex justify-end m-4 text-4xl">
          <Link href={"/account/settings"} className="text-2xl btn btn-circle">
            <IoMdSettings />
          </Link>
        </div>
        <div className="flex justify-center gap-x-2 mx-4">
          <UploadAvatar />
        </div>
      </div>
      <div className="px-4">
        <ProfileForm userProfile={userProfile} />
      </div>
    </div>
  </>);
}
