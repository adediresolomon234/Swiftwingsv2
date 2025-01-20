"use client";

import React, { useEffect, useRef, useState } from "react";
import { SWToggleIcon, SwUserIcon } from "../svgs";
import Image from "next/image";
import Link from "next/link";
import SWheader from "../../../public/images/SWheader.png";
import { IoPersonCircleOutline } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";

const NavBar = ({ Nav }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [navBg, setNavBg] = useState(false);
  const toggleButtonRef = useRef(null);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  const [userData, setUserData] = useState(false);
  const [openUserDropDown, setOpenUserDropDown] = useState(false);

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    if (pathname !== "/") router.push("/");
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
    // console.log(user);
  }, []);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderNavLink = (link, name, hasDropDown, dropDownLinks) => {
    return (
      <div className="relative inline-block text-left group">
        <div className="flex flex-col lg:items-center">
          <Link
            href={hasDropDown ? "javascript:void(0)" : link}
            onClick={hasDropDown ? toggleDropdown : null}
            className={`flex gap-2 text-gray-700 px-4 ${
              pathname === link ? "font-medium" : "hover:font-medium"
            }`}
            aria-current="page"
          >
            {name}
            {hasDropDown && (
              <button className="rounded px-1 py-1 text-sm  flex items-center">
                <FaChevronDown />
              </button>
            )}
          </Link>
          {pathname === link ? (
            <div
              className={`h-1 w-5 ml-4 lg:ml-0 rounded-full bg-swPrimary500`}
            />
          ) : (
            <div
              className={`h-1 w-5 ml-4 lg:ml-0 rounded-full bg-transparent group-hover:bg-gray-400`}
            />
          )}
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
    { link: "https://swiftwingsjet.blog", name: "Blog" },
    // {
    //   link: "",
    //   name: "Company",
    //   hasDropDown: true,
    //   dropDownLinks: [
    //     { link: "/about-us", name: "About Us" },
    //     { link: "/careers", name: "Careers" },
    //   ],
    // },
    { link: "/about-us", name: "Company" },
    { link: "/contact-us", name: "Contact Us" },
  ];

  useEffect(() => {
    const activeNav = () => {
      //   setCurrentScroll(window.scrollY);
      // setCurrentWidth(window.innerWidth);
      if (window.scrollY >= 0 && window.scrollY <= 10) {
        setNavBg(false);
      } else {
        setNavBg(true);
      }
    };

    window.addEventListener("scroll", activeNav);
    window.addEventListener("resize", activeNav);

    // // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", activeNav);
      window.removeEventListener("resize", activeNav);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setOpenUserDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!Nav) {
    // If Nav is false, return null to prevent rendering the navigation bar
    return null;
  }

  return (
    <nav className="w-full fixed z-50 top-0 left-0">
      {/* <div className="w-full bg-white/40 text-swGray800 border-b-2 backdrop-blur"> */}
      <div
        className={`w-full transition-all ease-in-out bg-white duration-1000  ${
          navBg || isMobileMenuOpen ? "bg-opacity-100" : "bg-opacity-0"
        }`}
      >
        <div className="flex items-center justify-between max-w-screen-full mx-auto py-4 px-2 sm:px-10">
          <Link href={"/"} className="flex items-center">
            <Image src={SWheader} alt="Logo" className="w-60 " />
          </Link>

          <div className="hidden lg:flex gap-3 items-center">
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
                    className="text-jsPrimary100 cursor-pointer flex items-center gap-2 py-2 px-4 rounded-full hover:bg-white"
                    // ref={toggleButtonRef}
                    onClick={() => {
                      setOpenUserDropDown(!openUserDropDown);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <SwUserIcon />
                    <p>
                      <span className="hidden sm:inline">
                        {user?.last_name}
                      </span>{" "}
                      {user?.first_name}
                    </p>
                    <FaChevronDown />
                    {openUserDropDown && (
                      <div className="absolute top-0 left-0 h-full w-full" />
                    )}
                  </div>

                  {openUserDropDown && (
                    <div
                      ref={toggleButtonRef}
                      className={`absolute w-[15rem] sm:-m-16 -m-36 top-full mt-3 sm:mt-3 p-3 bg-white z-20 rounded-lg border ${
                        openUserDropDown ? "min-h-10" : "h-0"
                      }`}
                    >
                      <div className="w-full flex flex-col">
                        <Link
                          href={"/user-dashboard?page=profile"}
                          className="w-full hover:bg-yellow-50   rounded-md p-3 flex items-center gap-3"
                        >
                          <SwUserIcon /> Profile
                        </Link>
                        {/* <Link
                          href={"#"}
                          className="w-full hover:bg-yellow-50 rounded-md p-3"
                        >
                          Settings
                        </Link> */}
                        <div
                          className="w-full hover:bg-yellow-50 rounded-md p-3 cursor-pointer flex items-center gap-3"
                          onClick={handleSignOut}
                        >
                          <GoSignOut size={20} /> Logout
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
                    className="py-2 px-4 rounded-full text-xs md:text-lg text-white bg-swPrimary500 hover:bg-swPrimary600 "
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
