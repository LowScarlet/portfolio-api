'use client'

import { FormEvent, useState } from "react";
import { UpdateUserProfile } from "../../_utils/UserProfileHandler";

interface UserProfileInterface {
  id: string
  avatar: string
  fullName: string
  bio: string
  userId: string
  createdAt: string
  updatedAt: string
}

export default function ProfileForm({
  userProfile
}: {
  userProfile: UserProfileInterface
}): JSX.Element {
  const { id, fullName, bio } = userProfile
  const defaultFormData = { fullName: '' || fullName, bio: '' || bio }
  const defaultBadError = { fullName: '' || fullName, bio: '' || bio }

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const fetchRes = await UpdateUserProfile(formData)

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

    //
  }

  return (<>
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
  </>);
}
