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
import Button from "../Button";
import { useEffect, useState, useMemo, useCallback } from "react";
import airportsData from "../helpers/airportsData.json";
import dayjs from "dayjs";
import { HiArrowRight } from "react-icons/hi";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import SelectDate from "../../../utils/SelectDate";
import { toast } from "react-toastify";
import TripTypeButton from "./TripTypeButton";
import DetailCard from "./DetailCard";
import PassengerSelector from "./PassengerSelect";
import ReusableSelect from "../shared/ReusableSelect";

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
  const [airports, setAirports] = useState(airportsData || []);
  const [loading, setLoading] = useState(false);
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
        adults: 1,
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
      return newState;
    });
  };

  const handlePassangerCalc = (passenger, sign, index) => {
    setBookingState((prev) =>
      prev.map((booking, idx) => {
        if (idx === index) {
          const updatedPassengers = { ...booking.passengers };
          if (sign === "add") {
            updatedPassengers[passenger] += 1;
          } else if (updatedPassengers[passenger] > 1) {
            updatedPassengers[passenger] -= 1;
          }
          return { ...booking, passengers: updatedPassengers };
        }
        return booking;
      })
    );
  };

  const resetBookingState = useCallback(() => {
    setBookingState([
      {
        source: null,
        destination: null,
        depatureTime: null,
        depatureDate: null,
        returningTime: null,
        returningDate: null,
        passengers: {
          adults: 1,
          children: 0,
          pets: 0,
        },
      },
    ]);
  }, []);

  const options = useMemo(() => {
    return airports.map((item) => ({
      label: (
        <div className="flex justify-between hover:rounded-lg py-4 px-2">
          <div className="flex gap-1">
            <p className="text-[14px]">
              {item.city}
              {item.city && ", "}
              {item.country}
            </p>
            <p className="font-light italic text-sm text-swGray pl-1 text-[14px]">
              {item.name}
            </p>
          </div>
          <p className="text-swGray700">{item.iata_code}</p>
        </div>
      ),
      value: item,
    }));
  }, [airports]);

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
          adults: 1,
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
    if (pathname === "/booking") {
      const booking = JSON.parse(localStorage.getItem("bookingDetails"));
      if (booking !== null) {
        // console.log(booking);
        const tripType = booking?.booking_details?.tripType;
        const formData = booking?.booking_details?.formData;
        setBookingType(tripType);
        setBookingState(formData);
        setBookingDetails(booking);
        // setBookingDetails((prev) => ({
        //   ...prev,
        //   booking_details: {
        //     tripType,
        //     formData,
        //   },
        // }));
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
  }, [bookingType, bookingState, setBookingDetails]);

  useEffect(() => {
    if (data?.message) {
      resetBookingState();
    }
  }, [data, resetBookingState]);

  return (
    <main>
      {/* <ToastContainer /> */}
      <div className="w-full rounded-3xl mb-5">
        <div
          className={`rounded-3xl shadow-lg ${
            pathname === "/"
              ? "backdrop-blur-md bg-black/30 border border-white/20"
              : "bg-white border border-gray-200"
          } p-6`}
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-2 h-8 rounded-full ${
                  pathname === "/" ? "bg-white/30" : "bg-swPrimary500"
                }`}
              ></div>
              <h2
                className={`font-bold text-xl md:text-2xl ${
                  pathname === "/" ? "text-white" : "text-slate-800"
                }`}
              >
                Book your flight!
              </h2>
            </div>
            <div
              className={`p-2 rounded-2xl flex gap-1 font-medium shadow-lg ${
                pathname === "/"
                  ? "backdrop-blur-md bg-white/20 border border-white/30"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div className="flex">
                {["One way Trip", "Round Trip", "Multi-city Trip"].map(
                  (trip) => (
                    <TripTypeButton
                      key={trip}
                      type={trip}
                      isActive={bookingType === trip}
                      onClick={() => {
                        resetBookingState();
                        setBookingType(trip);
                      }}
                    />
                  )
                )}
              </div>{" "}
            </div>
            {pathname === "/" ? (
              <div
                className={`${space_grotesk.className} hidden md:block w-fit`}
                onClick={handleBookJet}
              >
                <Button
                  label="Book Jet"
                  bgColor={
                    "bg-gradient-to-r from-swPrimary500 to-swPrimary600 hover:from-swPrimary600 hover:to-swPrimary700"
                  }
                  textColor={"text-white"}
                  endIcon={<HiArrowRight size={20} />}
                  loader={loading}
                  disabled={loading || bookingBtnDisable()}
                  className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
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
                    } text-2xl cursor-pointer mt-1`}
                    onClick={() => handleRemoveTrip(index)}
                  />
                ) : null}
              </div>
              <div className="grid items-start gap-6 mx-auto grid-cols-1 lg:grid-cols-2 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative w-full">
                  <DetailCard
                    onClick={() => setOpenDeparture(index)}
                    headerText="Departure city"
                    icon={<SwDeparturePlaneIcon className="text-xl" />}
                    icon_bg={true}
                    rounded_css="rounded-tl-2xl rounded-tr-2xl md:rounded-tr-none md:rounded-l-none md:rounded-tl-2xl md:rounded-bl-2xl"
                  >
                    <p>
                      {!item?.source
                        ? "Select City"
                        : `${item?.source?.city} - ${item?.source?.country}`}
                    </p>
                  </DetailCard>
                  <DetailCard
                    onClick={() => setOpenArrival(index)}
                    headerText="Arrival city"
                    icon={<SwArrivalPlaneIcon className="text-xl" />}
                    icon_bg={true}
                    rounded_css="rounded-bl-2xl rounded-br-2xl md:rounded-l-none md:rounded-tr-2xl md:rounded-br-2xl"
                  >
                    <p>
                      {!item?.destination
                        ? "Select City"
                        : `${item?.destination?.city} - ${item?.destination?.country}`}
                    </p>
                  </DetailCard>

                  <div className="absolute h-full w-full top-0 left-0 flex justify-center items-center pointer-events-none">
                    <div className="hidden sm:block p-2 rounded-full bg-white/90 backdrop-blur-sm border border-white/50 shadow-lg z-10">
                      <GoArrowRight size={16} className="text-slate-700" />
                    </div>
                  </div>
                  {openDeparture === index && (
                    <ReusableSelect
                      isOpen={openDeparture !== null}
                      placeholder="Search Departure City"
                      searchable={true}
                      onClose={() => setOpenDeparture(null)}
                      format={options}
                      setValue={(selectedOption) => {
                        // console.log({ selectedOption });
                        updateBookingState({ source: selectedOption }, index);
                        setOpenDeparture(null);
                      }}
                    />
                  )}
                  {openArrival === index && (
                    <ReusableSelect
                      isOpen={openArrival !== null}
                      format={options}
                      searchable={true}
                      placeholder="Select Arrival City"
                      setValue={(selectedOption) => {
                        updateBookingState(
                          { destination: selectedOption },
                          openArrival
                        );
                        setOpenArrival(null);
                      }}
                      onClose={() => setOpenArrival(null)}
                    />
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
                  {bookingType === "Round Trip" ? (
                    <div className="relative grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-4">
                      <DetailCard
                        onClick={() => setDateOpen(index)}
                        headerText="Departure date"
                      >
                        <p>
                          {item.depatureDate
                            ? dayjs(
                                `${item.depatureDate} ${item.depatureTime}`
                              ).format("D MMM HH:mm")
                            : "Select"}
                        </p>
                      </DetailCard>
                      <DetailCard
                        onClick={() => setArrivalDateOpen(index)}
                        headerText="Return date"
                      >
                        <p>
                          {item?.returningDate
                            ? dayjs(
                                `${item.returningDate} ${item.returningTime}`
                              ).format("D MMM HH:mm")
                            : "Select"}
                        </p>
                      </DetailCard>
                    </div>
                  ) : (
                    <DetailCard
                      onClick={() => setDateOpen(index)}
                      headerText="Departure date"
                    >
                      <p>
                        {item?.depatureDate
                          ? dayjs(
                              `${item?.depatureDate} ${item?.depatureTime}`
                            ).format("D MMM HH:mm")
                          : "Select Date"}
                      </p>
                    </DetailCard>
                  )}
                  <SelectDate
                    isOpen={isDateOpen === index}
                    disablePast={true}
                    onChange={(value) => {
                      const selectedDate = dayjs(value);
                      const today = dayjs();

                      // Check if the selected date is before today
                      if (selectedDate.isBefore(today, "day")) {
                        toast.error("Departure date must be at least today");
                        return;
                      }

                      // If the selected date is today, check if the time is in the past
                      if (
                        selectedDate.isSame(today, "day") &&
                        selectedDate.isBefore(today)
                      ) {
                        toast.error("Departure time cannot be in the past");
                        return;
                      }

                      updateBookingState(value, index, "departure");
                    }}
                    onAccept={() => setDateOpen(null)}
                    onClose={() => setDateOpen(null)}
                    value={dayjs(`${item.depatureDate} ${item.depatureTime}`)}
                  />
                  <SelectDate
                    isOpen={isArrivalDateOpen === index}
                    disablePast={true}
                    onChange={(value) => {
                      const selectedArrivalDate = dayjs(value);
                      const departureDateTime = dayjs(
                        `${item.depatureDate} ${item.depatureTime}`
                      );
                      if (
                        selectedArrivalDate.diff(departureDateTime, "hour") < 3
                      ) {
                        toast.error(
                          "Arrival/Return date must be at least 3 hours later than the departure date",
                          {
                            style: { width: "auto", whiteSpace: "pre-wrap" },
                          }
                        );
                        return;
                      }

                      if (!item.depatureDate || !item.depatureTime) {
                        toast.error("Select departure date and time first");
                        return;
                      }

                      updateBookingState(value, index, "arrival");
                    }}
                    onAccept={() => setArrivalDateOpen(false)}
                    onClose={() => setArrivalDateOpen(false)}
                    value={dayjs(`${item.returningDate} ${item.returningTime}`)}
                  />

                  <div className="relative w-full">
                    <DetailCard
                      icon={<SwUserIcon className="text-xl" />}
                      icon_bg={true}
                      onClick={() => setOpenPassageners(index)}
                      headerText="Passengers"
                    >
                      <p>
                        <span className="block whitespace-nowrap">
                          {item?.passengers?.adults}{" "}
                          {item?.passengers?.adults === 1 ? "Adult" : "Adults"}
                        </span>
                        <span className="block whitespace-nowrap">
                          {item?.passengers?.children}{" "}
                          {item?.passengers?.children === 1
                            ? "Child"
                            : "Children"}
                        </span>
                      </p>
                    </DetailCard>
                    {openPassangers === index && (
                      <PassengerSelector
                        isOpen={openPassangers === index}
                        onClose={() => setOpenPassageners(null)}
                        onAdultChange={(action) =>
                          handlePassangerCalc("adults", action, index)
                        }
                        onChildChange={(action) =>
                          handlePassangerCalc("children", action, index)
                        }
                        adults={item.passengers.adults}
                        childrenprop={item.passengers.children}
                      />
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
                  loader={loading}
                  disabled={loading || bookingBtnDisable()}
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
