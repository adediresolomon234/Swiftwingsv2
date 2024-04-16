import Image from "next/image";
import successCheck from "../../../public/images/Success check.png";
import { SWClose } from "../svgs";
import Link from "next/link";
const BookingComplete = ({ open, onClose }) => {
  if (!open) return;
  return (
    <main className="fixed flex justify-center items-center h-[100vh] w-full top-0 left-0 bg-black bg-opacity-25 z-[200]">
      <div className="max-w-5xl w-full p-5 bg-white rounded-3xl">
        <div
          className="text-swPrimary500 cursor-pointer p-2 rounded-full border w-fit ml-auto hover:bg-swPrimary50"
          onClick={() => onClose(false)}
        >
          <SWClose className="text-xl text-swPrimary500" />
        </div>
        <div className="flex flex-col items-center">
          <Image src={successCheck} alt="success check" />
          <p className="font-semibold text-2xl mt-10">Booking Completed</p>
          <p className="text-sm mt-5">
            You can check out your booking status in your profile or wait for
            our mail.
          </p>

          <div className="flex gap-5 flex-wrap mt-16 mb-16">
            <Link
              href="/"
              className="text-swPrimary500 hover:bg-swPrimary50 border rounded-full py-2 w-56 text-center font-semibold"
            >
              Go home
            </Link>
            <Link
              href="/profile-page"
              className="text-white bg-swPrimary500 hover:bg-swPrimary700 rounded-full py-2 w-56 text-center font-medium"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookingComplete;
