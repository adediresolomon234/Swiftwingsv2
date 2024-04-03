"use client";
import { useState, useRef, useEffect } from "react";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";
import Button from "./components/Button";
import { HiArrowRight } from "react-icons/hi";
import Services from "./components/Services";
import servicesPlane from "../public/images/servicesLuxuryPlane.png";
import servicesMembership from "../public/images/servicesMembership.png";
import servicesCustomer from "../public/images/sevicesCustomer.png";
import AboutUsCard from "./components/AboutUsCard";
import "../styles.css";
import { services } from "./components/servicedata";
import { fleet } from "./components/fleetcard";
import Icon from "@mdi/react";
import { textAreas } from "./components/servicesgrid";
import Crown from "../public/images/Crown.png";
import { CiStar } from "react-icons/ci";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoCheckmark } from "react-icons/io5";
import Select from "react-select";
import NavAndFooter from "./components/shared/NavAndFooter";
import { testimonial } from "./CustomerTestimonial";
import Marquee from "react-fast-marquee";
import { FaXTwitter } from "react-icons/fa6";
import heroBgImg from "../public/images/heroBackgroundImage.png";
import {
  SwArrivalPlaneIcon,
  SwCalendarIcon,
  SwDeparturePlaneIcon,
  SwUserIcon,
} from "./components/svgs";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getAviAirPort, getAviAircraft } from "@/redux/slices/aviPagesSlice";
import airports from "./components/helpers/airports";
import { useRouter } from "next/navigation";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import MultiCity from "./components/multi-city-trip-boking/MultiCity";

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});

function isNearViewport(id) {
  const element = document.getElementById(id);
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;

  return rect.bottom >= 0 && rect.bottom <= viewportHeight;
}

