"use client";
import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import NavBar from "../components/shared/NavBar";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";

const VerifyPage = () => {
  const [inputNum, setInputNum] = useState(1);
  const [verifyCode, setVerifyCode] = useState([0, 0, 0, 0, 0]);
  const [showWarning, setShowWarning] = useState(false);
  const firstInput = useRef(null);
  const secondInput = useRef(null);
  const thirdInput = useRef(null);
  const fourthInput = useRef(null);
  const fifthInput = useRef(null);
  const router = useRouter();
  const mockCode = [1, 2, 3, 4, 5];
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    inputNum === 1
      ? firstInput?.current?.focus()
      : inputNum === 2
      ? secondInput?.current?.focus()
      : inputNum === 3
      ? thirdInput?.current?.focus()
      : inputNum === 4
      ? fourthInput?.current?.focus()
      : fifthInput?.current?.focus();
  }, [inputNum]);

  const handleVerify = () => {
    setLoading(true);
    if (!verifyCode.every((num) => num !== 0)) {
      setShowWarning(true);
      setLoading(false);
    } else if (!verifyCode.every((num, index) => num == mockCode[index])) {
      alert("The verification code is incorrect. Please try again.");
      setLoading(false);
    } else {
      setShowWarning(false);
      router.push("/");
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoader(false);
  }, []);

  if (loader) {
    return <Loading />;
  }

  return (
    <main className="flex justify-center items-center min-h-[100vh] bg-swSecondary50">
      <NavBar Nav={false} />
      <div className="max-w-sm w-full p-2">
        <p className="text-center text-2xl font-semibold text-swGray800">
          Check your Email
        </p>
        <p className="text-center mt-5 mb-8 text-[0.96rem] flex items-center justify-between">
          <span className="text-start">
            Enter the 5 digit code sent to ...ehy@gmail.com to verify your
            account
          </span>
          <span className="text-swPrimary500 ml-3 font-bold">Change</span>
        </p>
        <div className="flex gap-3 justify-center">
          <div className="border border-swGray300 text-swGray300 rounded-lg h-16 w-16 p-2">
            <input
              type="text"
              className="w-full h-full text-5xl text-center focus:outline-none"
              placeholder="0"
              maxLength={1}
              ref={firstInput}
              onChange={(e) => {
                if (e.target.value.length > 0) {
                  console.log();
                  setInputNum(2);
                  setVerifyCode((prevArray) =>
                    prevArray.map((item, index) =>
                      index === 0 ? e.target.value : item
                    )
                  );
                } else {
                  setVerifyCode((prevArray) =>
                    prevArray.map((item, index) => (index === 0 ? 0 : item))
                  );
                  setInputNum(1);
                }
              }}
            />
          </div>
          <div className="border border-swGray300 text-swGray300 rounded-lg h-16 w-16 p-2">
            <input
              type="text"
              className="w-full h-full text-5xl text-center focus:outline-none"
              placeholder="0"
              maxLength={1}
              ref={secondInput}
              onChange={(e) => {
                if (e.target.value.length > 0) {
                  setVerifyCode((prevArray) =>
                    prevArray.map((item, index) =>
                      index === 1 ? e.target.value : item
                    )
                  );
                  setInputNum(3);
                } else {
                  setVerifyCode((prevArray) =>
                    prevArray.map((item, index) => (index === 1 ? 0 : item))
                  );
                  setInputNum(1);
                }
              }}
            />
          </div>
          <div className="border border-swGray300 text-swGray300 rounded-lg h-16 w-16 p-2">
            <input
              type="text"
              className="text-5xl text-center h-full w-full focus:outline-none"
              placeholder="0"
              maxLength={1}
              ref={thirdInput}
              onChange={(e) => {
                // e.target.value.length > 0 ? setInputNum(4) : setInputNum(2)
                if (e.target.value.length > 0) {
                  setInputNum(4);
                  setVerifyCode((prevArray) =>
                    prevArray.map((item, index) =>
                      index === 2 ? e.target.value : item
                    )
                  );
                } else {
                  setVerifyCode((prevArray) =>
                    prevArray.map((item, index) => (index === 2 ? 0 : item))
                  );
                  setInputNum(2);
                }
              }}
            />
          </div>
          <div className="border border-swGray300 text-swGray300 rounded-lg h-16 w-16 p-2">
            <input
              type="text"
              className="w-full h-full text-5xl text-center focus:outline-none"
              placeholder="0"
              maxLength={1}
              ref={fourthInput}
              onChange={(e) => {
                if (e.target.value.length > 0) {
                  setInputNum(5);
                  setVerifyCode((prevArray) =>
                    prevArray.map((item, index) =>
                      index === 3 ? e.target.value : item
                    )
                  );
                } else {
                  setVerifyCode((prevArray) =>
                    prevArray.map((item, index) => (index === 3 ? 0 : item))
                  );
                  setInputNum(3);
                }
              }}
            />
          </div>
          <div className="border border-swGray300 text-swGray300 rounded-lg h-16 w-16 p-2">
            <input
              type="text"
              className="w-full h-full text-5xl text-center focus:outline-none"
              placeholder="0"
              maxLength={1}
              ref={fifthInput}
              onChange={(e) => {
                if (e.target.value.length > 0) {
                  setInputNum(5);
                  setVerifyCode((prevArray) =>
                    prevArray.map((item, index) =>
                      index === 4 ? e.target.value : item
                    )
                  );
                } else {
                  setVerifyCode((prevArray) =>
                    prevArray.map((item, index) => (index === 4 ? 0 : item))
                  );
                  setInputNum(4);
                }
              }}
            />
          </div>
        </div>
        <div className="flex gap-3 justify-center"></div>
        {showWarning && (
          <p className="text-center text-red-500 mb-8 mt-6">
            Please enter the complete verification code.
          </p>
        )}
        <div className="my-7 flex flex-col gap-3">
          <Button
            label={loading ? "Verifying..." : "Verify"}
            bgColor={"bg-swPrimary500 text-white w-full"}
            onClick={handleVerify}
            disabled={loading}
          />
        </div>
        <div className="max-w-sm w-full p-2">
          <p className="text-center mt-5 mb-8 text-[0.95rem] flex justify-center items-center">
            If you did not receive the email within the next 5 minutes, use the
            button below to resend verification email.
          </p>
          <a
            href="#"
            className="block text-center text-swPrimary600 font-bold mt-5 mb-8 text-[0.95rem] flex justify-center items-center"
          >
            Resend Verification Email
          </a>
        </div>
      </div>
    </main>
  );
};

export default VerifyPage;
