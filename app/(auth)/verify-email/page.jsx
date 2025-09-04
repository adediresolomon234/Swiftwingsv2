"use client";
import { useEffect, useState, Suspense } from "react";
import { Space_Grotesk, Libre_Baskerville } from "next/font/google";
import "../../../styles.css";
import Button from "../../components/Button";
import InputField from "../../components/shared/InputField";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail, resendVerification } from "../../../redux/slices/authSlice";
import { SwMailIcon, SwKeyIcon } from "../../components/svgs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "../../components/Loading";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const libre_baskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const VerifyEmailContent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(true);
  const [resendLoading, setResendLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const { loading, error, data } = useSelector((state) => state.auth);

  useEffect(() => {
    // Get email from URL params or localStorage
    const emailFromParams = searchParams.get("email");
    const emailFromStorage = localStorage.getItem("signupEmail");
    
    if (emailFromParams) {
      setEmail(emailFromParams);
    } else if (emailFromStorage) {
      setEmail(emailFromStorage);
    } else {
      // Redirect to signup if no email found
      router.push("/sign-up");
      return;
    }
    
    setLoader(false);
  }, [searchParams, router]);

  const handleOtpChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and limit to 6 digits
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
      setOtpError("");
    }
  };

  const handleVerifyEmail = () => {
    if (!otp) {
      setOtpError("Please enter the verification code");
      return;
    }

    if (otp.length !== 6) {
      setOtpError("Please enter a valid 6-digit code");
      return;
    }

    setVerifyLoading(true);
    
    dispatch(verifyEmail({ email, otp }))
      .unwrap()
      .then((res) => {
        if (res.success === true) {
          toast.success("Email verified successfully! Redirecting to login...");
          // Clear email from localStorage
          localStorage.removeItem("signupEmail");
          // Redirect to sign-in immediately
          router.push("/sign-in");
        } else {
          toast.error(res.message || "Verification failed");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message || "Verification failed");
      })
      .finally(() => {
        setVerifyLoading(false);
      });
  };

  const handleResendCode = () => {
    setResendLoading(true);
    dispatch(resendVerification({ email }))
      .unwrap()
      .then((res) => {
        if (res.success === true) {
          toast.success("Verification code resent successfully!");
        } else {
          toast.error(res.message || "Failed to resend code");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message || "Failed to resend code");
      })
      .finally(() => {
        setResendLoading(false);
      });
  };

  if (loader) {
    return <Loading />;
  }

  return (
    <main className="flex justify-center items-center z-50 bg-gray-100">
      <ToastContainer />
      <div className="w-full bg-white h-full flex overflow-hidden relative">
        <div className="relative flex justify-center items-center min-h-screen px-5 bg-swSecondary50 pt-3 w-full sm:w-1/2">
          <div className="max-w-md p-4 overflow-x-hidden">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Verify Your Email
              </h1>
              <p className="text-gray-600">
                We&apos;ve sent a 6-digit verification code to{' '}
                <span className="font-semibold text-blue-600">{email}</span>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Next step: Enter the 6-digit verification code we sent to your email address.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-800">
                <strong>Next step:</strong> Enter the 6-digit verification code sent to your email. 
                After verification, you&apos;ll be redirected to the login page to access your account.
              </p>
            </div>

            <div className="w-full mt-5">
              <InputField
                label={"Verification Code"}
                name={"otp"}
                placeholder={"Enter 6-digit code"}
                startIcon={<SwKeyIcon className="text-xl" />}
                value={otp}
                onChange={handleOtpChange}
                className={otpError ? "error" : ""}
                maxLength={6}
              />
              {otpError && <p className="text-red-500 text-sm mt-1">{otpError}</p>}
            </div>

            <div className="my-7 flex flex-col gap-3">
              <Button
                label={verifyLoading ? "Verifying..." : "Verify Email"}
                bgColor={"bg-swPrimary500 hover:bg-swPrimary600 text-white w-full"}
                onClick={handleVerifyEmail}
                loader={verifyLoading}
                disabled={verifyLoading || !otp || otp.length !== 6}
                className="transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              />
            </div>

            <div className="text-center">
              <p className="text-swGray600 text-sm mb-3">
                Didn&apos;t receive the code?
              </p>
              <Button
                label={resendLoading ? "Sending..." : "Resend Code"}
                textColor={"font-semibold text-swPrimary500 border border-swPrimary500 max-w-lg hover:bg-swPrimary50"}
                onClick={handleResendCode}
                disabled={resendLoading || verifyLoading}
                loader={resendLoading}
                className="transition-all duration-200"
              />
            </div>

            <div className="w-full flex justify-center mt-6 font-medium">
              <Button
                label={"Back to Sign In"}
                textColor={"font-semibold text-swGray800 border border-swGray100 max-w-lg hover:bg-gray-50"}
                onClick={() => {
                  router.push("/sign-in");
                }}
                disabled={verifyLoading}
                className="transition-all duration-200"
              />
            </div>
          </div>
        </div>
        
        <div className="hidden sm:block w-1/2 bg-gradient-to-br from-swPrimary500 to-swPrimary600 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">✉️</div>
              <h2 className="text-2xl font-bold mb-2">Email Verification</h2>
              <p className="text-lg opacity-90">
                Please check your email and enter the verification code to complete your registration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const VerifyEmail = () => {
  return (
    <Suspense fallback={<Loading />}>
      <VerifyEmailContent />
    </Suspense>
  );
};

export default VerifyEmail;
