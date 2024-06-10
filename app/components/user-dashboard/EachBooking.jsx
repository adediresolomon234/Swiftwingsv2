import { useRouter, useSearchParams } from "next/navigation";
import {
  SWLeftArrowIcon,
  SwArrowRightIcon,
  SwLuggageIcon,
  SwMeterIcon,
  SwPlaneIcon,
  SwSeatIcon,
  SwWeightIcon,
} from "../svgs";
import { MdArrowForwardIos } from "react-icons/md";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllBooking } from "@/redux/slices/bookingSlice";

const EachBooking = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const getAllBookings = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    dispatch(getAllBooking(user.email))
      .unwrap()
      .then((res) => {
        if (res.success == true) {
          setData(res?.data?.find((item) => item?.booking_number === id));
          console.log(res.data);
          setLoading(false);
        } else {
          toast.error(res.message);
        }
      })
      .catch((error) => console.log(error));
  };
  console.log("data", data);

  useEffect(() => {
    getAllBookings();
  }, []);
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <main className="flex gap-5 flex-col lg:flex-row">
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-5 text-swGray800 bg-white p-5 rounded-xl w-full">
              <div className="flex justify-between items-center gap-5">
                <div className="flex gap-5 items-center flex-wrap w-full">
                  <div className="flex gap-5 items-center justify-between w-full">
                    <div className="flex gap-5">
                      <div
                        className="rounded-full p-2 border w-fit hover:bg-swGray50 cursor-pointer"
                        onClick={() => router.back()}
                      >
                        <SWLeftArrowIcon className="text-sm" />
                      </div>
                      <p className="text-xl font-medium text-swGray500">
                        Booking details
                      </p>
                    </div>
                    <div
                      className={`text-white text-xs rounded-full py-2 px-4 ${
                        data?.status === "New"
                          ? "bg-[#CBC419]"
                          : data?.status === "Processing"
                          ? "bg-[#196BCB]"
                          : data?.status === "Completed"
                          ? "bg-[#33CB19]"
                          : "bg-[#CB2419]"
                      }`}
                    >
                      {data?.status}
                    </div>
                    {/* <button className="text-swError500 font-medium mr-3 text-lg">
                      Cancel
                    </button> */}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-swGray500">Booking ID</p>
                  <p className="font-medium text-xl">{data?.booking_number}</p>
                </div>
                <div>
                  <p className="text-sm text-swGray500">Cost</p>
                  <p className="font-medium text-xl">NIL</p>
                </div>
              </div>
              <div className="flex justify-between items-center gap-5 flex-wrap">
                <div>
                  <p className="text-sm text-swGray500">From</p>
                  {/* <p className="font-medium text-xl">Lagos, Nigeria</p> */}
                  <p className="font-medium text-xl">
                    {data?.booking_details?.formData[0]?.source?.city},
                    {data?.booking_details?.formData[0]?.source?.country}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-swGray500">To</p>
                  <p className="font-medium text-xl">
                    {" "}
                    {data?.booking_details?.formData[0]?.destination?.city},
                    {data?.booking_details?.formData[0]?.destination?.country}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-swGray500">No of Passangers</p>
                  <p className="font-medium text-xl md:text-right">
                    {Number(
                      data?.booking_details?.formData[0]?.passengers.adults
                    ) +
                      Number(
                        data?.booking_details?.formData[0]?.passengers.children
                      )}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl w-full">
              <p className="text-xl font-medium text-swGray500">Selected Jet</p>
              {data?.additional_quote?.map((jet) => (
                <div key={jet?.id} className="">
                  <div className="transition ease-in-out delay-100 duration-1000 flex flex-col md:flex-row gap-5 justify-between items-center hover:bg-swLighterBgGray p-5 rounded-xl cursor-pointer focus:border focus:outline-swPrimary500">
                    <div className="w-full w-1/3 flex gap-5 items-center whitespace-nowrap">
                      <div className="text-swLightGray">
                        <p className="text-lg font-medium">{jet?.name}</p>
                        <p className="text-sm">
                          {jet?.features?.classification}
                        </p>
                      </div>
                    </div>
                    <div className="lg:max-w-xl w-full text-swGray800 gap-5 flex flex-col sm:flex-row sm:justify-end">
                      <div className="w-full sm:w-auto flex items-center gap-5">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <SwSeatIcon className="text-lg" />
                            <p className="text-xs">
                              {jet?.features?.no_of_seats} seats
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <SwLuggageIcon className="text-lg" />
                            <p className="text-xs">80kg</p>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <SwMeterIcon className="text-lg" />
                            <p className="text-xs">{jet?.speed} speed</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <SwMeterIcon className="text-lg" />
                            <p className="text-xs">{jet?.kilometer} nm</p>
                          </div>
                        </div>

                        <MdArrowForwardIos size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl sm:w-2/5 w-full">
            <p className="font-semibold text-swGray600 text-lg">Destinations</p>
            <div className="flex justify-between items-center mt-8">
              <p className="text-swGray600">Flight type:</p>
              <p className="font-medium text-swGray800 ">
                {data?.booking_details?.tripType}
              </p>
            </div>
            <div className="text-swGray800 mt-5">
              <p className="">
                {data?.booking_details?.formData[0]?.source?.city},
                {data?.booking_details?.formData[0]?.source?.country} -{" "}
                {data?.booking_details?.formData[0]?.destination?.city},
                {data?.booking_details?.formData[0]?.destination?.country}
              </p>
            </div>
            {/* {bookingDetails?.booking_details?.formData.map((item, index) => ( */}
            <div className="flex gap-1 mt-5 justify-center lg:">
              <div className="flex flex-col justify-between">
                <div className="">
                  <p className="font-semibold text-lg">
                    {dayjs(
                      `${data?.booking_details?.formData[0]?.depatureDate} ${data?.booking_details?.formData[0]?.depatureTime}`
                    ).format("h:mm a") === "Invalid Date"
                      ? "Select date"
                      : dayjs(
                          `${data?.booking_details?.formData[0]?.depatureDate} ${data?.booking_details?.formData[0]?.depatureTime}`
                        ).format("h:mm a")}
                  </p>
                  <p className="text-sm">
                    {dayjs(
                      `${data?.booking_details?.formData[0]?.depatureDate} ${data?.booking_details?.formData[0]?.depatureTime}`
                    ).format(`ddd D, MMM`) === "Invalid Date"
                      ? "Select date"
                      : dayjs(
                          `${data?.booking_details?.formData[0]?.depatureDate} ${data?.booking_details?.formData[0]?.depatureTime}`
                        ).format(`ddd D, MMM`)}
                  </p>
                </div>
                {/* <div className="">
                  <p className="font-semibold text-lg">
                    {dayjs().format("h:mm a") === "Invalid Date"
                      ? "Select date"
                      : dayjs().format("h:mm a")}
                  </p>

                  <p className="text-sm">
                    {dayjs().format(`ddd D, MMM`) === "Invalid Date"
                      ? "Select date"
                      : dayjs().format(`ddd D, MMM`)}
                  </p>
                </div> */}
              </div>

              <div className="flex items-center flex-col gap-1 h-60 p-2">
                <div className="p-1 bg-swError500 rounded-full" />
                <div className="h-full border border-r border-dashed" />
                <div className="w-fit h-fit">
                  <SwPlaneIcon className="text-base" />
                </div>
                <div className="h-full border border-r border-dashed" />
                <div className="p-1 bg-swSuccess500 rounded-full" />
              </div>

              <div className="flex flex-col justify-between">
                <div className="">
                  <p className="text-sm">
                    {data?.booking_details?.formData[0]?.source?.city}
                  </p>
                </div>

                <div className="">
                  <p className="text-sm">
                    {data?.booking_details?.formData[0]?.destination?.city}
                  </p>
                </div>
              </div>
            </div>
            {/* ))} */}

            <div className="p-3 bg-swLighterBgGray rounded-xl my-7">
              <p className="text-sm">
                Include free Baggage & Cabin in capacity Per person
              </p>
              <div className="flex gap-5 mt-2">
                <div className="flex gap-2 items-center">
                  <SwLuggageIcon className="text-lg" />
                  <p>40 Kg</p>
                </div>
                <div className="flex gap-2 items-center">
                  <SwWeightIcon className="text-lg" />
                  <p>10 Kg</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default EachBooking;
