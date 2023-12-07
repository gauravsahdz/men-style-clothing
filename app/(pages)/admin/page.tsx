"use client";
import ResponsiveSidebar from "@/components/admin/ResponsiveSidebar";
import Sidebar from "@/components/admin/Sidebar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AdminPage = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openSide, setOpenSide] = useState(false);
  const router = useRouter();

  const toggleButtonClass = `fixed top-19 z-50 flex items-center justify-center w-14 h-14 bg-gray-100 shadow-md md:hidden lg:hidden block
    ${
      openSide
        ? " left-64 transition-all duration-500 rotate-180"
        : "left-0 transition-all duration-500"
    }
  `;

  const openSidebar = () => {
    setOpenSide(!openSide);
  };

  const handleSidebarOptionClick = (option: string) => {
    router.push(option);
  };

  return (
    <div className="flex flex-row justify-center w-full h-full bg-gray-100">
      <button
        className={`${toggleButtonClass} hover:cursor-pointer`}
        onClick={openSidebar}
      >
        <Image
          src="/images/arrow-right.svg"
          width={40}
          height={40}
          alt="hero"
          className="hover:cursor-pointer"
        />
      </button>
      <ResponsiveSidebar
        openSide={openSide}
        handleOptionClick={handleSidebarOptionClick}
      />
      <Sidebar handleOptionClick={handleSidebarOptionClick} />
      {children}
    </div>
  );
};

export default AdminPage;
