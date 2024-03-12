"use client";
<<<<<<< HEAD
import { useState } from "react";
=======
>>>>>>> 3658524c4cfa1202aec4528dd92cbc2ccd663f04
import { Space_Grotesk } from "next/font/google";
import "../../styles.css"
import Button from "../components/Button";
import InputField from "../components/shared/InputField";
import { useDispatch } from "react-redux";
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

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});


const SignUp = () => {
<<<<<<< HEAD
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [reenterPassword, setReenterPassword] = useState('');
    const [reenterPasswordError, setReenterPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [showReenterPassword, setShowReenterPassword] = useState(false);
  
    const dispatch = useDispatch();
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    const toggleReenterPasswordVisibility = () => {
      setShowReenterPassword(!showReenterPassword);
    };
  
    const registerHandle = () => {
      // Reset errors
      setEmailError('');
      setPasswordError('');
      setReenterPasswordError('');
  
      // Validate email
      if (!email) {
        setEmailError('Email is required');
      } else if (!isValidEmail(email)) {
        setEmailError('Invalid email format');
      }
  
      // Validate password
      if (!password) {
        setPasswordError('Password is required');
      } else if (!isValidPassword(password)) {
        setPasswordError('Password must have at least 8 characters, one uppercase letter, one lowercase letter, and one digit');
      }
  
      // Validate re-entered password
      if (!reenterPassword) {
        setReenterPasswordError('Please re-enter your password');
      } else if (password !== reenterPassword) {
        setReenterPasswordError('Passwords do not match');
      }
  
      // If no errors, dispatch the signUpUser action
      if (!emailError && !passwordError && !reenterPasswordError) {
        dispatch(signUpUser({ email, password }));
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

    return (
        <main className="flex justify-center items-center min-h-screen">
            <div className="max-w-sm w-full p-2 mt-20">
                <p className="text-center text-2xl font-medium">Create a new account</p>
                <p className="text-center mt-2 mb-8 text-[0.95rem]">
                    Join Swiftwings, book a jet, Enjoy premium membership offers and privileges
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
                <div className="w-full mt-5">
                    <InputField
                        label={"Password"}
                        placeholder={"Enter password"}
                        startIcon={<SwKeyIcon className="text-xl" />}
                        endIcon={showPassword ? <SwOpenEyeIcon className="text-xl" onClick={togglePasswordVisibility} /> : <TbEyeClosed className="text-xl" onClick={togglePasswordVisibility} />}
                        type={showPassword ? "text" : "password"}
                        value={showPassword ? password : "********"}
                        onChange={(e) => setPassword(e.target.value)}
                        className={passwordError ? "error" : ""}
                    />
                    {passwordError && <p className="text-red-500">{passwordError}</p>}
                </div>
                <div className="w-full mt-5">
                    <InputField
                        label={"Re-enter password"}
                        placeholder={"Re-enter password"}
                        startIcon={<SwKeyIcon className="text-xl" />}
                        endIcon={showReenterPassword ? <TbEyeClosed className="text-xl" onClick={toggleReenterPasswordVisibility} /> : <SwOpenEyeIcon className="text-xl" onClick={toggleReenterPasswordVisibility} />}
                        type={showReenterPassword? "text" : "password"}
                        value={showReenterPassword ? "********" : reenterPassword}
                        onChange={(e) => setReenterPassword(e.target.value)}
                        className={reenterPasswordError ? "error" : ""}
                    />
                    {reenterPasswordError && <p className="text-red-500">{reenterPasswordError}</p>}
                </div>
                <div className="my-7 flex flex-col gap-3">
                    <Button
                        label={"Sign Up"}
                        bgColor={"bg-swPrimary500 text-white w-full"}
                        onClick={registerHandle}
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
                        textColor={"font-semibold text-swGray800 border border-swGray100 w-full"}
                    />
                </div>
            </div>
        </main>
    );
=======
  const router = useRouter();
  return (
    <main className="flex justify-center items-center min-h-[100vh]">
      <div className="max-w-sm w-full p-2 mt-20">
        <p className="text-center text-2xl font-medium">Create a new account</p>
        <p className="text-center mt-5 mb-8 text-[0.95rem]">
          Join Swiftwings, book a jet, Enjoy premium membership offers and
          privileges
        </p>

        <div className="w-full">
          <InputField
            label={"Email"}
            placeholder={"Enter email address"}
            startIcon={<SwMailIcon className="text-xl" />}
          />
        </div>
        <div className="w-full mt-5">
          <InputField
            label={"Password"}
            placeholder={"Enter password"}
            startIcon={<SwKeyIcon className="text-xl" />}
            endIcon={<SwOpenEyeIcon className="text-xl" />}
          />
        </div>
        <div className="w-full mt-5">
          <InputField
            label={"Re-enter password"}
            placeholder={"Re-enter password"}
            startIcon={<SwKeyIcon className="text-xl" />}
            endIcon={<SwOpenEyeIcon className="text-xl" />}
          />
        </div>
        <div className="my-7 flex flex-col gap-3">
          <Button
            label={"Sign Up"}
            bgColor={"bg-swPrimary500 text-white w-full"}
            onClick={() => router.push("/verify")}
          />
        </div>
        <div class="my-4 mt-2 flex items-center before:mt-0.1 before:flex-1 before:border-t before:border-neutral-200 after:mt-0.1 after:flex-1 after:border-t after:border-neutral-200">
          <p class="mx-4 mb-0 text-center font-medium text-swGray700">Or</p>
        </div>
        <div className="my-7 flex flex-col gap-3">
          <Button
            startIcon={<SwGoogleColoredIcon className="text-xl" />}
            label={"Google sign in"}
            textColor={"font-semibold text-swGray800 border border-swGray100"}
          />
        </div>
        <p className="text-swGray800 text-center">Already have an account ?</p>
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
  );
>>>>>>> 3658524c4cfa1202aec4528dd92cbc2ccd663f04
};

export default SignUp;

