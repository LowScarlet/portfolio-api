import Image from "next/image";
import Link from "next/link";
import { IoMdSettings } from "react-icons/io";
import UploadAvatar from "./UploadAvatar";
import { cookies } from "next/headers";
import ProfileForm from "./ProfileForm";
import { FormEvent } from "react";
import { GetUserProfile } from "@/app/_models/client/@me/profile/MeProfileHandler";

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
  const fetchRes = await GetUserProfile()

  if (!fetchRes.ok) {
    return <>Error While Fetching Profile!</>
  }

  const fetchResOutput = fetchRes.data

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
