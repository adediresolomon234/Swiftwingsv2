"use client";
import React from "react";
import {
  SWLeftArrowIcon,
  SwKeyIcon,
  SwMailIcon,
  SwOpenEyeIcon,
} from "../../components/svgs";
import Button from "../../components/Button";
import InputField from "./InputField";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { TbEyeClosed } from "react-icons/tb";
import UserProfileModal from "./UserProfileModal";
import { useRouter } from "next/navigation";

const PasswordUpdateCard = ({ setPageState }) => {
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [reenterPasswordError, setReenterPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showReenterPassword, setShowReenterPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
  });

  const { loading, error, data } = useSelector((state) => state.auth);
  // console.log(error);
  console.log({ data });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleReenterPasswordVisibility = () => {
    setShowReenterPassword(!showReenterPassword);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const registerHandle = () => {
    // Reset errors
    setEmailError("");
    setPasswordError("");
    setReenterPasswordError("");

    // Validate email
    if (!formData.email) {
      setEmailError("Email is required");
    } else if (!isValidEmail(formData.email)) {
      setEmailError("Invalid email format");
    }

    // Validate password
    if (!formData.password) {
      setPasswordError("Password is required");
    } else if (!isValidPassword(formData.password)) {
      setPasswordError(
        "Password must have at least 8 characters, one uppercase letter, one lowercase letter, and one digit"
      );
    }

    // Validate re-entered password
    if (!reenterPassword) {
      setReenterPasswordError("Please re-enter your password");
    } else if (formData.password !== reenterPassword) {
      setReenterPasswordError("Passwords do not match");
    }

    // If no errors, dispatch the signUpUser action
    if (!emailError && !passwordError && !reenterPasswordError) {
      dispatch(signUpUser(formData));
      setIsSubmitted(true);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  useEffect(() => {
    if (data && !data?.message) {
      // router.push("/");
      toast.success(data);
      // alert(data?.message);
    }
    if (data && data?.message) {
      // router.push("/");
      toast.success(data?.message);
      // alert(data?.message);
    }
    // console.log(data);
    if (error) toast.error(error);
  }, [data, error]);

  useEffect(() => {
    if (isSubmitted) {
      // If the form has been submitted
      setFormData({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        password: "",
      });
      setIsSubmitted(false); // Reset isSubmitted to false
    }
  }, [isSubmitted]);

  const router = useRouter();
  const handleEditClick = () => {
    router.back("/profile-page");
  };
  return (
    <div className="w-full relative rounded-xl bg-white overflow-hidden flex flex-col items-center justify-center pt-3 px-6 pb-3 box-border gap-8 text-left text-xl  text-gray-800 font-header-sm-semi-bold">
      <div className="self-stretch flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-start gap-8 text-xl text-gray-600">
          <div
            onClick={setPageState("profile")}
            className="flex items-center gap-1 relative leading-6 font-medium rounded-full border border-swGray200 p-3 cursor-pointer"
          >
            <SWLeftArrowIcon />
          </div>

          <div className="relative leading-8 font-medium">Password Update</div>
        </div>
        <UserProfileModal
          title="Password Updated"
          message="You’ve successfully updated your account password."
          openModalLabel="Save Changes"
        />
      </div>
      <div className="max-w-lg w-full">
        <div className="w-full mt-5">
          <InputField
            label={"Enter existing password"}
            name={"password"}
            placeholder={"Enter password"}
            startIcon={<SwKeyIcon className="text-xl" />}
            endIcon={
              showPassword ? (
                <SwOpenEyeIcon
                  className="text-xl"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <TbEyeClosed
                  className="text-xl"
                  onClick={togglePasswordVisibility}
                />
              )
            }
            inputType={showPassword ? "text" : "password"}
            onChange={handleInputChange}
            className={passwordError ? "error" : ""}
          />
          {passwordError && <p className="text-red-500">{passwordError}</p>}
        </div>
        <div className="w-full mt-5">
          <InputField
            label={"Enter New password"}
            name={"password"}
            placeholder={"Enter password"}
            startIcon={<SwKeyIcon className="text-xl" />}
            endIcon={
              showPassword ? (
                <SwOpenEyeIcon
                  className="text-xl"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <TbEyeClosed
                  className="text-xl"
                  onClick={togglePasswordVisibility}
                />
              )
            }
            inputType={showPassword ? "text" : "password"}
            onChange={handleInputChange}
            className={passwordError ? "error" : ""}
          />
          {passwordError && <p className="text-red-500">{passwordError}</p>}
        </div>
        <div className="w-full mt-5">
          <InputField
            label={"Re-enter password"}
            placeholder={"Re-enter password"}
            startIcon={<SwKeyIcon className="text-xl" />}
            endIcon={
              showReenterPassword ? (
                <SwOpenEyeIcon
                  className="text-xl"
                  onClick={toggleReenterPasswordVisibility}
                />
              ) : (
                <TbEyeClosed
                  className="text-xl"
                  onClick={toggleReenterPasswordVisibility}
                />
              )
            }
            inputType={showReenterPassword ? "text" : "password"}
            onChange={(e) => setReenterPassword(e.target.value)}
            className={reenterPasswordError ? "error" : ""}
          />
          {reenterPasswordError && (
            <p className="text-red-500">{reenterPasswordError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordUpdateCard;
