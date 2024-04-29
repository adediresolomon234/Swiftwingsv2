"use client";
import { useState, useEffect } from "react";
import { Space_Grotesk } from "next/font/google";
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
import Crown from "../public/images/Crown.png";
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
import SuccessModal from "./components/shared/modals/SuccessModal";

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
  const dispatch = useDispatch();
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const aircrafts = useSelector((state) => state.aircrafts.aircrafts);
  const [fleet, setFleet] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize()
    return () => window.removeEventListener('resize', handleResize);
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
    <main className="relative bg-swLightBgGray">
     <NavAndFooter Nav={true}>
        <section className="w-full p-10 pt-48 text-white relative pb-10">
          <div className="absolute h-full w-full top-0 left-0">
            {isMobile ? (
              <Image src={MbheroBgImg} alt="aiplane" className="h-full w-full object-cover" />
            ) : (
              <Image src={heroBgImg} alt="aiplane" className="h-full w-full object-cover" />
            )}
          </div>
          <div className="h-full w-full bg-swBlack absolute top-0 left-0 bg-opacity-10" />
          <div className="max-w-7xl mx-auto mb-10 relative text-center">
            <div className="pt-28 z-50">
              <p className="text-4xl md:text-6xl lg:text-8xl font-bold leading-snug z-50">
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
            <BookingEngine />
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

        <section className=" max-w-6xl mx-auto p-5">
          <div className="flex flex-col items-start gap-5 ">
            <p className="text-swPrimary500 font-medium text-lg">About us</p>
            <div className="flex flex-col md:flex-row justify-between mt-10 w-full space-y-8 md:space-y-0 ">
              <p className="font-semibold text-swPrimary500 text-3xl max-w-md md:text-5xl">
                Get to know more about Swiftwings
              </p>
              <p className="text-swGray500 text-lg font-light max-w-[26rem] ">
                Swift Wings is a premier provider of private jets charter
                flights connecting global airports, offering unmatched
                convenience and exclusivity for luxury travel.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-5 mt-14 p-5 md: p-0 ">
            <div className="grid grid-col-3 grid-flow-col gap-4 mb: gap-12 justify-center ">
              <AboutUsCard
                number={"75"}
                text={"Swiftwings users from all over the globe."}
                className="text-sm"
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
            <div className="relative 2xl:container m-auto px-0 md:px-0 lg:px-0">
              <p className="sm:mx-auto sm:w-10/12 md:w-2/3 p-1 text-swPrimary500 font-semibold text-center sm:text-[18px] md:text-[18px] lg:text-[18px] lg:w-auto lg:text-left">
                Fleet Showcase
              </p>
              <h1 className="mt-8 sm:mx-auto sm:w-10/12 md:w-2/3 text-swGray700 text-4xl font-semibold text-center sm:text-5xl md:text-5xl lg:w-auto lg:text-left xl:text-6xl">
                Our Fleets.
              </h1>
              <div className="flex gap-8 mt-12">
                <div className="col-span-4 relative">
                  {fleet.map((item, index) => (
                    <div
                      key={item.id}
                      className="col-span-2 relative"
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="p-6 lg:p-2 grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-8 border-gray-200 rounded duration-300 hover:bg-swBgGray">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center fleet-item space-y-2 sm:space-y-0">
                          <a aria-label="icon" className="block">
                            <p className="font-medium md:block text-[18px] text-swGray700 ">
                              {item.name}
                            </p>
                          </a>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-between text-xs text-gray-800 px-1 py-3 lg:col-span-2">
                          <div className="flex justify-between flex-grow gap-8 mt-6 font-normal sm:mt-0 mt-[-10px] ">
                            <div className="flex items-center ">
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
                              <span className="ml-3 ">{item.speed}</span>
                            </div>
                            <div className="flex items-center">
                              <svg className="w-6 h-6" viewBox="0 0 24 24">
                                <path
                                  fill="currentColor"
                                  d={mdiArrowLeftRight}
                                />
                              </svg>
                              <span className="ml-3 ">{item.feet}</span>
                            </div>
                          </div>
                          <div className=" self-stretch relative leading-[18px] mt-4 mx-2 text-swLightGray">
                            {item.name}
                          </div>
                        </div>
                      </div>
                      <hr className="w-full border-gray-200 mb-3 sm:mb-0" />
                    </div>
                  ))}
                </div>
                <div className="flex justify-center items-center relative w-[50%] lg:block hidden">
                  <div className="">
                    <div
                      aria-hidden="true"
                      className={`absolute scale-75 md:scale-110 inset-0 m-auto rotate-45 bg-gradient-to-r from-primaryLight to-secondaryLight blur-3xl ${
                        hoveredIndex >= 0 ? "opacity-100" : "opacity-0"
                      }`}
                    ></div>
                    {hoveredIndex >= 0 && fleet[hoveredIndex]?.image && (
                      <div
                        key={fleet[hoveredIndex].id}
                        className={`relative fleet-image show`}
                      >
                        <div aria-hidden="true" className={`absolute`}></div>
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
                className={`${space_grotesk.className} flex justify-right text-xl mt-12 py-8 p-6 lg:p-0 `}
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
            <div className="grid gap-3  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <div className="max-w-2xl mx-auto p-2" key={index}>
                  <div className=" overflow-hidden w-full">
                    <img
                      className="object-cover w-full rounded-t-2xl"
                      src={service.imageSrc}
                      alt={service.title}
                      loading="lazy"
                      width="640"
                      height="805"
                    />
                    <div className="p-3  bg-gradient-to-r from-neutral-400 to-stone-500/90 rounded-b-2xl text-left  ">
                      <div className="justify-start items-start">
                        <h4 className="mb-2 text-2xl font-bold tracking-tight text-white ">
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
          <div className="container mx-auto px-6 text-start md:text-center md:px-12">
            <div className="mb-16">
              <h2 className="mb-4 text-start md:text-center text-[18px] font-semibold text-swPrimary500  md:text-[18px] ">
                Membership
              </h2>
              <p className="text-swGray700 mt-8 sm:mx-auto md:text-xl text-start md:text-center text-md ">
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
        <section className="mx-auto py-16 px-3 md:px-16 ">
          <div className="container mx-auto px-6 text-start md:text-center md:px-12">
            <div className="mx-auto max-w-[990px]">
              <h2 className="mb-4 text-start md:text-center text-[18px]  text-swPrimary500 md:text-[18px] ">
                Customer Testimonials
              </h2>
              <p className="text-swGray700 mt-8 sm:mx-auto text-start md:text-xl md:text-center text-center text-md">
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
