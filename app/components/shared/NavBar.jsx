"use client";

import React, { useEffect, useState } from "react";
import { SWToggleIcon } from "../svgs";
import Button from "../Button";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/fullLogo.png";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

const NavBar = ({ Nav }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [userData, setUserData] = useState(false);
  const [openUserDropDown, setOpenUserDropDown] = useState(false);

  useEffect(() => {
    const userDataString = localStorage.getItem("user");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    userData && setUserData(true);
  }, []);

  const handleSignOut = () => {
    setUserData(false);
    localStorage.removeItem("user");
    router.push("/");
  };


  useEffect(() => {
    if (typeof self !== "undefined") {
      const userItem = localStorage.getItem("user");
      if (userItem) {
        try {
          const getUser = JSON.parse(userItem);
          setUser(getUser);
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (!Nav) {
    // If Nav is false, return null to prevent rendering the navigation bar
    return null;
  }

  return (
    <nav className="w-full fixed z-50 top-0 left-0">
      <div className="w-full bg-white/50 text-swGray800 border-b-2 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between max-w-screen-full mx-auto py-6 px-10">
          <Link href={"/"} className="flex items-center">
            <Image src={logo} alt="Logo" className="w-40 h-12" />
          </Link>
          <div className="flex items-center lg:order-2">
            <div className="hidden mt-2 mr-4 sm:inline-block">
              <span></span>
            </div>

            <div className="text-sm lg:text-lg">
              {user?.isLoggedIn ? (
                <div className="relative">
                <div
                  className="text-jsPrimary100 cursor-pointer"
                  onClick={() => setOpenUserDropDown(!openUserDropDown)}
                >
                  <IoPersonCircleOutline size={50} />
                </div>
    
                {openUserDropDown && (
                  <div
                    className={`absolute w-[12rem] -right-5 top-full mt-7 p-3 bg-white rounded-md ${
                      openUserDropDown ? "min-h-10" : "h-0"
                    }`}
                  >
                    <div className="w-full flex flex-col">
                      <Link
                        href={"/user-dashboard"}
                        className="w-full hover:bg-yellow-50 rounded-md p-3"
                      >
                        Bookings
                      </Link>
                      <Link
                        href={"#"}
                        className="w-full hover:bg-yellow-50 rounded-md p-3"
                      >
                        Settings
                      </Link>
                      <div
                        className="w-full hover:bg-yellow-50 rounded-md p-3 cursor-pointer"
                        onClick={handleSignOut}
                      >
                        Sign-out
                      </div>
                    </div>
                  </div>
                )}
              </div>
              ) : (
                <div className="flex gap-5 items-center">
                  <Link href="/sign-in" className="py-2 px-4 rounded-full hover:bg-white text-lg hidden lg:flex">
                    Sign In
                  </Link>
                  <Link href="/sign-up" className="py-2 px-4 rounded-full text-sm md:text-lg text-white bg-swPrimary500 hover:bg-swPrimary600 ">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center mt-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden "
              aria-controls="mobile-menu-2"
              aria-expanded={isMobileMenuOpen ? "true" : "false"}
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                ) : (
                  <SWToggleIcon />
                )}
              </svg>
            </button>
          </div>
          <div
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } items-center justify-between w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu-2"
          >
            {Nav !== false && (
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-20 lg:mt-0">
                <Link href={"/fleet-page"} className="block py-2 pl-3 pr-4 text-gray-700  border-gray-100 hover:bg-white rounded-full p-4 hover:text-swPrimary600 " aria-current="page">
                  Fleets
                </Link>
                <Link href={"/destinations"} className="block py-2 pl-3 pr-4 text-gray-700  border-gray-100 hover:bg-white rounded-full p-4 hover:text-swPrimary600  " aria-current="page">
                  Destination
                </Link>
                <Link href="#" className="block py-2 pl-3 pr-4 text-gray-700  border-gray-100 hover:bg-white rounded-full p-4 hover:text-swPrimary600  " aria-current="page" >
                  Company{" "}
                </Link>
                <Link href="#" className="block py-2 pl-3 pr-4 text-gray-700 border-gray-100 hover:bg-white rounded-full p-4 hover:text-swPrimary600  " aria-current="page">
                  Contact Us
                </Link>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

