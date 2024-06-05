"use client";

import React, { useEffect, useState } from "react";
import { SWToggleIcon } from "../svgs";
import Button from "../Button";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/fullLogo.png";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";

const NavBar = ({ Nav }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
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

  const renderNavLink = (link, name, hasDropDown, dropDownLinks) => {
    return (
      <div className="relative inline-block text-left">
        <div className="flex items-center">
          <Link
            href={hasDropDown ? "javascript:void(0)" : link}
            onClick={hasDropDown ? toggleDropdown : null}
            className="flex gap-2 py-2 pl-3 pr-4 text-gray-700 border-gray-100 hover:bg-white rounded-full p-4 hover:text-swPrimary600"
            aria-current="page"
          >
            {name}
            {hasDropDown && (
              <button className="rounded px-1 py-1 text-sm  flex items-center">
                <FaChevronDown />
              </button>
            )}
          </Link>
        </div>

        {hasDropDown && isOpen ? (
          <div
            className="absolute left-0 mt-2 w-56 rounded-3xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="company-menu-button"
          >
            <div className="py-4 px-4" role="none">
              {dropDownLinks.map((item, i) => (
                <Link
                  key={i}
                  href={item.link}
                  className="flex px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-swPrimary600 hover:text-white"
                  role="menuitem"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  const navLinks = [
    { link: "/fleet-page", name: "Fleets" },
    { link: "/destinations", name: "Destination" },
    { link: "/services", name: "Services" },
    {
      link: "",
      name: "Company",
      hasDropDown: true,
      dropDownLinks: [
        { link: "/about-us", name: "About Us" },
        { link: "/careers", name: "Careers" },
      ],
    },
    { link: "/contact-us", name: "Contact Us" },
  ];

  if (!Nav) {
    // If Nav is false, return null to prevent rendering the navigation bar
    return null;
  }

  return (
    <nav className="w-full fixed z-50 top-0 left-0">
      <div className="w-full bg-white/40 text-swGray800 border-b-2 backdrop-blur">
        <div className="flex items-center justify-between max-w-screen-full mx-auto py-6 px-5 sm:px-10">
          <Link href={"/"} className="flex items-center">
            <Image src={logo} alt="Logo" className="w-40 h-12" />
          </Link>

          <div className="hidden lg:flex gap-5 items-center">
            {navLinks.map((item, i) => (
              <div key={i}>
                {renderNavLink(
                  item.link,
                  item.name,
                  item.hasDropDown,
                  item.dropDownLinks
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center">
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
                      className={`absolute w-[12rem] -right-5 top-full mt-7 p-3 bg-white rounded-md border ${
                        openUserDropDown ? "min-h-10" : "h-0"
                      }`}
                    >
                      <div className="w-full flex flex-col">
                        <Link
                          href={"/user-dashboard?page=bookings"}
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
                  <Link
                    href="/sign-in"
                    className="py-2 px-4 rounded-full hover:bg-white text-lg hidden lg:flex"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="py-2 px-4 rounded-full text-sm md:text-lg text-white bg-swPrimary500 hover:bg-swPrimary600 "
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
            <div className="flex items-center lg:order-2">
              <button
                onClick={toggleMobileMenu}
                type="button"
                className="inline-flex items-center justify-center mt-2 ml-3 text-sm text-gray-500 rounded-full lg:hidden"
                aria-controls="mobile-menu-2"
                aria-expanded={isMobileMenuOpen ? "true" : "false"}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
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
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="flex py-6 px-5 sm:px-10 flex-col lg:hidden gap-5">
            {navLinks.map((item, i) => (
              <div key={i}>
                {renderNavLink(
                  item.link,
                  item.name,
                  item.hasDropDown,
                  item.dropDownLinks
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
