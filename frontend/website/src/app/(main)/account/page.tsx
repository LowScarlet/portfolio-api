import { GetMeProfile } from "@/app/_models/client/@me/profile/MeProfileHandler";
import { UserProfile } from "@/app/_models/rest/UserProfile/UserProfileInterface";
import Image from "next/image";
import Link from "next/link";
import { FaEye } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import FetchError from "../_components/FetchError";
import { GetMe } from "@/app/_models/client/@me/MeHandler";

export default async function Account(): Promise<JSX.Element> {
  const getMe = await GetMe('account')
  const getMeProfile = await GetMeProfile('account')

  if (!getMeProfile.ok || !getMe.ok) {
    return <FetchError />
  }

  const getMeOutput = getMe.data
  const getMeProfileOutput = getMeProfile.data

  const { username } = getMeOutput.user
  const { avatar, fullName, bio } = getMeProfileOutput.userProfile

  return (<>
    <div className="py-4">
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
          <div className="flex gap-x-2 mx-4">
            <div className="avatar">
              <div className="rounded-full w-32 ring ring-base-100">
                <Image width={500} height={500} src={"/images/portfolio_icon.png"} alt={"Icon"} />
              </div>
            </div>
            <div className="flex justify-between items-end text-xs grow">
              <div className="flex gap-2">
                {/* <div className="gap-2 badge badge-primary">
                  <FaEye />
                </div>
                <div className="gap-2 badge badge-primary">
                  <FaEye />
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4 card-body">
          <h2 className="card-title">{`${fullName || username} (${username})` || ``}</h2>
          <p className="overflow-hidden">
            {bio || "What a Week, Huh?"}
          </p>
        </div>
      </div>
    </div>
  </>);
}