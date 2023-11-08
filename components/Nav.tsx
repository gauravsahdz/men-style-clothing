"use client";
import React, { useReducer } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { useCartStore } from "@/reducers/useCartStore";
import Image from "next/image";
import logo from "../public/images/logo.png";
import "@/styles/components/_navbar.css";

const Nav = () => {
  const totalItems = useCartStore((state) => state.totalItems);

  return (
    <div className="navbar flex flex-wrap items-center justify-between w-full px-4 py-4 lg:px-0 bg-white z-10 sticky top-0 shadow-md">
      <div className="flex items-center flex-shrink-0 text-black mr-6 hover:cursor-pointer ml-4">
        <Link href="/" legacyBehavior>
          <Image src={logo} alt="logo" width={150} height={50} />
        </Link>
      </div>
      <div
        className="lg:flex lg:items-center lg:w-auto w-full lg:block hidden"
        id="menu"
      >
        <nav>
          <ul className="lg:flex items-center justify-between text-base text-black pt-4 lg:pt-0">
            <li>
              <Link href="/" legacyBehavior>
                <a className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400">
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link href="/shop" legacyBehavior>
                <a className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400">
                  Shop
                </a>
              </Link>
            </li>
            <li>
              <Link href="/contact" legacyBehavior>
                <a className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400">
                  Contact
                </a>
              </Link>
            </li>
            <li className="cart">
              <Link href="/cart" legacyBehavior>
                <a className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400">
                  <FontAwesomeIcon icon={faShoppingBag} />
                </a>
              </Link>
              <span className="px-1 py-0 bg-white text-black rounded-full absolute right-2 top-4">
                {totalItems}
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
