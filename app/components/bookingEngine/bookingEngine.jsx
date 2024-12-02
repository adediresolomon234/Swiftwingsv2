import { Space_Grotesk } from "next/font/google";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import {
  SWMinusRoundBorderIcon,
  SWPlusRoundBorderIcon,
  SwArrivalPlaneIcon,
  SwCalendarIcon,
  SwDeparturePlaneIcon,
  SwSearchIcon,
  SwUserIcon,
} from "../svgs";
import Select from "react-select";
import { FiMinus, FiPlus } from "react-icons/fi";
import Button from "../Button";
import { IoCheckmark } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import airportsData from "../helpers/airportsData.json";
import dayjs from "dayjs";
import { HiArrowRight } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import SelectDate from "@/utils/SelectDate";

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});

const BookingEngine = ({ setBookingDetails }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [bookingType, setBookingType] = useState("One way Trip");
  const [openDeparture, setOpenDeparture] = useState(null);
  const [openArrival, setOpenArrival] = useState(null);
  const [isDateOpen, setDateOpen] = useState(null);
  const [isArrivalDateOpen, setArrivalDateOpen] = useState(false);
  const [openPassangers, setOpenPassageners] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [airports, setAirports] = useState(airportsData || []);
  const departureRef = useRef(null);
  const arrivalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  // const dateRef = useRef(null);
  const passengerRef = useRef(null);
  const { data } = useSelector((state) => state.booking);

  const [bookingState, setBookingState] = useState([
    {
      source: null,
      destination: null,
      depatureTime: null,
      depatureDate: null,
      returningTime: null,
      returningDate: null,
      passengers: {
        adults: 0,
        children: 0,
        pets: 0,
      },
    },
  ]);

  const updateBookingState = (updatedFields, index, date) => {
    setBookingState((prevState) => {
      const newState = prevState.map((booking, idx) => {
        if (idx === index) {
          if (date) {
            if (date === "departure") {
              return {
                ...booking,
                depatureDate: `${updatedFields?.$y}-${updatedFields?.$M + 1}-${
                  updatedFields?.$D
                }`,
                depatureTime: `${updatedFields?.$H}:${updatedFields?.$m}`,
              };
            } else {
              return {
                ...booking,
                returningDate: `${updatedFields?.$y}-${updatedFields?.$M + 1}-${
                  updatedFields?.$D
                }`,
                returningTime: `${updatedFields?.$H}:${updatedFields?.$m}`,
              };
            }
          } else {
            return {
              ...booking,
              ...updatedFields,
            };
          }
        } else {
          return booking; // Return original state for other indices
        }
      });
      // console.log({ newState });
      return newState;
    });
  };

  const handlePassangerCalc = (passenger, sign, index) => {
    setBookingState((prev) => {
      const updatedPassengers = [...prev];
      if (sign === "add") {
        updatedPassengers[index].passengers[passenger] += 1;
      } else {
        if (updatedPassengers[index].passengers[passenger] > 0) {
          updatedPassengers[index].passengers[passenger] -= 1;
        }
      }
      return updatedPassengers;
    });
  };

  const resetBookingState = () => {
    setBookingState([
      {
        source: null,
        destination: null,
        depatureTime: null,
        depatureDate: null,
        returningTime: null,
        returningDate: null,
        passengers: {
          adults: 0,
          children: 0,
          pets: 0,
        },
      },
    ]);
  };

  const options = airports.map((item) => ({
    label: (
      <div className="flex justify-between hover:bg-swPrimary100 focus:bg-swPrimary100 hover:rounded-lg hover:border py-4 px-2">
        <div className="flex gap-1 ">
          <p className="text-[14px]">
            {item.city}
            {item.city && ", "}
            {item.country}
          </p>
          <p className="font-light italic text-sm text-swGray pl-1 text-[14px]">
            {item.name}
          </p>
        </div>
        <p className="text-swGray500">{item.iata_code}</p>
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

  const bookingBtnDisable = () => {
    if (bookingType === "Round Trip") {
      if (
        bookingState[0].source &&
        bookingState[0].destination &&
        bookingState[0].depatureDate &&
        bookingState[0].depatureTime &&
        bookingState[0].returningDate &&
        bookingState[0].returningTime &&
        bookingState[0].passengers.adults > 0
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      if (
        bookingState[0].source &&
        bookingState[0].destination &&
        bookingState[0].depatureDate &&
        bookingState[0].depatureTime &&
        bookingState[0].passengers.adults > 0
      ) {
        return false;
      } else {
        return true;
      }
    }
  };

  const colourStyles = {
    control: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: "white",
      padding: "5px",
      borderRadius: "5px",
      outline: isFocused ? "none" : "initial",
      boxShadow: isFocused ? "none" : "initial",
    }),
    option: (styles) => ({ ...styles, backgroundColor: "white" }),
  };


  const handleRemoveTrip = (index) => {
    const updatedFormData = bookingState.filter((_, idx) => idx !== index);
    setBookingState(updatedFormData);
  };

  const handleAddTrip = () => {
    setBookingState((prev) => [
      ...prev,
      {
        source: null,
        destination: null,
        depatureTime: null,
        depatureDate: null,
        returningTime: null,
        returningDate: null,
        passengers: {
          adults: 0,
          children: 0,
          pets: 0,
        },
      },
    ]);
  };

  const handleBookJet = () => {
    const booking = {
      user: null,
      status: "New",
      booking_details: {
        tripType: bookingType,
        formData: bookingState,
      },
      additional_quote: [],
    };
    if (typeof self !== "undefined") {
      localStorage.setItem("bookingDetails", JSON.stringify(booking));
    }

    // setTimeout(() => {
    setLoading(true);
    router.push("/booking");
    // }, 1000);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!departureRef?.current?.contains(event.target)) {
        setOpenDeparture(null);
      }
      if (!arrivalRef?.current?.contains(event.target)) {
        setOpenArrival(null);
      }
      if (!passengerRef?.current?.contains(event.target)) {
        setOpenPassageners(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    if (pathname === "/booking") {
      const booking = JSON.parse(localStorage.getItem("bookingDetails"));
      // console.log({ booking });
      if (booking !== null) {
        const tripType = booking?.booking_details?.tripType;
        const formData = booking?.booking_details?.formData;
        setBookingType(tripType);
        setBookingState(formData);
        setBookingDetails((prev) => ({
          ...prev,
          booking_details: {
            tripType,
            formData,
          },
        }));
      }
    }
    // else {
    //   localStorage.removeItem("bookingDetails");
    // }
  }, [pathname]);

  useEffect(() => {
    if (setBookingDetails) {
      setBookingDetails((prev) => ({
        ...prev,
        booking_details: {
          tripType: bookingType,
          formData: bookingState,
        },
      }));
    }
  }, [bookingType, bookingState]);

  useEffect(() => {
    if (data?.message) {
      resetBookingState();
    }
  }, [data]);

  console.log({ isArrivalDateOpen, isDateOpen });

  return (
    <main>
      <div className="w-full rounded-3xl  ">
        <div
          className={`p-0 rounded-3xl  ${
            pathname === "/"
              ? "backdrop-blur bg-black/25 border border-swGray900"
              : "bg-white border"
          } p-5 `}
        >
          <div
            className={`flex flex-wrap sm:justify-between sm:items-center mb-5 ${
              pathname === "/" ? "flex-col sm:flex-row" : "flex-col sm:flex-row"
            }`}
          >
            <p
              className={`font-me ${
                pathname === "/" ? "text-white" : "text-swGray800"
              } ml-2 text-lg mt-5 md:mt-0`}
            >
              Book your flight!
            </p>
            <div
              className={`p-1 text-xl rounded-full flex gap-5 font-medium ${
                pathname === "/"
                  ? "sm:backdrop-blur sm:bg-white/25"
                  : "bg-white sm:bg-swGray50"
              }`}
            >
              <div className="flex">
                <button
                  className={`${
                    bookingType === "One way Trip"
                      ? `${
                          pathname === "/"
                            ? "text-white backdrop-blur bg-none md:bg-swBlack/50"
                            : "text-swPrimary500 bg-white"
                        } font-semibold text-sm md:text-lg`
                      : `text-swGray500 font-medium hover:backdrop-blur hover:bg-white/5 text-sm md:text-lg`
                  } py-2 px-4 rounded-full`}
                  onClick={() => {
                    resetBookingState();
                    setBookingType("One way Trip");
                  }}
                >
                  One-way Trip
                </button>
                <button
                  className={`${
                    bookingType === "Round Trip"
                      ? `${
                          pathname === "/"
                            ? "text-white backdrop-blur  bg-none md:bg-swBlack/50"
                            : "text-swPrimary500 bg-white"
                        } font-semibold text-sm md:text-lg`
                      : "text-swGray500 font-medium hover:backdrop-blur hover:bg-white/5 text-sm md:text-lg"
                  } py-2 px-4 rounded-full`}
                  onClick={() => {
                    resetBookingState();
                    setBookingType("Round Trip");
                  }}
                >
                  Round Trip
                </button>
                <button
                  className={`${
                    bookingType === "Multi-city Trip"
                      ? `${
                          pathname === "/"
                            ? "text-white backdrop-blur  bg-none md:bg-swBlack/50"
                            : "text-swPrimary500 bg-white"
                        } font-semibold text-sm md:text-lg`
                      : "text-swGray500 font-medium hover:bg-white/5 text-sm md:text-lg"
                  } py-2 px-4 rounded-full`}
                  onClick={() => {
                    resetBookingState();
                    setBookingType("Multi-city Trip");
                  }}
                >
                  Multi-city Trip
                </button>
              </div>
              {/* <div
                className={`sm:hidden w-full self-stretch rounded-lg overflow-hidden flex flex-row items-center justify-center p-2 gap-4 text-grey-grey-500  border-solid border-gray-900 ${
                  pathname === "/" ? "text-white" : "text-swPrimary500"
                }`}
              >
                <div className="flex-1 flex flex-row items-center justify-center">
                  <div className="flex-1 relative leading-8">
                    <select
                      className="backdrop-blur bg-swBlack/50 text-white text-sm rounded-lg block w-full p-3 focus:ring-white focus:border-white p-4 focus:outline-none"
                      onChange={(e) => setBookingType(e.target.value)}
                    >
                      <option value="One way Trip">One Way Trip</option>
                      <option value="Round Trip">Round Trip</option>
                      <option value="Multi-city Trip">Multi-city Trip</option>
                    </select>
                  </div>
                </div>
              </div> */}
            </div>
            {pathname === "/" ? (
              <div
                className={`${space_grotesk.className} hidden md:block  w-fit text-lg`}
                onClick={handleBookJet}
              >
                <Button
                  label="Book Jet"
                  bgColor={"bg-swPrimary500 hover:bg-swPrimary600"}
                  textColor={"text-white"}
                  endIcon={<HiArrowRight size={20} />}
                  loader={loading}
                  disabled={loading || bookingBtnDisable()}
                />
              </div>
            ) : (
              <div className="text-white p-5 rounded-full bg-swPrimary500 hidden md:block">
                <SwSearchIcon className="text-[1rem]" />
              </div>
            )}
          </div>

          {bookingState.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between w-full h-full"
            >
              <div className="mb-2 flex gap-5 justify-end w-full">
                {bookingType === "Multi-city Trip" && index > 0 ? (
                  <SWMinusRoundBorderIcon
                    className={`${
                      pathname === "/" ? "text-white" : "text-swPrimary500"
                    } text-2xl cursor-pointer`}
                    onClick={() => handleRemoveTrip(index)}
                  />
                ) : null}
              </div>
              <div className="grid items-center gap-5 mx-auto grid-cols-1 md:grid-cols-2 md:grid-rows-1 w-full">
                <div className="mx-auto grid-cols-1 md:grid-rows-1 md:grid-cols-2 grid relative w-full">
                  <div
                    className={`flex h-[5.5rem] z-10 pl-5 relative w-full items-center gap-5 border backdrop-blur rounded-tl-2xl rounded-tr-2xl md:rounded-tr-none md:rounded-l-none md:rounded-tl-2xl md:rounded-bl-2xl cursor-pointer  ${
                      pathname === "/"
                        ? "border-swGray900 bg-swBlack/40 hover:bg-swBlack/40"
                        : ""
                    }`}
                    onClick={() => setOpenDeparture(index)}
                  >
                    <div className="bg-swPrimary500 p-1 rounded-full text-white">
                      <div className="h-7 w-7 relative flex justify-center items-center">
                        <SwDeparturePlaneIcon className="text-[1.6rem]" />
                      </div>
                    </div>
                    <div>
                      <p className="text-swGray500 text-sm">Departure city</p>
                      <p
                        className={`${
                          pathname == "/" ? "text-white" : "text-swGray900"
                        }  font-medium`}
                      >
                        {!item?.source
                          ? "Select City"
                          : `${item?.source?.city} - ${item?.source?.country}`}
                      </p>
                    </div>
                  </div>

                  <div className="absolute h-full w-full top-0 left-0 flex justify-center items-center">
                    <div className="hidden sm:block p-1 rounded-full border border-swGray900 text-swBlack bg-white z-10">
                      <GoArrowRight size={15} className="-mb-2 ml-1" />
                      <GoArrowLeft size={15} className="-mt-2 mr-1" />
                    </div>
                  </div>
                  <div
                    className={`p-5 flex h-[5.5rem] relative w-full items-center gap-5 border backdrop-blur rounded-bl-2xl rounded-br-2xl md:mt-0 md:rounded-tr-2xl md:rounded-l-none md:rounded-tr-2xl md:rounded-br-2xl cursor-pointer ${
                      pathname === "/"
                        ? "border-swGray900 bg-swBlack/40 hover:bg-swBlack/40"
                        : ""
                    }`}
                    onClick={() => setOpenArrival(index)}
                  >
                    <div className="bg-swPrimary500 p-1 rounded-full text-white">
                      <div className="h-7 w-7 relative flex justify-center items-center">
                        <SwArrivalPlaneIcon className="text-[1.6rem]" />
                      </div>
                    </div>
                    <div>
                      <p className="text-swGray500 text-sm">Arrival city</p>
                      <p
                        className={`${
                          pathname == "/" ? "text-white" : "text-swGray900"
                        }  font-medium`}
                      >
                        {!item?.destination
                          ? "Select City"
                          : `${item?.destination?.city} - ${item?.destination?.country}`}
                      </p>
                    </div>
                  </div>
                  {openDeparture === index && (
                    <div
                      ref={departureRef}
                      className="absolute text-swGray800 top-[5.5rem] md:top-full mt-1 w-full z-20"
                    >
                      <Select
                        styles={colourStyles}
                        getOptionLabel={getOptionLabel}
                        options={options}
                        filterOption={filterOption}
                        placeholder={
                          <div
                            style={{
                              position: "absolute",
                              left: "10px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              color: "#c2c2c2",
                              pointerEvents: "none",
                              display: "flex",
                              alignItems: "center",
                              fontWeight: "lighter"
                            }}
                          >
                            <FaSearch
                              style={{
                                marginRight: "5px",
                                fontWeight: "lighter",
                              }}
                            />{" "}
                            Enter Departure city
                          </div>
                        }
                        onChange={(selectedOption) => {
                          updateBookingState(
                            { source: selectedOption.value },
                            index
                          );
                          setOpenDeparture(null);
                        }}
                      />
                    </div>
                  )}
                  {openArrival === index && (
                    <div
                      id="arrive"
                      ref={arrivalRef}
                      className="absolute text-swGray800 top-full mt-1 w-full z-20"
                    >
                      <Select
                        styles={colourStyles}
                        getOptionLabel={getOptionLabel}
                        options={options}
                        filterOption={filterOption}
                        placeholder={
                          <div
                            style={{
                              position: "absolute",
                              left: "10px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              color: "#c2c2c2",
                              pointerEvents: "none",
                              display: "flex",
                              alignItems: "center",
                              fontWeight: "lighter",
                            }}
                          >
                            <FaSearch
                              style={{
                                marginRight: "5px",
                                fontWeight: "lighter",
                              }}
                            />{" "}
                            Enter Arrival City
                          </div>
                        }
                        onChange={(selectedOption) => {
                          updateBookingState(
                            {
                              destination: selectedOption.value,
                            },
                            index
                          );
                          setOpenArrival(null);
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-2 w-full gap-5">
                  <div
                    className={`relative p-5 flex h-[5.5rem] w-full items-center gap-5 ${
                      pathname === "/"
                        ? " border-swGray900 backdrop-blur bg-swBlack/40 hover:bg-swBlack/40"
                        : ""
                    } border rounded-2xl cursor-pointer`}
                    // ref={dateRef}
                  >
                    {/* {isDateOpen !== index ? ( */}
                    <div
                      className={`p-2 rounded-full border ${
                        pathname === "/" ? "text-white" : "text-swGray900"
                      }`}
                    >
                      <SwCalendarIcon className="text-xl" />
                    </div>
                    {/* ) : (
                      ""
                    )} */}

                    <div className="w-full h-full ">
                      {bookingType === "Round Trip" ? (
                        <div className="w-full h-full">
                          {!isDateOpen === index ? (
                            <div onClick={() => setDateOpen(index)}>
                              <p className="text-swGray500 text-sm">
                                Departure and arrival date
                              </p>
                              <p
                                className={`${
                                  pathname === "/"
                                    ? "text-white"
                                    : "text-swGray900"
                                }`}
                              >
                                {item.depatureDate
                                  ? dayjs(
                                      `${item.depatureDate} ${item.depatureTime}`
                                    ).format("D MMM HH:mm")
                                  : "Select Departure"}{" "}
                                -{" "}
                                {item.depatureDate
                                  ? dayjs(
                                      `${item.returningDate} ${item.returningTime}`
                                    ).format("D MMM HH:mm")
                                  : "Select Arrival"}
                              </p>
                            </div>
                          ) : (
                            <div className="w-full flex h-full">
                              <div
                                onClick={() => setDateOpen(index)}
                                className={`text-sm w-full h-full flex items-center justify-center ${
                                  pathname === "/"
                                    ? "text-white"
                                    : "text-swGray900"
                                }`}
                              >
                                {item.depatureDate
                                  ? dayjs(
                                      `${item.depatureDate} ${item.depatureTime}`
                                    ).format("D MMM HH:mm")
                                  : "Deptarture"}
                              </div>
                              <div
                                className={`text-sm ml-5 w-full h-full flex items-center justify-center ${
                                  pathname === "/"
                                    ? "text-white"
                                    : "text-swGray900"
                                }`}
                                onClick={() => {
                                  setArrivalDateOpen(true);
                                  console.log("huuu");
                                }}
                              >
                                {item.depatureDate
                                  ? dayjs(
                                      `${item.returningDate} ${item.returningTime}`
                                    ).format("D MMM HH:mm")
                                  : "Arrival"}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div onClick={() => setDateOpen(index)}>
                          <p className="text-swGray500 text-sm h-full">
                            Departure date
                          </p>
                          <p
                            className={`${
                              pathname == "/" ? "text-white" : "text-swGray900"
                            } font-medium`}
                          >
                            {item?.depatureDate
                              ? dayjs(
                                  `${item?.depatureDate} ${item?.depatureTime}`
                                ).format("D MMM HH:mm")
                              : "Select Date"}
                          </p>
                        </div>
                      )}
                    </div>
                    <SelectDate
                      isOpen={isDateOpen === index}
                      onChange={(value) =>
                        updateBookingState(value, index, "departure")
                      }
                      onAccept={() => setDateOpen(null)}
                      onClose={() => setDateOpen(null)}
                      value={dayjs(`${item.depatureDate} ${item.depatureTime}`)}
                    />
                    <SelectDate
                      isOpen={isArrivalDateOpen}
                      onChange={(value) =>
                        updateBookingState(value, index, "returning")
                      }
                      onClose={() => setArrivalDateOpen(false)}
                      value={dayjs(
                        `${item.returningDate} ${item.returningTime}`
                      )}
                    />
                  </div>
                  <div className="relative w-full">
                    <div
                      className={`p-5 flex items-center h-[5.5rem] w-full gap-5 border ${
                        pathname === "/"
                          ? "border-swGray900 backdrop-blur bg-swBlack/40 hover:bg-swBlack/40"
                          : ""
                      }  rounded-2xl cursor-pointer`}
                      onClick={() => setOpenPassageners(index)}
                    >
                      <div
                        className={`p-2 border rounded-full ${
                          pathname === "/" ? "text-white" : "text-swGray900"
                        }`}
                      >
                        <SwUserIcon className="text-xl" />
                      </div>
                      <div>
                        <p className="text-swGray500 text-sm">Passengers</p>
                        <p
                          className={`font-medium ${
                            pathname === "/" ? "text-white" : "text-swGray900"
                          }`}
                        >
                          <span className="block whitespace-nowrap">
                            {item?.passengers?.adults}{" "}
                            {item?.passengers?.adults === 1
                              ? "Adult"
                              : "Adults"}
                          </span>
                          <span className="block whitespace-nowrap">
                            {item?.passengers?.children}{" "}
                            {item?.passengers?.children === 1
                              ? "Child"
                              : "Children"}
                          </span>
                          {/* -{" "}{item?.passengers?.pets} */}
                        </p>
                      </div>
                    </div>
                    {openPassangers === index && (
                      <div
                        ref={passengerRef}
                        className="absolute text-swGray900 top-24 bg-white max-w-[60rem] right-0 shadow-md rounded-md z-20"
                      >
                        <div className="p-5 flex flex-col gap-5 font-medium">
                          <p className="font-semibold text-lg">Passengers</p>
                          <div className="flex flex-col gap-5">
                            <div className="flex justify-between items-center">
                              <p className="">Adults</p>
                              <div className="border hover:border-swPrimary500 rounded-md overflow-hidden flex">
                                <p
                                  className="p-2 cursor-pointer hover:bg-swPrimary500 hover:text-white"
                                  onClick={() =>
                                    handlePassangerCalc("adults", "sub", index)
                                  }
                                >
                                  <FiMinus size={20} />
                                </p>
                                <p className="h-10 w-14 flex justify-center items-center border-x">
                                  {item?.passengers?.adults}
                                </p>
                                <p
                                  className="p-2 cursor-pointer hover:bg-swPrimary500 hover:text-white"
                                  onClick={() =>
                                    handlePassangerCalc("adults", "add", index)
                                  }
                                >
                                  <FiPlus size={20} />
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-5">
                            <div className="flex justify-between items-center">
                              <p className="">Children</p>
                              <div className="border hover:border-swPrimary500 rounded-md overflow-hidden flex">
                                <p
                                  className="p-2 cursor-pointer hover:bg-swPrimary500 hover:text-white"
                                  onClick={() =>
                                    handlePassangerCalc(
                                      "children",
                                      "sub",
                                      index
                                    )
                                  }
                                >
                                  <FiMinus size={20} />
                                </p>
                                <p className="h-10 w-14 flex justify-center items-center border-x">
                                  {item?.passengers?.children}
                                </p>
                                <p
                                  className="p-2 cursor-pointer hover:bg-swPrimary500 hover:text-white"
                                  onClick={() =>
                                    handlePassangerCalc(
                                      "children",
                                      "add",
                                      index
                                    )
                                  }
                                >
                                  <FiPlus size={20} />
                                </p>
                              </div>
                            </div>
                          </div>
                          {/* <div className="flex flex-col gap-5">
                            <div className="flex justify-between items-center">
                              <p className="">Pets</p>
                              <div className="border hover:border-swPrimary500 rounded-md overflow-hidden flex">
                                <p
                                  className="p-2 cursor-pointer hover:bg-swPrimary500 hover:text-white"
                                  onClick={() =>
                                    handlePassangerCalc("pets", "sub", index)
                                  }
                                >
                                  <FiMinus size={20} />
                                </p>
                                <p className="h-10 w-14 flex justify-center items-center border-x">
                                  {item.passengers.pets}
                                </p>
                                <p
                                  className="p-2 cursor-pointer hover:bg-swPrimary500 hover:text-white"
                                  onClick={() =>
                                    handlePassangerCalc("pets", "add", index)
                                  }
                                >
                                  <FiPlus size={20} />
                                </p>
                              </div>
                            </div>
                          </div> */}
                          <p className="text-swGray500 text-xs italics">
                            Please specify at least One adult
                          </p>

                          <div className="flex items-center justify-between">
                            <p>Done?</p>
                            <Button
                              bgColor={"bg-swPrimary500"}
                              label={"Save"}
                              textColor={"text-white"}
                              endIcon={<IoCheckmark size={20} />}
                              onClick={() => setOpenPassageners(null)}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {bookingType === "Multi-city Trip" && (
            <div className="mt-2 flex gap-5 justify-center w-full">
              <SWPlusRoundBorderIcon
                className={`${
                  pathname === "/" ? "text-white" : "text-swPrimary500"
                } text-2xl cursor-pointer`}
                onClick={handleAddTrip}
              />
            </div>
          )}
          <div className="md:hidden my-6 flex justify-end">
            {pathname === "/" ? (
              <div
                className={`${space_grotesk.className} w-fit text-lg `}
                onClick={handleBookJet}
              >
                <Button
                  label="Book Jet"
                  bgColor={"bg-white hover:bg-swPrimary600"}
                  textColor={"hover:text-white text-swGray800"}
                  endIcon={<HiArrowRight size={20} />}
                  disabled={bookingBtnDisable()}
                />
              </div>
            ) : (
              <div className="text-swGray800 p-5 rounded-full bg-white border">
                <SwSearchIcon className="text-[1rem]" />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookingEngine;
