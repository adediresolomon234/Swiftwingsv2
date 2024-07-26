"use client";
import { useState, useEffect } from "react";
import { Space_Grotesk, Libre_Baskerville } from "next/font/google";
import Image from "next/image";
import { GoArrowRight } from "react-icons/go";
import Button from "./components/Button";
import { HiArrowRight } from "react-icons/hi";
import Services from "./components/Services";
import servicesPlane from "../public/images/servicesLuxuryPlane.png";
import servicesMembership from "../public/images/servicesMembership.png";
import servicesCustomer from "../public/images/sevicesCustomer.png";
import AboutUsCard from "./components/AboutUsCard";
import "../styles.css";
import { services } from "./components/servicedata";
import { textAreas } from "./components/servicesgrid";
import { CiStar } from "react-icons/ci";
import NavAndFooter from "./components/shared/NavAndFooter";
import { testimonial } from "./CustomerTestimonial";
import Marquee from "react-fast-marquee";
import { FaXTwitter } from "react-icons/fa6";
import heroBgImg from "../public/images/heroBackgroundImage.png";
import MbheroBgImg from "../public/images/MbheroBgImg.png";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchAircrafts } from "@/redux/slices/aircraftdetails";
import { mdiCarSeat, mdiSpeedometer, mdiArrowLeftRight } from "@mdi/js";
import BookingEngine from "./components/bookingEngine/bookingEngine";
import Head from "next/head"; 
import {
  SWTStarBlackIcon,
  SWTAddPersonBlackIcon,
  SWTSandClockBlackIcon,
  SWTGalaglobeIcon,
} from "./components/svgs";

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});
const libre_baskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
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
  const dispatch = useDispatch();
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const aircrafts = useSelector((state) => state.aircrafts.aircrafts);
  const [fleet, setFleet] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(fetchAircrafts());
  }, [dispatch]);

  useEffect(() => {
    if (aircrafts.length > 0) {
      setFleet(aircrafts.slice(0, 5));
    }
  }, [aircrafts]);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(0);
  };

  const handleSeeAllClick = () => {
    router.push("/fleet-page");
  };

  return (
    <main className="relative bg-swLightBgGray overflow-x-hidden">
       <Head>
        <title>Best Private in Nigeria | Private Jet Fastest Flight | On Demand Private Jet Charter</title>
        <meta
          name="description"
          content="Enjoy the latest and finest Private Jets in the market, Top-tier concierge services and exclusive empty legs deal." />
      </Head>
      <NavAndFooter Nav={true}>
        <section className="w-full p-5 md:10 pt-48 text-white relative pb-10">
      
          <div className="absolute h-full w-full top-0 left-0">
            {isMobile ? (
              <div className="relative h-full w-full">
                <Image
                  src={MbheroBgImg}
                  alt="aiplane"
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full"></div>
              </div>
            ) : (
              <div className="relative h-full w-full">
                <Image
                  src={heroBgImg}
                  alt="aiplane"
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full"></div>
              </div>
            )}
          </div>

          <div className="max-w-7xl mx-auto mb-10 relative text-center mt-40">
            <div className="pt-20 z-50">
              <p className="3xl:text-6xl 2xl:text-6xl lg:text-5xl md:text-4xl sm:text-4xl xs:text-4xl  max-w-4xl mx-auto w-full font-bold leading-snug z-50">
                The World is Closer to You
              </p>
            </div>

            <div className="flex gap-10 justify-center text-center mt-6">
              <div>
                <p className="font-semibold text-2xl">10k</p>
                <p className="text-xs">Flights</p>
              </div>
              <div>
                <p className="font-semibold text-2xl">6k</p>
                <p className="text-xs">Clients</p>
              </div>
              <div>
                <p className="font-semibold text-2xl">97</p>
                <p className="text-xs">Countries</p>
              </div>
            </div>
          </div>

          <section className="max-w-7xl mx-auto w-full relative">
            <BookingEngine />
          </section>
        </section>
        <section className="mt-30 py-16 px-5 text-swGray900 ">
          <div className=" py-6">
            <p className="text-lg text-swPrimary500 text-center mb-20 font-medium">
              Why Choose{" "}
              <span
                className={`${libre_baskerville.className} text-swPrimary500 no-text-shadow font-bold`}
              >
                Swift<i className="font-normal">Wings</i>
              </span>
            </p>

            <div className="max-w-8xl mx-auto px-0 text-gray-500">
        
              <div className="grid gap-4 md:mx-auto sm:grid-cols-2 lg:w-full xl:grid-cols-4">
                <div className="group space-y-6 rounded-3xl border border-gray-100 bg-swSecondary300 px-8 py-12 text-center">
                  <SWTStarBlackIcon className="mx-auto svgIcon" />
                  <h3 className="text-xl font-semibold text-swPrimary500 bg-swSecondary500  rounded-full p-3">
                    VIP Treatment
                  </h3>
                  <p>
                    Enjoy luxurious comfort, in-flight catering customised to
                    your taste. Get entertained by favourite shows or stay
                    connected with work using free Wi-Fi. Arrive refreshed &
                    ready for your destination. Fly on a private flight schedule
                  </p>
                </div>
                <div className="group space-y-6 rounded-3xl border border-gray-100 bg-swSecondary300 px-4 py-6 md:px-8 md:py-12 text-center">
                  <SWTGalaglobeIcon className="mx-auto svgIcon" />
                  <h3 className="text-xl font-semibold text-swPrimary500 bg-swSecondary500 rounded-full p-3">
                    Global Access
                  </h3>
                  <p>
                    <span
                      className={`${libre_baskerville.className} text-swPrimary500 no-text-shadow font-bold`}
                    >
                      Swift<i className="font-normal">Wings</i>
                    </span>{" "}
                    grants you exclusive access to private jets for seamless
                    travel anywhere in the globe. Remember, we bring the world
                    closer to you!
                  </p>
                </div>
                <div className="group space-y-6 rounded-3xl border border-gray-100 bg-swSecondary300 px-8 py-12 text-center">
                  <SWTSandClockBlackIcon className="mx-auto svgIcon" />
                  <h3 className="text-xl font-semibold text-swPrimary500 bg-swSecondary500 rounded-full p-3">
                    Save Time
                  </h3>
                  <p>
                    Skip the crowds & time wasters! Time is a precious commodity
                    not to be wasted. Fly private, fast and secure with{" "}
                    <span
                      className={`${libre_baskerville.className} text-swPrimary500 no-text-shadow font-bold`}
                    >
                      Swift<i className="font-normal">Wings</i>
                    </span>{" "}
                    private jet charter services.
                  </p>
                </div>
                <div className="group space-y-6 rounded-3xl border border-gray-100 bg-swSecondary200 px-8 py-12 text-center ">
                  <SWTAddPersonBlackIcon className="mx-auto svgIcon" />
                  <h3 className="text-xl font-semibold text-swPrimary500 bg-swSecondary500 rounded-full p-3">
                    Membership
                  </h3>
                  <p>
                    Network with high profile individuals like you and strike a
                    deeper connection and get access to premium services like:
                    unlimited private jet access, highly personalised travel
                    experience, priority scheduling, empty leg prior
                    notification, etc
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="max-w-4xl w-full mx-auto text-center">
            <Services
              name={"VIP Treatment"}
              text={
                <p>
                  <span
                    className={`${libre_baskerville.className} text-swPrimary500 no-text-shadow font-bold`}
                  >
                    Swift<i className="font-normal">Wings</i>
                  </span>{" "}
                  Enjoy luxurious comfort, in-flight catering customised to your
                  taste. Get entertained by favourite shows or stay connected
                  with work using free Wi-Fi. Arrive refreshed & ready for your
                  destination. Fly on a private flight schedule, not airlines.
                </p>
              }
              image={servicesPlane}
            />
          </div> */}
          {/* <div className="max-w-4xl w-full mx-auto text-center mt-32">
            <Services
              name={"Global Access"}
              text={
                <p>
                  <span
                    className={`${libre_baskerville.className} text-swPrimary500 no-text-shadow font-bold`}
                  >
                    Swift<i className="font-normal">Wings</i>
                  </span>{" "}
                  grants you exclusive access to private jets for seamless
                  travel anywhere in the globe. Remember, we bring the world
                  closer to you!{" "}
                </p>
              }
              image={servicesMembership}
            />
          </div> */}
          {/* <div className="max-w-4xl w-full mx-auto text-center  mt-32">
            <Services
              name={"Save Time"}
              text={
                <p>
                  At{" "}
                  <span
                    className={`${libre_baskerville.className} text-swPrimary500 no-text-shadow font-bold`}
                  >
                    Swift<i className="font-normal">Wings</i>
                  </span>
                  Skip the crowds & time wasters! Time is a precious commodity
                  not to be wasted. Fly private, fast and secure with Swiftwings
                  private jet charter services.{" "}
                </p>
              }
              image={servicesCustomer}
            />
          </div> */}
        </section>
        <section className="max-w-8xl mx-auto pt-10">
          <div className="px-6 text-center md:px-12">
            <div className="mb-16">
              <h2 className="mb-4 md:text-center text-start text-[18px] font-semibold  text-swPrimary500  md:text-[18px] ">
                Our Services
              </h2>
              <p className="text-swGray800  font-semibold max-w-2xl mt-8 sm:mx-auto text-3xl md:text-center text-start sm:text-5xl">
                We offer world a class exotic experience
              </p>
            </div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service, index) => (
                <div className="w-full" key={index}>
                  <div className="overflow-hidden w-full h-full rounded-2xl">
                    <img
                      className="object-cover w-full rounded-t-2xl"
                      src={service.imageSrc}
                      alt={service.title}
                      loading="lazy"
                      width="640"
                      height="805"
                    />
                    <div className="p-6 bg-gradient-to-r from-neutral-400 to-stone-500/90 text-left h-full">
                      <div className="justify-start items-start">
                        <h4 className="mb-2 text-2xl font-bold tracking-tight text-white">
                          {service.title}
                        </h4>
                      </div>
                      <p className="mb-3 font-normal text-white text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

    
        <section className="max-w-8xl mx-auto pt-10 px-4 lg:px-8">
          <div className="relative lg:pt-44">
            <div className="">
              <p className="sm:mx-auto sm:w-10/12 md:w-2/3 p-1 text-swPrimary500 font-semibold md:text-center text-start sm:text-[18px] md:text-[18px] lg:text-[18px] lg:w-auto lg:text-left">
                Fleet Showcase
              </p>
              <h1 className="mt-8 sm:mx-auto sm:w-10/12 md:w-2/3 text-swGray800 text-3xl font-semibold md:text-center text-start sm:text-5xl md:text-5xl lg:w-auto lg:text-left">
                Our Fleets.
              </h1>
              <div className="flex  gap-8 mt-12">
                <div className="w-full md:w-1/2">
                  {fleet.map((item, index) => (
                    <div
                      key={item.id}
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="lg:p-2 grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-8 border-gray-200 rounded duration-300 hover:bg-swBgGray">
                        <div className="flex items-start sm:items-center fleet-item space-y-2 sm:space-y-0">
                          <a aria-label="icon" className="block">
                            <p className="font-medium md:block text-[18px] text-swGray600">
                              {item.name}
                            </p>
                          </a>
                        </div>
                        <div className="flex items-start justify-between text-xs text-swGray800 px-1 py-3 lg:col-span-2">
                          <div className="flex flex-col gap-4">
                            <div className="flex justify-between gap-8 mt-6 font-normal sm:mt-0 mt-[-10px]">
                              <div className="flex items-center">
                                <svg className="w-6 h-6" viewBox="0 0 24 24">
                                  <path fill="currentColor" d={mdiCarSeat} />
                                </svg>
                                <span className="ml-3">
                                  {item.features.no_of_seats} seats
                                </span>
                              </div>
                              <div className="flex items-center">
                                <svg className="w-6 h-6" viewBox="0 0 24 24">
                                  <path fill="currentColor" d={mdiSpeedometer} />
                                </svg>
                                <span className="ml-3">{item.speed}</span>
                              </div>
                              <div className="flex items-center">
                                <svg className="w-6 h-6" viewBox="0 0 24 24">
                                  <path fill="currentColor" d={mdiArrowLeftRight} />
                                </svg>
                                <span className="ml-3">{item.feet}</span>
                              </div>
                            </div>
                            <div className="self-stretch relative leading-[18px] px-3 text-swGray600 text-left">
                              {item.name}
                            </div>
                          </div>
                        </div>

                      </div>
                      <hr className="w-full border-gray-200 mb-3 sm:mb-0" />
                    </div>
                  ))}
                </div>
                <div className="hidden md:flex md:w-1/2 justify-center items-center">
                  <div className="">
                    {hoveredIndex >= 0 && fleet[hoveredIndex]?.image && (
                      <div
                        key={fleet[hoveredIndex].id}
                        className={`relative fleet-image show`}
                      >
                        <Image
                          className="image-class"
                          src={fleet[hoveredIndex].image}
                          alt="illustration"
                          loading="lazy"
                          layout="responsive"
                          width={780}
                          height={492}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`${space_grotesk.className} flex justify-end text-xl py-8 lg:p-0 mt-10`}
              >
                <Button
                  label="See all"
                  bgColor={"bg-swPrimary500"}
                  textColor={"text-white"}
                  endIcon={<HiArrowRight size={15} />}
                  onClick={handleSeeAllClick}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto pt-10">
          <div className="px-4 md:px-6 text-start md:text-center">
            <div className="mb-16">
              <h2 className="mb-4 text-start md:text-center text-[18px] font-semibold text-swPrimary500  md:text-[18px] ">
                Membership
              </h2>
              <p className="text-swGray800 max-w-4xl mt-8 sm:mx-auto md:text-lg text-start md:text-center text-md ">
                {/* <span
                  className={`${libre_baskerville.className} text-swPrimary500 no-text-shadow font-bold`}
                >
                  Swift<i className="font-normal">Wings</i>
                </span>{" "} */}
                Enjoy the benefits of{" "}
                <span
                  className={`${libre_baskerville.className} text-swPrimary500 no-text-shadow font-bold`}
                >
                  Swift<i className="font-normal">Wings</i>
                </span>{" "}
                Network with high profile individuals like you, strike a deeper
                connection, and get access to premium services like: unlimited
                private jet access, highly personalised travel experience,
                priority scheduling, <a href="https://www.swiftwingsjet.com/services" className="text-swGray800 font-bold hover:underline">empty leg prior notification </a> , etc
              </p>
            </div>
          </div>
          <div className="mb-16">
            <h2 className="mb-8 text-center text-[18px]  text-gray-700 md:text-[18px] ">
              Membership Features
            </h2>
            <div
              style={{ display: "flex", justifyContent: "center" }}
              className="px-4 md:px-0"
            >
              <div className="max-w-full grid gap-8 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 grid-rows-2 gap-y-8 justify-center items-center relative">
                {textAreas.map((area, index) => (
                  <div
                    key={index}
                    style={{
                      width: "100%",
                      maxWidth: "270px",
                      height: "180px",
                    }}
                    className={`bg-swSecondary200 outline-none features-card flex flex-col justify-center items-center py-6 px-4 md:px-6 text-lg md:text-xl text-swGray600 text-center`}
                  >
                    {area.description}
                  </div>
                ))}
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
        <section className="px-4 md:px-16 ">
          <div className="text-start md:text-center md:px-12">
            <div className="">
              <h2 className="mb-4 text-start md:text-center text-[18px] font-semibold  text-swPrimary500 md:text-[18px]">
                Customer Testimonials
              </h2>
              <p className="text-swGray800 mt-8 sm:mx-auto max-w-4xl md:text-lg md:text-center text-start text-md">
                <span
                  className={`${libre_baskerville.className} text-swPrimary500 no-text-shadow font-bold`}
                >
                  Swift<i className="font-normal">Wings</i>
                </span>{" "}
                Ltd offers an exclusive Jet Card Membership, providing
                discerning travelers with unparalleled access to private jet
                charter services. As a Jet Card member, you enjoy priority
                booking and seamless travel experiences tailored to your
                preferences.
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
        </section>
      </NavAndFooter>
    </main>
  );
}
