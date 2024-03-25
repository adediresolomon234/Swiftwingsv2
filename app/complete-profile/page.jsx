"use client";
import { useEffect, useState } from "react";
import { Space_Grotesk } from "next/font/google";
import "../../styles.css";
import Button from "../components/Button";
import InputField from "../components/shared/InputField";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../redux/slices/authSlice";
import { TbEyeClosed } from "react-icons/tb";
import {
  SwGoogleColoredIcon,
  SwKeyIcon,
  SwMailIcon,
  SwOpenEyeIcon,
  SwPlusIcon,
} from "../components/svgs";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../components/shared/NavBar";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const CompleteProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [reenterPasswordError, setReenterPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      router.push("/verify");
      // alert(data?.message);
    }
    // console.log(data);
    if (error) toast.error(error);
  }, [data, error]);

  return (
    <main className="flex justify-center items-center min-h-screen mt-10 bg-swSecondary50">
      <NavBar Nav={false} />
      <ToastContainer />
      <div className="max-w-lg w-full p-2 mt-20">
        <p className="text-center text-2xl font-medium">
          Complete your profile
        </p>
        <p className="text-center mt-2 mb-8 text-[0.95rem]">
          Provide sufficient details to complete your booking, It&apos;s a one
          time thing.
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

        <div className="flex gap-5">
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

        <div className="w-full mt-5">
          <InputField
            label={"Password"}
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

        <div></div>

        <div className="my-7 flex justify-center">
          <Button
            label={`${
              loading === "pending"
                ? "Signing up"
                : "Sign up to complete booking"
            }`}
            bgColor={"bg-swPrimary500 text-white"}
            onClick={registerHandle}
            loader={loading === "pending" ? true : false}
            disabled={loading === "pending" ? true : false}
          />
        </div>
      </div>
    </main>
  );
};

export default CompleteProfile;
