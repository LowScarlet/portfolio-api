'use client'

import DefaultModal from "@/app/_components/modals/DefaultModal";
import { DialogPanel, DialogTitle } from "@headlessui/react";
import Image from "next/image";
import { useRef, useState } from "react";
import ImageCropper from "./ImageCropper";

export default function ProfileForm({
  //
}: {
    //
  }): JSX.Element {
  const [modalOpen, setModalOpen] = useState(false)

  const avatarUrl = useRef(
    "/images/portfolio_icon.png"
  );

  const updateAvatar = (imgSrc: any) => {
    avatarUrl.current = imgSrc;
  };

  function openModal() {
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
  }

  return (<>
    <button className="w-32 avatar" onClick={openModal}>
      <Image
        width={500}
        height={500}
        src={avatarUrl.current}
        alt={"Icon"}
        className="rounded-full cursor-pointer ring-4 ring-base-100"
      />
    </button>

    {/* Modal */}
    <DefaultModal isOpen={modalOpen} setIsOpen={setModalOpen}>
      <DialogPanel className="bg-base-200 p-6 rounded-xl w-full max-w-xl">
        <DialogTitle as="h3" className="font-medium text-xl">
          Upload Avatar
        </DialogTitle>
        <div className="my-4">
          <ImageCropper closeModal={closeModal} updateImage={updateAvatar} />
        </div>
      </DialogPanel>
    </DefaultModal>
  </>);
}
