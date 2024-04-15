"use client";
import React from "react";
import { SWLeftArrowIcon, SwKeyIcon, SwMailIcon, SwOpenEyeIcon,SWSuccessful } from "../svgs"
import Button from "../Button"
import InputField from "./InputField";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CustomSelect from "./CustomSelete";
import { TbEyeClosed } from "react-icons/tb";
import UserProfileModal from "./UserProfileModal";


const AccountDetailsUpdateCard = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const handleEditClick = () => {
        router.back('/user-profile-page');
       };

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



    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const registerHandle = () => {
        // // Reset errors
        // setEmailError("");
        // setPasswordError("");
        // setReenterPasswordError("");

        // // Validate email
        // if (!formData.email) {
        //   setEmailError("Email is required");
        // } else if (!isValidEmail(formData.email)) {
        //   setEmailError("Invalid email format");
        // }

        // // Validate password
        // if (!formData.password) {
        //   setPasswordError("Password is required");
        // } else if (!isValidPassword(formData.password)) {
        //   setPasswordError(
        //     "Password must have at least 8 characters, one uppercase letter, one lowercase letter, and one digit"
        //   );
        // }

        // // Validate re-entered password
        // if (!reenterPassword) {
        //   setReenterPasswordError("Please re-enter your password");
        // } else if (formData.password !== reenterPassword) {
        //   setReenterPasswordError("Passwords do not match");
        // }

        // If no errors, dispatch the signUpUser action
        // if (!emailError && !passwordError && !reenterPasswordError && formData.first_name && formData.last_name) {
        dispatch(signUpUser(formData));
        // }
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
            router.push("/");
            // alert(data?.message);
        }
        // console.log(data);
        if (error) toast.error(error);
    }, [data, error]);

  

    return (
        <div className="w-full relative rounded-xl bg-white overflow-hidden flex flex-col items-center justify-center pt-3 px-6 pb-3 box-border gap-8 text-left text-xl  text-gray-800 font-header-sm-semi-bold">
            <div className="self-stretch flex flex-row items-center justify-between">
            <div onClick={handleEditClick} className="flex items-center gap-8  relative leading-6 font-medium ">
                     <div className="flex items-center gap-1 relative leading-6 font-medium rounded-full border border-swGray200 p-3 cursor-pointer"> <SWLeftArrowIcon  /></div>   
                    <div className="relative leading-8 font-medium">
                        Update Account details
                    </div>
                </div>
                <UserProfileModal
                    title="Account information updated"
                    message="You’ve successfully updated your account information. "
                    openModalLabel= "Save Changes"
                />
            </div>
            <div className="max-w-lg w-full flex flex-col items-center justify-center gap-6 text-grey-grey-900">
                <div className="w-full mt-5">
                    <CustomSelect />
                </div>
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
        </div>
    );
};


export default AccountDetailsUpdateCard;
