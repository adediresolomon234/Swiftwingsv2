// import NavAndFooter from "@/app/components/shared/NavAndFooter";
"use client";

import BookingEngine from "@/app/components/BookingEnginge";
import Button from "@/app/components/Button";
import NavAndFooter from "@/app/components/shared/NavAndFooter";
import {
  SwArrowRightIcon,
  SwCalendarIcon,
  SwLeftRightArrowIcon,
  SwLuggageIcon,
  SwMeterIcon,
  SwPlaneIcon,
  SwSearchIcon,
  SwSeatIcon,
  SwTopBottomArrowIcon,
  SwWeightIcon,
} from "@/app/components/svgs";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BiUser } from "react-icons/bi";
import { FiMinus, FiPlus } from "react-icons/fi";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { IoCheckmark } from "react-icons/io5";
import { MdOutlineCalendarToday } from "react-icons/md";
import Select from "react-select";
import airports from "../components/helpers/airports";
import departImg from "../../public/images/Arrive-white.png";
import arriveImg from "../../public/images/Arrive-white.png";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const BookJet = () => {
  const containerRef = useRef(null);
  const router = useRouter()
  const [clickedOutside, setClickedOutside] = useState(false);
  const [bookingEngine, setBookingEngine] = useState("One way Trip");
  const [openPassangers, setOpenPassageners] = useState(false);
  const [openDeparture, setOpenDeparture] = useState(false);
  const [openArrival, setOpenArrival] = useState(false);
  let [adultsNo, setAdultsNo] = useState(0);
  let [kidsNo, setKidsNo] = useState(0);
  let [petsNo, setPetsNo] = useState(0);
  const [allPassangers, setAllPassangers] = useState({
    adults: 0,
    chilren: 0,
    pets: 0,
  });
  const [departureAirport, setDepartureAirport] = useState(null);
  const [arrivalAirport, setArrivalAirport] = useState(null);
  const departureRef = useRef(null);
  const arrivalRef = useRef(null);
  const dateRef = useRef(null);
  const passengerRef = useRef(null);
  const [isDateOpen, setDateOpen] = useState(false);
  const [roundTripDateValue, setRoundTripDateValue] = useState(dayjs());
  const [dateValue, setDateValue] = useState(dayjs());
  const [bookingDetails, setBookingDetails] = useState({});
  const [sourceDetails, setSourceDetails] = useState({});
  const [destinationDetails, setDestinationDetails] = useState({});

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const options = airports.map((item) => ({
    label: (
      <div className="flex justify-between">
        <div className="flex gap-1">
          <p>
            {item?.city}
            {item?.city && ","} {item?.country}
          </p>
          <p className="font-light italic text-sm text-swGray500">
            {item?.name}
          </p>
        </div>
        <p>{item?.iata_code}</p>
      </div>
    ),
    value: item,
  }));

  const getOptionLabel = (option) => option?.label;

  const filterOption = (option, inputValue) => {
    const lowerCaseInput = inputValue.toLowerCase();

    return (
      option.value.city.toLowerCase().includes(lowerCaseInput) ||
      option.value.country.toLowerCase().includes(lowerCaseInput) ||
      option.value.name.toLowerCase().includes(lowerCaseInput) ||
      option.value.iata_code.toLowerCase().includes(lowerCaseInput)
    );
  };

  const handleSavePassangers = () => {
    setAllPassangers((prev) => ({
      adults: adultsNo,
      chldren: kidsNo,
      pets: petsNo,
      prev,
    }));

    setBookingDetails((prevState) => ({
      ...prevState,
      booking_details: {
        ...prevState.booking_details,
        formData: [
          {
            ...prevState.booking_details.formData[0],
            passengers: {
              adults: adultsNo,
              children: kidsNo,
              pets: petsNo,
            },
          },
        ],
      },
    }));

    setOpenPassageners(false);
  };

  const handleDateChange = (dateValue) => {
    setDateValue(dateValue);
    // setDateOpen(false);
    setBookingDetails((prevState) => ({
      ...prevState,
      booking_details: {
        ...prevState.booking_details,
        formData: [
          {
            ...prevState.booking_details.formData[0],
            depatureDate: `${dateValue.$y}-${dateValue.$M + 1}-${dateValue.$D}`,
            depatureTime: `${dateValue.$H}:${dateValue.$m}`,
          },
        ],
      },
    }));
  };

  const handleRoundTripDateChange = (roundTripDateValue) => {
    setRoundTripDateValue(roundTripDateValue);

    setBookingDetails((prevState) => ({
      ...prevState,
      booking_details: {
        ...prevState.booking_details,
        formData: [
          {
            ...prevState.booking_details.formData[0],
            returningDate: `${roundTripDateValue.$y}-${
              roundTripDateValue.$M + 1
            }-${roundTripDateValue.$D}`,
            returningTime: `${roundTripDateValue.$H}:${roundTripDateValue.$m}`,
          },
        ],
      },
    }));
  };

  const handleAirport = (selectedOption, location) => {
    const newAirport = selectedOption.value;

    setBookingDetails((prevState) => ({
      ...prevState,
      booking_details: {
        ...prevState.booking_details,
        formData: [
          {
            ...prevState.booking_details.formData[0],
            [location === "source" ? "source" : "destination"]: {
              ...prevState.booking_details.formData[0][
                location === "source" ? "source" : "destination"
              ],
              label: `${newAirport.name} - ${newAirport.city} - ${newAirport.iata_code} ${newAirport.country}`,
              value: newAirport,
            },
          },
        ],
      },
    }));

    location === "source"
      ? setSourceDetails(newAirport)
      : setDestinationDetails(newAirport);

    setOpenDeparture(false);
    setOpenArrival(false);
  };

  useEffect(() => {
    const bookingDetails = JSON.parse(localStorage.getItem("bookingDetails"));
    const bookingFormData = bookingDetails?.booking_details?.formData[0];
    const userDetails = JSON.parse(localStorage.getItem("user"));
    setBookingDetails(bookingDetails);
    setSourceDetails(bookingFormData?.source?.value);
    setDestinationDetails(bookingFormData?.destination?.value);
    setAllPassangers(bookingFormData?.passengers);
    setAdultsNo(bookingFormData?.passengers?.adults);
    setKidsNo(bookingFormData?.passengers?.children);
    setPetsNo(bookingFormData?.passengers?.pets);
    setBookingEngine(bookingDetails?.booking_details?.tripType);

    setDateValue(
      dayjs(`${bookingFormData?.depatureDate}T${bookingFormData?.depatureTime}`)
    );

    if (userDetails) {
      delete userDetails.token;
      setBookingDetails((prevState) => ({
        ...prevState,
        user: userDetails, // Replace the entire user object
      }));
    }
  }, []);

  console.log(bookingDetails);
  // console.log(bookingEngine);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click event occurred outside the container

      if (!departureRef?.current?.contains(event.target)) {
        setOpenDeparture(false);
        console.log("departure clicked");
      }
      if (!arrivalRef?.current?.contains(event.target)) {
        setOpenArrival(false);
        console.log("arrival clicked");
      }
      if (!dateRef?.current?.contains(event.target)) {
        setDateOpen(false);
        console.log("date clicked");
      }
      if (!passengerRef?.current?.contains(event.target)) {
        setOpenPassageners(false);
      }
    };

    // Add event listener for click events
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Remove event listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <NavAndFooter>
      <div className="bg-swLightBgGray py-24 px-5 z-10">
        <div className="m-5 mx-auto max-w-[90rem] z-10">
          <div className="w-full border rounded-3xl">
            <div className="p-5 bg-white rounded-3xl">
              <div
                // ref={containerRef}
                className="flex justify-between items-center mb-5"
              >
                <p className="font-semibold text-swGray800 ml-2 text-lg">
                  Book a jet
                </p>
                <div className="p-2 rounded-full flex gap-5 text-xl font-medium bg-swGray50">
                  <button
                    className={`${
                      bookingEngine === "One way Trip"
                        ? "text-swPrimary500 font-semibold bg-white"
                        : "text-swLightGray hover:bg-white"
                    } py-2 px-4 rounded-full`}
                    onClick={() => setBookingEngine("One way Trip")}
                  >
                    One way Trip
                  </button>
                  <button
                    className={`${
                      bookingEngine === "Round Trip"
                        ? "text-swPrimary500 font-semibold bg-white"
                        : "text-swLightGray hover:bg-white"
                    } py-2 px-4 rounded-full`}
                    onClick={() => setBookingEngine("Round Trip")}
                  >
                    Round Trip
                  </button>
                  <button
                    className={`${
                      bookingEngine === "multiCity"
                        ? "text-swPrimary500 font-semibold bg-white"
                        : "text-swLightGray hover:bg-white"
                    } py-2 px-4 rounded-full`}
                    onClick={() => setBookingEngine("multiCity")}
                  >
                    Multi-city trip
                  </button>
                </div>
                <div className={`p-5 bg-swPrimary500 text-white rounded-full`}>
                  <SwSearchIcon className="" />
                </div>
              </div>

              {bookingEngine !== "multiCity" ? (
                <div className="flex justify-between mb-5">
                  <div className="flex items-center gap-5 mx-auto flex-wrap">
                    <div className="flex items-center mx-auto relative">
                      <div
                        className="p-5 pr-16 flex h-[5.5rem] w-[21rem] items-center gap-5 border rounded-tl-2xl rounded-bl-2xl cursor-pointer hover:bg-swLightBgGray"
                        onClick={() => setOpenDeparture(!openDeparture)}
                      >
                        <div className="bg-swPrimary500 p-1 rounded-full shadow-lg shadow-swPrimary500">
                          <div className="h-8 w-8 relative">
                            <Image src={departImg} alt="depart" fill />
                          </div>
                        </div>
                        <div>
                          <p className="text-swLightGray text-sm">
                            Departure city
                          </p>
                          <p className=" text-swGray800 font-semibold">
                            {!sourceDetails
                              ? "Select City"
                              : `${sourceDetails?.city} - ${sourceDetails?.country}`}
                          </p>
                        </div>
                      </div>
                      <div className="p-1 rounded-full border text-swBlack ml-[47.5%] bg-white absolute">
                        <GoArrowRight size={15} className={"-mb-2 ml-1"} />
                        <GoArrowLeft size={15} className="-mt-2 mr-1" />
                      </div>
                      <div
                        className="p-5 pr-16 flex h-[5.5rem] w-[21rem] items-center gap-5 border border-l-transparent rounded-tr-2xl rounded-br-2xl cursor-pointer hover:bg-swLightBgGray"
                        onClick={() => setOpenArrival(!openArrival)}
                      >
                        <div className="bg-swPrimary500 p-1 rounded-full shadow-lg shadow-swPrimary500">
                          <div className="h-8 w-8 relative">
                            <Image src={arriveImg} alt="depart" fill />
                          </div>
                        </div>
                        <div>
                          <p className="text-swLightGray text-sm">
                            Arrival city
                          </p>
                          <p className=" text-swGray800 font-semibold">
                            {!destinationDetails
                              ? "Select City"
                              : `${destinationDetails?.city} - ${destinationDetails?.country}`}
                          </p>
                        </div>
                      </div>

                      {openDeparture && (
                        <div
                          ref={departureRef}
                          className="absolute text-swGray800 top-24 w-full z-10"
                        >
                          <Select
                            value={sourceDetails}
                            getOptionLabel={getOptionLabel}
                            filterOption={filterOption}
                            onChange={(selectedOption) =>
                              handleAirport(selectedOption, "source")
                            }
                            options={options}
                            placeholder="Select Arrival City"
                          />
                        </div>
                      )}
                      {openArrival && (
                        <div
                          ref={arrivalRef}
                          className="absolute text-swGray800 top-24 w-full z-10"
                        >
                          <Select
                            value={destinationDetails}
                            getOptionLabel={getOptionLabel}
                            filterOption={filterOption}
                            onChange={(selectedOption) =>
                              handleAirport(selectedOption, "destination")
                            }
                            options={options}
                            placeholder="Select Arrival City"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex justify-around gap-5 mx-auto flex-wrap">
                      <div
                        onClick={() => setDateOpen(true)}
                        className="relative p-5 pr-5 flex items-center h-[5.5rem] w-72 gap-5 border rounded-2xl cursor-pointer"
                      >
                        {!isDateOpen && (
                          <div className="p-2 rounded-full text-swGray900">
                            <SwCalendarIcon className="text-xl" />
                          </div>
                        )}
                        <div>
                          {bookingEngine === "Round Trip" ? (
                            <div className="w-full">
                              {!isDateOpen && (
                                <>
                                  <p className="text-swLightGray text-sm">
                                    Departure and arrival date
                                  </p>
                                  <p className=" text-swGray800 font-semibold">
                                    {dateValue.format("D MMM")} -{" "}
                                    {roundTripDateValue.format("D MMM")}
                                  </p>
                                </>
                              )}
                            </div>
                          ) : (
                            <div>
                              {!isDateOpen && (
                                <div>
                                  <p className="text-swLightGray text-sm">
                                    Departure date
                                  </p>
                                  <p className=" text-swGray800 font-semibold">
                                    {dateValue.format("D MMM")}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        {isDateOpen && (
                          <div
                            ref={dateRef}
                            className={`absolute ${
                              bookingEngine === "Round Trip" && "-ml-5"
                            }`}
                          >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <div className="flex">
                                <DateTimePicker
                                  label="Departure Date"
                                  defaultValue={dateValue}
                                  value={dateValue}
                                  onChange={handleDateChange}
                                  onClose={() => setDateOpen(false)}
                                />
                                {bookingEngine === "Round Trip" && (
                                  <DateTimePicker
                                    label="Arrival Date"
                                    defaultValue={roundTripDateValue}
                                    value={roundTripDateValue}
                                    onChange={handleRoundTripDateChange}
                                    onClose={() => setDateOpen(false)}
                                  />
                                )}
                              </div>
                            </LocalizationProvider>
                          </div>
                        )}
                      </div>
                      <div className="relative">
                        <div
                          className="p-5 flex items-center h-[5.5rem] w-[21rem] gap-5 border rounded-2xl cursor-pointer hover:bg-swLightBgGray"
                          onClick={() => setOpenPassageners(!openPassangers)}
                        >
                          <div className="p-2 rounded-full border text-swGray800">
                            <BiUser size={20} />
                          </div>
                          <div>
                            <p className="text-swLightGray text-sm">
                              Passengers
                            </p>
                            <p className=" text-swGray800 font-semibold w-full">
                              Adults - {allPassangers.adults} Children -{" "}
                              {allPassangers.children} Pets -{" "}
                              {allPassangers.pets}
                            </p>
                          </div>
                        </div>
                        {openPassangers && (
                          <div
                            ref={passengerRef}
                            className="absolute text-swGray800 top-24 bg-white w-full shadow-md rounded-md"
                          >
                            <div className="p-5 flex flex-col gap-5 font-medium">
                              <p className="font-semibold text-lg">Occupants</p>

                              <div className="flex flex-col gap-5">
                                <div className="flex justify-between items-center">
                                  <p className="">Adults</p>
                                  <div className="border hover:border-swPrimary500 rounded-md overflow-hidden flex">
                                    <p
                                      className="p-2 cursor-pointer hover:bg-swPrimary500 hover:text-white"
                                      onClick={() =>
                                        setAdultsNo(
                                          adultsNo > 0 ? --adultsNo : 0
                                        )
                                      }
                                    >
                                      <FiMinus size={20} />
                                    </p>
                                    <p className="h-10 w-14 flex justify-center items-center border-x">
                                      {adultsNo}
                                    </p>
                                    <p
                                      className="p-2 cursor-pointer hover:bg-swPrimary500 hover:text-white"
                                      onClick={() => setAdultsNo(++adultsNo)}
                                    >
                                      <FiPlus size={20} />
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col gap-5">
                                <div className="flex justify-between items-center">
                                  <p className="">Kids</p>
                                  <div className="border hover:border-swPrimary500 rounded-md overflow-hidden flex">
                                    <p
                                      className="p-2 cursor-pointer hover:bg-swPrimary500 hover:text-white"
                                      onClick={() =>
                                        setKidsNo(kidsNo > 0 ? --kidsNo : 0)
                                      }
                                    >
                                      <FiMinus size={20} />
                                    </p>
                                    <p className="h-10 w-14 flex justify-center items-center border-x">
                                      {kidsNo}
                                    </p>
                                    <p
                                      className="p-2 cursor-pointer hover:bg-swPrimary500 hover:text-white"
                                      onClick={() => setKidsNo(++kidsNo)}
                                    >
                                      <FiPlus size={20} />
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col gap-5">
                                <div className="flex justify-between items-center">
                                  <p className="">Pets</p>
                                  <div className="border hover:border-swPrimary500 rounded-md overflow-hidden flex">
                                    <p
                                      className="p-2 cursor-pointer hover:bg-swPrimary500 hover:text-white"
                                      onClick={() =>
                                        setPetsNo(petsNo > 0 ? --petsNo : 0)
                                      }
                                    >
                                      <FiMinus size={20} />
                                    </p>
                                    <p className="h-10 w-14 flex justify-center items-center border-x">
                                      {petsNo}
                                    </p>
                                    <p
                                      className="p-2 cursor-pointer hover:bg-swPrimary500 hover:text-white"
                                      onClick={() => setPetsNo(++petsNo)}
                                    >
                                      <FiPlus size={20} />
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <p>Done?</p>
                                <Button
                                  bgColor={"bg-swPrimary500"}
                                  label={"Save"}
                                  textColor={"text-white"}
                                  endIcon={<IoCheckmark size={20} />}
                                  onClick={handleSavePassangers}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="flex gap-10 text-swGray800 mt-10">
            <div className="w-2/3">
              <p className="text-xl font-medium mb-5">Select Private Jet</p>
              <div className="w-full rounded-3xl border p-5 bg-white">
                {Array(4)
                  .fill()
                  .map((_, index) => (
                    <div key={index} className="">
                      <div className="transition ease-in-out delay-100 duration-1000 flex justify-between items-center hover:bg-swLighterBgGray p-5 rounded-xl cursor-pointer focus:border focus:outline-swPrimary500">
                        <div className="flex gap-5 items-center">
                          <input type="checkbox" className="h-5 w-5" />
                          <div className="text-swLightGray">
                            <p className="text-2xl font-medium">Hawker 800XP</p>
                            <p className="text-sm">Midsize Business Jet</p>
                          </div>
                        </div>
                        <div className="text-swGray800 gap-10 flex">
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-between gap-5">
                              <div className="flex items-center gap-2">
                                <SwSeatIcon className="text-xl" />
                                <p className="text-sm">8 seats</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <SwMeterIcon className="text-xl" />
                                <p className="text-sm">826 km/h speed</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <SwLeftRightArrowIcon className="text-xl" />
                                <p className="text-sm">6 feet</p>
                              </div>
                            </div>

                            <div className="flex justify-between gap-5">
                              <div className="flex items-center gap-2">
                                <SwLuggageIcon className="text-xl" />
                                <p className="text-sm">8 seats</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <SwMeterIcon className="text-xl" />
                                <p className="text-sm">826 km/h speed</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <SwTopBottomArrowIcon className="text-xl" />
                                <p className="text-sm">6 feet</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 py-2 px-4 rounded-full hover:bg-white">
                            <p className="font-medium">View details</p>
                            <SwArrowRightIcon className="text-sm" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                <Button
                  label={"Add to quote"}
                  className="border mt-5 text-swGray800 font-semibold"
                  bgColor={"bg-white hover:bg-swLightBgGray"}
                />
              </div>
            </div>
            <div className="w-1/3">
              <p className="text-xl font-medium mb-5">Flight Summary</p>
              <div className="w-full rounded-3xl border p-5  bg-white">
                <p className="font-semibold text-lg">
                  Flight from {sourceDetails?.city} , {sourceDetails?.country} -{" "}
                  {destinationDetails?.city}, {destinationDetails?.country}
                </p>
                <div className="flex gap-5 mt-5">
                  <div className="flex flex-col justify-between">
                    <div className="">
                      <p className="font-semibold text-lg">
                        {dateValue.format("h:mm a")}
                      </p>
                      <p className="text-sm">
                        {dateValue.format(`ddd D, MMM`)}
                      </p>
                    </div>
                    <div className="">
                      <p className="font-semibold text-lg">22:00 pm</p>
                      <p className="text-sm">Wed 20, Jan</p>
                    </div>
                  </div>

                  <div className="flex items-center flex-col gap-1 h-60 py-4">
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
                      <p className="font-semibold text-lg">
                        {dateValue.format("h:mm a")}
                      </p>
                      <p className="text-sm">
                        {sourceDetails?.name}, {sourceDetails?.city}
                      </p>
                    </div>
                    <p className="font-medium">12 Hours</p>
                    <div className="">
                      <p className="font-semibold text-lg">22:00 pm</p>
                      <p className="text-sm">
                        {destinationDetails?.name}, {destinationDetails?.city}
                      </p>
                    </div>
                  </div>
                </div>

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
                  onClick={() => router.push("/complete-profile")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavAndFooter>
  );
};

export default BookJet;
