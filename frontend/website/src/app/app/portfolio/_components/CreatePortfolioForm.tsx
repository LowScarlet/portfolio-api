'use client'

import { FormEvent, useState } from "react";
import { createUserPortfolio, revalidateUserPortfolios } from "../../_models/client/user/portfolios/UserPortfolios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const defaultFormData = { name: '', description: '' }
const defaultBadError = { name: '', description: '' }

export default function CreatePortfolioForm(): JSX.Element {
  const router = useRouter();

  const [signinLoading, setSigninLoading] = useState(false)

  const [formData, setFormData] = useState(defaultFormData)
  const [badError, setBadError] = useState(defaultBadError)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSigninLoading(true)
    setBadError(defaultBadError)

    try {
      const response = await createUserPortfolio(formData);

      const { status, message, data, validationErrors } = response

      if (status === 200) {
        if (!data) {
          toast.error("An unexpected error occurred (key: data)")
          return
        }

        const { portfolio } = data
        const { id } = portfolio

        toast.success(message)
        router.push(`/app/portfolio/${id}`)
      } else {
        if (validationErrors) {
          Object.entries(validationErrors).forEach(([key, value]) => {
            setBadError((prevData) => ({
              ...prevData,
              [key]: value
            }))
          })
        }
        toast.error(message)
      }
    } catch (error) {
      console.log(error)
      toast.error("An unexpected error occurred (key: try and catch)")
    } finally {
      setSigninLoading(false)
    }
  };

  return (<>
    <div className="p-6">
      <div className="mb-3 text-center">
        <h1 className="font-bold text-2xl">Create</h1>
      </div>
      <form onSubmit={handleSubmit} method='POST'>
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Name</span>
              <span className="label-text-alt">Required</span>
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Type here"
              className="input-bordered w-full max-w-xs input"
            />
            {
              badError.name ? (
                <div className="label">
                  <span className="label-text-alt">{badError.name}</span>
                </div>
              ) : undefined
            }
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Description</span>
              <span className="label-text-alt">Optional</span>
            </div>
            <textarea
              className="textarea-bordered h-24 textarea"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Bio"
            ></textarea>
            {
              badError.description ? (
                <div className="label">
                  <span className="label-text-alt">{badError.description}</span>
                </div>
              ) : undefined
            }
          </label>
        </div>
        <button
          className="w-full btn btn-primary btn-sm"
          type="submit"
        >
          Create
        </button>
      </form >
    </div>
  </>);
}