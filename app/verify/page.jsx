"use client";
import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";

const VerifyPage = () => {
  const [inputNum, setInputNum] = useState(1);
  const [verifyCode, setVerifyCode] = useState([0, 0, 0, 0]);
  const firstInput = useRef(null);
  const secondInput = useRef(null);
  const thirdInput = useRef(null);
  const fourthInput = useRef(null);
  console.log(verifyCode);

  useEffect(() => {
    inputNum === 1
      ? firstInput.current.focus()
      : inputNum === 2
      ? secondInput.current.focus()
      : inputNum === 3
      ? thirdInput.current.focus()
      : fourthInput.current.focus();
  }, [inputNum]);

  return (
    <main className="flex justify-center items-center min-h-[100vh]">
      <div className="max-w-sm w-full p-2">
        <p className="text-center text-2xl font-medium">Verify your email</p>
        <p className="text-center mt-5 mb-8 text-[0.95rem]">
          Sign in to Swiftwings to manage your bookings
        </p>
        <div className="flex gap-3 justify-center">
          <input
            type="text"
            className="border border-swGray300 text-swGray300 rounded-lg h-16 w-16 text-5xl text-center focus:outline-none"
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
          <input
            type="text"
            className="border border-swGray300 text-swGray300 rounded-lg h-16 w-16 text-5xl text-center focus:outline-none"
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
          <input
            type="text"
            className="border border-swGray300 text-swGray300 rounded-lg h-16 w-16 text-5xl text-center focus:outline-none"
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
          <input
            type="text"
            className="border border-swGray300 text-swGray300 rounded-lg h-16 w-16 text-5xl text-center focus:outline-none"
            placeholder="0"
            maxLength={1}
            ref={fourthInput}
            onChange={(e) => {
              if (e.target.value.length > 0) {
                setInputNum(4);
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
        <div className="my-7 flex flex-col gap-3">
          <Button
            label={"Verify"}
            bgColor={"bg-swPrimary500 text-white w-full"}
          />
        </div>
      </div>
    </main>
  );
};

export default VerifyPage;
