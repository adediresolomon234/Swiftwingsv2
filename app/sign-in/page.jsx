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
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
      setPasswordVisibility(!passwordVisibility);
  };

  const dispatch = useDispatch();
  const handleLogin =() =>{
    console.table(email,password)
    dispatch(signInUser({email,password}))
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
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="w-full mt-5">
          <InputField
            label={"Password"}
            placeholder={"Enter password"}
            startIcon={<SwKeyIcon className="text-xl" />}
            endIcon={showPassword ? <SwOpenEyeIcon className="text-xl" onClick={togglePasswordVisibility} /> : <TbEyeClosed className="text-xl" onClick={togglePasswordVisibility} />} // Toggle eye icon based on password visibility
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
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
