// import NavAndFooter from "@/app/components/shared/NavAndFooter";
"use client";

import BookingEngine from "@/app/components/BookingEnginge";
import Button from "@/app/components/Button";
import NavAndFooter from "@/app/components/shared/NavAndFooter";
import {
  SwArrowRightIcon,
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

const BookJet = () => {
  const [bookingEngine, setBookingEngine] = useState("oneWayTrip");
  const [openPassangers, setOpenPassageners] = useState(false);
  const [openDeparture, setOpenDeparture] = useState(false);
  const [openArrival, setOpenArrival] = useState(false);
  let [adultsNo, setAdultsNo] = useState(0);
  let [kidsNo, setKidsNo] = useState(0);
  let [petsNo, setPetsNo] = useState(0);
  const [allPassangers, setAllPassangers] = useState({
    adults: 0,
    kids: 0,
    pets: 0,
  });
  const [departureAirport, setDepartureAirport] = useState(null);
  const [arrivalAirport, setArrivalAirport] = useState(null);
  const departureRef = useRef(null);
  const arrivalRef = useRef(null);

  const [hoveredIndex, setHoveredIndex] = useState(null);

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

  const handleSavePassangers = () => {
    setAllPassangers((prev) => ({
      adults: adultsNo,
      kids: kidsNo,
      pets: petsNo,
      prev,
    }));

    setOpenPassageners(false);
  };

  useEffect(() => {
    setDepartureAirport(JSON.parse(localStorage.getItem("departureAirport")));
    setArrivalAirport(JSON.parse(localStorage.getItem("arrivalAirport")));
    setAllPassangers((prev) => ({
      adults: JSON.parse(localStorage.getItem("adultsNo")),
      kids: JSON.parse(localStorage.getItem("kidsNo")),
      pets: JSON.parse(localStorage.getItem("petsNo")),
      prev,
    }));

    setAdultsNo(JSON.parse(localStorage.getItem("adultsNo")));
    setKidsNo(JSON.parse(localStorage.getItem("kidsNo")));
    setPetsNo(JSON.parse(localStorage.getItem("petsNo")));
    // console.log(JSON.stringify(localStorage));
  }, []);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       departureRef.current &&
  //       !departureRef.current.contains(event.target)
  //     ) {
  //       setOpenDeparture(false);
  //     }

  //     if (arrivalRef.current && !arrivalRef.current.contains(event.target)) {
  //       setOpenArrival(false);
  //     }
  //   };
  //   document.addEventListener("click", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  return (
    <NavAndFooter>
      <div className="bg-swLightBgGray py-24 px-5">
        <div className="m-5 mx-auto max-w-[90rem]">
          <div className="w-full border rounded-3xl">
            <div className="p-5 bg-white rounded-3xl">
              <div className="flex justify-between items-center mb-5">
                <p className="font-semibold text-swGray800 ml-2 text-lg">
                  Book a jet
                </p>
                <div className="p-2 rounded-full flex gap-5 text-xl font-medium bg-swLightBgGray">
                  <button
                    className={`${
                      bookingEngine === "oneWayTrip"
                        ? "text-swPrimary500 font-semibold bg-white"
                        : "text-swLightGray hover:bg-white"
                    } py-2 px-4 rounded-full`}
                    onClick={() => setBookingEngine("oneWayTrip")}
                  >
                    One Way Trip
                  </button>
                  <button
                    className={`${
                      bookingEngine === "roundTrip"
                        ? "text-swPrimary500 font-semibold bg-white"
                        : "text-swLightGray hover:bg-white"
                    } py-2 px-4 rounded-full`}
                    onClick={() => setBookingEngine("roundTrip")}
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

              <div className="flex justify-between mb-5">
                <div className="flex items-center gap-5 mx-auto flex-wrap">
                  <div className="flex items-center mx-auto relative">
                    <div
                      className="p-5 pr-16 flex h-[5.5rem] w-[21rem] items-center gap-5 border rounded-tl-2xl rounded-bl-2xl cursor-pointer hover:bg-swLightBgGray"
                      ref={departureRef}
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
                          {departureAirport === null
                            ? "Select City"
                            : `${departureAirport.city} - ${departureAirport.country}`}
                        </p>
                      </div>
                    </div>
                    <div className="p-1 rounded-full border text-swBlack ml-[47.5%] bg-white absolute">
                      <GoArrowRight size={15} className={"-mb-2 ml-1"} />
                      <GoArrowLeft size={15} className="-mt-2 mr-1" />
                    </div>
                    <div
                      className="p-5 pr-16 flex h-[5.5rem] w-[21rem] items-center gap-5 border border-l-transparent rounded-tr-2xl rounded-br-2xl cursor-pointer hover:bg-swLightBgGray"
                      ref={arrivalRef}
                      onClick={() => setOpenArrival(!openArrival)}
                    >
                      <div className="bg-swPrimary500 p-1 rounded-full shadow-lg shadow-swPrimary500">
                        <div className="h-8 w-8 relative">
                          <Image src={arriveImg} alt="depart" fill />
                        </div>
                      </div>
                      <div>
                        <p className="text-swLightGray text-sm">Arrival city</p>
                        <p className=" text-swGray800 font-semibold">
                          {arrivalAirport === null
                            ? "Select City"
                            : `${arrivalAirport.city} - ${arrivalAirport.country}`}
                        </p>
                      </div>
                    </div>

                    {openDeparture && (
                      <div className="absolute text-swGray800 top-24 w-full z-10">
                        <Select
                          defaultValue={departureAirport}
                          getOptionLabel={getOptionLabel}
                          filterOption={filterOption}
                          onChange={(selectedOption) => {
                            setDepartureAirport(selectedOption.value);
                            setOpenDeparture(false);
                          }}
                          options={options}
                          placeholder="Select Arrival City"
                        />
                      </div>
                    )}
                    {openArrival && (
                      <div className="absolute text-swGray800 top-24 w-full z-10">
                        <Select
                          defaultValue={arrivalAirport}
                          getOptionLabel={getOptionLabel}
                          filterOption={filterOption}
                          onChange={(selectedOption) => {
                            setArrivalAirport(selectedOption.value);
                            setOpenArrival(false);
                          }}
                          options={options}
                          placeholder="Select Arrival City"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-around gap-5 mx-auto flex-wrap">
                    <div className="p-5 pr-16 flex items-center h-[5.5rem] w-[21rem] gap-5 border rounded-2xl cursor-pointer hover:bg-swLightBgGray">
                      <div className="p-2 rounded-full border text-swGray800">
                        <MdOutlineCalendarToday size={20} />
                      </div>
                      <div>
                        {bookingEngine === "roundTrip" ? (
                          <div>
                            <p className="text-swLightGray text-sm">
                              Departure and arrival date
                            </p>
                            <p className=" text-swGray800 font-semibold">
                              20 Jan
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-swLightGray text-sm">
                              Departure date
                            </p>
                            <p className=" text-swGray800 font-semibold">
                              20 Jan
                            </p>
                          </div>
                        )}
                      </div>
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
                            Departure city
                          </p>
                          <p className=" text-swGray800 font-semibold">
                            Adults - {allPassangers.adults} Children -{" "}
                            {allPassangers.kids} Pets - {allPassangers.pets}
                          </p>
                        </div>
                      </div>
                      {openPassangers && (
                        <div className="absolute text-swGray800 top-24 bg-white w-full shadow-md rounded-md">
                          <div className="p-5 flex flex-col gap-5 font-medium">
                            <p className="font-semibold text-lg">Occupants</p>

                            <div className="flex flex-col gap-5">
                              <div className="flex justify-between items-center">
                                <p className="">Adults</p>
                                <div className="border hover:border-swPrimary500 rounded-md overflow-hidden flex">
                                  <p
                                    className="p-2 cursor-pointer hover:bg-swPrimary500 hover:text-white"
                                    onClick={() =>
                                      setAdultsNo(adultsNo > 0 ? --adultsNo : 0)
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
              {bookingEngine === "multiCity" && (
                <div className="flex justify-between mb-5">
                  <div className="flex items-center gap-5 mx-auto flex-wrap">
                    <div className="flex items-center mx-auto relative">
                      <div
                        className="p-5 pr-16 flex h-[5.5rem] w-[21rem] items-center gap-5 border rounded-tl-2xl rounded-bl-2xl cursor-pointer hover:bg-swLightBgGray"
                        ref={departureRef}
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
                            {departureAirport === null
                              ? "Select City"
                              : `${departureAirport.city} - ${departureAirport.country}`}
                          </p>
                        </div>
                      </div>
                      <div className="p-1 rounded-full border text-swBlack ml-[47.5%] bg-white absolute">
                        <GoArrowRight size={15} className={"-mb-2 ml-1"} />
                        <GoArrowLeft size={15} className="-mt-2 mr-1" />
                      </div>
                      <div
                        className="p-5 pr-16 flex h-[5.5rem] w-[21rem] items-center gap-5 border border-l-transparent rounded-tr-2xl rounded-br-2xl cursor-pointer hover:bg-swLightBgGray"
                        ref={arrivalRef}
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
                            {arrivalAirport === null
                              ? "Select City"
                              : `${arrivalAirport.city} - ${arrivalAirport.country}`}
                          </p>
                        </div>
                      </div>

                      {openDeparture && (
                        <div className="absolute text-swGray800 top-24 w-full z-10">
                          <Select
                            defaultValue={departureAirport}
                            getOptionLabel={getOptionLabel}
                            filterOption={filterOption}
                            onChange={(selectedOption) => {
                              setDepartureAirport(selectedOption.value);
                              setOpenDeparture(false);
                            }}
                            options={options}
                            placeholder="Select Arrival City"
                          />
                        </div>
                      )}
                      {openArrival && (
                        <div className="absolute text-swGray800 top-24 w-full z-10">
                          <Select
                            // defaultValue={arrivalAirport}
                            getOptionLabel={getOptionLabel}
                            filterOption={filterOption}
                            onChange={(selectedOption) => {
                              setArrivalAirport(selectedOption.value);
                              setOpenArrival(false);
                            }}
                            options={options}
                            placeholder="Select Arrival City"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex justify-around gap-5 mx-auto flex-wrap">
                      <div className="p-5 pr-16 flex items-center h-[5.5rem] w-[21rem] gap-5 border rounded-2xl cursor-pointer hover:bg-swLightBgGray">
                        <div className="p-2 rounded-full border text-swGray800">
                          <MdOutlineCalendarToday size={20} />
                        </div>
                        <div>
                          <p className="text-swLightGray text-sm">
                            Departure date
                          </p>
                          <p className=" text-swGray800 font-semibold">
                            20 Jan
                          </p>
                        </div>
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
                              Departure city
                            </p>
                            <p className=" text-swGray800 font-semibold">
                              Adults - {allPassangers.adults} Children -{" "}
                              {allPassangers.kids} Pets - {allPassangers.pets}
                            </p>
                          </div>
                        </div>
                        {openPassangers && (
                          <div className="absolute text-swGray800 top-24 bg-white w-full shadow-md rounded-md">
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
                  Flight from {departureAirport?.city},{" "}
                  {departureAirport?.country} - {arrivalAirport?.city},{" "}
                  {arrivalAirport?.country}
                </p>
                <div className="flex gap-5 mt-5">
                  <div className="flex flex-col justify-between">
                    <div className="">
                      <p className="font-semibold text-lg">10:00 am</p>
                      <p className="text-sm">Wed 20, Jan</p>
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
                      <p className="font-semibold text-lg">10:00 am</p>
                      <p className="text-sm">Nnamdi Azikwe Airport, Abuja</p>
                    </div>
                    <p className="font-medium">12 Hours</p>
                    <div className="">
                      <p className="font-semibold text-lg">22:00 pm</p>
                      <p className="text-sm">Nnamdi Azikwe Airport, Abuja</p>
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
