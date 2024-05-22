import Image from "next/image";
import Link from "next/link";
import UploadAvatar from "./UploadAvatar";
import ProfileForm from "./ProfileForm";
import { GetMeProfile } from "@/app/_models/client/@me/profile/MeProfileHandler";
import FetchError from "@/app/(main)/_components/FetchError";
import { FaPen } from "react-icons/fa";

export default async function ProfileSettings(): Promise<JSX.Element> {
  const fetchRes = await GetMeProfile('account/settings')

  if (!fetchRes.ok) {
    return <FetchError />
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
            <FaPen />
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
