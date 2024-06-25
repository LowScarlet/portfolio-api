'use client'

import Link from "next/link";
import { FaEye } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import UserAvatar from "../_components/models/UserAvatar";
import UserBanner from "../_components/models/UserBanner";
import { useUser } from "../_models/client/user/User";

export default function Account(): JSX.Element {

  const user = useUser()

  const { data, isError, isLoading } = user

  if (isLoading) {
    return (<>
      <div className="flex justify-center items-center h-svh">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl">🔥</h1>
          <span className="loading loading-ball loading-lg"></span>
        </div>
      </div>
    </>)
  }

  if (!data) {
    window.location.reload()
    return <></>
  }

  const { id, username, UserProfile } = data.user
  const { fullName, bio } = UserProfile

  return (<>
    <div className="py-4">
      <div className="shadow-md h-full card card-compact">
        <figure>
          <div className="w-full h-36 object-cover">
            <UserBanner width={1500} height={1500} />
          </div>
        </figure>
        <div className="-mt-36">
          <div className="flex justify-end m-4 text-4xl">
            <Link href={"/app/account/settings"} className="text-2xl btn btn-circle">
              <IoMdSettings />
            </Link>
          </div>
          <div className="flex gap-x-2 mx-4">
            <div className="avatar">
              <div className="rounded-full w-32 ring ring-base-100">
                <UserAvatar width={500} height={500} />
              </div>
            </div>
            <div className="flex justify-between items-end text-xs grow">
              <div className="flex gap-2">
                <div className="gap-2 badge badge-primary">
                  <FaEye />
                </div>
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