"use client";

import { useEffect, useState } from "react";
import {
  SWStarIcon,
  SwUserIcon,
  SWNotificationIcon,
  SWToggleIcon,
} from "../svgs";
import UserDashBoardNav from "./userDashBoardNav";

const TopSectionPage = ({ pageDetails }) => {
  const [navToggle, setNavToggle] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userDataString = sessionStorage.getItem("user");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    setUserData(userData);
  }, []);
  return (
    <div className="border-b border-swGray200 bg-white flex items-center justify-between p-4 text-xl text-gray-500 font-body-lg-semi-bold lg:flex-wrap">
      <div className="pl-2 flex gap-5 items-center">
        <div
          className="p-2 rounded-full hover:bg-swGray50 cursor-pointer xl:hidden"
          onClick={() => setNavToggle(!navToggle)}
        >
          <SWToggleIcon />
        </div>
        <div
          className={`fixed top-0 max-h-[100vh] h-full transition-x duration-500 ease-in-out z-20 ${
            navToggle ? "left-0" : "-left-96"
          } `}
        >
          <UserDashBoardNav
            // pageState={pageState}
            // setPageState={setPageState}
            setNavToggle={setNavToggle}
          />
        </div>
        <div className="text-black">
          <p className="text-[18px] md:text-[30px] font-medium">
            {pageDetails?.title}
          </p>
          <p className="text-[14px] md:text-base text-swGray600">
            {pageDetails?.description}
          </p>
        </div>
      </div>

      {/* <div className="hidden md:flex justify-center gap-3 bg-swGray50 max-w-md w-full p-2 rounded-md">
        <SWStarIcon className="text-2xl" />
        <p>Become a member</p>
      </div> */}

      {/* <div className="flex flex-col items-center justify-center"> */}
      <div className="flex flex-row items-center justify-center gap-8">
        {/* <div className="h-8 w-12 flex flex-row items-center justify-center py-2 px-3 box-border">
            <SWNotificationIcon />
          </div>
          <div className="h-8 w-12 flex flex-row items-center justify-center py-2 px-3 box-border">
            <SwUserIcon />
          </div> */}
      </div>
      {/* </div> */}
    </div>
  );
};

export default TopSectionPage;
