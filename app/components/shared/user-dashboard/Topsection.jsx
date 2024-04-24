"use client";
import React from "react";
import InputField from "../InputField";
import { SWStarIcon, SwUserIcon, SWNotificationIcon } from "../../svgs";

const TopSectionPage = () => {
  return (
    <div className="rounded-xl bg-white flex items-center justify-between p-4 text-xl text-gray-500 font-body-lg-semi-bold lg:flex-wrap">
      {/* <div className="flex flex-col items-center justify-center pb-4 pr-4 > */}
      <div className="pl-2 text-lg text-swGray500 font-semibold">
        Good Afternoon, Jane
      </div>
      {/* </div> */}

      <div className="flex justify-center gap-3 bg-swGray50 max-w-md w-full p-2 rounded-md">
        <SWStarIcon className="text-2xl" />
        <p>Become a member</p>
      </div>

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
