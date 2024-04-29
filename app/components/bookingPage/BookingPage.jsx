"use client";

import Button from "@/app/components/Button";
import {
  SwArrowRightIcon,
  SwLeftRightArrowIcon,
  SwLuggageIcon,
  SwMeterIcon,
  SwPlaneIcon,
  SwSeatIcon,
  SwTopBottomArrowIcon,
  SwWeightIcon,
} from "@/app/components/svgs";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addBooking } from "@/redux/slices/bookingSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookingEngine from "../../components/bookingEngine/bookingEngine";
import { usePathname, useRouter } from "next/navigation";
import SuccessModal from "../shared/modals/SuccessModal";
import {PuffLoader } from "react-spinners";

const BookingPageInformation = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const [dateValue, setDateValue] = useState(dayjs());
  const [bookingDetails, setBookingDetails] = useState(null);
  const [sourceDetails, setSourceDetails] = useState(null);
  const [destinationDetails, setDestinationDetails] = useState(null);
  const [jets, setJets] = useState([]);
  const [success, setSuccess] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const { loading, error, data } = useSelector((state) => state.booking);

  const handleAircraftSelect = (e, aircraftDetails, index) => {
    const isChecked = e.target.checked;
    setBookingDetails((prevState) => {
      const additional_quote = prevState?.additional_quote || [];
      if (isChecked) {
        return {
          ...prevState,
          additional_quote: [...additional_quote, aircraftDetails],
        };
      } else {
        return {
          ...prevState,
          additional_quote: additional_quote.filter(
            (aircraft) => aircraft !== aircraftDetails
          ),
        };
      }
    });
  };

  const handleQuote = () => {
    if (bookingDetails?.user) {
      bookingDetails.status = "New";
      dispatch(addBooking(bookingDetails));
    } else {
      localStorage.setItem("bookingInComplete", true);
      router.push("/complete-profile");
    }
  };

  const handleQuoteDisable = () => {
    return loading === "pending"
      ? true
      : false ||
          !bookingDetails?.booking_details?.formData[0]?.source ||
          !bookingDetails?.booking_details?.formData[0]?.destination ||
          !bookingDetails?.booking_details?.formData[0]?.depatureDate ||
          bookingDetails?.booking_details?.formData[0]?.passengers.adults < 1 ||
          bookingDetails?.additional_quote?.length < 1;
  };

  useEffect(() => {
    if (data?.response?.data?.error) {
      toast.error(data?.response?.data?.error);
    } else if (data?.message) {
      // toast.success(data?.message);
      setSuccess(true);
    }
    if (error) {
      toast.error(error?.message);
    }
  }, [data, error]);

  console.log({ bookingDetails });

  useEffect(() => {
    const fetchJets = async () => {
      try {
        const response = await axios.get(
          "https://swiftwings-mw.onrender.com/api/v1/aircraft/all"
        );
        setJets(response?.data?.data);
      } catch (error) {
        return error;
      }
    };
    fetchJets();

    const userDetails = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    if (userDetails) {
      delete userDetails.token;
      delete userDetails.isLoggedIn;
      setBookingDetails((prevState) => ({
        ...prevState,
        user: userDetails, // Replace the entire user object
      }));
    }

    // setHydrated(true);

    // console.log("book", bookingDetails);
  }, []);

  useEffect(() => {
    const formData = bookingDetails?.booking_details?.formData?.[0];
    if (formData) {
      setSourceDetails({ ...formData.source });
      setDestinationDetails({ ...formData.destination });
      setDateValue(dayjs(`${formData.depatureDate} ${formData.depatureTime}`));
    }
  }, [bookingDetails]);

  useEffect(() => {
    const fetchData = async () => {
      // Perform initialization tasks (e.g., data fetching)
      // Once initialization is complete, set hydrated to true
      await performInitialization();
      setHydrated(true);
    };

    fetchData();
  }, []);

  return (
    <>
      {!hydrated ? (
        <div className="flex justify-center items-center my-10">
          <div>
            <PuffLoader size={50} color="#d5d5d5" />
            {/* <BounceLoader size={50} color="#d5d5d5" /> */}
          </div>
        </div>
      ) : (
        <main>
          <ToastContainer />
          <div className="bg-swLightBgGray z-10">
            <div className="m-5 mx-auto max-w-[90rem] z-10">
              <BookingEngine setBookingDetails={setBookingDetails} />
              <div className="flex gap-10 text-swGray800 mt-10">
                <div className="w-2/3">
                  <p className="text-xl font-medium mb-5">Select Private Jet</p>
                  <div className="w-full rounded-3xl border p-5 bg-white">
                    {jets?.map((item, index) => (
                      <div key={item?.id} className="">
                        <div className="transition ease-in-out delay-100 duration-1000 flex gap-5 justify-between items-center hover:bg-swLighterBgGray p-5 rounded-xl cursor-pointer focus:border focus:outline-swPrimary500">
                          <div className="flex gap-5 items-center whitespace-nowrap">
                            <input
                              type="checkbox"
                              onClick={(e) =>
                                handleAircraftSelect(e, item, index)
                              }
                              className="h-6 w-6 accent-swPrimary500"
                            />
                            <div className="text-swLightGray">
                              <p className="text-2xl font-medium">
                                {item?.model}
                              </p>
                              <p className="text-sm">{item?.classification}</p>
                            </div>
                          </div>
                          <div className="max-w-xl w-full text-swGray800 gap-5 flex">
                            <div className="w-full flex justify-between gap-5">
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                  <SwSeatIcon className="text-lg" />
                                  <p className="text-xs">{item?.no_of_seats}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <SwLuggageIcon className="text-lg" />
                                  <p className="text-xs">
                                    {item?.luggage_capacity}
                                  </p>
                                </div>
                              </div>

                              <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                  <SwMeterIcon className="text-lg" />
                                  <p className="text-xs">{item?.speed}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <SwMeterIcon className="text-lg" />
                                  <p className="text-xs">{item?.range}</p>
                                </div>
                              </div>

                              <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                  <SwLeftRightArrowIcon className="text-lg" />
                                  <p className="text-xs">
                                    {item?.interior_width}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <SwTopBottomArrowIcon className="text-lg" />
                                  <p className="text-xs">
                                    {item?.interior_height}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {pathname === "/user-booking" ? (
                              <SwArrowRightIcon className="text-2xl" />
                            ) : (
                              <div className="flex items-center gap-3 py-2 px-4 rounded-full hover:bg-white">
                                <p className="font-medium whitespace-nowrap">
                                  View Jet
                                </p>
                                <SwArrowRightIcon className="text-sm" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* <Button
                  label={"Add to quote"}
                  className="border mt-5 text-swGray800 font-semibold"
                  bgColor={"bg-white hover:bg-swLightBgGray"}
                /> */}
                  </div>
                </div>
                <div className="w-1/3">
                  <p className="text-xl font-medium mb-5">Flight Summary</p>
                  <div className="w-full rounded-3xl border p-5  bg-white">
                    <p className="font-semibold text-lg">
                      Flight from {sourceDetails?.city} ,{" "}
                      {sourceDetails?.country} - {destinationDetails?.city},{" "}
                      {destinationDetails?.country}
                    </p>

                    {/* depatureDate
                  : 
                  "2024-4-17"
                  depatureTime
                  : 
                  "1:0" */}
                    {bookingDetails?.booking_details?.formData.map(
                      (item, index) => (
                        <div key={index} className="flex gap-1 mt-5">
                          <div className="flex flex-col justify-between">
                            <div className="">
                              <p className="font-semibold text-lg">
                                {dayjs(
                                  `${item?.depatureDate} ${item?.depatureTime}`
                                ).format("h:mm a") === "Invalid Date"
                                  ? "Select date"
                                  : dayjs(
                                      `${item?.depatureDate} ${item?.depatureTime}`
                                    ).format("h:mm a")}
                              </p>
                              <p className="text-sm">
                                {dayjs(
                                  `${item?.depatureDate} ${item?.depatureTime}`
                                ).format(`ddd D, MMM`) === "Invalid Date"
                                  ? "Select date"
                                  : dayjs(
                                      `${item?.depatureDate} ${item?.depatureTime}`
                                    ).format(`ddd D, MMM`)}
                              </p>
                            </div>
                            <div className="">
                              {item?.returningDate && (
                                <p className="font-semibold text-lg">
                                  {dayjs(
                                    `${item?.returningDate} ${item?.returningTime}`
                                  ).format("h:mm a") === "Invalid Date"
                                    ? "Select date"
                                    : dayjs(
                                        `${item?.returningDate} ${item?.returningTime}`
                                      ).format("h:mm a")}
                                </p>
                              )}

                              {item?.returningDate && (
                                <p className="text-sm">
                                  {dayjs(
                                    `${item?.returningDate} ${item?.returningTime}`
                                  ).format(`ddd D, MMM`) === "Invalid Date"
                                    ? "Select date"
                                    : dayjs(
                                        `${item?.returningDate} ${item?.returningTime}`
                                      ).format(`ddd D, MMM`)}
                                </p>
                              )}
                            </div>
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
                              {/* <p className="font-semibold text-lg">
                        {dateValue.format("h:mm a") === "Invalid Date"
                          ? "Select Date"
                          : dateValue.format("h:mm a")}
                      </p> */}
                              <p className="text-sm">
                                {item?.source?.city}, {item?.source?.country}
                              </p>
                            </div>
                            {/* <p className="font-medium">12 Hours</p> */}
                            <div className="">
                              {/* <p className="font-semibold text-lg">22:00 pm</p> */}
                              <p className="text-sm">
                                {item?.destination?.city},{" "}
                                {item?.destination?.country}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    )}

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

                    <Button
                      label={"Request Quote"}
                      bgColor={"bg-swPrimary500 hover:bg-swPrimary600"}
                      className="w-full text-white text-center"
                      onClick={handleQuote}
                      loader={loading === "pending" ? true : false}
                      disabled={handleQuoteDisable()}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <BookingComplete open={success} onClose={setSuccess} /> */}
          <SuccessModal
            open={success}
            headingText={"Booking complete"}
            text={
              "You can check out your booking status in your profile or wait for our mail."
            }
            onClose={setSuccess}
            firstBtnText={"Go home"}
            firstBtnClick={() => router.push("/")}
            secondBtnText={"View Profile"}
            secondBtnClick={() => setSuccess(false)}
          />
        </main>
      )}
    </>
  );
};

export default BookingPageInformation;
