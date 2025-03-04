"use client";

import { Space_Grotesk, Libre_Baskerville } from "next/font/google";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { signInUser } from "../../redux/slices/authSlice";
import InputField from "../components/shared/InputField";
import { useDispatch, useSelector } from "react-redux";
import { TbEyeClosed } from "react-icons/tb";
import { isValidEmail } from "../components/helpers/emailValidation";
import bgImg from "../../public/images/nologgedInImg.png";
import {
  SWLogo,
  SwGoogleColoredIcon,
  SwKeyIcon,
  SwMailIcon,
  SwOpenEyeIcon,
  SwPlusIcon,
} from "../components/svgs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NavAndFooter from "../components/shared/NavAndFooter";
import axios from "axios";
import Image from "next/image";
import { API_URL } from "../../constant";
import Loading from "../components/Loading";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const libre_baskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const SignIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  // const { loading, error, data } = useSelector((state) => state.auth);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const resetInputField = () => {
    setEmail("");
    setPassword("");
  };

  const signIn = async () => {
    try {
      const response = await axios.post(`${API_URL}/user/login`, {
        email,
        password,
      });
      setData(response?.data);
      let user = response?.data?.data;
      user = { ...user, isLoggedIn: true };
      localStorage.setItem("user", JSON.stringify(user));
      toast.success(response?.data?.message);
      resetInputField();
      const bookingInComplete = localStorage.getItem("bookingInComplete");
      if (bookingInComplete) {
        router.push("/booking");
      } else {
        router.push("/");
      }
      localStorage.removeItem("bookingInComplete");
    } catch (error) {
      toast.error(error?.response?.data?.error);
      setLoading(false);
    }
  };

  const handleLogin = () => {
    setLoading(true);
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

    // dispatch(signInUser({ email, password }));
    signIn();
  };
  // console.log({ loading });

  // useEffect(() => {
  //   if (data && data?.message) {
  //     let user = data?.data;
  //     user = { ...user, isLoggedIn: true };
  //     localStorage.setItem("user", JSON.stringify(user));
  //     toast.success(data?.message);
  //     resetInputField();
  //     router.push("/");
  //   }
  //   if (error) {
  //     console.log(error);
  //     toast.error(error);
  //   }
  // }, [data, error]);

  useEffect(() => {
    setLoader(false);
  }, []);

  if (loader) {
    return <Loading />;
  }

  return (
    <main className="flex justify-center items-center z-50 bg-gray-100">
      <ToastContainer />
      <div className="w-full bg-white h-full flex overflow-hidden relative">
        <div className="flex justify-center items-center bg-swSecondary50 w-full h-screen sm:w-1/2">
          <div className="max-w-sm w-full p-4">
            <p className="text-center text-2xl font-semibold text-black">
              Sign In
            </p>
            <p className="text-center mt-5 mb-8 text-[0.95rem]">
              Sign in to{" "}
              <span
                className={`${libre_baskerville.className} text-swPrimary500 no-text-shadow font-bold`}
              >
                Swift<i className="font-normal">Wings</i>
              </span>{" "}
              to manage your bookings
            </p>

            <div className="w-ful mt-5">
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
            <div className="w-full mt-5">
              <InputField
                label={"Password"}
                placeholder={"Enter password"}
                startIcon={<SwKeyIcon className="text-xl" />}
                value={password}
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
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <p className="text-red-500">{passwordError}</p>}
            </div>

            <Link
              href={"/forgot-password"}
              className="ml-auto italic mt-2 text-sm text-swGray800 cursor-pointer w-fit hover:underline"
            >
              Forgot Password?
            </Link>

            <div className="my-7 flex flex-col gap-3">
              <Button
                label={`${loading === true ? "Signing In" : "Sign In"}`}
                bgColor={"bg-swPrimary500 text-white w-full"}
                onClick={handleLogin}
                loader={loading === true ? true : false}
                disabled={
                  loading === true || (!email ? true : !password ? true : false)
                    ? true
                    : false
                }
              />
              {/* <Button
                startIcon={<SwGoogleColoredIcon className="text-xl" />}
                label={"Google sign up"}
                textColor={
                  "font-semibold text-swGray800 border border-swGray100"
                }
              /> */}
            </div>

            <p
              className={`${spaceGrotesk.className} font-semibold text-center`}
            >
              Are you new to{" "}
              <span
                className={`${libre_baskerville.className} text-swPrimary500 no-text-shadow font-bold`}
              >
                Swift<i className="font-normal">Wings</i>
              </span>
              ?
            </p>
            <div className="w-full mt-4 font-medium">
              <Button
                startIcon={<SwPlusIcon className="text-xl" />}
                label={"Create a new account"}
                textColor={
                  "font-semibold text-swGray800 border border-swGray100 w-full"
                }
                onClick={() => {
                  router.push("sign-up");
                }}
              />
            </div>
          </div>
        </div>
        <div className="hidden sm:block w-1/2 bg-cover bg-center bg-no-repeat relative">
          <Image
            src={bgImg} // Adjust the path according to where you placed the image
            layout="fill"
            objectFit="cover"
            quality={100}
            alt="Background Image"
          />
          <div className="absolute right-5 -bottom-10 text-white cursor-pointer">
            <SWLogo className="text-[10rem]" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
