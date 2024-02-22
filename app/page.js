"use client";
import { useState, useRef, useEffect } from "react";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import NavBar from "./components/NavBar";
import privateJetImg from "../public/images/Private jet, airplane icon, vector.png";
import departImg from "../public/images/Depart-white.png";
import arriveImg from "../public/images/Arrive-white.png";
import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";
import { MdMms, MdOutlineCalendarToday } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import Button from "./components/Button";
import { HiArrowRight } from "react-icons/hi";
import Services from "./components/Services";
import servicesPlane from "../public/images/servicesLuxuryPlane.png";
import servicesMembership from "../public/images/servicesMembership.png";
import servicesCustomer from "../public/images/sevicesCustomer.png";
import Offer1 from "../public/images/Offer1.png";
import AboutUsCard from "./components/AboutUsCard";
import "../styles.css";
import { services } from "./components/servicedata";
import { fleet } from "./components/fleetcard";
import Icon from "@mdi/react";
import { textAreas } from "./components/servicesgrid";
import Crown from "../public/images/Crown.png";
import { CiStar } from "react-icons/ci";
import indexAirplane from "../public/images/indexAirplane.png";
import Footer from "./components/shared/Footer";
import { testimonial } from "./CustomerTestimonial";
import Marquee from "react-fast-marquee";
import { FaXTwitter } from "react-icons/fa6";


const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});

