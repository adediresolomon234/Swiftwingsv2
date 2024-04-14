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

const BookingPageMultiCity = ({
  clearFormData,
  bookingDetails,
  setBookingDetils,
}) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const [openPassengers, setOpenPassageners] = useState([false]);
  const [openDeparture, setOpenDeparture] = useState([false]);
  const [openArrival, setOpenArrival] = useState([false]);
  const [allPassengers, setAllPassengers] = useState([
    {
      adults: 0,
      kids: 0,
      pets: 0,
    },
  ]);
  const [departureAirport, setDepartureAirport] = useState([null]);
  const [arrivalAirport, setArrivalAirport] = useState([null]);
  const [isDateOpen, setDateOpen] = useState([false]);
  const [dateValue, setDateValue] = useState([dayjs()]);
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
      returningTime: null,
      returningDate: null,
      depatureDate: `${dateValue?.$y}-${dateValue?.$M + 1}-${dateValue?.$D}`,
      passengers: {
        adults: allPassengers?.adults,
        children: allPassengers?.children,
        pets: allPassengers?.pets,
      },
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
  };

  const handleSavePassengers = () => {
    setOpenPassageners(new Array(openPassengers.length).fill(false));
  };

  const handleAddTrip = () => {
    setFormData((prev) => [
      ...prev,
      {
        source: {
          label: null,
          value: null,
          disabled: false,
        },
        destination: {
          label: null,
          value: null,
          disabled: false,
        },
        depatureTime: `${dayjs()?.$H}:${dayjs()?.$m}`,
        returningTime: null,
        returningDate: null,
        depatureDate: `${dayjs()?.$y}-${dayjs()?.$M + 1}-${dayjs()?.$D}`,
        passengers: {
          adults: 0,
          children: 0,
          pets: 0,
        },
      },
    ]);

    setAllPassengers((prev) => [
      ...prev,
      {
        adults: 0,
        kids: 0,
        pets: 0,
      },
    ]);

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
    const updatedFormData = formData.filter((_, idx) => idx !== index);
    setFormData(updatedFormData);

    const updatedDateOpen = isDateOpen.filter((_, idx) => idx !== index);
    setDateOpen(updatedDateOpen);

    const updateAllPassengers = allPassengers.filter((_, idx) => idx !== index);
    setAllPassengers(updateAllPassengers);

    const updateOpenPassengers = openPassengers.filter(
      (_, idx) => idx !== index
    );
    setOpenPassageners(updateOpenPassengers);

    const updateDepartureAirport = departureAirport.filter(
      (_, idx) => idx !== index
    );
    setDepartureAirport(updateDepartureAirport);

    const updateArrivalAirport = arrivalAirport.filter(
      (_, idx) => idx !== index
    );
    setArrivalAirport(updateArrivalAirport);

    const updateOpenDeparture = openDeparture.filter((_, idx) => idx !== index);
    setOpenDeparture(updateOpenDeparture);

    const updateOpenArrival = openArrival.filter((_, idx) => idx !== index);
    setOpenArrival(updateOpenArrival);
  };

  const handleDateOpen = (index, state) => {
    setDateOpen((prev) => {
      const newState = [...prev];
      newState[index] = state;
      return newState;
    });
  };

  const incrementPassenger = (index, type) => {
    setAllPassengers((prevPassengers) => {
      const updatedPassengers = [...prevPassengers];
      if (updatedPassengers[index][type] >= 0) {
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
        updatedPassengers[index][type] -= 1;
      } else {
        updatedPassengers[index][type] = 0;
      }
      return updatedPassengers;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!departureRef?.current?.contains(event.target)) {
        setOpenDeparture(new Array(openPassengers.length).fill(false));
      }
      if (!arrivalRef?.current?.contains(event.target)) {
        setOpenArrival(new Array(openPassengers.length).fill(false));
      }
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

  useEffect(() => {
    setFormData(bookingDetails?.booking_details?.formData);
  }, []);

  useEffect(() => {
    setDepartureAirport((prev) => {
      return formData.map((item) => {
        return item.source.value;
      });
    });
    setArrivalAirport((prev) => {
      return formData.map((item) => {
        return item.destination.value;
      });
    });
    setDateValue((prev) => {
      return formData.map((item) => {
        return dayjs(`${item.depatureDate} ${item.depatureTime}`);
      });
    });
    setAllPassengers((prev) => {
      return formData.map((item) => {
        return item.passengers;
      });
    });

    setBookingDetils((prevState) => ({
      ...prevState,
      booking_details: {
        ...prevState.booking_details,
        formData: formData,
      },
    }));
  }, [formData]);

  useEffect(() => {
    departureAirport.forEach((item, index) => {
      handleRemoveTrip(index);
    });
    setFormData(bookingDetails?.booking_details?.formData);
  }, [clearFormData]);

  console.log({ formData });
  console.log({ bookingDetails });

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
                className="p-5 pr-16 flex h-[5.5rem] w-[18rem] items-center gap-5 border border-swGray900 rounded-tl-2xl rounded-bl-2xl cursor-pointer"
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
                  <p className="text-swGray500 font-medium">
                    {/* Abuja - Nigeria */}
                    {departureAirport[index] === null
                      ? "Select City"
                      : `${departureAirport[index]?.city} - ${departureAirport[index]?.country}`}
                  </p>
                </div>
              </div>
              <div className="p-1 rounded-full border border-swGray900 text-swBlack ml-[47.5%] bg-white absolute z-10">
                <GoArrowRight size={15} className={"-mb-2 ml-1"} />
                <GoArrowLeft size={15} className="-mt-2 mr-1" />
              </div>
              <div
                className="p-5 pr-16 flex h-[5.5rem] w-[18rem] items-center gap-5 border border-swGray900  border-l-transparent rounded-tr-2xl rounded-br-2xl cursor-pointer"
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
                  <p className="text-swGray500 font-medium">
                    {/* Lagos - Nigeria */}
                    {arrivalAirport[index] === null
                      ? "Select City"
                      : `${arrivalAirport[index]?.city} - ${arrivalAirport[index]?.country}`}
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
                className="relative p-5 flex h-[5.5rem] w-[18rem] items-center gap-5 border border-swGray900 rounded-2xl cursor-pointer"
                // ref={dateRef}
              >
                {!isDateOpen[index] && (
                  <div className="p-2 rounded-full text-swGray500">
                    <SwCalendarIcon className="text-xl" />
                  </div>
                )}

                <div>
                  <p className="text-swGray500 text-sm">Departure date</p>
                  <p className=" text-swGray500 font-semibold">
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
                  className="p-5 flex items-center h-[5.5rem] w-72 gap-5 border border-swGray900 backdrop-blur rounded-2xl cursor-pointer"
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
                    <p className="text-swGray500 font-medium">
                      Adults - {allPassengers[index]?.adults} Children -{" "}
                      {allPassengers[index]?.children} Pets -{" "}
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
                              onClick={() =>
                                decrementPassenger(index, "children")
                              }
                            >
                              <FiMinus size={20} />
                            </p>
                            <p className="h-10 w-14 flex justify-center items-center border-x">
                              {allPassengers[index]?.children}
                            </p>
                            <p
                              className="p-2 cursor-pointer hover:bg-swPrimary500 hover:text-white"
                              onClick={() =>
                                incrementPassenger(index, "children")
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

export default BookingPageMultiCity;
