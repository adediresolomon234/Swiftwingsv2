"use client";
import { useEffect, useState } from "react";
import { Space_Grotesk } from "next/font/google";
import "../../styles.css";
import Button from "../components/Button";
import InputField from "../components/shared/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  SwMailIcon
} from "../components/svgs";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../components/shared/NavBar";
import { API_URL } from "@/constant";



const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
  });
  const router = useRouter(); 
  const { loading, error, data } = useSelector((state) => state.auth);


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };
  

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sendVerificationCode = async (email) => {
    try {

      const response = await fetch(`${API_URL}/user/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleForgotPassword = async () => {
    if (isValidEmail(formData.email)) {
      try {
        await sendVerificationCode(formData.email);
        router.push("/forgetpasswordverify");
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      setEmailError("Please enter a valid email address");
    }
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

  return (
    <>
      <main className="flex justify-center min-h-screen pt-20">
        <NavBar Nav={false} />
        <ToastContainer />
        <div className="max-w-lg w-full p-2 mt-20">
          <p className="text-center text-2xl font-medium">
            Forgot your password
          </p>
          <p className="text-center mt-2 mb-8 text-[0.95rem]">
            Let’s help you reset your password. Provide your email address,
            We’ll send a reset link.
          </p>

          <div className="w-full">
            <InputField
              label={"Email"}
              name={"email"}
              placeholder={"Enter email address"}
              startIcon={<SwMailIcon className="text-xl" />}
              // value={email}
              onChange={handleInputChange}
              className={emailError ? "error" : ""}
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>

          <div className="my-7 flex justify-center">
            <Button
              label={`${loading === "pending" ? "Sending" : "Send mail"}`}
              bgColor={"bg-swPrimary500 text-white"}
              onClick={handleForgotPassword}
              loader={loading === "pending" ? true : false}
              disabled={loading === "pending" ? true : false}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default ForgotPassword;
