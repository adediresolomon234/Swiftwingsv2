"use client";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import NavBar from "../components/shared/NavBar";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";
import { maskEmail } from "../../utils/utils";
import OtpInput from "react-otp-input";
import InputField from "../components/shared/InputField";
import Link from "next/link";
import Image from "next/image";
import SWheader from "../../public/images/SWheader.png";
import { SwKeyIcon, SwOpenEyeIcon } from "../components/svgs";
import { TbEyeClosed } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/slices/authSlice";
import { toast, ToastContainer } from "react-toastify";
import { IoArrowBack } from "react-icons/io5";
import { PuffLoader } from "react-spinners";
import { API_URL } from "../../constant";

const VerifyPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const [requestOtpLoad, setRequestOtpLoad] = useState(false);
  const [pageState, setPageState] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const sendVerificationCode = async (email) => {
    try {
      const response = await fetch(`${API_URL}/user/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleForgotPassword = async () => {
    setRequestOtpLoad(true);
    try {
      const res = await sendVerificationCode(userEmail);

      if (!res?.success) {
        toast.error(res?.error);
      } else {
        toast?.success("Verification code sent successfully");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setRequestOtpLoad(false);
    }
  };

  const handleChangePassword = () => {
    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }
    setLoading(true);
    const message = "Password changed successfully";
    const payload = {
      password,
      token: otp,
    };
    dispatch(resetPassword(payload))
      .unwrap()
      .then((res) => {
        if (res?.message === message) {
          toast.success(res?.message);
          router.push("/sign-in");
        } else {
          toast.error(res);
          setPageState(0);
        }
      })
      .catch((err) => {
        toast.error(err?.message);
        setPageState(0);
      })
      .finally(() => setLoading(false));
  };

  const viewPassword = showPassword ? (
    <SwOpenEyeIcon className="text-xl" onClick={togglePasswordVisibility} />
  ) : (
    <TbEyeClosed className="text-xl" onClick={togglePasswordVisibility} />
  );
  useEffect(() => {
    if (window !== "undefined") {
      const email = localStorage.getItem("4gtPwdEmail") ?? "";
      setUserEmail(email);
      setLoader(false);
    }
  }, []);

  if (loader) {
    return <Loading />;
  }

  return (
    <>
      <ToastContainer />
      <main className="flex justify-center items-center min-h-screen bg-swSecondary50">
        <NavBar Nav={false} />
        <div className="max-w-sm w-full p-4 flex flex-col items-center">
          <div className="w-full">
            {pageState === 1 && (
              <IoArrowBack
                size={25}
                className="text-swPrimary500 mb-3"
                onClick={() => setPageState(0)}
              />
            )}
            <div className="w-full flex justify-center items-center">
              <Link href={"/"} className="mb-5">
                <Image src={SWheader} alt="Logo" className="w-60 " />
              </Link>
            </div>
          </div>
          {pageState === 0 && (
            <div className="w-full flex flex-col items-center">
              <p className="text-center text-2xl font-semibold text-swGray800">
                Check your Email
              </p>
              <p className="text-center mt-5 mb-8 text-sm">
                Enter the 5 digit code sent to {maskEmail(userEmail)} to verify
                your account
                <span
                  onClick={() => router.back()}
                  className="text-swPrimary500 ml-2 font-bold cursor-pointer"
                >
                  Change
                </span>
              </p>
              <div className="flex items-center">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  inputStyle="focus:outline-none text-3xl md:text-5xl h-16 w-16 rounded-lg p-2 bg-white"
                  numInputs={6}
                  renderSeparator={<span>&nbsp;&nbsp;</span>}
                  renderInput={(props) => (
                    <input
                      {...props}
                      disabled={loading}
                      className="focus:outline-none border focus:border-cwPrimaryGreen text-center text-3xl md:text-5xl rounded-lg p-2 bg-white h-[47px] min-w-[47px] sm:h-[64px] sm:min-w-[64px]"
                    />
                  )}
                />
              </div>
              <div className="my-7 flex flex-col gap-3 w-full">
                <Button
                  label={"Next"}
                  bgColor="bg-swPrimary500 text-white w-full"
                  onClick={() => setPageState(1)}
                  disabled={loading || otp.length < 6}
                />
              </div>
              <div className="p-2 text-center text-sm">
                <p>
                  If you did not receive the email within the next 5 minutes,
                  use the button below to resend verification email.
                </p>
                {requestOtpLoad ? (
                  <PuffLoader size={4} color="#5c0632" className="mx-auto mt-2" />
                ) : (
                  <button
                    onClick={handleForgotPassword}
                    className="text-swPrimary600 font-bold mt-1"
                  >
                    Resend Verification Email
                  </button>
                )}
              </div>
            </div>
          )}

          {pageState === 1 && (
            <div className="w-full flex flex-col items-center">
              <p className="text-center text-2xl font-semibold text-swGray800">
                Change Password
              </p>
              <div className="w-full flex flex-col gap-3 mt-5">
                <div className="w-full mt-5">
                  <InputField
                    label={"Password"}
                    placeholder={"Enter password"}
                    startIcon={<SwKeyIcon className="text-xl" />}
                    value={password}
                    endIcon={viewPassword}
                    inputType={showPassword ? "text" : "password"}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError("");
                    }}
                  />
                  {passwordError && (
                    <p className="text-sm text-red-500">{passwordError}</p>
                  )}
                </div>
                <div className="w-full">
                  <InputField
                    label={"Confirm Password"}
                    placeholder={"Enter password"}
                    startIcon={<SwKeyIcon className="text-xl" />}
                    value={confirmPassword}
                    endIcon={viewPassword}
                    inputType={showPassword ? "text" : "password"}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setConfirmPasswordError("");
                    }}
                  />
                  {confirmPasswordError && (
                    <p className="text-sm text-red-500">
                      {confirmPasswordError}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-10 mb-7 flex flex-col gap-3 w-full">
                <Button
                  label={loading ? "Updating..." : "Change Password"}
                  bgColor="bg-swPrimary500 text-white w-full"
                  onClick={handleChangePassword}
                  disabled={loading}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default VerifyPage;
