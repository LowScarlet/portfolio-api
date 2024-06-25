'use client';

import { FaPlus } from "react-icons/fa6";
import PortfolioList from "./_components/PortfolioList";
import { FaSearch } from "react-icons/fa";
import { LuFileJson } from "react-icons/lu";
import DefaultModal from "@/app/_components/modals/DefaultModal";
import { useState } from "react";

export default function Portfolio(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="py-4">
        <div className="flex sm:flex-row flex-col justify-between mb-6">
          <h1 className="flex items-center mb-2 font-semibold text-lg">
            <LuFileJson className="me-2" /> Portfolio
          </h1>
          <div className="flex space-x-4">
            <button
              className="btn btn-circle btn-outline btn-sm btn-success"
              onClick={() => setIsModalOpen(true)}
            >
              <FaPlus />
            </button>
            <div className="flex space-x-2 grow">
              <label className="flex items-center gap-2 input-bordered rounded-full w-full input input-sm">
                <FaSearch />
                <input type="text" className="grow" placeholder="Find It!" />
              </label>
            </div>
          </div>
        </div>
        <PortfolioList />
        <DefaultModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        >
          test
        </DefaultModal>
      </div>
    </>
  );
}
