import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import logo from "../public/images/footer_logo.png";
import Image from "next/image";
import "@/styles/components/_footer.css"; 

const Footer = () => {
  return (
    <footer className="footer bg-gray-800 text-white">
      <div className="container mx-auto px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="logo space-y-2">
            <Image src={logo} alt="logo" width={100} height={50} />
            <p className="motto text-sm text-gray-300">
              Building a modern world, one step at a time.
            </p>
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-white">Useful links</h1>
            <ul className="text-sm">
              <li>
                <Link href="/" legacyBehavior>
                  <a className="hover:underline">About us</a>
                </Link>
              </li>
              <li>
                <Link href="/shop" legacyBehavior>
                  <a className="hover:underline">Privacy policy</a>
                </Link>
              </li>
              <li>
                <Link href="/contact" legacyBehavior>
                  <a className="hover:underline">Terms of service</a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faPhone} className="text-gray-300" />
              <span className="text-gray-300">+91-9934432446</span>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-gray-300" />
              <a
                href="mailto:sahgaurav33@gmail.com"
                className="hover:underline text-gray-300"
              >
                sahgaurav33@gmail.com
              </a>
            </div>
          </div>
        </div>
        <hr className="my-4 border-gray-600" />
        <div className="footer_bottom flex flex-col md:flex-row justify-center items-center">
          <p className="text-sm text-gray-300">
            &copy; 2023 DZ-CLOTHING. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
