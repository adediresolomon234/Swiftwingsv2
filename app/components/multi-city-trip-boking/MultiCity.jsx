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
import { TextField } from "@mui/material";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import airports from "../helpers/airports";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Select from "react-select";

const MultiCity = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  // const [bookingEngine, setBookingEngine] = useState("One way Trip");
  const [openPassengers, setOpenPassageners] = useState([false]);
  const [openDeparture, setOpenDeparture] = useState([false]);
  const [openArrival, setOpenArrival] = useState([false]);
  // let [adultsNo, setAdultsNo] = useState([0]);
  // let [kidsNo, setKidsNo] = useState([0]);
  // let [petsNo, setPetsNo] = useState([0]);
  const [allPassengers, setAllPassengers] = useState([
    {
      adults: 0,
      kids: 0,
      pets: 0,
    },
  ]);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [allAirports, setAllAirports] = useState(airports || []);
  const [departureAirport, setDepartureAirport] = useState([null]);
  const [arrivalAirport, setArrivalAirport] = useState([null]);
  const [isDateOpen, setDateOpen] = useState([false]);
  const [dateValue, setDateValue] = useState([dayjs()]);
  const [roundTripDateValue, setRoundTripDateValue] = useState(dayjs());
  const departureRef = useRef(null);
  const arrivalRef = useRef(null);
  const dateRef = useRef(null);
  const passengerRef = useRef(null);
  const [formData, setFormData] = useState([
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
      returningDate: `${roundTripDateValue?.$y}-${roundTripDateValue?.$M + 1}-${
        roundTripDateValue?.$D
      }`,
      depatureDate: `${dateValue?.$y}-${dateValue?.$M + 1}-${dateValue?.$D}`,
    },
  ]);

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

  const getoptionlabel = (option) => option.label;

  const filterOption = (option, inputValue) => {
    const lowerCaseInput = inputValue.toLowerCase();

    return (
      option?.value?.city?.toLowerCase().includes(lowerCaseInput) ||
      option?.value?.country?.toLowerCase().includes(lowerCaseInput) ||
      option?.value?.name?.toLowerCase().includes(lowerCaseInput) ||
      option?.value?.iata_code?.toLowerCase().includes(lowerCaseInput)
    );
  };

  const handleDateChange = (value, index) => {
    setDateValue((prev) => {
      const newValue = [...prev];
      newValue[index] = value;
      return newValue;
    });
    console.log(value);
  };

  const handleSavePassengers = () => {
    setOpenPassageners(new Array(openPassengers.length).fill(false));
  };

  const handleAddTrip = () => {
    // Update formData
    setFormData((prev) => [
      ...prev,
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
        depatureDate: `${dateValue?.$y}-${dateValue?.$M + 1}-${dateValue?.$D}`,
      },
    ]);

    // Update allPassengers state
    setAllPassengers((prev) => [
      ...prev,
      {
        adults: 0,
        kids: 0,
        pets: 0,
      },
    ]);

    // Update openPassengers state
    setOpenPassageners((prev) => [...prev, false]);

    setDepartureAirport((prev) => [...prev, null]);

    setArrivalAirport((prev) => [...prev, null]);

    setOpenDeparture((prev) => [...prev, false]);

    setOpenArrival((prev) => [...prev, false]);

    // Update date state
    setDateOpen((prev) => [...prev, false]);

    setDateValue((prev) => [...prev, dayjs()]);
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

    const updateOpenPassengers = [...openPassengers];
    updateOpenPassengers.splice(index, 1);
    setOpenPassageners(updateOpenPassengers);

    const updateDepartureAirport = [...departureAirport];
    updateDepartureAirport.splice(index, 1);
    setDepartureAirport(updateDepartureAirport);

    const updateArrivalAirport = [...departureAirport];
    updateArrivalAirport.splice(index, 1);
    setArrivalAirport(updateArrivalAirport);

    const updateOpenDeparture = [...openDeparture];
    updateOpenDeparture.splice(index, 1);
    setArrivalAirport(updateOpenDeparture);

    const updateOpenArrival = [...openArrival];
    updateOpenArrival.splice(index, 1);
    setArrivalAirport(updateOpenArrival);
  };

  const handleDateOpen = (index, state) => {
    setDateOpen((prev) => {
      const newState = [...prev];
      newState[index] = state;
      return newState;
    });

    // console.log({  });
  };

  console.log({ isDateOpen });
  const incrementPassenger = (index, type) => {
    setAllPassengers((prevPassengers) => {
      const updatedPassengers = [...prevPassengers];
      if (updatedPassengers[index][type] >= 0) {
        // Change condition to >= 0 for incrementing
        updatedPassengers[index][type] += 1;
      } else {
        updatedPassengers[index][type] = 0;
      }
      return updatedPassengers;
    });
  };
  const decrementPassenger = (index, type) => {
    setAllPassengers((prevPassengers) => {
      const updatedPassengers = [...prevPassengers];
      if (updatedPassengers[index][type] >= 0) {
        // Change condition to >= 0 for incrementing
        updatedPassengers[index][type] -= 1;
      } else {
        updatedPassengers[index][type] = 0;
      }
      return updatedPassengers;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click event occurred outside the container

      if (!departureRef?.current?.contains(event.target)) {
        setOpenDeparture(new Array(openPassengers.length).fill(false));
        // console.log("departure clicked");
      }
      if (!arrivalRef?.current?.contains(event.target)) {
        setOpenArrival(new Array(openPassengers.length).fill(false));
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

  // console.log(openDeparture);

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
                onClick={() => {
                  setOpenDeparture((prev) => {
                    const newState = [...prev]; // Create a copy of the previous state
                    newState[index] = true; // Update the specified index to true
                    return newState; // Return the updated state
                  });
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
                    {departureAirport[index] === null
                      ? "Select City"
                      : `${departureAirport[index].city} - ${departureAirport[index].country}`}
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
                  setOpenArrival((prev) => {
                    const newState = [...prev]; // Create a copy of the previous state
                    newState[index] = true; // Update the specified index to true
                    return newState; // Return the updated state
                  });
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
                    {arrivalAirport[index] === null
                      ? "Select City"
                      : `${arrivalAirport[index].city} - ${arrivalAirport[index].country}`}
                  </p>
                </div>
              </div>

              {openDeparture[index] && (
                <div
                  ref={departureRef}
                  className="absolute text-swGray800 top-24 w-full z-10 bg-white"
                >
                  <Select
                    getOptionLabel={getoptionlabel}
                    options={options}
                    filterOption={filterOption}
                    placeholder="Select Departure City"
                    onChange={(selectedOption) => {
                      setDepartureAirport((prev) => {
                        const newState = [...prev]; // Create a copy of the previous state
                        newState[index] = selectedOption.value; // Update the specified index to selectedValue
                        return newState; // Return the updated state
                      });
                      setOpenDeparture((prev) => {
                        const newState = [...prev]; // Create a copy of the previous state
                        newState[index] = false; // Update the specified index to true
                        return newState; // Return the updated state
                      });
                    }}
                  />
                </div>
              )}
              {openArrival[index] && (
                <div
                  id="arrive"
                  ref={arrivalRef}
                  className="absolute text-swGray800 top-24 w-full z-10"
                >
                  <Select
                    getOptionLabel={getoptionlabel}
                    options={options}
                    filterOption={filterOption}
                    placeholder="Select Arrival City"
                    onChange={(selectedOption) => {
                      setArrivalAirport((prev) => {
                        const newState = [...prev]; // Create a copy of the previous state
                        newState[index] = selectedOption.value; // Update the specified index to true
                        return newState; // Return the updated state
                      });
                      setOpenArrival((prev) => {
                        const newState = [...prev]; // Create a copy of the previous state
                        newState[index] = false; // Update the specified index to false
                        return newState; // Return the updated state
                      });
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

                <div>
                  <p className="text-swGray500 text-sm">Departure date</p>
                  <p className=" text-white font-semibold">
                    {dateValue[index]?.format("D MMM")}
                  </p>
                </div>

                {isDateOpen[index] && (
                  <div
                    // ref={dateRef}
                    className={`absolute`}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <div
                        className={`flex ${
                          pathname === "/" ? "indexDate" : "bookingDate"
                        }`}
                      >
                        <DateTimePicker
                          label="Departure Date"
                          defaultValue={dateValue[index]}
                          value={dateValue[index]}
                          onChange={(value) => handleDateChange(value, index)}
                          onClose={() => handleDateOpen(index, false)}
                          renderInput={(params) => <TextField {...params} />}
                          InputProps={{
                            disableUnderline: true,
                          }}
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
                    setOpenPassageners((prev) => {
                      const newState = [...prev]; // Create a copy of the previous state
                      newState[index] = true; // Update the specified index to true
                      return newState; // Return the updated state
                    })
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
                              onClick={() => {
                                decrementPassenger(index, "adults");
                              }}
                            >
                              <FiMinus size={20} />
                            </p>
                            <p className="h-10 w-14 flex justify-center items-center border-x">
                              {allPassengers[index]?.adults}
                            </p>
                            <p
                              className="p-2 cursor-pointer hover:bg-swPrimary500 hover:text-white"
                              onClick={() => {
                                incrementPassenger(index, "adults");
                              }}
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
                              onClick={() => decrementPassenger(index, "kids")}
                            >
                              <FiMinus size={20} />
                            </p>
                            <p className="h-10 w-14 flex justify-center items-center border-x">
                              {allPassengers[index]?.kids}
                            </p>
                            <p
                              className="p-2 cursor-pointer hover:bg-swPrimary500 hover:text-white"
                              onClick={() => incrementPassenger(index, "kids")}
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
                              onClick={() => decrementPassenger(index, "pets")}
                            >
                              <FiMinus size={20} />
                            </p>
                            <p className="h-10 w-14 flex justify-center items-center border-x">
                              {allPassengers[index]?.pets}
                            </p>
                            <p
                              className="p-2 cursor-pointer hover:bg-swPrimary500 hover:text-white"
                              onClick={() => incrementPassenger(index, "pets")}
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
