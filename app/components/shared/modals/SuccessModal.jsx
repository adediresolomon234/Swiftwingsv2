import Image from "next/image";
import { SWClose } from "../../svgs";
import successCheck from "../../../../public/images/Success check.png";
import Link from "next/link";

const SuccessModal = ({
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
  if (!open) return;
  return (
    <main className="fixed flex justify-center items-center h-[100vh] w-full top-0 left-0 bg-black bg-opacity-25 z-[200]">
      <div className="max-w-xl w-full p-5 bg-white rounded-3xl m-5">
        <div
          className="text-swPrimary500 cursor-pointer p-2 rounded-full border w-fit ml-auto hover:bg-swPrimary50"
          onClick={() => onClose(false)}
        >
          <SWClose className="text-xl text-swPrimary500" />
        </div>
        <div className="flex flex-col items-center p-5">
          <Image src={successCheck} alt="success check" />
          <p className="font-semibold text-2xl mt-10">{headingText}</p>
          <p className="text-sm mt-5 text-center">{text}</p>

          {singleBtn ? (
            <div className="flex gap-5 flex-wrap mt-10 mb-6 w-full">
              <button
                className="text-white bg-swPrimary500 hover:bg-swPrimary700 rounded-full py-2 px-4 w-full text-center font-medium"
                onClick={firstBtnClick}
              >
                {firstBtnText}
              </button>
            </div>
          ) : (
            <div className="flex gap-5 mt-10 mb-6 w-full ">
              <button
                className="text-swPrimary500 hover:bg-swPrimary50 border rounded-full py-2 px-4 w-full text-center font-semibold"
                onClick={firstBtnClick}
              >
                {firstBtnText}
              </button>
              <button
                className="text-white bg-swPrimary500 hover:bg-swPrimary700 rounded-full py-2 px-4 w-full text-center font-medium"
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

export default SuccessModal;
