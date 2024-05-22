'use client'

import { UpdateMeProfile } from "@/app/_models/client/@me/profile/MeProfileHandler";
import { UserProfile } from "@/app/_models/rest/UserProfile/UserProfileInterface";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export default function ProfileForm({
  userProfile
}: {
  userProfile: UserProfile
}): JSX.Element {
  const { fullName, bio } = userProfile

  const defaultFormData = {
    fullName: fullName || '',
    bio: bio || ''
  }

  const defaultBadError = {
    fullName: '',
    bio: ''
  }

  const [submitLoading, setSubmitLoading] = useState(false)

  const [formData, setFormData] = useState(defaultFormData)
  const [badError, setBadError] = useState(defaultBadError)

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const cleanFormData = (data: typeof formData) => {
    const cleanedData: Partial<UserProfile> = { ...data };
    Object.keys(cleanedData).forEach((key) => {
      if (cleanedData[key as keyof UserProfile] === defaultFormData[key as keyof typeof formData]) {
        cleanedData[key as keyof UserProfile] = undefined;
      }
    });
    return cleanedData;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSubmitLoading(true)
    setBadError(defaultBadError)

    const clean = cleanFormData(formData)

    const fetchRes = await UpdateMeProfile(clean)
    setSubmitLoading(false)

    if (!fetchRes.ok) {
      if (fetchRes.status === 403) {
        return toast.warn("The session is over! Renewing a Session (Please Try Again!)")
      }

      const { validationErrors } = fetchRes.data

      Object.entries(validationErrors).forEach(([key, value]) => {
        setBadError((prevData) => ({
          ...prevData,
          [key]: value,
        }))
      })
      return toast.error("The server is unable to comprehend the request due to incorrect syntax.")
    }

    toast.success("Successfully updated your profile!")
  }

  return (<>
    <form onSubmit={handleSubmit} method="POST">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Full Name</span>
        </div>
        <input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Type here"
          className="input-bordered w-full input"
          onChange={handleFormChange}
          value={formData.fullName}
        />
        {
          badError.fullName ? (
            <div className="label">
              <span className="label-text-alt">{badError.fullName}</span>
            </div>
          ) : undefined
        }
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text">Describe Yourself</span>
        </div>
        <textarea
          id="bio"
          name="bio"
          className="textarea-bordered h-24 textarea"
          placeholder="Bio"
          onChange={handleFormChange}
          value={formData.bio}
        />
        {
          badError.bio ? (
            <div className="label">
              <span className="label-text-alt">{badError.bio}</span>
            </div>
          ) : undefined
        }
      </label>
      <button
        type="submit"
        className="btn-block my-4 btn btn-primary"
        disabled={submitLoading}
      >
        {submitLoading ? <span className="loading loading-spinner" /> : undefined} Update
      </button>
    </form>
  </>);
}
