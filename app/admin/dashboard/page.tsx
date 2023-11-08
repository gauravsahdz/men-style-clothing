"use client";
import Dashboard from "@/components/admin/Dashboard";
import ResponsiveSidebar from "@/components/admin/ResponsiveSidebar";
import Sidebar from "@/components/admin/Sidebar";
import Image from "next/image";
import React, { useState } from "react";

const Page = () => {
  const [openSide, setOpenSide] = useState(false);
  const toggleButtonClass = `fixed top-19 rounded-r-full z-50 flex items-center justify-center w-14 h-14 bg-gray-100 shadow-md md:hidden lg:hidden block
    ${openSide ? " left-64 transition-all duration-500" : "left-0 transition-all duration-500"}
  `;

  const openSidebar = () => {
    setOpenSide(!openSide);
  };

  return (
    <div className="flex flex-row justify-center w-full h-full bg-gray-100">
      <div className={toggleButtonClass} onClick={openSidebar}>
        <Image
          src="/images/arrow-right.svg"
          width={40}
          height={40}
          alt="hero"
          className="hover:cursor-pointer"
        />
      </div>
      <ResponsiveSidebar openSide={openSide} />
      <Sidebar />
      <Dashboard />
    </div>
  );
};

export default Page;