export default function Home() {
  const router = useRouter();
  const [bookingEngine, setBookingEngine] = useState("One way Trip");
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
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [allAirports, setAllAirports] = useState(airports || []);
  const [departureAirport, setDepartureAirport] = useState(null);
  const [arrivalAirport, setArrivalAirport] = useState(null);
  const [isDateOpen, setDateOpen] = useState(false);
  const [dateValue, setDateValue] = useState(dayjs());
  const [roundTripDateValue, setRoundTripDateValue] = useState(dayjs());
  const departureRef = useRef(null);
  const arrivalRef = useRef(null);
  const dateRef = useRef(null);
  const passengerRef = useRef(null);

  const { loading, error, data } = useSelector((state) => state.aviPages);
  // console.log({ data: data?.data?.results });

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

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(0);
  };

  const handleRoundTripDateChange = (roundTripDateValue) => {
    setRoundTripDateValue(roundTripDateValue);
  };

  const handleBookJet = () => {
    const booking = {
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
            depatureDate: `${dateValue?.$y}-${dateValue?.$M + 1}-${
              dateValue?.$D
            }`,
            returningTime:
              bookingEngine === "Round Trip"
                ? `${roundTripDateValue?.$H}:${roundTripDateValue?.$m}`
                : null,
            returningDate:
              bookingEngine === "Round Trip"
                ? `${roundTripDateValue?.$y}-${roundTripDateValue?.$M + 1}-${
                    roundTripDateValue?.$D
                  }`
                : null,
            passengers: {
              adults: adultsNo,
              children: kidsNo,
              pets: petsNo,
            },
          },
        ],
      },
      additional_quote: [],
    };

    if (typeof self !== 'undefined') {
      localStorage.setItem("bookingDetails", JSON.stringify(booking));
    }
    router.push("/booking");
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

  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };

  console.log({ isDateOpen });
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
      // if (!dateRef?.current?.contains(event.target)) {
      //   setDateOpen(false);
      //   console.log("date clicked");
      // }
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
    <main className="relative bg-swLightBgGray">
      <NavAndFooter>
        <section className="w-full p-10 pt-48 text-white relative pb-10">
          <div className="absolute h-full w-full top-0 left-0">
            <Image src={heroBgImg} alt="aiplane" className="h-full w-full" />
          </div>
          <div className="h-full w-full bg-swBlack absolute top-0 left-0 bg-opacity-10" />
          <div className="max-w-7xl mx-auto mb-10 relative text-center">
            <div className="pt-28 z-50">
              <p className="text-8xl font-bold leading-snug z-50">
                Experience Unmatched Luxury Travel
              </p>
              <p className="text-lg mt-10 z-10">
                Experience the epitome of safety, luxury and convenience with{" "}
                <br />
                <span className="font-bold">
                  Swiftwings private jet charter service
                </span>
              </p>
            </div>

            <div className="flex gap-10 justify-center text-center mt-10">
              <div>
                <p className="font-semibold text-2xl">10k</p>
                <p className="text-xs">Flights</p>
              </div>
              <div>
                <p className="font-semibold text-2xl">15k</p>
                <p className="text-xs">Clients</p>
              </div>
              <div>
                <p className="font-semibold text-2xl">100</p>
                <p className="text-xs">Countries</p>
              </div>
            </div>
          </div>

          <section className="max-w-7xl mx-auto w-full relative">
            <div className="p-5 rounded-3xl backdrop-blur bg-swBlack/20 border border-swGray900">
              <div className="flex justify-between items-center mb-5">
                <Link
                  href="/booking/1"
                  className="font-semibold text-white ml-2"
                >
                  Book a jet
                </Link>
                <div className="p-1 text-xl rounded-full flex gap-5 font-medium backdrop-blur bg-white/25">
                  <button
                    className={`${
                      bookingEngine === "One way Trip"
                        ? "text-white backdrop-blur bg-swBlack/50 font-semibold"
                        : "text-swGray300 hover:backdrop-blur hover:bg-white/5"
                    } py-2 px-4 rounded-full`}
                    onClick={() => setBookingEngine("One way Trip")}
                  >
                    One Way Rrip
                  </button>
                  <button
                    className={`${
                      bookingEngine === "Round Trip"
                        ? "text-white backdrop-blur bg-swBlack/50 font-semibold"
                        : "text-swGray300 hover:backdrop-blur hover:bg-white/5]"
                    } py-2 px-4 rounded-full`}
                    onClick={() => setBookingEngine("Round Trip")}
                  >
                    Round Trip
                  </button>
                  <button
                    className={`${
                      bookingEngine === "Multi-city Trip"
                        ? "text-white backdrop-blur bg-swBlack/50 font-semibold"
                        : "text-swGray300 hover:backdrop-blur hover:bg-white/5"
                    } py-2 px-4 rounded-full`}
                    onClick={() => setBookingEngine("Multi-city Trip")}
                  >
                    Multi-city trip
                  </button>
                </div>
                <div
                  className={`${space_grotesk.className} w-fit text-lg `}
                  onClick={handleBookJet}
                >
                  <Button
                    label="Book Jet"
                    bgColor={"bg-swPrimary500 hover:bg-swPrimary600"}
                    textColor={"text-white"}
                    endIcon={<HiArrowRight size={20} />}
                  />
                </div>
              </div>
              {bookingEngine === "Multi-city Trip" ? (
                <MultiCity />
              ) : (
                <div className="flex justify-between mb-5">
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
                          <p className="text-swGray500 text-sm">
                            Departure city
                          </p>
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
                        onClick={() => setDateOpen(true)}
                        className="relative p-5 flex h-[5.5rem] w-[18rem] items-center gap-5 border border-swGray900 backdrop-blur bg-swBlack/40 hover:bg-swBlack/50 rounded-2xl cursor-pointer"
                        // ref={dateRef}
                      >
                        {/* <div className="p-2 rounded-full text-white">
                          <SwCalendarIcon className="text-xl" />
                        </div> */}

                        <div>
                          {bookingEngine === "Round Trip" ? (
                            <div className="w-full">
                              <p className="text-swGray500 text-sm">
                                Departure and arrival date
                              </p>
                              <p className=" text-white font-semibold">
                                {dateValue.format("D MMM")} -{" "}
                                {roundTripDateValue.format("D MMM")}
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p className="text-swGray500 text-sm">
                                Departure date
                              </p>
                              <p className=" text-white font-semibold">
                                {dateValue.format("D MMM")}
                              </p>
                            </div>
                          )}
                        </div>
                        {isDateOpen && (
                          <div
                            className={`absolute ${
                              bookingEngine === "Round Trip" && "-ml-5"
                            }`}
                          >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <div className="flex indexDate">
                                <DateTimePicker
                                  label="Departure Date"
                                  defaultValue={dateValue}
                                  value={dateValue}
                                  // open={isDateOpen}
                                  onOpen={() => setDateOpen(true)}
                                  // onAccept={() => {
                                  //   alert("accepted");
                                  //   setDateOpen(false);
                                  // }}
                                  onClose={() => setDateOpen(false)}
                                  onChange={handleDateChange}
                                  renderInput={(params) => (
                                    <TextField {...params} />
                                  )}
                                />
                                {bookingEngine === "Round Trip" && (
                                  <DateTimePicker
                                    label="Arrival Date"
                                    defaultValue={roundTripDateValue}
                                    value={roundTripDateValue}
                                    onChange={handleRoundTripDateChange}
                                    onClose={() => setDateOpen(false)}
                                    renderInput={(params) => (
                                      <TextField {...params} />
                                    )}
                                  />
                                )}
                              </div>
                            </LocalizationProvider>
                          </div>
                        )}
                      </div>
                      <div className="relative">
                        <div
                          className="p-5 flex items-center h-[5.5rem] w-72 gap-5 border border-swGray900 backdrop-blur bg-swBlack/40 hover:bg-swBlack/50 rounded-2xl cursor-pointer"
                          onClick={() => setOpenPassageners(!openPassangers)}
                        >
                          <div className="p-2 rounded-full text-swGray900">
                            <SwUserIcon className="text-xl" />
                          </div>
                          <div>
                            <p className="text-swGray500 text-sm">Occupants</p>
                            <p className="text-white font-medium">
                              Adults - {allPassangers.adults} Children -{" "}
                              {allPassangers.kids} Pets - {allPassangers.pets}
                            </p>
                          </div>
                        </div>
                        {openPassangers && (
                          <div
                            ref={passengerRef}
                            className="absolute text-swGray900 top-24 bg-white w-full shadow-md rounded-md"
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
              )}
            </div>
          </section>
        </section>
        <section className="mt-60 py-16 px-5 text-swGray900">
          <div className="max-w-4xl w-full mx-auto text-center">
            <Services
              name={"Luxury travels"}
              text="SwiftWings operates the largest and most diverse private aircraft fleet globally, providing an extensive array of personalized private aviation solutions that surpass the expectations of the world’s most discerning travelers. Our industry-leading scale and innovative aviation business model ensure dependable financial sustainability for our clients, setting us apart in the industry."
              image={servicesPlane}
            />
          </div>
          <div className="max-w-4xl w-full mx-auto text-center mt-40">
            <Services
              name={"Membership plan"}
              text="SwiftWings offers flexible and investment-free solutions tailored to meet your unique flying needs. SwiftWings grants its clients access to a distinguished fleet, including over 80 SwiftWings aircraft globally, with a strong presence in the United States. As a SwiftWings customer, you'll experience unparalleled 24/7 concierge service delivered by a dedicated team of aviation experts."
              image={servicesMembership}
            />
          </div>
          <div className="max-w-4xl w-full mx-auto text-center  mt-40">
            <Services
              name={"Dedicated customer service"}
              text="At SwiftWings, our dedicated customer service is more than a commitment; it's a promise of excellence. Our aviation experts, based in New York and Florida, are available 24/7 to provide unparalleled support, ensuring your journey is seamless and stress-free. From personalized itinerary planning to addressing your unique needs, SwiftWings' customer service is devoted to delivering an unmatched level of care, enhancing every aspect of your private jet experience. Your satisfaction and peace of mind are at the heart of our service philosophy."
              image={servicesCustomer}
            />
          </div>
        </section>

        <section className=" max-w-6xl mx-auto py-10">
          <p className="text-swPrimary500 font-medium text-lg">About us</p>
          <div className="flex justify-between mt-10">
            <p className="font-semibold text-swPrimary500 text-5xl max-w-sm">
              Get to know more about Swiftwings
            </p>
            <p className="text-swGray500 text-lg font-light max-w-[26rem] w-full">
              Swift Wings is a premier provider of private jets charter flights
              connecting global airports, offering unmatched convenience and
              exclusivity for luxury travel.
            </p>
          </div>

          <div className="flex flex-col items-center gap-5 mt-14 ">
            <div className="flex gap-5 justify-center ">
              <AboutUsCard
                number={"75"}
                text={"Swiftwings users from all over the globe."}
                className=""
              />
              <AboutUsCard
                number={"1.5k"}
                text={"Swiftwings access to a network of airplanes"}
                numberColor={"text-swBlack"}
              />
              <AboutUsCard
                number={"50"}
                text={"Swiftwings destinations in the past 3 years"}
              />
            </div>

            <div className="bg-swSecondary400 text-swWine p-8 max-w-[44rem] rounded-2xl">
              <p className="font-light">
                Swift Wings understands that our clients’ travel needs often
                stretch far beyond the borders of Nigeria.
                <br /> That’s why we provide extensive global coverage,
                seamlessly connecting you to destinations in Europe, North
                America, South America, and other corners of the world, even the
                most remote ones. With our network of trusted partners and
                affiliates, we ensure that you experience the convenience and
                flexibility of air travel on a global scale.
              </p>
              <div className="mt-5 flex justify-end gap-3 items-center">
                Learn more <GoArrowRight size={20} />
              </div>
            </div>
          </div>
        </section>
        <section className="max-w-7xl mx-auto py-10">
          <div className="relative pt-40 pb-20 lg:pt-44">
            <div className="relative 2xl:container m-auto px-6 md:px-12 lg:px-4">
              <p className="sm:mx-auto sm:w-10/12 md:w-2/3 p-1 text-swPrimary500 font-semibold text-center sm:text-[18px] md:text-[18px] lg:text-[18px] lg:w-auto lg:text-left">
                Fleet Showcase
              </p>
              <h1 className="mt-8 sm:mx-auto sm:w-10/12 md:w-2/3 text-swGray700 text-4xl font-semibold text-center sm:text-5xl md:text-5xl lg:w-auto lg:text-left xl:text-6xl">
                Our Fleets.
              </h1>
              <div className="flex gap-6 mt-12">
                <div className="col-span-4 relative">
                  {fleet.map((item, index) => (
                    <div
                      key={item.id}
                      className="col-span-2 relative"
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-2 border-gray-200 rounded duration-300 hover:bg-swBgGray">
                        <div className="flex items-center fleet-item">
                          <a aria-label="icon" className="block">
                            <p className="font-medium md:block text-[20px] text-swGray700">
                              {item.name}
                            </p>
                          </a>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-between text-xs text-gray-800 px-1 py-2 lg:col-span-2">
                          <div className="flex justify-between flex-grow gap-[18px] mt-6 font-normal ">
                            <div className="flex items-center ">
                              <Icon path={item.icon} size={1} />
                              <span className="ml-3">{item.seat}</span>
                            </div>
                            <div className="flex items-center">
                              <Icon path={item.icon2} size={1} />
                              <span className="ml-3 ">{item.kilometer}</span>
                            </div>
                            <div className="flex items-center">
                              <Icon path={item.icon3} size={1} />
                              <span className="ml-3 ">{item.feet}</span>
                            </div>
                          </div>
                          <div className=" self-stretch relative leading-[18px] mt-2 mx-2 text-swLightGray">
                            {item.size}
                          </div>
                        </div>
                      </div>
                      <hr className="w-full border-gray-200" />
                    </div>
                  ))}
                </div>
                <div className="flex justify-center items-center image-container relative">
                  <div className="">
                    <div
                      aria-hidden="true"
                      className={`absolute scale-75 md:scale-110 inset-0 m-auto rotate-45 bg-gradient-to-r from-primaryLight to-secondaryLight blur-3xl ${
                        hoveredIndex >= 0 ? "opacity-100" : "opacity-0"
                      }`}
                    ></div>
                    {hoveredIndex >= 0 && (
                      <div
                        key={fleet[hoveredIndex].id}
                        className={`relative fleet-image show`}
                      >
                        <div aria-hidden="true" className={`absolute`}></div>
                        <Image
                          src={`/images/${fleet[hoveredIndex].image}`}
                          alt="illustration"
                          loading="lazy"
                          width={780}
                          height={492}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div
                className={`${space_grotesk.className} flex justify-right text-xl mt-12 py-8 `}
              >
                <Button
                  label="See all"
                  bgColor={"bg-swPrimary500"}
                  textColor={"text-white"}
                  endIcon={<HiArrowRight size={15} />}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="max-w-6xl mx-auto py-10">
          <div className="container mx-auto px-6 text-center md:px-12">
            <div className="mb-16">
              <h2 className="mb-4 text-center text-[18px] font-semibold  text-swPrimary500  md:text-[18px] ">
                Our Services
              </h2>
              <p className="text-swGray700  font-semibold lg:w-8/12 mt-8 sm:mx-auto sm:w-10/12 md:w-2/3  text-4xl text-center sm:text-5xl md:text-6xl">
                We offer world a class exotic experience
              </p>
            </div>
            <div className="grid gap-6 px-8 sm:px-0 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group relative rounded-3xl space-y-8 overflow-hidden"
                >
                  <img
                    className="mx-auto h-[26rem] w-full object-cover object-top  duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    src={service.imageSrc}
                    alt={service.title}
                    loading="lazy"
                    width="640"
                    height="805"
                  />
                  <div className="absolute bottom-0 inset-x-0 h-max mt-auto px-12 py-4 bg-gradient-to-r from-neutral-400 to-stone-500/90">
                    <div>
                      <h4 className="text-xl text-left font-semibold text-white mb-3">
                        {service.title}
                      </h4>
                    </div>
                    <p className="mt-4 text-xs text-left text-gray-300">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center text-lg mt-12">
            <Button
              label="See all"
              bgColor={"bg-swPrimary500"}
              textColor={"text-white"}
              endIcon={<HiArrowRight size={20} />}
            />
          </div>
        </section>
        <section className="max-w-6xl mx-auto py-10">
          <div className="container mx-auto px-6 text-center md:px-12">
            <div className="mb-16">
              <h2 className="mb-4 text-center text-[18px] font-semibold text-swPrimary500  md:text-[18px] ">
                Membership
              </h2>
              <p className="text-swGray700 mt-8 sm:mx-auto   text-xl text-center sm:text-xl md:text-xl">
                Swift Wings Ltd offers an exclusive Jet Card Membership,
                providing discerning travelers with unparalleled access to
                private jet charter services. As a Jet Card member, you enjoy
                priority booking and seamless travel experiences tailored to
                your preferences.
              </p>
            </div>
          </div>
          <div className="mb-16">
            <h2 className="mb-8 text-center text-[18px]  text-gray-700 md:text-[18px] ">
              Features
            </h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="max-w-full grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 grid-rows-2 gap-y-8 justify-center items-center relative">
                {textAreas.map((area, index) => (
                  <div
                    key={index}
                    style={{ width: "270px", height: "180px" }}
                    className={`bg-swSecondary200 outline-none features-card flex flex-col justify-center items-center py-20 px-6 font-medium text-xl text-swGray600 text-center`}
                  >
                    {area.description}
                  </div>
                ))}
                <Image
                  className="h-[298.8px] w-[250px] absolute my-3 mx-[!important] top-[-163px] left-[-134px] object-contain mix-blend-darken z-[1]"
                  src={Crown}
                  alt="Crown"
                />
              </div>
            </div>
            <div className="flex justify-center text-lg mt-24">
              <Button
                label="Become a member"
                bgColor={"bg-swPrimary500"}
                textColor={"text-white"}
                endIcon={<CiStar size={20} />}
              />
            </div>
          </div>
        </section>
        <section className="mx-auto py-16 px-16">
          <div className="container mx-auto px-6 text-center md:px-12">
            <div className="mx-auto max-w-[990px]">
              <h2 className="mb-4 text-center text-[18px]  text-swPrimary500 md:text-[18px] ">
                Customer Testimonials
              </h2>
              <p className="text-swGray700 mt-8 sm:mx-auto text-xl text-center sm:text-xl md:text-xl">
                Swift Wings Ltd offers an exclusive Jet Card Membership,
                providing discerning travelers with unparalleled access to
                private jet charter services. As a Jet Card member, you enjoy
                priority booking and seamless travel experiences tailored to
                your preferences.
              </p>
            </div>
          </div>
          <div className="mb-16">
            <div className="relative mt-32">
              <div
                className="container-snap mt-10 pb-8 flex gap-4 sm:gap-8 md:gap-32 snap-x overflow-x-auto self-center slider"
                style={{ scrollSnapAlign: "start" }}
              >
                <Marquee pauseOnHover={true} speed={60}>
                  {testimonial.map((item) => (
                    <div
                      key={item.id}
                      className={`scroll-ml-6 snap-start ml-16 'blur' : ''`}
                      onMouseEnter={() => handleMouseEnter(item.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="relative flex-shrink-0 max-w-[95vw] md:max-w-[768px] overflow-hidden Testimonial-card">
                        <div className="absolute inset-0 w-full h-full bg-swSecondary400 "></div>
                        <div className="relative h-65 md:h-65 w-full p-3 md:p-8 flex flex-col justify-between items-center">
                          <div className="py-4 md:py-8 px-2 md:px-4">
                            <p className="font-bold text-swGray900 text-lg md:text-xl text-center">
                              {item.name}
                            </p>
                            <h2 className="text-gray-700 mt-4 md:mt-8 text-base md:text-base text-center">
                              {item.testimonial}
                            </h2>
                            <div className="flex justify-center mt-4 md:mt-8">
                              <FaXTwitter />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Marquee>
              </div>
            </div>
          </div>
          <div className="flex justify-center text-lg mt-12">
            <Button
              label="Become a member"
              bgColor={"bg-swPrimary500"}
              textColor={"text-white"}
              endIcon={<CiStar size={20} />}
            />
          </div>
        </section>
      </NavAndFooter>
    </main>
  );
}