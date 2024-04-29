"use client";

import DestinationSliders from "../components/shared/DestionationSlider";
import { useEffect, useState } from 'react';
import Swiftwings from "../../public/images/Swiftwings.png";
import DestinationList from "../components/helpers/DestinationList";
import NavAndFooter from "../components/shared/NavAndFooter";
import FooterHero from "../components/shared/footerHero";
import Image from "next/image";
import Destinationsection from "../../public/images/Destinationsection.png"
import { FaChevronDown } from "react-icons/fa";
import Button from "../components/Button";
import {SWTButtoncircleIcon} from "../components/svgs"


const Destinations = () => {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  return (
    <main className="relative bg-swLightBgGray">
      <NavAndFooter Nav={true}>
        <section className="w-full p-4 sm:p-10 pt-48 text-white relative pb-10 h-screen">
          <div className="absolute inset-0">
            <Image src={Destinationsection} alt="airplane" className="h-full w-full object-cover" />
            <div className="h-full w-full bg-swBlack absolute top-0 left-0 bg-opacity-10" />
          </div>
          <div className="max-w-7xl mx-auto relative text-center">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="max-w-lg backdrop-blur bg-swBlack/50 rounded-t-3xl rounded-br-none rounded-bl-3xl overflow-hidden shrink-0 flex flex-col items-start justify-start py-2 px-12 box-border">
                <div className="flex flex-row items-start justify-start gap-[12px]">
                  <div className="flex flex-col items-center justify-start pt-2.5 px-0 pb-0">
                    <div className="w-1.5 h-1.5 relative rounded-[50%] bg-primary-500" />
                  </div>
                  <div className="relative leading-8 font-medium inline-block min-w-md text-start">
                    San Francisco
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center py-0 px-4 text-sm text-primary-300">
                  <div className="relative leading-[20px] inline-block min-w-md text-start">
                    California
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 flex flex-col items-start justify-start sm:flex-row sm:items-center sm:justify-between mt-96 py-8 px-4 sm:px-20">
            <div className="mr-8">
              <div className="text-xl md:text-5xl font-semibold text-black mb-3">What’s your</div>
              <div className="text-6xl md:text-8xl font-bold text-white mb-8 max-w-1rem break-words">
                Destination?
              </div>
            </div>
            <div className="mt-8 sm:mt-0 flex items-center">
              <div className="text-lg md:text-xl text-white max-w-md">
                Experiences beyond your imagination, seeking journeys beyond the ordinary
              </div>
              <div className="ml-4 text-2xl text-white">
                <FaChevronDown className="text-white" />
              </div>
            </div>
          </div>
          {/* <div className=" mt-96my-7 flex flex-col gap-3">
            <Button
              label={"Book A jet"}
              bgColor={"bg-white text-black w-full"}
              endIcon={<SWTButtoncircleIcon size={50} />}
            />
          </div> */}
        </section>
        <section className="py-16">
          <div className="m-auto px-6 text-gray-600 md:px-12 xl:px-16">
            <DestinationList />
          </div>
        </section>
        <section className="mt-64 py-16">
          <div className="xl:container m-auto px-6 text-gray-600 md:px-12 xl:px-16">
            <FooterHero />
          </div>
        </section>
      </NavAndFooter>
    </main>
  );
};

export default Destinations;
