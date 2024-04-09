"use client";
import React from "react";
import InputField from "../InputField";
import Image from "next/image";
import { SWStarIcon,SwUserIcon } from "../../svgs"

const TopSectionPage = () => {
  return (
    <div className="self-stretch rounded-boundvariablesdata9 bg-white flex flex-row items-start justify-between py-[1.125rem] pr-[1.938rem] pl-[2.313rem] box-border max-w-full gap-[1.25rem] text-left text-[1.25rem] text-gray-500 font-body-lg-semi-bold lg:flex-wrap">
      <div className="flex flex-col items-start justify-start pt-[0.438rem] pb-[0rem] pr-[0.438rem] pl-[0rem]">
        <div className="relative leading-[1.875rem] font-semibold mq450:text-[1rem] mq450:leading-[1.5rem]">
          Good Afternoon, Jane
        </div>
      </div>
      {/* <InputField
        name={"email"}
        placeholder={"Become a Member"}
        startIcon={<SWStarIcon className="text-2xl" />}
        className="w-full rounded-lg"
      /> */}
      <div className="flex flex-col items-start justify-start pt-[0.125rem] px-[0rem] pb-[0rem]">
        <div className="flex flex-row items-start justify-start gap-[0.875rem]">
          <div className="h-[2.5rem] w-[2.5rem] rounded-boundvariablesdata8 flex flex-row items-center justify-center py-boundvariablesdata7 px-[0.688rem] box-border">
            <Image
              className="h-[1.125rem] w-[1.125rem] relative object-cover"
              loading="lazy"
              alt=""
              width={24}
              height={24}
            // src="/interface-essentialbellblack@2x.png"
            />
          </div>
          <div className="h-[2.5rem] w-[2.5rem] rounded-boundvariablesdata8 flex flex-row items-center justify-center py-boundvariablesdata7 px-[0.688rem] box-border">
            <SwUserIcon/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSectionPage;
