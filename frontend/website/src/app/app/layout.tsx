'use client'

import Drawer from "./_components/Drawer";
import AppBar from "./_components/AppBar";
import Footer from "./_components/Footer";
import { useState } from "react";
import { Transition } from "@headlessui/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [drawerOpen, setDrawerOpen] = useState(true)

  return (<>
    <div className="relative">
      <div className="flex h-svh">
        {/* Drawer Desktop */}
        <div className="md:block z-20 hidden bg-base-300">
          <Drawer isOpen={drawerOpen} setIsOpen={setDrawerOpen} />
        </div>
        {/* App */}
        <main className="flex flex-col overflow-y-auto grow">
          {/* AppBar */}
          <AppBar isOpen={drawerOpen} setIsOpen={setDrawerOpen} />
          {/* Context */}
          <div className="px-2 sm:px-4 grow py">
            {children}
          </div>
          {/* Footer */}
          <Footer />
        </main>
      </div>
      {/* Drawer Desktop */}
      <Transition
        show={!drawerOpen}
        enter="transition-transform duration-200"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform duration-200"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <div className={`top-0 left-0 z-20 absolute md:hidden bg-base-300 h-svh w-full p-4`}>
          <Drawer isOpen={!drawerOpen} setIsOpen={setDrawerOpen} />
        </div>
      </Transition>
    </div>
  </>);
}
