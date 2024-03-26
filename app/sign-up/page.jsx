"use client";
import { useEffect, useState } from "react";
import { Space_Grotesk } from "next/font/google";
import "../../styles.css";
import Button from "../components/Button";
import InputField from "../components/shared/InputField";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../redux/slices/authSlice";
import { TbEyeClosed } from "react-icons/tb";
import CustomSelect from "../components/shared/CustomSelete";
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
import NavAndFooter from "../components/shared/NavAndFooter";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const SignUp = () => {
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

  return (
    <NavAndFooter Nav={false}>
      <main className="flex justify-center items-center min-h-screen bg-swSecondary50 pt-20">
        <ToastContainer />
        <div className="max-w-lg w-full p-2 mt-20">
          <p className="text-center text-2xl font-semibold text-swGray800">
            Create a new account
          </p>
          <p className="text-center mt-2 mb-8 text-lg text-swGRay800">
            Join Swiftwings, book a jet, Enjoy premium membership offers and
            privileges
          </p>
          <div className="w-full mt-5">
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
          {/* <div className="w-full mt-5">
          <CustomSelect />
        </div> */}
          <div className="flex justify-between mt-5">
            <div className="w-1/2 pr-2">
              <InputField
                label={"First Name"}
                placeholder={"Enter first name"}
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                // className={emailError ? "error" : ""}
              />
            </div>

            <div className="w-1/2 pl-2">
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
          <div className="my-4 mt-2 flex items-center before:mt-0.1 before:flex-1 before:border-t before:border-neutral-200 after:mt-0.1 after:flex-1 after:border-t after:border-neutral-200">
            <p className="mx-4 mb-0 text-center font-medium text-swGray700">
              Or
            </p>
          </div>
          <div className="my-7 flex flex-col gap-3">
            <Button
              startIcon={<SwGoogleColoredIcon className="text-xl" />}
              label={"Google sign up"}
              textColor={"font-semibold text-swGray800 border border-swGray100"}
            />
          </div>
          <p className="text-swGray800 text-center">
            Already have an account ?
          </p>
          <div className="w-full mt-4 font-medium">
            <Button
              label={"Login"}
              textColor={
                "font-semibold text-swGray800 border border-swGray100 w-full"
              }
            />
          </div>
        </div>
      </main>
    </NavAndFooter>
  );
};

export default SignUp;
