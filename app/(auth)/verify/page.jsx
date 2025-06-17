"use client";
import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import NavBar from "../../components/shared/NavBar";
import { Libre_Baskerville } from "next/font/google";
import Loading from "../../components/Loading";

const libre_baskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const VerifyPage = () => {
  const [inputNum, setInputNum] = useState(1);
  const [loading, setLoading] = useState(true);
  const [verifyCode, setVerifyCode] = useState([0, 0, 0, 0, 0]);
  const firstInput = useRef(null);
  const secondInput = useRef(null);
  const thirdInput = useRef(null);
  const fourthInput = useRef(null);
  const fifthInput = useRef(null);
  // console.log(verifyCode);

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

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <main className="flex justify-center items-center min-h-[100vh] bg-swSecondary50">
      <NavBar Nav={false} />
      <div className="max-w-sm w-full p-2">
        <p className="text-center text-2xl font-semibold text-swGray800">
          Verify your email
        </p>
        <p className="text-center mt-5 mb-8 text-[0.95rem]">
          Sign in to{" "}
          <span
            className={`${libre_baskerville.className} text-swPrimary500 no-text-shadow font-bold`}
          >
            Swift<i className="font-normal">Wings</i>
          </span>{" "}
          to manage your bookings
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
                  // console.log();
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
