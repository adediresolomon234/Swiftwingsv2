"use client";
import { useState,useEffect } from "react";
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
import Link from 'next/link';
import { unwrapResult } from '@reduxjs/toolkit'; 

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');
  const [reenterPasswordError, setReenterPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showReenterPassword, setShowReenterPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(''); 

  const dispatch = useDispatch();
  

  useEffect(() => {
    setEmail('');
    setPassword('');
    setReenterPassword('');
    setEmailError('');
    setPasswordError('');
    setReenterPasswordError('');
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleReenterPasswordVisibility = () => {
    setShowReenterPassword(!showReenterPassword);
  };

  const registerHandle = async () => {
    setEmailError('');
    setPasswordError('');
    setReenterPasswordError('');
    setServerError(''); // reset server error

    if (!email) {
      setEmailError('Email is required');
    } else if (!isValidEmail(email)) {
      setEmailError('Invalid email format');
    }

    if (!password) {
      setPasswordError('Password is required');
    } else if (!isValidPassword(password)) {
      setPasswordError('Password must have at least 8 characters, one uppercase letter, one lowercase letter, and one digit');
    }

    if (!reenterPassword) {
      setReenterPasswordError('Please re-enter your password');
    } else if (password !== reenterPassword) {
      setReenterPasswordError('Passwords do not match');
    }
    if (!emailError && !passwordError && !reenterPasswordError) {
      setLoading(true); 
      try {
        const resultAction = await dispatch(signUpUser({ email, password, reenterPassword }));
        unwrapResult(resultAction);
        return (
          <Link href="/profile"> </Link> );
      } catch (err) {
        setServerError(err.message); 
      } finally {
        setLoading(false); 
      }
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

        <div className="w-full mt-5 relative">
          <div className="relative">
            <SwKeyIcon className="text-xl absolute top-14 left-3 transform -translate-y-1/2" />
            <InputField
              label={"Re-enter password"}
              inputType={showReenterPassword ? 'text' : 'password'}
              placeholder="Re-enter password"
              value={reenterPassword}
              onChange={(e) => setReenterPassword(e.target.value)}
              onBlur={() => isValidPassword(reenterPassword)}
              css={`w-full h-14 rounded-lg pl-12 border border-gray-300 ${reenterPasswordError ? 'error' : ''}`}
              endIcon={
                <div className="absolute inset-y-0 right-0 pr-3 text-xl pt-5 pb-5 flex items-center">
                  {showReenterPassword ? (
                    <SwOpenEyeIcon onClick={toggleReenterPasswordVisibility} />
                  ) : (
                    <TbEyeClosed onClick={toggleReenterPasswordVisibility} />
                  )}
                </div>
              }
            />
          </div>
          {reenterPasswordError && (
            <p className="text-red-500 mt-2 pb-2">{reenterPasswordError}</p>
          )}
        </div>

        <div className="my-7 flex flex-col gap-3">
          <Button
             label={loading ? "Loading..." : "Sign Up"}
            bgColor={"bg-swPrimary500 text-white w-full"}
            onClick={registerHandle}
            disabled={loading}
          />
        </div>
        {serverError && <p className="text-red-500">{serverError}</p>}
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
};

export default SignUp;

