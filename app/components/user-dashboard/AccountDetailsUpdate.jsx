"use client";
import React from "react";
import {
  SWLeftArrowIcon,
  SwKeyIcon,
  SwMailIcon,
  SwOpenEyeIcon,
  SWSuccessful,
} from "../svgs";
import Button from "../Button";
import InputField from "../shared/InputField";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CustomSelect from "../shared/CustomSelete";
import { TbEyeClosed } from "react-icons/tb";
import UserProfileModal from "../shared/UserProfileModal";
import { FaCheck } from "react-icons/fa";
import SuccessModal from "../shared/modals/SuccessModal";

const AccountDetailsUpdateCard = ({ setPageState }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
  });

  // const { loading, error, data } = useSelector((state) => state.auth);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-full relative rounded-xl bg-white overflow-hidden flex flex-col items-center justify-center pt-3 px-6 pb-3 text-xl  text-gray-800 font-header-sm-semi-bold">
      <div className="self-stretch flex flex-row items-center justify-between">
        <div
          onClick={() => setPageState("profile")}
          className="flex items-center gap-8  relative leading-6 font-medium "
        >
          <div className="flex items-center gap-1 relative leading-6 font-medium rounded-full border border-swGray200 p-3 cursor-pointer">
            <SWLeftArrowIcon />
          </div>
          <div className="relative leading-8 font-medium">
            Update Account details
          </div>
        </div>
        <Button
          label="Save changes"
          endIcon={<FaCheck size={20} />}
          bgColor="bg-swPrimary500 text-white"
        />
      </div>
      <div className="max-w-lg w-full mb-5">
        <div className="w-full mt-5">
          <InputField
            label={"First Name"}
            placeholder={"Enter first name"}
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            // className={emailError ? "error" : ""}
          />
        </div>
        <div className="w-full mt-5">
          <InputField
            label={"Last Name"}
            placeholder={"Enter last name"}
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            // className={emailError ? "error" : ""}
          />
        </div>
        <div className="w-full mt-5">
          <InputField
            label={"Phone"}
            placeholder={"Enter Phone No"}
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            // className={emailError ? "error" : ""}
          />
        </div>
      </div>
      <SuccessModal
        open={success}
        onClose={setSuccess}
        singleBtn={true}
        firstBtnText={"Done"}
        headingText={"Account information updated"}
        text={"You've successfully updated your account information."}
      />
    </div>
  );
};

export default AccountDetailsUpdateCard;
