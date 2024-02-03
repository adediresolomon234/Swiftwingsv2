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

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});

export default function Home() {
  const [bookingEngine, setBookingEngine] = useState("oneWayTrip");
  return (
    <main className="px-5 relative">
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
        <div className="flex gap-10 mb-5 justify-end mb-20 max-w-7xl mx-auto pr-10 text-center">
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
            <div className="p-5 bg-white rounded-3xl">
              <div className="flex justify-between items-center mb-5">
                <p className="font-semibold text-swDarkGray ml-2">Book a jet</p>
                <div className="p-2 rounded-full shadow-md flex gap-5">
                  <button
                    className={`${
                      bookingEngine === "oneWayTrip"
                        ? "text-swWine shadow"
                        : "text-swLightGray"
                    } py-2 px-4 rounded-full`}
                    onClick={() => setBookingEngine("oneWayTrip")}
                  >
                    One Way Rrip
                  </button>
                  <button
                    className={`${
                      bookingEngine === "roundTrip"
                        ? "text-swWine shadow"
                        : "text-swLightGray"
                    } py-2 px-4 rounded-full`}
                    onClick={() => setBookingEngine("roundTrip")}
                  >
                    Round Trip
                  </button>
                  <button
                    className={`${
                      bookingEngine === "roadCruise"
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
                    <div className="p-1 rounded-full border text-black -ml-4 bg-white">
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
              <div className={`${space_grotesk.className} flex justify-center text-lg`}>
                <Button
                  label="Book Jet"
                  bgColor={"bg-swWine"}
                  textColor={"text-white"}
                  endIcon={<HiArrowRight size={20} />                }
                />
              </div>
            </div>
          </div>
        </section>
      </section>
      <section className="py-20"></section>
    </main>
  );
}
