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
import PhoneNumberValidation from "../shared/PhoneNumberValidation";

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

  useEffect(() => {
    const userDataString = localStorage.getItem("user");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    setFormData({
      first_name: userData.first_name,
      last_name: userData.last_name,
      phone_number: userData.phone_number,
    });
    // setUserData(userData);
  }, []);

  return (
    <>
      <div className="w-full pt-3  pb-3 flex flex-col gap-5">
        <div className="max-w-[350px] w-full">
          <div className="w-full">
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
            {/* <InputField
              label={"Phone"}
              placeholder={"Enter Phone No"}
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              // className={emailError ? "error" : ""}
            /> */}
            <PhoneNumberValidation
              label={"Phone"}
              value={formData.phone_number}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, phone_number: val }))
              }
            />
          </div>
        </div>
        <div className="self-end flex-1 flex justify-end gap-2 items-end w-full h-full sm:w-auto">
          <button
            onClick={() => setPageState("view")}
            className="flex items-center justify-center h-[36px] w-[84px] gap-2 rounded-full text-base text-swGray900 border-swGray900 relative border cursor-pointer"
          >
            Cancel
          </button>
          <button
            // onClick={() => setCompState("edit")}
            className="bg-swPrimary500 text-white flex items-center justify-center gap-2 h-[36px] w-[84px] rounded-full text-base border"
          >
            Save
          </button>
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
    </>
    // </div>
  );
};

export default AccountDetailsUpdateCard;