export default function Home() {
  const [bookingEngine, setBookingEngine] = useState("oneWayTrip");
  const [hoveredIndex, setHoveredIndex] = useState(0); // Set the initial hovered index to 0

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(0); // Reset the hovered index to 0 when mouse leaves
  };

  return (
    <main className="px-5 relative bg-swLightBgGray">
      <NavBar />
      <section className="bg-swWine w-full p-10 pt-48 text-white relative pb-10 rounded-bl-[2.5rem] rounded-br-[2.5rem]">
        <div className="max-w-7xl mx-auto mb-44 relative h-[60vh]">
          <Image
            src={indexAirplane}
            alt="aiplane"
            className="absolute ml-auto right-0 "
          />
          <div className="max-w-lg pt-16 z-50">
            <p className="text-7xl font-bold leading-snug z-50">
              Experience Unmatched Luxury Travel
            </p>
            <p className="max-w-xl mt-10 z-10">
              Experience the epitome of safety, luxury and convenience with{" "}
              <span className="font-bold">
                Swiftwings private jet charter service
              </span>
            </p>
          </div>
        </div>

        <section className="absolute max-w-7xl -bottom-36 right-1/2 transform translate-x-1/2 w-full">
          <div className="flex gap-10 justify-end max-w-7xl mx-auto pr-5 text-center">
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
          <div className="p-5 bg-swWine rounded-[1.9rem]">
            <div className="w-full bg-swWine">
              <div className="p-5 bg-swLightBgGray rounded-3xl">
                <div className="flex justify-between items-center mb-5">
                  <p className="font-semibold text-swDarkGray ml-2">
                    Book a jet
                  </p>
                  <div className="p-2 rounded-full shadow-md flex gap-5">
                    <button
                      className={`${bookingEngine === "oneWayTrip"
                        ? "text-swWine shadow"
                        : "text-swLightGray"
                        } py-2 px-4 rounded-full`}
                      onClick={() => setBookingEngine("oneWayTrip")}
                    >
                      One Way Rrip
                    </button>
                    <button
                      className={`${bookingEngine === "roundTrip"
                        ? "text-swWine shadow"
                        : "text-swLightGray"
                        } py-2 px-4 rounded-full`}
                      onClick={() => setBookingEngine("roundTrip")}
                    >
                      Round Trip
                    </button>
                    <button
                      className={`${bookingEngine === "roadCruise"
                        ? "text-swWine shadow"
                        : "text-swLightGray"
                        } py-2 px-4 rounded-full`}
                      onClick={() => setBookingEngine("roadCruise")}
                    >
                      Road Cruise
                    </button>
                  </div>
                  <div className={`${space_grotesk.className} w-fit text-lg `}>
                    <Button
                      label="Book Jet"
                      bgColor={"bg-swWine hover:bg-swDarkWine"}
                      textColor={"text-white"}
                      endIcon={<HiArrowRight size={20} />}
                    />
                  </div>
                </div>
                <div className="flex justify-between mb-5 ">
                  <div className="flex items-center gap-9 mx-auto flex-wrap">
                    <div className="flex items-center mx-auto">
                      <div className="p-5 pr-16 flex w-72 items-center gap-5 border rounded-tl-2xl rounded-bl-2xl">
                        <div className="bg-swWine p-1 rounded-full">
                          <div className="h-7 w-7 relative">
                            <Image src={departImg} alt="depart" fill />
                          </div>
                        </div>
                        <div>
                          <p className="text-swLightGray text-sm">
                            Departure city
                          </p>
                          <p className="text-lg text-swDarkGray font-semibold">
                            Abuja - Nigeria
                          </p>
                        </div>
                      </div>
                      <div className="p-1 rounded-full border text-black -ml-4 bg-swLightBgGray">
                        <GoArrowRight size={15} className={"-mb-2 ml-1"} />
                        <GoArrowLeft size={15} className="-mt-2 mr-1" />
                      </div>
                      <div className="p-5 pr-16 flex w-72 items-center gap-5 border border-l-transparent -m-4 rounded-tr-2xl rounded-br-2xl">
                        <div className="bg-swWine p-1 rounded-full">
                          <div className="h-7 w-7 relative">
                            <Image src={arriveImg} alt="depart" fill />
                          </div>
                        </div>
                        <div>
                          <p className="text-swLightGray text-sm">
                            Arrival city
                          </p>
                          <p className="text-lg text-swDarkGray font-semibold">
                            Lagos - Nigeria
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-around gap-5 mx-auto flex-wrap">
                      <div className="p-5 pr-16 flex items-center w-72 gap-5 border rounded-2xl">
                        <div className="p-2 rounded-full border text-swDarkGray">
                          <MdOutlineCalendarToday size={20} />
                        </div>
                        <div>
                          <p className="text-swLightGray text-sm">
                            Departure date
                          </p>
                          <p className="text-lg text-swDarkGray font-semibold">
                            20 Jan
                          </p>
                        </div>
                      </div>
                      <div className="p-5 flex items-center w-72 gap-5 border rounded-2xl">
                        <div className="p-2 rounded-full border text-swDarkGray">
                          <BiUser size={20} />
                        </div>
                        <div>
                          <p className="text-swLightGray text-sm">
                            Departure city
                          </p>
                          <p className="text-lg text-swDarkGray font-semibold">
                            4 Adult - 2 Children
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
      <section className="mt-60 py-16 px-5 text-swDarkGray">
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
        <div className="max-w-4xl w-full mx-auto text-center mt-40">
          <Services
            name={"Dedicated customer service"}
            text="At SwiftWings, our dedicated customer service is more than a commitment; it's a promise of excellence. Our aviation experts, based in New York and Florida, are available 24/7 to provide unparalleled support, ensuring your journey is seamless and stress-free. From personalized itinerary planning to addressing your unique needs, SwiftWings' customer service is devoted to delivering an unmatched level of care, enhancing every aspect of your private jet experience. Your satisfaction and peace of mind are at the heart of our service philosophy."
            image={servicesCustomer}
          />
        </div>
      </section>

      <section className=" max-w-6xl mx-auto py-10">
        <p className="text-swWine font-medium text-lg">About us</p>
        <div className="flex justify-between mt-10">
          <p className="font-semibold text-swWine text-5xl max-w-sm">
            Get to know more about Swiftwings
          </p>
          <p className="text-swLightGray text-lg font-light max-w-[26rem] w-full">
            Swift Wings is a premier provider of private jets charter flights
            connecting global airports, offering unmatched convenience and
            exclusivity for luxury travel.
          </p>
        </div>

        <div className="flex flex-col items-center gap-5 mt-14">
          <div className="flex gap-5 justify-center">
            <AboutUsCard
              number={"75"}
              text={"Swiftwings users from all over the globe."}
            />
            <AboutUsCard
              number={"1.5k"}
              text={"Swiftwings access to a network of airplanes"}
              numberColor={"text-black"}
            />
            <AboutUsCard
              number={"50"}
              text={"Swiftwings destinations in the past 3 years"}
            />
          </div>

          <div className="bg-swButter text-swWine p-8 max-w-[44rem] rounded-2xl">
            <p className="font-light">
              Swift Wings understands that our clients’ travel needs often
              stretch far beyond the borders of Nigeria.
              <br /> That’s why we provide extensive global coverage, seamlessly
              connecting you to destinations in Europe, North America, South
              America, and other corners of the world, even the most remote
              ones. With our network of trusted partners and affiliates, we
              ensure that you experience the convenience and flexibility of air
              travel on a global scale.
            </p>
            <div className="mt-5 flex justify-end gap-3 items-center">
              Learn more <GoArrowRight size={20} />
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto py-10">
        <div className="relative pt-40 pb-20 lg:pt-44">
          <div className="relative 2xl:container m-auto px-6 md:px-12 lg:px-6">
            <p className="sm:mx-auto sm:w-10/12 md:w-2/3 text-swWine font-semibold text-center sm:text-[18px] md:text-[18px] lg:text-[18px] lg:w-auto lg:text-left">Fleet Showcase</p>
            <h1 className="mt-8 sm:mx-auto sm:w-10/12 md:w-2/3 text-swDarkGray text-4xl font-semibold text-center sm:text-5xl md:text-6xl lg:w-auto lg:text-left xl:text-7xl">Our Fleet.</h1>
            <div className="flex gap-6 mt-12">
              <div className="col-span-2 relative">
              {fleet.map((item, index) => (
                <div
                  key={item.id}
                  className="col-span-2 relative"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-2 mt-2 p-3 border-gray-200 rounded duration-300 hover:bg-swBgGray">
                      <div className="flex items-center fleet-item">
                        <a aria-label="icon" className="block">
                          <p className="font-medium md:block text-[20px] text-swLightGray">{item.name}</p>
                        </a>
                      </div>
                      <div className="flex-1 flex flex-col items-start justify-between text-xs text-gray-800 px-3 py-1 lg:col-span-2">
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
              <div className="flex justify-center items-center  image-container">
              <div className="">
                <div aria-hidden="true" className={` absolute scale-75 md:scale-110 inset-0 m-auto rotate-45 bg-gradient-to-r from-primaryLight to-secondaryLight blur-3xl ${hoveredIndex === 0 ? 'opacity-100' : 'opacity-0'}`}></div>
                <Image src={Offer1} className={` relative fleet-image ${hoveredIndex === 0 ? 'opacity-100' : 'opacity-0'}`} alt="illustration" loading="lazy" />
              </div>
              </div>
            </div>
            <div
              className={`${space_grotesk.className} flex justify-right text-xl mt-12 py-8 `}
            >
              <Button
                label="See all"
                bgColor={"bg-swWine"}
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
            <h2 className="mb-4 text-center text-[18px] font-semibold  text-swWine  md:text-[18px] ">
              Our Services
            </h2>
            <p className="text-swDarkGray  font-semibold lg:w-8/12 mt-8 sm:mx-auto sm:w-10/12 md:w-2/3  text-4xl text-center sm:text-5xl md:text-6xl">
              We offer world a class exotic experience
            </p>
          </div>
          <div className="grid gap-6 px-4 sm:px-0 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative rounded-3xl space-y-8 overflow-hidden"
              >
                <img
                  className="mx-auto h-[26rem] w-full object-cover object-top ransition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  src={service.imageSrc}
                  alt={service.title}
                  loading="lazy"
                  width="640"
                  height="805"
                />
                <div className="absolute bottom-0 inset-x-0 h-max mt-auto px-12 py-4 bg-gradient-to-r from-neutral-400 to-stone-500/90">
                  <div>
                    <h4 className="text-xl text-left font-semibold text-white mb-3">{service.title}</h4>
                  </div>
                  <p className="mt-4 text-xs text-left text-gray-300">{service.description}</p>

                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center text-lg mt-12">
          <Button
            label="See all"
            bgColor={"bg-swWine"}
            textColor={"text-white"}
            endIcon={<HiArrowRight size={20} />}
          />
        </div>
      </section>
      <section className="max-w-6xl mx-auto py-10">
        <div className="container mx-auto px-6 text-center md:px-12">
          <div className="mb-16">
            <h2 className="mb-4 text-center text-[18px] font-semibold text-swWine  md:text-[18px] ">
              Membership
            </h2>
            <p className="text-gray-700 dark:text-gray-300  mt-8 sm:mx-auto   text-xl text-center sm:text-xl md:text-xl">
              Swift Wings Ltd offers an exclusive Jet Card Membership, providing
              discerning travelers with unparalleled access to private jet
              charter services. As a Jet Card member, you enjoy priority booking
              and seamless travel experiences tailored to your preferences.
            </p>
          </div>
        </div>
        <div className="mb-16">
          <h2 className="mb-4 text-center text-[18px]  text-gray-700 md:text-[18px] ">
            Features
          </h2>
          <div className="max-w-full grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 grid-rows-2 gap-y-8 justify-center items-center relative">
            {textAreas.map((area, index) => (
              <div
                key={index}
                className={`bg-swBgGray outline-none features-card flex flex-col justify-center items-center py-24 px-8 font-medium text-lg text-darkgray text-center`}
              >
                {area.description}
              </div>
            ))}
            <Image
              className="h-[298.8px] w-[328.8px] absolute my-0 mx-[!important] top-[-153px] left-[-154px] object-contain mix-blend-darken z-[1]"
              src={Crown}
              alt="Crown"
            />
          </div>
          <div className="flex justify-center text-lg mt-12">
            <Button
              label="Become a member"
              bgColor={"bg-swWine"}
              textColor={"text-white"}
              endIcon={<CiStar size={20} />}
            />
          </div>
        </div>
      </section>
      <section className="mx-auto py-16 px-16">
        <div className="container mx-auto px-6 text-center md:px-12">
          <div className="mb-16">
            <h2 className="mb-4 text-center text-[18px]  text-swWine md:text-[18px] ">
              Customer Testimonials
            </h2>
            <p className="text-gray-700   mt-8 sm:mx-auto   text-xl text-center sm:text-xl md:text-xl">
              Swift Wings Ltd offers an exclusive Jet Card Membership, providing discerning travelers with unparalleled access to private jet charter services. As a Jet Card member, you enjoy priority booking and seamless travel experiences tailored to your preferences.
            </p>
          </div>
        </div>
        <div className="mb-16">
          <div className="relative mt-32">
            <div
             
              className="container-snap mt-10 pb-8 flex gap-32 snap-x overflow-x-auto self-center"
              style={{ scrollSnapAlign: "start" }}
            >
              <Marquee pauseOnHover ={true} speed ={60}>
                {testimonial.map((item) => (
                  <div
                    key={item.id}
                    className="scroll-ml-6 snap-start ml-16"
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="relative flex-shrink-0 max-w-[95vw] overflow-hidden Testimonial-card">
                      <div className="absolute inset-0 w-full h-full bg-swBgGray "></div>
                      <div className="relative h-98 w-[768px] p-12 flex flex-col justify-between items-center">
                        <div className="py-10 px-4">
                          <p className="font-bold text-gray-800 text-center">
                            {item.name}
                          </p>
                          <h2 className="text-gray-700 mt-8 sm:mx-auto text-xl text-center sm:text-xl md:text-[18px]">
                            {item.testimonial}
                          </h2>
                          <div className="flex justify-center mt-8">
                            <FaXTwitter  />
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
            bgColor={"bg-swWine"}
            textColor={"text-white"}
            endIcon={<CiStar size={20} />}
          />
        </div>
      </section>
      <Footer />
    </main>
  );
}
