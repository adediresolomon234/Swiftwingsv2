"use client";

import { useEffect, useState } from "react";
import {
  SWStarIcon,
  SwUserIcon,
  SWNotificationIcon,
  SWToggleIcon,
} from "../svgs";
import UserDashBoardNav from "./userDashBoardNav";

const TopSectionPage = () => {
  const [navToggle, setNavToggle] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userDataString = localStorage.getItem("user");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    setUserData(userData);
  }, []);
  return (
    <div className="rounded-xl bg-white flex items-center justify-between p-4 text-xl text-gray-500 font-body-lg-semi-bold lg:flex-wrap">
      <div className="pl-2 flex gap-5 items-center">
        <div
          className="p-2 rounded-full hover:bg-swGray50 cursor-pointer xl:hidden"
          onClick={() => setNavToggle(!navToggle)}
        >
          <SWToggleIcon />
        </div>
        <div
          className={`fixed top-0 m-5 mt-3 max-h-[90vh] h-full transition-x duration-500 ease-in-out z-20 ${
            navToggle ? "left-0" : "-left-96"
          } `}
        >
          <UserDashBoardNav
            // pageState={pageState}
            // setPageState={setPageState}
            setNavToggle={setNavToggle}
          />
        </div>
        <div className="md:text-xl text-sm text-swGray500 font-semibold">
          Hello {userData?.first_name} 👋
        </div>
      </div>

      {/* <div className="hidden md:flex justify-center gap-3 bg-swGray50 max-w-md w-full p-2 rounded-md">
        <SWStarIcon className="text-2xl" />
        <p>Become a member</p>
      </div> */}

      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-center gap-8">
          <div className="h-8 w-12 flex flex-row items-center justify-center py-2 px-3 box-border">
            <SWNotificationIcon />
          </div>
          <div className="h-8 w-12 flex flex-row items-center justify-center py-2 px-3 box-border">
            <SwUserIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSectionPage;
