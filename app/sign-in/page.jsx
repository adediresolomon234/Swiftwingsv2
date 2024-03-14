"use client";
import { Space_Grotesk } from "next/font/google";
import { useState } from "react";
import Button from "../components/Button";
import { signInUser } from "../../redux/slices/authSlice";
import InputField from "../components/shared/InputField";
import { useDispatch } from "react-redux";
import { TbEyeClosed } from "react-icons/tb";
import {
  SwGoogleColoredIcon,
  SwKeyIcon,
  SwMailIcon,
  SwOpenEyeIcon,
  SwPlusIcon,
} from "../components/svgs";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required");
      return;
    } else if (!isValidEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    dispatch(signInUser({ email, password }));
  };

  return (
    <main className="flex justify-center items-center min-h-[100vh] m-5">
      <div className="max-w-sm w-full p-2">
        <p className="text-center text-2xl font-medium">Sign In</p>
        <p className="text-center mt-5 mb-8 text-[0.95rem]">
          Sign in to Swiftwings to manage your bookings
        </p>

        <div className="w-full">
          <InputField
            label={"Email"}
            placeholder={"Enter email address"}
            startIcon={<SwMailIcon className="text-xl" />}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            className={emailError ? "error" : ""}
          />
          {emailError && <p className="text-red-500">{emailError}</p>}
        </div>
        <div className="w-full mt-5 relative">
          <div className="relative">
            <SwKeyIcon className="text-xl absolute top-14 left-3 transform -translate-y-1/2" />
            <InputField
              label={"Password"}
              inputType={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => isValidPassword(password)}
              css={`w-full h-14 rounded-lg pl-12 border border-gray-300 ${passwordError ? 'error' : ''}`}
              endIcon={
                <div className="absolute inset-y-0 right-0 text-xl pr-3 pt-5 pb-5 flex items-center">
                  {showPassword ? (
                    <SwOpenEyeIcon onClick={togglePasswordVisibility} />
                  ) : (
                    <TbEyeClosed onClick={togglePasswordVisibility} />
                  )}
                </div>
              }
            />
          </div>
          {passwordError && (
            <p className="text-red-500 mt-2 pb-2">{passwordError}</p>
          )}
        </div>

        <p className="ml-auto italic mt-2 text-sm text-swGray800 cursor-pointer w-fit hover:underline">
          Forgot Password?
        </p>

        <div className="my-7 flex flex-col gap-3">
          <Button
            label={"Sign In"}
            bgColor={"bg-swPrimary500 text-white w-full"}
            onClick={handleLogin}
          />
          <Button
            startIcon={<SwGoogleColoredIcon className="text-xl" />}
            label={"Google sign up"}
            textColor={"font-semibold text-swGray800 border border-swGray100"}
          />
        </div>

        <p className={`${spaceGrotesk.className} font-semibold text-center`}>
          Are you new to Swiftwings?
        </p>
        <div className="w-full mt-4 font-medium">
          <Button
            startIcon={<SwPlusIcon className="text-xl" />}
            label={"Create a new account"}
            textColor={
              "font-semibold text-swGray800 border border-swGray100 w-full"
            }
          />
        </div>
      </div>
    </main>
  );
};

export default SignIn;