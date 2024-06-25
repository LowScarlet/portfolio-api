'use client'

import Link from "next/link";
import { BsFillPinFill } from "react-icons/bs";
import { FaEye, FaEyeSlash, FaPlus, FaRunning, FaUser } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { useGet_ClientPortfolios } from "../../_models/client/user/portfolios/Portfolios";
import { getInitials } from "../../_utils/utils";

export default function PortfolioList(): JSX.Element {

  const useClientPortfolio = useGet_ClientPortfolios()

  const { data, isError, isLoading } = useClientPortfolio

  if (isLoading) {
    return (<>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {
          [1].map((index) => (
            <div key={index} className="bg-base-100 card">
              <div className="bg-base-100 shadow-md h-full card card-compact">
                <figure>
                  <div className="rounded-none w-full h-16 skeleton"></div>
                </figure>
                <div className="-mt-8">
                  <div className="flex gap-x-2 mx-4">
                    <div className="avatar">
                      <div className="rounded-full w-20 ring ring-base-100 skeleton" />
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <h2 className="truncate card-title">
                    <div className="w-28 h-4 skeleton"></div>
                  </h2>
                  <p className="h-28 overflow-hidden">
                    <div className="w-full h-4 skeleton"></div>
                  </p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>)
  }

  if (!data) {
    window.location.reload()
    return <></>
  }

  const { portfolios } = data

  return (<>
    {
      isError ? (
        <div role="alert" className="mb-8 alert alert-warning">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{isError}</span>
        </div>
      ) : (undefined)
    }
    {
      portfolios.length > 0 ? (
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {
            portfolios.map((portfolio, index) => (
              <Link key={index} className="bg-base-100 card hover:ring-1 ring-primary" href={`/app/portfolio/${portfolio.id}`}>
                <div className="bg-base-100 shadow-md h-full card card-compact">
                  <figure>
                    <div className="w-full h-20 object-cover">
                      <div className="flex justify-center items-center bg-base-200 h-full" />
                    </div>
                  </figure>
                  <div className="-mt-24">
                    <div className="flex justify-end mb-4 text-4xl">
                      <BsFillPinFill className="items-center drop-shadow-lg invisible fill-primary rotate-12" />
                    </div>
                    <div className="flex gap-x-2 mx-4">
                      <div className="avatar">
                        <div className="rounded-full w-20 ring ring-base-100">
                          <div className="flex justify-center items-center bg-base-200 h-full">
                            <h1 className="font-bold text-xl">{getInitials(portfolio?.name)}</h1>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-end gap-2 text-xs grow">
                        {
                          portfolio.isPublic ? (
                            <div className="gap-2 badge badge-primary">
                              <FaEye />
                            </div>
                          ) : (
                            <div className="gap-2 badge badge-error">
                              <FaEyeSlash />
                            </div>
                          )
                        }
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <h2 className="truncate card-title">{portfolio.name}</h2>
                    <p className="overflow-hidden">
                      {portfolio.description || "A Wonderfull Portfolio!"}
                    </p>
                    <div className="justify-end card-actions">
                      <span className="btn btn-ghost btn-sm">View <FaArrowRight /></span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          }
          <Link className="bg-base-100 card hover:ring-1 ring-primary" href={"/portfolio/create"}>
            <div className="bg-base-100 shadow-md h-full card card-compact">
              <div className="flex justify-center items-center m-12 card-body">
                <FaPlus className="text-6xl" />
              </div>
            </div>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center py-8">
          <h1 className="mb-8 text-5xl">📚</h1>
          <h4>Oops, you dont have a Portfolio yet..</h4>
          <div className="space-x-4 my-4">
            <button className="btn btn-outline btn-primary btn-sm"><FaRunning /> Explore..</button>
            <button className="btn btn-outline btn-primary btn-sm"><FaPlus /> Create One!</button>
          </div>
        </div>
      )
    }
  </>);
}