'use client'

import Link from "next/link";
import { FaArrowRightToBracket, FaEye, FaGithub, FaGraduationCap, FaInstagram, FaLinkedin, FaLocationDot, FaPhone, FaSchool } from "react-icons/fa6";
import { IoMdMale, IoMdSettings } from "react-icons/io";
import { FaBatteryThreeQuarters, FaHeart, FaLink, FaRegThumbsUp } from "react-icons/fa";
import { AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { IoMail, IoStatsChart } from "react-icons/io5";
import Markdown from "react-markdown";
import { SiFreelancer } from "react-icons/si";
import { GoProjectRoadmap } from "react-icons/go";
import { usePortfolio } from "../../_models/client/portfolios/Portfolio";
import { MdEdit } from "react-icons/md";

const bio = `
🎨 Welcome to my creative corner! 

I'm Tamy. 
I'm a UI/UX Designer, focused on Web and Mobile App Design. My job is to understand the business goals and needs of users, interact with the team and implement the best solutions in an attractive interface

🔗 Let's connect and inspire each other! Don't hesitate to drop me a message or follow along on my design journey.
`

export default function PortfolioView({ params }: { params: { portfolio_id: string } }): JSX.Element {
  const mainPortfolio = usePortfolio(params.portfolio_id)

  const { data, isError, isLoading } = mainPortfolio

  if (isLoading) {
    return <>Loading</>
  }

  if (!data) {
    return <>Portfolio Not Found!</>
  }

  const { portfolio } = data
  const { PortfolioProfile } = portfolio

  return (<>
    <div className="py-4">
      <div className="flex gap-x-4">
        <div className="shadow-md h-full card card-compact grow">
          <figure>
            <div className="w-full h-52 object-cover">
              <div className="flex justify-center items-center bg-base-200 h-full" />
            </div>
          </figure>
          <div className="-mt-52">
            <div className="flex justify-end mx-4 mt-4 mb-20 text-4xl">
              <Link href={"/account/settings"} className="text-2xl btn btn-circle">
                <MdEdit />
              </Link>
            </div>
            <div className="flex gap-x-2 mx-4">
              <div className="avatar">
                <div className="rounded-full w-32 ring ring-base-100">
                  <div className="flex justify-center items-center bg-base-200 h-full">
                    MP
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-end text-xs grow">
                <div className="flex gap-2">
                  <div className="gap-2 badge badge-primary">
                    <IoMdMale />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={"/account/settings"} className="bg-base-100 btn btn-sm">
                    <AiOutlineHeart /> 1
                  </Link>
                  <Link href={"/account/settings"} className="bg-base-100 btn btn-sm">
                    <AiOutlineComment /> 0
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4 card-body">
            <h2 className="card-title">
              {PortfolioProfile.fullName || "Unknown Portfolio"} {PortfolioProfile.nickname ? `(${PortfolioProfile.nickname})` : undefined}
            </h2>
            <h4 className="-mt-4 overflow-hidden">
              {PortfolioProfile.label || "This portfolio has just started!"}
            </h4>
            {
              PortfolioProfile.website || PortfolioProfile.country ? (
                <div className="mt-4">
                  {
                    PortfolioProfile.website ? (
                      <p className="flex items-center font-light overflow-hidden">
                        <FaLink className="me-2" /> {PortfolioProfile.website}
                      </p>
                    ) : undefined
                  }

                  {
                    PortfolioProfile.country ? (
                      <p className="flex items-center font-light overflow-hidden">
                        <FaLocationDot className="me-2" /> {PortfolioProfile.country}
                      </p>
                    ) : undefined
                  }
                </div>
              ) : undefined
            }
          </div>
        </div>
      </div>
      <div className="sm:flex flex-row gap-x-4">
        <div className="sm:w-96">
          <div className="bg-base-100 shadow-md mt-4 card card-compact sm:card-side">
            <div className="card-body">
              <div>
                <h2 className="flex justify-between card-title">
                  <span>About</span>
                  <button className="text-xl btn btn-circle btn-ghost btn-sm">
                    <MdEdit />
                  </button>
                </h2>
                <div className="whitespace-pre-line">
                  <Markdown>
                    {PortfolioProfile.about}
                  </Markdown>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-base-100 shadow-md mt-4 card card-compact sm:card-side">
            <div className="card-body">
              <div>
                <h2 className="flex justify-between card-title">
                  <span>Contact</span>
                  <button className="text-xl btn btn-circle btn-ghost btn-sm">
                    <MdEdit />
                  </button>
                </h2>
                {
                  PortfolioProfile.email || PortfolioProfile.phone ? (
                    <div className="flex flex-col gap-y-2 mt-4">
                      {
                        PortfolioProfile.email ? (
                          <a href="link block"><span className="font-semibold"><IoMail className="inline me-2" /> Email:</span> me@lowscarlet.my.id</a>
                        ) : undefined
                      }

                      {
                        PortfolioProfile.phone ? (
                          <a href="link block"><span className="font-semibold"><FaPhone className="inline me-2" /> Phone:</span> +62-812-7063-4992</a>
                        ) : undefined
                      }
                    </div>
                  ) : undefined
                }
              </div>
            </div>
          </div>
          <div className="bg-base-100 shadow-md mt-4 card card-compact sm:card-side">
            <div className="card-body">
              <div>
                <h2 className="flex justify-between card-title">
                  <span>Connect</span>
                  <button className="text-xl btn btn-circle btn-ghost btn-sm">
                    <MdEdit />
                  </button>
                </h2>
                <div className="flex flex-col gap-y-2 mt-4">
                  <a href="link block"><span className="font-semibold"><FaLinkedin className="inline me-2" /> LinkedIn:</span> tegar-maulana-fahreza-04615a221</a>
                  <a href="link block"><span className="font-semibold"><FaInstagram className="inline me-2" /> Instagram:</span> Low_Scarlet</a>
                  <a href="link block"><span className="font-semibold"><FaGithub className="inline me-2" /> Github:</span> Low_Scarlet</a>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-base-100 shadow-md mt-4 card card-compact sm:card-side">
            <div className="card-body">
              <div>
                <h2 className="flex justify-between card-title">
                  <span>Techincal Skills</span>
                  <button className="text-xl btn btn-circle btn-ghost btn-sm">
                    <MdEdit />
                  </button>
                </h2>
                <div className="space-x-2 space-y-2 mt-4">
                  <div className="badge badge-neutral">Typescript</div>
                  <div className="badge badge-neutral">Javascript</div>
                  <div className="badge badge-neutral">Java</div>
                  <div className="badge badge-neutral">Python</div>
                  <div className="badge badge-neutral">C#</div>
                  <div className="badge badge-neutral">ReactJs</div>
                  <div className="badge badge-neutral">ExpressJs</div>
                  <div className="badge badge-neutral">Laravel</div>
                  <div className="badge badge-neutral">AdonisJs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="bg-base-100 shadow-md mt-4 card card-compact sm:card-side">
            <div className="card-body">
              <div>
                <h2 className="flex justify-between card-title">
                  <span>Education</span>
                  <button className="text-xl btn btn-circle btn-ghost btn-sm">
                    <MdEdit />
                  </button>
                </h2>
                <div className="flex mt-4">
                  <div className="flex justify-center m-4 sm:m-8">
                    <FaGraduationCap className="text-xl sm:text-4xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Universitas Sains Dan Teknologi Indonesia - 2025</h3>
                    <h4 className="font-normal text-sm">M.Kom / Tenik Informatika</h4>
                    <div className="space-y-2 mt-4">
                      <p>
                        <span className="font-semibold">GPA: </span> 3.8 / 4.0
                      </p>
                      <p>
                        <span className="font-semibold">Dissertation Title: </span> Aplikasi Manajemen E-Portfolio Berbasis Web Dengan Pendekatan User Centered Design
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex mt-4">
                  <div className="flex justify-center m-4 sm:m-8">
                    <FaSchool className="text-xl sm:text-4xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Sekolah Menegah Kejuruan Teknologi Yayasan Pendidikan Lirik - 2019</h3>
                    <h4 className="font-normal text-sm">Teknik Komputer Dan Jaringan</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-base-100 shadow-md mt-4 card card-compact sm:card-side">
            <div className="card-body">
              <div>
                <h2 className="flex justify-between card-title">
                  <span>Work Experience</span>
                  <button className="text-xl btn btn-circle btn-ghost btn-sm">
                    <MdEdit />
                  </button>
                </h2>
                <div className="flex mt-4">
                  <div className="flex justify-center m-4 sm:m-8">
                    <SiFreelancer className="text-xl sm:text-4xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Freelancer Frontend Web Developer</h3>
                    <h4 className="font-normal text-sm">2020 - Now</h4>
                    <div className="space-y-2 mt-4">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex mt-4">
                  <div className="flex justify-center m-4 sm:m-8">
                    <SiFreelancer className="text-xl sm:text-4xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Freelancer Frontend Web Developer</h3>
                    <h4 className="font-normal text-sm">2020 - Now</h4>
                    <div className="space-y-2 mt-4">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-base-100 shadow-md mt-4 card card-compact sm:card-side">
            <div className="card-body">
              <div>
                <h2 className="flex justify-between card-title">
                  <span>Projects</span>
                  <button className="text-xl btn btn-circle btn-ghost btn-sm">
                    <MdEdit />
                  </button>
                </h2>
                <div className="flex mt-4">
                  <div className="flex justify-center m-4 sm:m-8">
                    <GoProjectRoadmap className="text-xl sm:text-4xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">🔥 Portfolio API</h3>
                    <h4 className="font-normal text-sm">Team (Tea Party) - 2020</h4>
                    <div className="space-y-2 mt-4">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>);
}