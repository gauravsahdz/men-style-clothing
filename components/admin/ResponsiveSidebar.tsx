import Image from "next/image";
import React from "react";
import "@/styles/components/_sidebar.css";
import { useRouter } from "next/navigation";
import routes from "@/utils/routes";

type props = {
  openSide: boolean;
};

const ResponsiveSidebar = ({ openSide }: props) => {
  const firstClass = `flex flex-col w-64 px-4 py-8 bg-white z-50 fixed top-12 block md:hidden lg:hidden ${
    openSide
      ? "left-0 transition-all duration-500"
      : "responsive_sidebar transition-all duration-500"
  } h-full
  `;

  const router = useRouter();
  const navigateTo =
    (path: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        console.log(path);
      router.push(path);
    };

  return (
    <div className={firstClass}>
      <div className="flex flex-col justify-start flex-1 mt-1">
        {/* user avatar section  */}
        <div className="flex items-start justify-start p-2 rounded-lg text-gray-600 hover:bg-gray-100">
          <a href="#" className="flex items-center">
            <Image
              className="rounded-full border border-gray-300"
              src="/images/avatar.png"
              alt="Avatar of Jonathan Reinink"
              width={60}
              height={60}
            />
            <span className="mx-3">Jonathan</span>
          </a>
        </div>

        {/* navbar section  */}
        <nav>
          {routes.map((route, index) => (
            <a
              className="flex items-center mt-2 py-2 px-6  bg-opacity-25 hover:bg-gray-100 cursor-pointer"
              key={index}
              onClick={navigateTo(route.path)}
            >
              <Image src={route.icon} width={20} height={20} alt="home" />
              <span className="mx-3">{route.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default ResponsiveSidebar;
