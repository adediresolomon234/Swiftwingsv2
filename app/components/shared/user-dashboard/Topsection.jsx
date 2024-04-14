"use client";
import React from "react";
import InputField from "../InputField";
import Image from "next/image";
import { SWStarIcon, SwUserIcon,SWNotificationIcon } from "../../svgs"

const TopSectionPage = () => {
  return (
    <div className="self-stretch rounded-xl bg-white flex flex-row items-center justify-between pt-6 pb-4 py-2 pr-4 pl-3 box-border max-w-full gap-8 text-left text-xl text-gray-500 font-body-lg-semi-bold lg:flex-wrap">
    <div className="flex flex-col items-center justify-center pb-4 pr-4 pl-2">
      <div className="relative leading-0 font-semibold mq450:text-xl mq450:leading-2">
        Good Afternoon, Jane
      </div>
    </div>
    <div className="flex flex-col items-center  justify-center max-w-full rounded-lg" style={{ width: '973px', height: '44px', padding: '0px 124px 0px 144px', gap: '8px', borderRadius: 'var(--8)', opacity: '0px' }}>
      <InputField
        name="email"
        placeholder="Become a Member"
        startIcon={<SWStarIcon className="text-2xl" />}
      />
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
