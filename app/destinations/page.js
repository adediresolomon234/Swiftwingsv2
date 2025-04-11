"use client";


import { useEffect, useState } from "react";
import Swiftwings from "../../public/images/Swiftwings.png";
import DestinationList from "../components/helpers/DestinationList";
import NavAndFooter from "../components/shared/NavAndFooter";
import FooterHero from "../components/shared/footerHero";
import Image from "next/image";
import Destinationsection from "../../public/images/Destinationsection.png";
import { FaChevronDown } from "react-icons/fa";
import Button from "../components/Button";
import { SWTButtoncircleIcon, SWTEllipse9Icon } from "../components/svgs";
import Loading from "../components/Loading";
import Link from "next/link";
import Head from "next/head";
import { destinationsPageKeywords } from "../components/helpers/relatedKeywords";
import Whatsapp from "../components/shared/Whatsapp"

const Destinations = () => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsBrowser(true);
  }, []);
  const [location, setLocation] = useState({
    city: "San Francisco",
    state: "California",
  });

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="relative bg-swLightBgGray">
      <Head>
        <title>
          Private Jet Destinations | Local and International Flights
        </title>
        <meta
          name="description"
          content="Our Private Jet destinations span across Lagos, Abuja, Port Harcourt, Ghana, South Africa, USA, Japan, Australia, France, Italy, Spain, etc."
        />
        <meta name="keywords" content={destinationsPageKeywords} />
      </Head>
      <NavAndFooter Nav={true}>
        <div class="relative">
          <Image
            class="absolute inset-0 w-full h-full object-cover object-top"
            src={Destinationsection}
            width="400"
            height="500"
            alt="hero background image"
          />
          <div
            aria-hidden="true"
            class="absolute inset-0 w-full h-full bg-gray-900 bg-opacity-30 backdrop-blur-sm"
          ></div>
          <div class="relative container m-auto px-6 md:px-12 lg:px-6">
            <div class="mb-12 pt-40 space-y-16 md:mb-20 md:pt-56 lg:w-8/12 lg:mx-auto">
              <div className="location-info flex items-center justify-center mb-8">
                <div className="location-marker w-3 h-3 bg-primary-500 rounded-full mr-2" />
                <div className="location-details text-white max-w-lg bg-gray-200 bg-opacity-30 backdrop-blur-sm rounded-t-3xl rounded-br-none rounded-bl-3xl overflow-hidden shrink-0 flex flex-col items-start justify-start py-2 px-8 box-border">
                  <div className="flex items-center">
                    <SWTEllipse9Icon className="w-2" />
                    <h2 className="font-semibold ml-2">{location.city}</h2>
                  </div>
                  <p className="text-sm ml-4">{location.state}</p>
                </div>
              </div>
            </div>

            <div class="pb-16">
              <div class="md:px-10">
                <div className="text-container">
                  <div className=" inset-0 flex flex-col items-start justify-start sm:flex-row sm:items-center py-8 px-0 ">
                    <div className="mr-8 flex flex-col items-start">
                      <div className="text-xl md:text-5xl lg:text-7xl font-semibold text-black mb-3">
                        What’s your
                      </div>
                      <div className="text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-8 max-w-1rem break-all md:break-words uppercase">
                        Destination?
                      </div>
                    </div>
                    <div className="mt-0  md:mt-12 flex items-center">
                      <div className="text-sm md:text-xl text-white max-w-lg">
                        We are{" "}
                        <a
                          href="https://www.swiftwingsjet.com/"
                          className="text-white font-bold hover:underline"
                        >
                          bringing the world closer to you
                        </a>{" "}
                        through global access!
                      </div>
                      <div className="ml-4 text-2xl text-white">
                        <FaChevronDown className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 -mx-6 px-8 overflow-x-auto md:overflow-x-hidden">
                  <div className="w-full flex justify-center flex-wrap items-center gap-4 md:w-auto md:gap-6 lg:gap-8">
                    <Link href="/">
                      <Button
                        label="Book A Jet"
                        bgColor="bg-white text-gray-900 font-bold"
                        endIcon={<SWTButtoncircleIcon size={32} />}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="py-16">
          <div className="m-auto px-6 text-gray-600 md:px-12 xl:px-16">
            <DestinationList />
          </div>
        </section>
        <section className="">
          <div className="xl:container m-auto px-6 text-gray-600 md:px-12 xl:px-16">
            <FooterHero />
          </div>
        </section>
        <Whatsapp/>
      </NavAndFooter>
    </main>
  );
};

export default Destinations;
