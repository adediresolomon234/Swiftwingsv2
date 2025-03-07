import Head from "next/head";
import React from "react";
import NavAndFooter from "../shared/NavAndFooter";
import Image from "next/image";
import Fleetsection from "../../../public/images/Fleetsection.png";
import { fleetPageKeywords } from "../helpers/relatedKeywords";
import EmptyLegPageComp from "./EmptyLegPageComp";

const EmptyLegPage = () => {
  return (
    <div>
      {" "}
      <Head>
        <title>Empty Legs</title>
        <meta
          name="description"
          content="Discover unbeatable savings on luxury private jet travel with our Empty Leg Flights. These exclusive one-way flights become available when a private jet needs to return to its base or reposition for its next booked journey—offering you a chance to fly at a fraction of the usual cost."
        />
        <meta name="keywords" content={fleetPageKeywords} />
      </Head>
      <NavAndFooter Nav={true}>
        <section className="relative pt-24 md:pt-48 pb-10 text-white">
          <div className="absolute inset-0 flex flex-col items-start justify-start">
            <Image
              src={Fleetsection}
              alt="airplane"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-swBlack bg-opacity-10" />
          </div>
          <div className=" w-full p-8 lg:w-3/6 mx-auto relative text-center z-10 lg:p-0">
            <div className="pt-48">
              <p className="text-3xl md:text-6xl font-bold leading-10 md:leading-28">
                Explore Exclusive Empty Leg Flights for Your Next{" "}
                <span className="text-white">Journey</span>
              </p>
              <div className="flex justify-center mt-1 lg:mt-4">
                <p className="max-w-lg text-xs md:text-md lg:text-lg mt-8 py-3 px-6 rounded-full bg-swPrimary600 ">
                  Discover exclusive Empty Leg Flights tailored for speed,
                  comfort, and efficiency—offering luxury travel at unbeatable
                  value.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16">
          <EmptyLegPageComp />
        </section>
      </NavAndFooter>
    </div>
  );
};

export default EmptyLegPage;
