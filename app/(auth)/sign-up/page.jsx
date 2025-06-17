"use client";
import { useEffect, useState } from "react";
import { Space_Grotesk, Libre_Baskerville } from "next/font/google";
import "../../../styles.css";
import Button from "../../components/Button";
import InputField from "../../components/shared/InputField";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../../redux/slices/authSlice";
import { TbEyeClosed } from "react-icons/tb";
import CustomSelect from "../../components/shared/CustomSelete";
import {
  SWLogo,
  SwGoogleColoredIcon,
  SwKeyIcon,
  SwMailIcon,
  SwOpenEyeIcon,
  SwPlusIcon,
} from "../../components/svgs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavAndFooter from "../../components/shared/NavAndFooter";
import { useRouter } from "next/navigation";
import Image from "next/image";
import bgImg from "../../../public/images/nologgedInImg.png";
import { IoClose } from "react-icons/io5";
import Loading from "../../components/Loading";
import PhoneNumberValidation from "../../components/shared/PhoneNumberValidation";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const libre_baskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const SignUp = () => {
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState("");
  const router = useRouter();
  const [passwordError, setPasswordError] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [reenterPasswordError, setReenterPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [popup, setPopup] = useState(false);
  const [showReenterPassword, setShowReenterPassword] = useState(false);
  const [loader, setLoader] = useState(true);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
  });

  const { loading, error, data } = useSelector((state) => state.auth);

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
      dispatch(signUpUser(formData))
        .unwrap()
        .then((res) => {
          if (res.success === true) {
            toast.success(res.message);
            setFormData({
              first_name: "",
              last_name: "",
              phone_number: "",
              email: "",
              password: "",
            });
            setReenterPassword("");
            router.push("/sign-in");
          } else {
            toast.error(res);
          }
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      // setIsSubmitted(true);
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

  // useEffect(() => {
  //   if (data && !data?.message) {
  //     //
  //     toast.success(data);
  //     // alert(data?.message);
  //   }
  //   if (data && data?.message) {
  //     // router.push("/");
  //     toast.success(data?.message);
  //     // alert(data?.message);
  //   }
  //   // console.log(data);
  //   if (error) toast.error(error);
  // }, [data, error]);

  // useEffect(() => {
  //   if (isSubmitted) {
  //     setFormData({
  //       first_name: "",
  //       last_name: "",
  //       phone_number: "",
  //       email: "",
  //       password: "",
  //     });
  //     setIsSubmitted(false);
  //   }
  // }, [isSubmitted]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPopup(true);
    }, 5000);
    return () => clearTimeout(timeoutId); // Cleanup the timeout
  }, []);

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
        <div className="relative flex justify-center items-center min-h-screen px-5 bg-swSecondary50 pt-3 w-full sm:w-1/2">
          <div className="max-w-md p-4  overflow-x-hidden">
            <p className="text-center text-2xl font-semibold text-swGray800">
              Create a new account
            </p>

            <p className="text-center mt-2 mb-8 text-md md:text-lg text-swGRay800">
              Join{" "}
              <span
                className={`${libre_baskerville.className} text-swPrimary500 no-text-shadow font-bold`}
              >
                Swift<i className="font-normal">Wings</i>
              </span>
              , book a jet, Enjoy premium membership offers and privileges
            </p>
            <div className="w-full mt-5">
              <InputField
                label={"Email"}
                name={"email"}
                placeholder={"Enter email address"}
                startIcon={<SwMailIcon className="text-xl" />}
                value={formData.email}
                onChange={handleInputChange}
                className={emailError ? "error" : ""}
              />
              {emailError && <p className="text-red-500">{emailError}</p>}
            </div>
            {/* <div className="w-full mt-5">
            <CustomSelect />
            </div> */}
            <div className="flex flex-col sm:flex-row justify-between mt-5">
              <div className="w-full sm:w-1/2 pr-0 sm:pr-2">
                <InputField
                  label={"First Name"}
                  placeholder={"Enter first name"}
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  // className={emailError ? "error" : ""}
                />
              </div>

              <div className="w-full sm:w-1/2 pl-0 sm:pl-2 mt-5 sm:mt-0">
                <InputField
                  label={"Last Name"}
                  placeholder={"Enter last name"}
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  // className={emailError ? "error" : ""}
                />
              </div>
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
                label={"Enter Phone No"}
                inputValue={formData.phone_number}
                onChange={(val) =>
                  setFormData((prev) => ({ ...prev, phone_number: val }))
                }
              />
            </div>

            <div className="w-full mt-5">
              <InputField
                label={"Password"}
                name={"password"}
                value={formData.password}
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
                value={reenterPassword}
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
            <div className="my-7 flex flex-col gap-3">
              {/* <Button
            label={"Sign Up"}
            bgColor={"bg-swPrimary500 text-white w-full"}
            onClick={registerHandle}
            /> */}
              <Button
                label={`${loading === "pending" ? "Signing Up" : "Sign Up"}`}
                bgColor={"bg-swPrimary500 text-white w-full"}
                onClick={registerHandle}
                loader={loading === "pending" ? true : false}
                disabled={loading === "pending" ? true : false}
              />
            </div>
            {/* <div className="my-4 mt-2 flex items-center before:mt-0.1 before:flex-1 before:border-t before:border-neutral-200 after:mt-0.1 after:flex-1 after:border-t after:border-neutral-200">
              <p className="mx-4 mb-0 text-center font-medium text-swGray700">
                Or
              </p>
            </div>
            <div className="my-7 flex flex-col gap-3">
              <Button
                startIcon={<SwGoogleColoredIcon className="text-xl" />}
                label={"Google sign up"}
                textColor={
                  "font-semibold text-swGray800 border border-swGray100"
                }
              />
            </div> */}
            <p className="text-swGray800 text-center">
              Already have an account?
            </p>
            <div className="w-full flex justify-center mt-4 font-medium">
              <Button
                label={"Login"}
                textColor={
                  "font-semibold text-swGray800 border border-swGray100 max-w-lg"
                }
                onClick={() => {
                  router.push("/sign-in");
                }}
              />
            </div>
          </div>
          {/* {popup && ( */}
          <div
            className={`absolute ${
              popup ? "left-0" : "-left-full"
            } duration-500 top-0  p-5 flex justify-center items-center w-full`}
          >
            <div className="max-w-sm p-3 rounded-xl bg-white border-2 border-swPrimary500 text-center">
              <div className="flex justify-end mb-3">
                <IoClose
                  size={20}
                  className="cursor-pointer text-swPrimary500"
                  onClick={() => setPopup(false)}
                />
              </div>
              Kindly provide us with your correct phone number so we can serve
              you better.
            </div>
          </div>
          {/* )} */}
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

export default SignUp;
