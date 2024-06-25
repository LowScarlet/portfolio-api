'use client'

import Link from "next/link";
import { BsFillPinFill } from "react-icons/bs";
import { FaEye, FaEyeSlash, FaPlus, FaRunning, FaUser } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { getInitials } from "../../_utils/utils";
import { useUserPortfolio } from "../../_models/client/user/portfolios/Portfolios";

export default function PortfolioList(): JSX.Element {

  const usePortfolio = useUserPortfolio()

  const { data, isError, isLoading } = usePortfolio

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