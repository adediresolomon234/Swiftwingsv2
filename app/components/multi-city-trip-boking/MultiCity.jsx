import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import Button from "../Button";
import { FiMinus, FiPlus } from "react-icons/fi";
import {
  SWMinusRoundBorderIcon,
  SWPlusRoundBorderIcon,
  SwArrivalPlaneIcon,
  SwCalendarIcon,
  SwDeparturePlaneIcon,
  SwUserIcon,
} from "../svgs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Select, TextField } from "@mui/material";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import airports from "../helpers/airports";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const MultiCity = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const [bookingEngine, setBookingEngine] = useState("One way Trip");
  const [openPassengers, setOpenPassageners] = useState([false]);
  const [openDeparture, setOpenDeparture] = useState(false);
  const [openArrival, setOpenArrival] = useState(false);
  // let [adultsNo, setAdultsNo] = useState(0);
  // let [kidsNo, setKidsNo] = useState(0);
  // let [petsNo, setPetsNo] = useState(0);
  const [allPassengers, setAllPassengers] = useState([
    {
      adults: 0,
      kids: 0,
      pets: 0,
    },
  ]);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [allAirports, setAllAirports] = useState(airports || []);
  const [departureAirport, setDepartureAirport] = useState(null);
  const [arrivalAirport, setArrivalAirport] = useState(null);
  const [isDateOpen, setDateOpen] = useState([false]);
  const [dateValue, setDateValue] = useState(dayjs());
  const [roundTripDateValue, setRoundTripDateValue] = useState(dayjs());
  const departureRef = useRef(null);
  const arrivalRef = useRef(null);
  const dateRef = useRef(null);
  const passengerRef = useRef(null);
  const [formData, setFormData] = useState([
    {
      user: {
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
      },
      status: "New",
      booking_details: {
        tripType: bookingEngine,
        formData: [
          {
            source: {
              label: `${departureAirport?.name} - ${departureAirport?.city} - ${departureAirport?.iata_code} ${departureAirport?.country}`,
              value: departureAirport,
              disabled: false,
            },
            destination: {
              label: `${arrivalAirport?.name} - ${arrivalAirport?.city} - ${arrivalAirport?.iata_code} ${arrivalAirport?.country}`,
              value: arrivalAirport,
              disabled: false,
            },
            depatureTime: `${dateValue?.$H}:${dateValue?.$m}`,
            returningTime: `${roundTripDateValue?.$H}:${roundTripDateValue?.$m}`,
            returningDate: `${roundTripDateValue?.$y}-${
              roundTripDateValue?.$M + 1
            }-${roundTripDateValue?.$D}`,
            depatureDate: `${dateValue?.$y}-${dateValue?.$M + 1}-${
              dateValue?.$D
            }`,
            // passengers: {
            //   adults: adultsNo,
            //   children: kidsNo,
            //   pets: petsNo,
            // },
          },
        ],
      },
      additional_quote: [],
    },
  ]);

  const options = airports.map((item) => ({
    label: (
      <div className="flex justify-between">
        <div className="flex gap-1">
          <p>
            {item.city}
            {item.city && ","} {item.country}
          </p>
          <p className="font-light italic text-sm text-swGray500">
            {item.name}
          </p>
        </div>
        <p>{item.iata_code}</p>
      </div>
    ),
    value: item,
  }));

  const getOptionLabel = (option) => option.label;

  const filterOption = (option, inputValue) => {
    const lowerCaseInput = inputValue.toLowerCase();

    return (
      option.value.city.toLowerCase().includes(lowerCaseInput) ||
      option.value.country.toLowerCase().includes(lowerCaseInput) ||
      option.value.name.toLowerCase().includes(lowerCaseInput) ||
      option.value.iata_code.toLowerCase().includes(lowerCaseInput)
    );
  };

  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };

  const handleSavePassengers = () => {
    // setAllPassengers((prev) => ({
    //   adults: adultsNo,
    //   kids: kidsNo,
    //   pets: petsNo,
    //   prev,
    // }));

    setOpenPassageners(new Array(openPassengers.length).fill(false));
  };

  const handleAddTrip = () => {
    setFormData((prev) => [
      ...prev,
      {
        user: {
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
        },
        status: "New",
        booking_details: {
          tripType: bookingEngine,
          formData: [
            {
              source: {
                label: `${departureAirport?.name} - ${departureAirport?.city} - ${departureAirport?.iata_code} ${departureAirport?.country}`,
                value: departureAirport,
                disabled: false,
              },
              destination: {
                label: `${arrivalAirport?.name} - ${arrivalAirport?.city} - ${arrivalAirport?.iata_code} ${arrivalAirport?.country}`,
                value: arrivalAirport,
                disabled: false,
              },
              depatureTime: `${dateValue?.$H}:${dateValue?.$m}`,
              returningTime: `${roundTripDateValue?.$H}:${roundTripDateValue?.$m}`,
              returningDate: `${roundTripDateValue?.$y}-${
                roundTripDateValue?.$M + 1
              }-${roundTripDateValue?.$D}`,
              depatureDate: `${dateValue?.$y}-${dateValue?.$M + 1}-${
                dateValue?.$D
              }`,
              // passengers: {
              //   adults: adultsNo,
              //   children: kidsNo,
              //   pets: petsNo,
              // },
            },
          ],
        },
        additional_quote: [],
      },
    ]);

    setDateOpen((prev) => [...prev, false]);
    setAllPassengers((prev) => [
      ...prev,
      {
        adults: 0,
        kids: 0,
        pets: 0,
      },
    ]);
    setOpenPassageners((prev) => [...prev, false]);
  };

  const handleRemoveTrip = (index) => {
    const updatedFormData = [...formData];
    updatedFormData.splice(index, 1);
    setFormData(updatedFormData);

    const updatedDateOpen = [...isDateOpen];
    updatedDateOpen.splice(index, 1);
    setDateOpen(updatedDateOpen);

    const updateAllPassengers = [...allPassengers];
    updateAllPassengers.splice(index, 1);
    setAllPassengers(updateAllPassengers);
  };

  const handleDateOpen = (index, state) => {
    const updateDateState = [...isDateOpen];
    updateDateState[index] = state;
    setDateOpen(updateDateState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click event occurred outside the container

      if (!departureRef?.current?.contains(event.target)) {
        setOpenDeparture(false);
        // console.log("departure clicked");
      }
      if (!arrivalRef?.current?.contains(event.target)) {
        setOpenArrival(false);
        // console.log("arrival clicked");
      }
      // if (!dateRef?.current?.contains(event.target)) {
      //   setDateOpen(false);
      //   console.log("date clicked");
      // }
      if (!passengerRef?.current?.contains(event.target)) {
        setOpenPassageners(new Array(openPassengers.length).fill(false));
      }
    };

    // Add event listener for click events
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Remove event listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {});

  return (
    <div>
      {formData?.map((item, index) => (
        <div key={index} className="flex flex-col mb-5">
          <div className="mb-2 flex gap-5 justify-end w-full">
            {index > 0 && (
              <SWMinusRoundBorderIcon
                className={`${
                  pathname === "/" ? "text-white" : "text-swPrimary500"
                } text-2xl cursor-pointer`}
                onClick={() => handleRemoveTrip(index)}
              />
            )}
          </div>
          <div className="flex items-center gap-5 mx-auto flex-wrap">
            <div className="flex items-center mx-auto relative">
              <div
                className="p-5 pr-16 flex h-[5.5rem] w-[18rem] items-center gap-5 border border-swGray900 backdrop-blur bg-swBlack/40 hover:bg-swBlack/50 rounded-tl-2xl rounded-bl-2xl cursor-pointer"
                onClick={(e) => {
                  setOpenDeparture(!openDeparture);
                }}
              >
                <div className="bg-swPrimary500 p-1 rounded-full">
                  <div className="h-7 w-7 relative flex justify-center items-center">
                    <SwDeparturePlaneIcon className="text-[1.6rem]" />
                  </div>
                </div>
                <div>
                  <p className="text-swGray500 text-sm">Departure city</p>
                  <p className="text-white font-medium">
                    {/* Abuja - Nigeria */}
                    {departureAirport === null
                      ? "Select City"
                      : `${departureAirport.city} - ${departureAirport.country}`}
                  </p>
                </div>
              </div>
              <div className="p-1 rounded-full border border-swGray900 text-swBlack ml-[47.5%] bg-white absolute z-10">
                <GoArrowRight size={15} className={"-mb-2 ml-1"} />
                <GoArrowLeft size={15} className="-mt-2 mr-1" />
              </div>
              <div
                className="p-5 pr-16 flex h-[5.5rem] w-[18rem] items-center gap-5 border border-swGray900 backdrop-blur bg-swBlack/40 hover:bg-swBlack/50 border-l-transparent rounded-tr-2xl rounded-br-2xl cursor-pointer"
                onClick={(e) => {
                  setOpenArrival(!openArrival);
                }}
              >
                <div className="bg-swPrimary500 p-1 rounded-full">
                  <div className="h-7 w-7 relative flex justify-center items-center">
                    <SwArrivalPlaneIcon className="text-[1.6rem]" />
                  </div>
                </div>
                <div>
                  <p className="text-swGray500 text-sm">Arrival city</p>
                  <p className="text-white font-medium">
                    {/* Lagos - Nigeria */}
                    {arrivalAirport === null
                      ? "Select City"
                      : `${arrivalAirport.city} - ${arrivalAirport.country}`}
                  </p>
                </div>
              </div>

              {openDeparture && (
                <div
                  // id="depart"
                  ref={departureRef}
                  className="absolute text-swGray800 top-24 w-full z-10"
                >
                  <Select
                    getOptionLabel={getOptionLabel}
                    options={options}
                    filterOption={filterOption}
                    placeholder="Select Departure City"
                    onChange={(selectedOption) => {
                      setDepartureAirport(selectedOption.value);
                      setOpenDeparture(false);
                    }}
                  />
                </div>
              )}
              {openArrival && (
                <div
                  id="arrive"
                  ref={arrivalRef}
                  className="absolute text-swGray800 top-24 w-full z-10"
                >
                  <Select
                    getOptionLabel={getOptionLabel}
                    options={options}
                    filterOption={filterOption}
                    placeholder="Select Arrival City"
                    onChange={(selectedOption) => {
                      setArrivalAirport(selectedOption.value);
                      setOpenArrival(false);
                    }}
                  />
                </div>
              )}
            </div>
            <div className="flex justify-around gap-5 mx-auto flex-wrap">
              <div
                onClick={() => handleDateOpen(index, true)}
                className="relative p-5 flex h-[5.5rem] w-[18rem] items-center gap-5 border border-swGray900 backdrop-blur bg-swBlack/40 hover:bg-swBlack/50 rounded-2xl cursor-pointer"
                // ref={dateRef}
              >
                {!isDateOpen[index] && (
                  <div className="p-2 rounded-full text-white">
                    <SwCalendarIcon className="text-xl" />
                  </div>
                )}
                {!isDateOpen[index] && (
                  <div>
                    <p className="text-swGray500 text-sm">Departure date</p>
                    <p className=" text-white font-semibold">
                      {dateValue.format("D MMM")}
                    </p>
                  </div>
                )}

                {isDateOpen[index] && (
                  <div
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
                          onClose={() => handleDateOpen(index, false)}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </div>
                    </LocalizationProvider>
                  </div>
                )}
              </div>
              <div className="relative">
                <div
                  className="p-5 flex items-center h-[5.5rem] w-72 gap-5 border border-swGray900 backdrop-blur bg-swBlack/40 hover:bg-swBlack/50 rounded-2xl cursor-pointer"
                  onClick={() =>
                    setOpenPassageners((prev) => [
                      ...prev,
                      (prev[index] = true),
                    ])
                  }
                >
                  <div className="p-2 rounded-full text-swGray900">
                    <SwUserIcon className="text-xl" />
                  </div>
                  <div>
                    <p className="text-swGray500 text-sm">Occupants</p>
                    <p className="text-white font-medium">
                      Adults - {allPassengers[index]?.adults} Children -{" "}
                      {allPassengers[index]?.kids} Pets -{" "}
                      {allPassengers[index]?.pets}
                    </p>
                  </div>
                </div>
                {openPassengers[index] && (
                  <div
                    ref={passengerRef}
                    className="absolute text-swGray900 top-24 bg-white w-full shadow-md rounded-md z-10"
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
                                setAllPassengers((prev) => [
                                  ...prev,
                                  prev[index].adults > 0
                                    ? --allPassengers[index].adults
                                    : 0,
                                ])
                              }
                            >
                              <FiMinus size={20} />
                            </p>
                            <p className="h-10 w-14 flex justify-center items-center border-x">
                              {allPassengers[index]?.adults}
                            </p>
                            <p
                              className="p-2 cursor-pointer hover:bg-swPrimary500 hover:text-white"
                              onClick={() =>
                                setAllPassengers((prev) => [
                                  ...prev,
                                  ++allPassengers[index].adults,
                                ])
                              }
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
                                setAllPassengers((prev) => [
                                  ...prev,
                                  prev[index].kids > 0 ? --prev[index].kids : 0,
                                ])
                              }
                            >
                              <FiMinus size={20} />
                            </p>
                            <p className="h-10 w-14 flex justify-center items-center border-x">
                              {allPassengers[index]?.kids}
                            </p>
                            <p
                              className="p-2 cursor-pointer hover:bg-swPrimary500 hover:text-white"
                              onClick={() =>
                                setAllPassengers((prev) => [
                                  ...prev,
                                  ++prev[index].kids,
                                ])
                              }
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
                                // setPetsNo(petsNo > 0 ? --petsNo : 0)
                                setAllPassengers((prev) => [
                                  ...prev,
                                  prev[index].pets > 0 ? --prev[index].pets : 0,
                                ])
                              }
                            >
                              <FiMinus size={20} />
                            </p>
                            <p className="h-10 w-14 flex justify-center items-center border-x">
                              {allPassengers[index]?.pets}
                            </p>
                            <p
                              className="p-2 cursor-pointer hover:bg-swPrimary500 hover:text-white"
                              onClick={() =>
                                setAllPassengers((prev) => [
                                  ...prev,
                                  ++prev[index].pets,
                                ])
                              }
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
                          onClick={handleSavePassengers}
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
      <div className="mt-2 flex gap-5 justify-center w-full">
        <SWPlusRoundBorderIcon
          className={`${
            pathname === "/" ? "text-white" : "text-swPrimary500"
          } text-2xl cursor-pointer`}
          onClick={handleAddTrip}
        />
      </div>
    </div>
  );
};

export default MultiCity;
