"use client";

import React, { useState, useEffect } from "react";
import { SWEditIcon } from "../svgs";
import { useRouter } from "next/navigation";
import AccountDetailsUpdateCard from "./AccountDetailsUpdate";
import PasswordUpdateCard from "./UserPasswordUpdate";
import Link from "next/link";
import { IoPersonCircleOutline } from "react-icons/io5";
const ProfileCard = () => {
  const [pageState, setPageState] = useState("profile");
  const [userData, setUserData] = useState(false);
  const [openUserDropDown, setOpenUserDropDown] = useState(false);

  useEffect(() => {
    const userDataString = localStorage.getItem("user");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    userData && setUserData(true);
  }, []);

  const handleSignOut = () => {
    setUserData(false);
    localStorage.removeItem("userData");
  };
  console.log(pageState);
  return (
    <div>
      {pageState === "profile" && (
        <div>
          <div className="w-full relative rounded-lg bg-white overflow-hidden flex flex-col items-start justify-start box-border gap-6 text-left text-base text-gray-800 font-body-md-regular">
            <div className="self-stretch flex flex-row items-center justify-between p-5">
              <div className="text-lg font-me text-swGray600">
                Here’s your shiny new profile
              </div>
              <div
                onClick={() => setPageState("update-profile")}
                className="flex items-center py-2 px-4 gap-4 rounded-full text-swPrimary500 relative font-medium cursor-pointer border"
              >
                Edit
                <SWEditIcon />
              </div>
            </div>
            <div className="self-stretch flex flex-col lg:flex-row items-start justify-start gap-6 text-gray-700 p-4 ">
              <div className="flex flex-row items-start justify-start">
                <div className="w-24 h-24 lg:w-36 lg:h-36 relative rounded-full bg-swGray500" />
              </div>
              <div className="text-swGray700 flex-1 flex flex-col items-start justify-start gap-2 p-4">
                <div className="text-2xl font-semibold">Dr. James April</div>
                <div className="">jamesapril@gmail.com</div>
                <div className="">+234 902 583 ****</div>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-white text-left text-gray-800 mt-5  p-4 flex justify-between items-center">
            <div className="text-lg font-me text-swGray600">
              Update your password and security information
            </div>

            <div
              onClick={() => setPageState("update-password")}
              className="flex items-center py-2 px-4 gap-4 rounded-full text-swPrimary500 relative font-medium cursor-pointer border"
            >
              Update
              <SWEditIcon />
            </div>
          </div>
          {userData && (
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
                    href={"/bookings"}
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
        )}
        </div>
      )}
      {pageState === "update-profile" && (
        <AccountDetailsUpdateCard setPageState={setPageState} />
      )}
      {pageState === "update-password" && (
        <PasswordUpdateCard setPageState={setPageState} />
      )}
    </div>
  );
};

export default ProfileCard;
