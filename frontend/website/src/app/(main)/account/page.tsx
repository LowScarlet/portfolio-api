import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { FaEye } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { GetUserProfile } from "./_utils/UserProfileHandler";

interface UserProfileInterface {
  id: string
  avatar: string
  fullName: string
  bio: string
  userId: string
  createdAt: string
  updatedAt: string
}

export default async function Account(): Promise<JSX.Element> {
  const accessToken = cookies().get("accessToken")

  const fetchRes = await GetUserProfile()

  if (!fetchRes.ok) {
    return <>Error While Fetching Profile!</>
  }

  const fetchResOutput: { userProfile: UserProfileInterface } = fetchRes.data

  const { id, avatar, fullName, bio, userId, createdAt, updatedAt } = fetchResOutput.userProfile

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
            <div className="flex items-end gap-2 text-xs grow">
              <div className="gap-2 badge badge-primary">
                <FaEye />
              </div>
              <div className="gap-2 badge badge-primary">
                <FaEye />
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4 card-body">
          <h2 className="card-title">{fullName || "Anonymous User"}</h2>
          <p className="overflow-hidden">
            {bio || "What a Week, Huh?"}
          </p>
        </div>
      </div>
    </div>
  </>);
}