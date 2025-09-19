import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { SWEditIcon2 } from "../svgs";
import AccountDetailsUpdateCard from "./AccountDetailsUpdate";

const PersonalInfoSection = ({ userData, onEdit }) => {
  const [compState, setCompState] = useState("view");

  return (
    <div className="p-4 border rounded-lg bg-white shadow">
      <h2 className="text-lg md:text-2xl font-medium mb-5">
        Personal Information
      </h2>
      <div className="self-stretch flex flex-col sm:flex-row items-center sm:items-start justify-start gap-5 text-gray-700">
        {/* <div className="flex flex-row items-start justify-start">
          <div className="w-[140px] h-[140px] relative rounded-full bg-swGray500 flex justify-center items-center text-white">
            <FiUser size={60} />
          </div>
        </div> */}
        {compState === "view" && (
          <div className="h-full w-full">
            <div className="text-swGray700 flex-1 flex flex-col items-start justify-start gap-2">
              <div className="text-lg font-medium  sm:m-0 text-black">
                {userData?.last_name} {userData?.first_name}
              </div>
              <div className=" sm:m-0 text-base">{userData?.email}</div>
              <div className=" sm:m-0 text-base">{userData?.phone_number}</div>
            </div>
            <div className="self-end flex-1 flex justify-end items-end w-full h-full sm:w-auto">
              <button
                onClick={() => setCompState("edit")}
                className="flex items-center justify-center h-[36px] w-[84px] gap-2 rounded-full text-base text-swGray900 border-swGray900 relative border cursor-pointer"
              >
                <p>Edit</p>
                {/* <SWEditIcon2 /> */}
              </button>
              
            </div>
          </div>
        )}
        {compState === "edit" && (
          <AccountDetailsUpdateCard setPageState={setCompState} />
        )}
      </div>
    </div>
  );
};

export default PersonalInfoSection;
