'use client'

import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import { Dispatch, ReactNode, SetStateAction } from "react";

const ModalTransitionChild = ({
  children
}: {
  children?: ReactNode
}) => {
  return (
    <TransitionChild
      enter="ease-out duration-300"
      enterFrom="opacity-0 transform-[scale(95%)]"
      enterTo="opacity-100 transform-[scale(100%)]"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 transform-[scale(100%)]"
      leaveTo="opacity-0 transform-[scale(95%)]"
    >
      {children}
    </TransitionChild>
  )
}

export default function DefaultModal({
  children,
  isOpen,
  setIsOpen
}: {
  children?: ReactNode,
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>
}): JSX.Element {
  function close() {
    setIsOpen(false)
  }

  return (<>
    <Transition appear show={isOpen}>
      <Dialog as="div" className="relative z-50 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 bg-base-300/80" aria-hidden="true" />
        <div className="fixed inset-0 flex justify-center items-center p-4 w-screen overflow-y-auto" onClick={() => setIsOpen(false)}>
          <ModalTransitionChild>
            <div className="relative bg-base-200 shadow-lg rounded-lg" onClick={(e) => e.stopPropagation()}>
              {children}
            </div>
          </ModalTransitionChild>
        </div>
      </Dialog>
    </Transition>
  </>);
}