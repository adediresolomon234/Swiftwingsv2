"use client";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import NavBar from "./components/NavBar";
import privateJetImg from "../public/images/Private jet, airplane icon, vector.png";
import { useState } from "react";
import departImg from "../public/images/Depart-white.png";
import arriveImg from "../public/images/Arrive-white.png";
import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";
import { MdOutlineCalendarToday } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import Button from "./components/Button";
import { HiArrowRight } from "react-icons/hi";
import Services from "./components/Services";
import servicesPlane from "../public/images/servicesLuxuryPlane.png";
import servicesMembership from "../public/images/servicesMembership.png";
import servicesCustomer from "../public/images/sevicesCustomer.png";
import Offer1 from "../public/images/Offer1.png";
import AboutUsCard from "./components/AboutUsCard";
import Icon from '@mdi/react';
import { mdiCarSeat, mdiSpeedometer, mdiArrowLeftRight, mdiArrowRight } from '@mdi/js';
import '../styles.css';

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});

export default function Home() {
  const [bookingEngine, setBookingEngine] = useState("oneWayTrip");
  return (
    <main className="px-5 relative bg-swLightBgGray">
      <NavBar />
      <section className="bg-swWine w-full p-10 pt-48 text-white relative pb-10 rounded-bl-[2.5rem] rounded-br-[2.5rem]">
        <div className="max-w-7xl mx-auto mb-40">
          <div className="max-w-5xl">
            <p className="text-7xl font-bold leading-snug">
              Experience Unmatched Luxury Travel
            </p>
            <p className="max-w-xl mt-10">
              Experience the epitome of safety, luxury and convenience with{" "}
              <span className="font-bold">
                Swiftwings private jet charter service
              </span>
            </p>
          </div>
        </div>
        {/* <div className="absolute max-w-5xl right-0 top-5 w-full h-auto p-2 -z- ">
        <Image src={privateJetImg} alt="private jet" />
        </div> */}
        <div className="flex gap-10 mb-5 justify-end mb-[7.5rem] max-w-7xl mx-auto pr-10 text-center">
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

        <section className="p-5 absolute max-w-7xl w-full bg-swWine bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2 rounded-[1.9rem]">
          <div className="w-full w-full bg-swWine">
            <div className="p-5 bg-swLightBgGray rounded-3xl">
              <div className="flex justify-between items-center mb-5">
                <p className="font-semibold text-swDarkGray ml-2">Book a jet</p>
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
                <div />
              </div>

              <div className="flex justify-between mb-5">
                <div className="flex items-center gap-9 mx-auto">
                  <div className="flex items-center">
                    <div className="p-5 pr-16 flex items-center gap-5 border rounded-tl-2xl rounded-bl-2xl">
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
                    <div className="p-5 pr-16 flex items-center gap-5 border border-l-transparent -m-4 rounded-tr-2xl rounded-br-2xl">
                      <div className="bg-swWine p-1 rounded-full">
                        <div className="h-7 w-7 relative">
                          <Image src={arriveImg} alt="depart" fill />
                        </div>
                      </div>
                      <div>
                        <p className="text-swLightGray text-sm">Arrival city</p>
                        <p className="text-lg text-swDarkGray font-semibold">
                          Lagos - Nigeria
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-around gap-5">
                    <div className="p-5 pr-16 flex items-center gap-5 border rounded-2xl">
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
                    <div className="p-5 pr-16 flex items-center gap-5 border rounded-2xl">
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
              <div
                className={`${space_grotesk.className} flex justify-center text-lg`}
              >
                <Button
                  label="Book Jet"
                  bgColor={"bg-swWine"}
                  textColor={"text-white"}
                  endIcon={<HiArrowRight size={20} />}
                />
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
              stretch far beyond the borders of Nigeria.<br /> That’s why we provide
              extensive global coverage, seamlessly connecting you to
              destinations in Europe, North America, South America, and other
              corners of the world, even the most remote ones. With our network
              of trusted partners and affiliates, we ensure that you experience
              the convenience and flexibility of air travel on a global scale.
            </p>
            <div className="mt-5 flex justify-end gap-3 items-center">Learn more <GoArrowRight size={20} /></div>
          </div>
        </div>
      </section>
      <section className=" max-w-6xl mx-auto py-10">
        <div className="w-full md:w-[1512px] bg-white text-left text-4xl md:text-29xl text-gray-800 font-body-lg-medium">
          <div className="md:absolute top-[167px] left-1/2 md:left-[calc(50% - 606px)] tracking-[-0.02em] md:leading-[60px] font-semibold inline-block w-[454px]">
            Our fleets.
          </div>
          <div className="md:absolute top-[110px] left-1/2 md:left-[calc(50% - 606px)] text-lg leading-[28px] font-medium text-primary-500 inline-block w-[454px]">
            Fleet Showcase
          </div>
          <div className="md:flex md:flex-wrap md:gap-[10px] md:justify-start md:items-start">
            <div className="w-full md:w-[580px] show-image box-border flex flex-row items-center justify-center py-8 px-3 gap-[9px] border-b-[1px] border-solid border-gray-100">
              <div className="self-stretch flex-1 relative tracking-[-0.02em] leading-[32px] font-medium flex items-center">
                Hawker 800XP
              </div>
              <div className="flex-1 flex flex-col items-start justify-center gap-[4px] text-xs text-gray-800">
                <div className="self-stretch flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center justify-start gap-[10px]">
                    <Icon path={mdiCarSeat} size={1} />
                    <div className="relative leading-[18px]">8 seats</div>
                  </div>
                  <div className="flex flex-row items-center justify-start gap-[10px]">
                    <Icon path={mdiSpeedometer} size={1} />
                    <div className="relative leading-[18px]">826 km/h</div>
                  </div>
                  <div className="flex flex-row items-center justify-start gap-[10px]">
                    <Icon path={mdiArrowLeftRight} size={1} />
                    <div className="relative leading-[18px]">6 feet</div>
                  </div>
                </div>
                <div className="self-stretch relative leading-[18px] text-gray-600">
                  Midsize Business Jet
                </div>
              </div>
            </div>
            <div className="w-full md:w-[580px] show-image box-border flex flex-row items-center justify-center py-8 px-3 gap-[9px] border-b-[1px] border-solid border-gray-100">
              <div className="self-stretch flex-1 relative tracking-[-0.02em] leading-[32px] font-medium flex items-center">
                Bombardier Aerospace
              </div>
              <div className="flex-1 flex flex-col items-start justify-center gap-[4px] text-xs text-gray-800">
                <div className="self-stretch flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center justify-start gap-[10px]">
                    <Icon path={mdiCarSeat} size={1} />
                    <div className="relative leading-[18px]">12 seats</div>
                  </div>
                  <div className="flex flex-row items-center justify-start gap-[10px]">
                    <Icon path={mdiSpeedometer} size={1} />
                    <div className="relative leading-[18px]">870 km/h</div>
                  </div>
                  <div className="flex flex-row items-center justify-start gap-[10px]">
                    <Icon path={mdiArrowLeftRight} size={1} />
                    <div className="relative leading-[18px]">8.17 feet</div>
                  </div>
                </div>
                <div className="self-stretch relative leading-[18px] text-gray-600">
                  Super mid-size jet
                </div>
              </div>
            </div>
            <div className="w-full md:w-[580px] show-image box-border flex flex-row items-center justify-center py-8 px-3 gap-[9px] border-b-[1px] border-solid border-gray-100">
              <div className="self-stretch flex-1 relative tracking-[-0.02em] leading-[32px] font-medium flex items-center">
                Embraer
              </div>
              <div className="flex-1 flex flex-col items-start justify-center gap-[4px] text-xs text-gray-800">
                <div className="self-stretch flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center justify-start gap-[10px]">
                    <Icon path={mdiCarSeat} size={1} />
                    <div className="relative leading-[18px]">13 seats</div>
                  </div>
                  <div className="flex flex-row items-center justify-start gap-[10px]">
                    <Icon path={mdiSpeedometer} size={1} />
                    <div className="relative leading-[18px]">982 km/h</div>
                  </div>
                  <div className="flex flex-row items-center justify-start gap-[10px]">
                    <Icon path={mdiArrowLeftRight} size={1} />
                    <div className="relative leading-[18px]">6.9 feet</div>
                  </div>
                </div>
                <div className="self-stretch relative leading-[18px] text-gray-600">
                  Super mid-size business jet
                </div>
              </div>
            </div>
            <div className="w-full md:w-[580px] show-image box-border flex flex-row items-center justify-center py-8 px-3 gap-[9px] border-b-[1px] border-solid border-gray-1000">
              <div className="self-stretch flex-1 relative tracking-[-0.02em] leading-[32px] font-medium flex items-center">
                Gulfstream Aerospace
              </div>
              <div className="flex-1 flex flex-col items-start justify-center gap-[4px] text-xs text-gray-800">
                <div className="self-stretch flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center justify-start gap-[10px]">
                    <Icon path={mdiCarSeat} size={1} />
                    <div className="relative leading-[18px]">16 seats</div>
                  </div>
                  <div className="flex flex-row items-center justify-start gap-[10px]">
                    <Icon path={mdiSpeedometer} size={1} />
                    <div className="relative leading-[18px]">956 km/h</div>
                  </div>
                  <div className="flex flex-row items-center justify-start gap-[10px]">
                    <Icon path={mdiArrowLeftRight} size={1} />
                    <div className="relative leading-[18px]">7.4 feet</div>
                  </div>
                </div>
                <div className="self-stretch relative leading-[18px] text-gray-600">
                  Business Jet
                </div>
              </div>
            </div>
            <div className="w-full md:w-[580px] show-image box-border flex flex-row items-center justify-center py-8 px-3 gap-[9px] border-b-[1px] border-solid border-gray-100">
              <div className="self-stretch flex-1 relative tracking-[-0.02em] leading-[32px] font-medium flex items-center">
                Phenom 300
              </div>
              <div className="flex-1 flex flex-col items-start justify-center gap-[4px] text-xs text-gray-800">
                <div className="self-stretch flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center justify-start gap-[10px]">
                    <Icon path={mdiCarSeat} size={1} />
                    <div className="relative leading-[18px]">7 seats</div>
                  </div>
                  <div className="flex flex-row items-center justify-start gap-[10px]">
                    <Icon path={mdiSpeedometer} size={1} />
                    <div className="relative leading-[18px]">956 km/h</div>
                  </div>
                  <div className="flex flex-row items-center justify-start gap-[10px]">
                    <Icon path={mdiSpeedometer} size={1} />
                    <div className="relative leading-[18px]">5.08 feet</div>
                  </div>
                </div>
                <div className="self-stretch relative leading-[18px] text-gray-600">
                  Light business jet
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block absolute top-[300px] left-[calc(50% + 109px)] w-[598px] h-[399px] object-cover show-image">
            <img alt="" src={Offer1} />
          </div>
          <div className="hidden md:block absolute top-[300px] left-[calc(50%_+_109px)] w-[598px] h-[399px] object-cover show-image">
            <img alt="" src={Offer1} />
          </div>
          <div className="hidden md:block absolute top-[300px] left-[calc(50%_+_109px)] w-[598px] h-[399px] object-cover show-image">
            <img alt="" src={Offer1} />
          </div>
          <div className="hidden md:block absolute top-[300px] left-[calc(50%_+_109px)] w-[598px] h-[399px] object-cover show-image">
            <img alt="" src={Offer1} />
          </div>
          <div className="hidden md:block absolute top-[300px] left-[calc(50%_+_109px)] w-[598px] h-[399px] object-cover show-image">
            <img alt="" src={Offer1} />
          </div>
          <div className="md:absolute top-[771px] left-1/2 md:left-[calc(50% - 606px)] rounded-xl bg-primary-500 h-9 flex flex-row items-center justify-center py-8 px-3 box-border gap-[8px] text-base text-white font-title-2-medium">
          <div className="flex flex-row items-center justify-center">
            <div className="relative leading-[120%] font-medium">See all</div>
          </div>
          <Icon path={mdiArrowRight} size={1} />
        </div>
        </div>
      </section>
    </main>
  );
}
