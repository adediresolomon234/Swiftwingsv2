import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { SWEditIcon2 } from "../svgs";
import AccountDetailsUpdateCard from "./AccountDetailsUpdate";

const PersonalInfoSection = ({ userData, onEdit }) => {
  const [compState, setCompState] = useState("view");

  return (
    <div className="self-stretch flex flex-col sm:flex-row items-center sm:items-start justify-start gap-6 text-gray-700 p-4 border border-swGray300 rounded-lg mx-5">
      <div className="flex flex-row items-start justify-start">
        <div className="w-[140px] h-[140px] relative rounded-full bg-swGray500 flex justify-center items-center text-white">
          <FiUser size={60} />
        </div>
      </div>
      {compState === "view" && (
        <div className="h-full w-full">
          <div className="text-swGray700 flex-1 flex flex-col items-start justify-start gap-2 p-4">
            <div className="text-2xl font-semibold mx-auto sm:m-0 text-black">
              {userData?.last_name} {userData?.first_name}
            </div>
            <div className="mx-auto sm:m-0">{userData?.email}</div>
            <div className="mx-auto sm:m-0">{userData?.phone_number}</div>
          </div>
          <div className="self-end flex-1 flex justify-end items-end w-full h-full sm:w-auto">
            <button
              onClick={() => setCompState("edit")}
              className="flex items-center justify-center h-[36px] w-[84px] gap-2 rounded-full text-base relative font-medium cursor-pointer border"
            >
              Edit
              <SWEditIcon2 />
            </button>
          </div>
        </div>
      )}
      {compState === "edit" && (
        <AccountDetailsUpdateCard setPageState={setCompState} />
      )}
    </div>
  );
};

export default PersonalInfoSection;
