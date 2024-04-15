import React from "react";
import { SWEditIcon } from "../../components/svgs"
import { useRouter } from "next/navigation";

const UpdatepasswordCard = () => {
  const router = useRouter();
  const handleEditClick = () => {
    router.push('/user-profile-passwordupdate');
  };
  return (
    <div className="w-full relative rounded-lg bg-white overflow-hidden flex flex-col items-start justify-start p-4 lg:p-6 box-border gap-6 text-left text-base text-gray-800 font-body-md-regular">
      <div className="self-stretch flex flex-row items-center justify-between mb-">
        <div className="relative justify-start text-lg lg:text-xl leading-7 lg:leading-9 font-medium text-swGray500">
          Update your password and security information
        </div>
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-white box-border h-10 flex flex-row items-center justify-center py-2 px-3 gap-4 text-swPrimary500 border-[1px] border-solid border-gray-100">
            <div onClick={handleEditClick} className="flex items-center gap-4 relative leading-6 font-medium cursor-pointer">
              Edit
              <SWEditIcon />
            </div>
          </div>
        </div>
      </div>
    </div>



  );
};

export default UpdatepasswordCard;
