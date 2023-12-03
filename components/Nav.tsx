"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag, faUser } from "@fortawesome/free-solid-svg-icons";
import { useCartStore } from "@/reducers/useCartStore";
import Image from "next/image";
import logo from "../public/images/logo.png";
import "@/styles/components/_navbar.css";
import { navRoutes } from "@/utils/routes";
import { signIn, useSession, getProviders, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import hamburgerIcon from "public/images/hamburger.svg";

const Nav = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [toggleNavDropdown, setToggleNavDropdown] = useState(false);

  const [providers, setProviders] = useState<any>(null);
  const isAdmin: boolean = true;
  const totalItems = useCartStore((state) => state.totalItems);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setUpProviders();
  }, []);

  const navClass = `navbar flex flex-wrap items-center justify-between w-full px-4 py-4 lg:px-0 bg-white z-10 sticky top-0 shadow-md
    ${isAdmin ? "hidden" : ""}
    `;

  return (
    <div className={navClass}>
      <div className="flex items-center flex-shrink-0 text-black mr-6 hover:cursor-pointer ml-4">
        <Link href="/" legacyBehavior>
          <Image
            src={logo}
            alt="logo"
            width={150}
            height={50}
            layout="responsive"
          />
        </Link>
      </div>
      <div
        className="lg:flex lg:items-center lg:w-auto w-full lg:block hidden"
        id="menu"
      >
        <nav>
          <ul className="lg:flex items-center justify-between text-base text-black pt-4 lg:pt-0">
            {navRoutes.map((route, index) => (
              <li key={index}>
                <Link href={route.path} legacyBehavior>
                  <a className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400">
                    {route.name}
                  </a>
                </Link>
              </li>
            ))}
            {session?.user ? (
              <div className="flex">
                <Image
                  src={session?.user?.image || ""}
                  alt="Profile"
                  width={37}
                  height={37}
                  className="rounded-full"
                  onClick={() => setToggleDropdown((prev) => !prev)}
                />

                {toggleDropdown && (
                  <div className="absolute right-6 top-16 bg-white shadow-md rounded-md py-2 px-4">
                    <Link
                      href="/profile"
                      className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium"
                      onClick={() => setToggleDropdown(false)}
                    >
                      Profile
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setToggleDropdown(false);
                        signOut();
                      }}
                      className="mt-2 w-full transition-all hover:text-black text-center text-sm font-inter flex items-center justify-center"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                {providers &&
                  Object.values(providers).map((provider: any) => (
                    <li
                      className="account hover:cursor-pointer"
                      onClick={() => router.push("/signin")}
                      key={provider.name}
                    >
                      <a className="lg:p-4 py-3 px-0 block border-b-2 border-transparent">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="transition duration-300 ease-in-out transform hover:scale-110"
                        />
                      </a>
                    </li>
                  ))}
              </>
            )}
            <li className="cart">
              <Link href="/cart" legacyBehavior>
                <a className="lg:p-4 py-3 px-0 block border-b-2 border-transparent ">
                  <FontAwesomeIcon
                    icon={faShoppingBag}
                    className="transition duration-300 ease-in-out transform hover:scale-110"
                  />
                </a>
              </Link>
              <span className="px-1 py-0 bg-white text-black rounded-full absolute right-2 top-4">
                {totalItems}
              </span>
            </li>
          </ul>
        </nav>
      </div>

      <div className="block lg:hidden">
        <button
          id="nav-toggle"
          className="flex items-center px-3 py-2 border rounded text-black border-black hover:text-black hover:border-black"
          onClick={() => setToggleNavDropdown((prev) => !prev)}
        >
          <Image src={hamburgerIcon} alt="hamburger" width={20} height={20} />
        </button>
        {toggleNavDropdown && (
          <div className="absolute right-0 top-16 bg-white shadow-md rounded-md py-2 px-4 flex flex-col w-40">
            <Link
              href="/"
              className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium mb-2"
              onClick={() => setToggleNavDropdown(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium mb-2"
              onClick={() => setToggleNavDropdown(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium mb-2"
              onClick={() => setToggleNavDropdown(false)}
            >
              Contact
            </Link>
            <Link
              href="/cart"
              className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium mb-2"
              onClick={() => setToggleNavDropdown(false)}
            >
              Cart
            </Link>
            {!session?.user && (
              <Link
                href="/signin"
                className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium mb-2"
                onClick={() => setToggleNavDropdown(false)}
              >
                Sign In
              </Link>
            )}
            {session?.user && (
              <>
                <Link
                  href="/profile"
                  className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium mb-2"
                  onClick={() => setToggleNavDropdown(false)}
                >
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleNavDropdown(false);
                    signOut();
                  }}
                  className="mb-2 border-t-2 mt-2 w-full transition-all hover:text-black text-center text-sm font-inter flex items-center justify-center border-gray-300"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
