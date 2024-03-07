"use client";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import { useState } from "react";
import { BiUser } from "react-icons/bi";
import { FiMinus, FiPlus, FiSearch } from "react-icons/fi";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { HiArrowRight } from "react-icons/hi";
import { IoCheckmark } from "react-icons/io5";
import { MdOutlineCalendarToday } from "react-icons/md";
import departImg from "../../public/images/Depart-white.png";
import arriveImg from "../../public/images/Arrive-white.png";
import Select from "react-select";
import { SwSearchIcon } from "./svgs";

const BookingEngine = () => {
  const [bookingEngine, setBookingEngine] = useState("oneWayTrip");
  const [openPassangers, setOpenPassageners] = useState(false);
  const [openDeparture, setOpenDeparture] = useState(false);
  const [openArrival, setOpenArrival] = useState(false);
  let [adultsNo, setAdultsNo] = useState(0);
  let [kidsNo, setKidsNo] = useState(0);
  let [petsNo, setPetsNo] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const options = [
    { value: "Abuja, Nigeria", label: "Abuja, Nigeria" },
    { value: "Abu Dhabi, Dubai", label: "Abu Dhabi, Dubai" },
  ];

  return (
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
        {/* Hello */}
        <div className="flex justify-between mb-5">
          <div className="flex items-center gap-5 mx-auto flex-wrap">
            <div className="flex items-center mx-auto relative">
              <div
                className="p-5 pr-16 flex w-[21rem] items-center gap-5 border rounded-tl-2xl rounded-bl-2xl cursor-pointer hover:bg-swLightBgGray"
                onClick={() => setOpenDeparture(!openDeparture)}
              >
                <div className="bg-swPrimary500 p-1 rounded-full shadow-lg shadow-swPrimary500">
                  <div className="h-8 w-8 relative">
                    <Image src={departImg} alt="depart" fill />
                  </div>
                </div>
                <div>
                  <p className="text-swLightGray text-sm">Departure city</p>
                  <p className="text-lg text-swGray800 font-semibold">
                    Abuja - Nigeria
                  </p>
                </div>
              </div>
              <div className="p-1 rounded-full border text-swBlack ml-[47.5%] bg-white absolute">
                <GoArrowRight size={15} className={"-mb-2 ml-1"} />
                <GoArrowLeft size={15} className="-mt-2 mr-1" />
              </div>
              <div
                className="p-5 pr-16 flex w-[21rem] items-center gap-5 border border-l-transparent rounded-tr-2xl rounded-br-2xl cursor-pointer hover:bg-swLightBgGray"
                onClick={() => setOpenArrival(!openArrival)}
              >
                <div className="bg-swPrimary500 p-1 rounded-full shadow-lg shadow-swPrimary500">
                  <div className="h-8 w-8 relative">
                    <Image src={arriveImg} alt="depart" fill />
                  </div>
                </div>
                <div>
                  <p className="text-swLightGray text-sm">Arrival city</p>
                  <p className="text-lg text-swGray800 font-semibold">
                    Lagos - Nigeria
                  </p>
                </div>
              </div>

              {openDeparture && (
                <div className="absolute text-swGray800 top-24 rounded-md shadow-lg p-2 bg-white w-full z-10">
                  <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    placeholder="Select Departure City"
                  />
                </div>
              )}
              {openArrival && (
                <div className="absolute text-swGray800 top-24 rounded-md shadow-lg p-2 bg-white w-full z-10">
                  <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    placeholder="Select Arrival City"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-around gap-5 mx-auto flex-wrap">
              <div className="p-5 pr-16 flex items-center w-[21rem] gap-5 border rounded-2xl cursor-pointer hover:bg-swLightBgGray">
                <div className="p-2 rounded-full border text-swGray800">
                  <MdOutlineCalendarToday size={20} />
                </div>
                <div>
                  <p className="text-swLightGray text-sm">Departure date</p>
                  <p className="text-lg text-swGray800 font-semibold">20 Jan</p>
                </div>
              </div>
              <div className="relative">
                <div
                  className="p-5 flex items-center w-[21rem] gap-5 border rounded-2xl cursor-pointer hover:bg-swLightBgGray"
                  onClick={() => setOpenPassageners(!openPassangers)}
                >
                  <div className="p-2 rounded-full border text-swGray800">
                    <BiUser size={20} />
                  </div>
                  <div>
                    <p className="text-swLightGray text-sm">Departure city</p>
                    <p className="text-lg text-swGray800 font-semibold">
                      4 Adult - 2 Children
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
                  className="p-5 pr-16 flex w-[23rem] items-center gap-5 border rounded-tl-2xl rounded-bl-2xl cursor-pointer"
                  onClick={() => setOpenDeparture(!openDeparture)}
                >
                  <div className="bg-swPrimary500 p-1 rounded-full shadow-lg shadow-swPrimary500">
                    <div className="h-8 w-8 relative">
                      <Image src={departImg} alt="depart" fill />
                    </div>
                  </div>
                  <div>
                    <p className="text-swLightGray text-sm">Departure city</p>
                    <p className="text-lg text-swGray800 font-semibold">
                      Abuja - Nigeria
                    </p>
                  </div>
                </div>
                <div className="p-1 rounded-full border text-swBlack ml-[47.5%] bg-white absolute">
                  <GoArrowRight size={15} className={"-mb-2 ml-1"} />
                  <GoArrowLeft size={15} className="-mt-2 mr-1" />
                </div>
                <div
                  className="p-5 pr-16 flex w-[23rem] items-center gap-5 border border-l-transparent rounded-tr-2xl rounded-br-2xl cursor-pointer"
                  onClick={() => setOpenArrival(!openArrival)}
                >
                  <div className="bg-swPrimary500 p-1 rounded-full shadow-lg shadow-swPrimary500">
                    <div className="h-8 w-8 relative">
                      <Image src={arriveImg} alt="depart" fill />
                    </div>
                  </div>
                  <div>
                    <p className="text-swLightGray text-sm">Arrival city</p>
                    <p className="text-lg text-swGray800 font-semibold">
                      Lagos - Nigeria
                    </p>
                  </div>
                </div>

                {openDeparture && (
                  <div className="absolute text-swGray800 top-24 rounded-md shadow-lg p-2 bg-white w-full z-10">
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      placeholder="Select Departure City"
                    />
                  </div>
                )}
                {openArrival && (
                  <div className="absolute text-swGray800 top-24 rounded-md shadow-lg p-2 bg-white w-full z-10">
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      placeholder="Select Arrival City"
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-around gap-5 mx-auto flex-wrap">
                <div className="p-5 pr-16 flex items-center w-[23rem] gap-5 border rounded-2xl cursor-pointer">
                  <div className="p-2 rounded-full border text-swGray800">
                    <MdOutlineCalendarToday size={20} />
                  </div>
                  <div>
                    <p className="text-swLightGray text-sm">Departure date</p>
                    <p className="text-lg text-swGray800 font-semibold">
                      20 Jan
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div
                    className="p-5 flex items-center w-[23rem] gap-5 border rounded-2xl cursor-pointer"
                    onClick={() => setOpenPassageners(!openPassangers)}
                  >
                    <div className="p-2 rounded-full border text-swGray800">
                      <BiUser size={20} />
                    </div>
                    <div>
                      <p className="text-swLightGray text-sm">Departure city</p>
                      <p className="text-lg text-swGray800 font-semibold">
                        4 Adult - 2 Children
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
  );
};

export default BookingEngine;
