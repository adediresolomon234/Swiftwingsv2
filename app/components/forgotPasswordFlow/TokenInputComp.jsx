import { maskEmail } from "../../../utils/utils";
import OtpInput from "react-otp-input";
import { PuffLoader } from "react-spinners";
import Button from "../Button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../../../constant";
import { useRouter } from "next/navigation";

const TokenInput = ({
  userEmail,
  pageState,
  setPageState,
  formData,
  setFormData,
}) => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [requestOtpLoad, setRequestOtpLoad] = useState(false);
  
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
    // alert("hello");
    try {
      const res = await sendVerificationCode(userEmail);

      if (!res?.success) {
        toast.error(res?.error);
        // setRequestOtpLoad(false);
      } else {
        toast?.success("Verification code sent successfully");
        // setRequestOtpLoad(false);
      }
    } catch (error) {
      console.error("Error:", error);
      // setRequestOtpLoad(false);
    }finally{
      setRequestOtpLoad(false);
    }
  };


  useEffect(() => {
    setFormData({ ...formData, token: otp });
  }, [otp]);

  useEffect(() => {
    if (pageState === 0) {
      setOtp(formData.token);
    }
  }, [pageState]);

  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-center text-2xl font-semibold text-swGray800">
        Check your Email
      </p>
      <p className="text-center mt-5 mb-8 text-sm">
        Enter the 5 digit code sent to {maskEmail(userEmail)} to verify your
        account
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
              // disabled={loading}
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
          disabled={otp.length < 6}
        />
      </div>
      <div className="p-2 text-center text-sm">
        <p>
          If you did not receive the email within the next 5 minutes, use the
          button below to resend verification email.
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
  );
};

export default TokenInput;
