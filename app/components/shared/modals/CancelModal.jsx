import Image from "next/image";
import { SWClose } from "../../svgs";
import CancelSign from "../../../../public/images/Cancel sign.png";
import InputField from "../InputField";
import { useState } from "react";

const CancelModal = ({
  open,
  onClose,
  headingText,
  text,
  singleBtn,
  firstBtnText,
  firstBtnClick,
  secondBtnText,
  secondBtnClick,
}) => {
  const [reasonForCancel, setReasonForCancel] = useState("");
  if (!open) return;
  return (
    <main className="fixed flex justify-center items-center h-[100vh] w-full top-0 left-0 bg-black bg-opacity-25 z-[200]">
      <div className="max-w-xl w-full p-5 bg-white rounded-3xl">
        <div
          className="text-swPrimary500 cursor-pointer p-2 rounded-full border w-fit ml-auto hover:bg-swPrimary50"
          onClick={() => onClose(false)}
        >
          <SWClose className="text-xl text-swPrimary500" />
        </div>
        <div className="flex flex-col items-center p-5">
          <Image src={CancelSign} alt="cancel" />
          <p className="font-semibold text-2xl mt-10">{headingText}</p>
          <p className="text-sm mt-5 text-center">{text}</p>

          <div className="w-full">
            <InputField
              label={"Cancel reason"}
              placeholder={"Enter reason for cancel (optional)"}
              value={reasonForCancel}
              onChange={(e) => setReasonForCancel(e.target.value)}
            />
          </div>

          {singleBtn ? (
            <div className="flex gap-5 flex-wrap mt-10 mb-6 w-full">
              <button
                className="text-white bg-swError500 hover:bg-swError700 rounded-full py-2 px-4 w-full text-center font-medium"
                onClick={firstBtnClick}
              >
                {firstBtnText}
              </button>
            </div>
          ) : (
            <div className="flex gap-5 mt-10 mb-6 w-full ">
              <button
                className="text-swPrimary500 hover:bg-swError50 border rounded-full py-2 px-4 w-full text-center font-semibold"
                onClick={firstBtnClick}
              >
                {firstBtnText}
              </button>
              <button
                className="text-white bg-swError500 hover:bg-swError700 rounded-full py-2 px-4 w-full text-center font-medium"
                onClick={secondBtnClick}
              >
                {secondBtnText}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default CancelModal;
