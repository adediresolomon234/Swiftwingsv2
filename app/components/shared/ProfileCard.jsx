import React from "react";
import {SWEditIcon} from "../../components/svgs"
import { useRouter } from "next/navigation";

const ProfileCard = () => {
  const router = useRouter(); 

 
  const handleEditClick = () => {
    
    router.push('/AccountDetails');
  };
  return (
    <div className="w-full relative rounded-lg bg-white overflow-hidden flex flex-col items-start justify-start p-4 lg:p-6 box-border gap-6 text-left text-base text-gray-800 font-body-md-regular">
      <div className="self-stretch flex flex-row items-center justify-between mb-">
        <div className="relative justify-start text-lg lg:text-xl leading-7 lg:leading-9 font-medium text-swGray500">
          Here’s your shiny new profile
        </div>
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-white box-border h-10 flex flex-row items-center justify-center py-2 px-3 gap-4 text-swPrimary500 border-[1px] border-solid border-gray-100">
          <div onClick={handleEditClick} className="flex items-center gap-4 relative leading-6 font-medium cursor-pointer">
           Edit
        <SWEditIcon/>
      </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col lg:flex-row items-start justify-start gap-6 text-gray-700 p-4 ">
        <div className="flex flex-row items-start justify-start">
          <div className="w-24 h-24 lg:w-36 lg:h-36 relative rounded-full bg-swGray500" />
        </div>
        <div className="flex-1 flex flex-col items-start justify-start gap-2 p-4">
          <div className="self-stretch relative text-xl lg:text-2xl tracking-tight leading-8 lg:leading-10 font-semibold flex items-end">
            Dr. James April
          </div>
          <div className="self-stretch relative leading-6">
            jamesapril@gmail.com
          </div>
          <div className="self-stretch relative leading-6">
            +234 902 583 ****
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
