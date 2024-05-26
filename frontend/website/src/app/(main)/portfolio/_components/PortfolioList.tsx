import { useAuth } from "@/app/(authentication)/_context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { BsFillPinFill } from "react-icons/bs";
import { FaEye, FaEyeSlash, FaPlus, FaRunning, FaSearch } from "react-icons/fa";
import { FaArrowRight, FaCrown } from "react-icons/fa6";
import { LuFileJson } from "react-icons/lu";
import FetchError from "../../_components/FetchError";
import { GetMePortfolio } from "@/app/_models/client/@me/portfolio/MePortfolioHandler";

export default async function PortfolioList(): Promise<JSX.Element> {
  const getMePortfolio = await GetMePortfolio('portfolioComponents')

  if (!getMePortfolio.ok || !getMePortfolio.ok) {
    return <FetchError />
  }

  const getMePortfolioOutput = getMePortfolio.data

  const portfolios = getMePortfolioOutput.portfolio

  return (<>
    <div className="flex sm:flex-row flex-col justify-between mb-6">
      <h1 className="flex items-center mb-2 font-semibold text-lg"><LuFileJson className="me-2" /> Portfolio</h1>
      <div className="flex space-x-4">
        <button className="btn btn-circle btn-outline btn-sm btn-success">
          <FaPlus />
        </button>
        <div className="flex space-x-2 grow">
          <label className="flex items-center gap-2 input-bordered rounded-full input input-sm">
            <FaSearch />
            <input type="text" className="grow" placeholder="Find It!" />
          </label>
        </div>
      </div>
    </div>
    {
      portfolios.length > 0 ? (
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {
            portfolios.map((portfolio, index) => (
              <Link key={index} className="bg-base-100 card" href={`/portfolio/${portfolio.id}`}>
                <div className="bg-base-100 shadow-md h-full card card-compact">
                  <figure>
                    <Image width={500} height={500} className="w-full h-20 object-cover" src="/images/portfolio_icon.png" alt="Shoes" />
                  </figure>
                  <div className="-mt-24">
                    <div className="flex justify-end mb-4 text-4xl">
                      <BsFillPinFill className="items-center drop-shadow-lg fill-primary rotate-12" />
                    </div>
                    <div className="flex gap-x-2 mx-4">
                      <div className="avatar">
                        <div className="rounded-full w-20 ring ring-base-100">
                          <Image width={128} height={128} src={"/images/portfolio_icon.png"} alt={"Icon"} />
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
                        {/* {
                          portfolio.ownerId === user.id &&
                          <div className="gap-2 badge badge-primary">
                            <FaCrown />
                          </div>
                        } */}
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <h2 className="truncate card-title">{portfolio.name}</h2>
                    <p className="h-28 overflow-hidden">
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
          <Link className="bg-base-100 card" href={"/portfolio/create"}>
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