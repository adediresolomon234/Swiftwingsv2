"use client";
import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import NavBar from "../components/shared/NavBar";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";

const VerifyPage = () => {
  const [verifyCode, setVerifyCode] = useState(Array(5).fill(""));
  const [inputIndex, setInputIndex] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const inputRefs = useRef(Array(5).fill(null));
  const router = useRouter();
  const mockCode = ["1", "2", "3", "4", "5"];

  useEffect(() => {
    if (inputRefs.current[inputIndex]) {
      inputRefs.current[inputIndex].focus();
    }
  }, [inputIndex]);

  useEffect(() => {
    setLoader(false);
  }, []);

  const handleVerify = () => {
    setLoading(true);
    if (verifyCode.includes("")) {
      setShowWarning(true);
      setLoading(false);
    } else if (!verifyCode.every((num, index) => num === mockCode[index])) {
      alert("The verification code is incorrect. Please try again.");
      setLoading(false);
    } else {
      setShowWarning(false);
      router.push("/");
      setLoading(false);
    }
  };

  const handleInputChange = (index, value) => {
    const updatedCode = [...verifyCode];
    updatedCode[index] = value;
    setVerifyCode(updatedCode);

    if (value && index < 4) {
      setInputIndex(index + 1);
    } else if (!value && index > 0) {
      setInputIndex(index - 1);
    }
  };

  if (loader) {
    return <Loading />;
  }

  return (
    <main className="flex justify-center items-center min-h-screen bg-swSecondary50">
      <NavBar Nav={false} />
      <div className="max-w-sm w-full p-4">
        <p className="text-center text-2xl font-semibold text-swGray800">
          Check your Email
        </p>
        <p className="text-center mt-5 mb-8 text-sm">
          Enter the 5 digit code sent to ...ehy@gmail.com to verify your account
          <span className="text-swPrimary500 ml-2 font-bold cursor-pointer">Change</span>
        </p>
        <div className="flex gap-3 justify-center">
          {verifyCode.map((digit, index) => (
            <div key={index} className="border border-swGray300 rounded-lg h-16 w-16 p-2">
              <input
                type="text"
                maxLength={1}
                ref={(el) => (inputRefs.current[index] = el)}
                value={digit}
                placeholder="0"
                className="w-full h-full text-5xl text-center focus:outline-none"
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
        {showWarning && (
          <p className="text-center text-red-500 mb-8 mt-6">
            Please enter the complete verification code.
          </p>
        )}
        <div className="my-7 flex flex-col gap-3">
          <Button
            label={loading ? "Verifying..." : "Verify"}
            bgColor="bg-swPrimary500 text-white w-full"
            onClick={handleVerify}
            disabled={loading}
          />
        </div>
        <div className="p-2 text-center text-sm">
          <p>If you did not receive the email within the next 5 minutes, use the button below to resend verification email.</p>
          <a href="#" className="text-swPrimary600 font-bold mt-5">
            Resend Verification Email
          </a>
        </div>
      </div>
    </main>
  );
};

export default VerifyPage;
