'use client'

import { UpdateUserProfile } from "@/app/_models/client/@me/profile/MeProfileHandler";
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

    const clean = cleanFormData(formData)

    const fetchRes = await UpdateUserProfile(clean)

    if (!fetchRes.ok) {
      setBadError(defaultBadError)

      const { validationErrors } = fetchRes.data

      Object.entries(validationErrors).forEach(([key, value]) => {
        setBadError((prevData) => ({
          ...prevData,
          [key]: value,
        }))
      })
    }

    const { userProfile } = fetchRes.data

    toast.success("Berhasil!")
  }

  return (<>
    <form onSubmit={handleSubmit} method="POST">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Full Name</span>
          <span className="label-text-alt">Top Right label</span>
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
        <div className="label">
          <span className="label-text-alt">Bottom Left label</span>
          <span className="label-text-alt">Bottom Right label</span>
        </div>
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text">Describe Yourself</span>
          <span className="label-text-alt">Alt label</span>
        </div>
        <textarea
          id="bio"
          name="bio"
          className="textarea-bordered h-24 textarea"
          placeholder="Bio"
          onChange={handleFormChange}
          value={formData.bio}
        />
        <div className="label">
          <span className="label-text-alt">Your bio</span>
          <span className="label-text-alt">Alt label</span>
        </div>
      </label>
      <button
        type="submit"
        className="btn-block btn btn-primary"
      >
        Update
      </button>
    </form>
  </>);
}
