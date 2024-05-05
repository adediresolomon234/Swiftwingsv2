import { useRouter } from "next/navigation";
import {
  SWLeftArrowIcon,
  SwArrowRightIcon,
  SwLuggageIcon,
  SwMeterIcon,
  SwSeatIcon,
} from "../svgs";
import { MdArrowForwardIos } from "react-icons/md";

const EachBooking = () => {
  const router = useRouter();
  return (
    <main className="flex gap-5">
      <div className="flex flex-col gap-5 w-full">
        <div className="flex flex-col gap-5 text-swGray800 bg-white p-5 rounded-xl w-full">
          <div className="flex justify-between items-center gap-5">
            <div className="flex gap-5 items-center">
              <div
                className="rounded-full p-2 border w-fit hover:bg-swGray50 cursor-pointer"
                onClick={() => router.back()}
              >
                <SWLeftArrowIcon className="text-sm" />
              </div>
              <p className="text-xl font-medium text-swGray500">
                Booking details
              </p>
              <div className="bg-[#CBC419] text-white rounded-full py-2 px-4 text-xs">
                New
              </div>
            </div>
            <button className="text-swError500 font-medium mr-3 text-lg">
              Cancel
            </button>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-swGray500">Booking ID</p>
              <p className="font-medium text-xl">173934-HSYE</p>
            </div>
            <div>
              <p className="text-sm text-swGray500">Cost</p>
              <p className="font-medium text-xl">NIL</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-swGray500">From</p>
              <p className="font-medium text-xl">Lagos, Nigeria</p>
            </div>
            <div>
              <p className="text-sm text-swGray500">To</p>
              <p className="font-medium text-xl">Abu Dhabi, Dubai</p>
            </div>
            <div>
              <p className="text-sm text-swGray500">No of Passangers</p>
              <p className="font-medium text-xl text-right">8</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl w-full">
          <p className="text-xl font-medium text-swGray500">Selected Jet</p>
          {/* {jets?.map((item, index) => ( */}
          <div className="">
            <div className="transition ease-in-out delay-100 duration-1000 flex flex-col md:flex-row gap-5 justify-between items-center hover:bg-swLighterBgGray p-5 rounded-xl cursor-pointer focus:border focus:outline-swPrimary500">
              <div className="w-full w-1/3 flex gap-5 items-center whitespace-nowrap">
                <div className="text-swLightGray">
                  <p className="text-lg font-medium">Hawker 800XP</p>
                  <p className="text-sm">Midsize Business Jet</p>
                </div>
              </div>
              <div className="lg:max-w-xl w-full text-swGray800 gap-5 flex flex-col sm:flex-row sm:justify-end">
                <div className="w-full sm:w-auto flex items-center gap-5">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <SwSeatIcon className="text-lg" />
                      <p className="text-xs">8 seats</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <SwLuggageIcon className="text-lg" />
                      <p className="text-xs">80kg</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <SwMeterIcon className="text-lg" />
                      <p className="text-xs">826 km/h speed</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <SwMeterIcon className="text-lg" />
                      <p className="text-xs">2,920 miles nm</p>
                    </div>
                  </div>

                  <MdArrowForwardIos size={20} />
                </div>
              </div>
            </div>
          </div>
          {/* ))} */}
        </div>
      </div>
      <div className="bg-white p-5 rounded-xl md:w-1/3 w-full"></div>
    </main>
  );
};

export default EachBooking;
