"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAircrafts } from "../../redux/slices/aircraftdetails";
import { SwSearchIcon } from "../components/svgs";
import AircraftCard from "../components/shared/AircraftCard";
import InputField from "../components/shared/InputField";
import SortFilter from "../components/shared/SortFilter";
import TypeFilter from "../components/shared/TypeFilter";
import Image from "next/image";
import Fleetsection from "../../public/images/Fleetsection.png";
import NavAndFooter from "../components/shared/NavAndFooter";
import FooterHero from "../components/shared/footerHero";
import { useRouter } from "next/navigation";
import { PuffLoader } from "react-spinners";
import { Libre_Baskerville } from "next/font/google";

const libre_baskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const FleetPage = () => {
  const dispatch = useDispatch();
  const aircrafts = useSelector((state) => state.aircrafts.aircrafts);
  const status = useSelector((state) => state.aircrafts.status);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchAircrafts());
  }, [dispatch]);

  const filteredAircrafts = aircrafts.filter((aircraft) => {
    return aircraft.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <main className="relative bg-swLightBgGray">
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
          <div className="max-w-lg mx-auto relative text-center z-10">
            <div className="pt-48">
              <p className="text-4xl md:text-6xl font-bold leading-10 md:leading-14">
                Explore the perfect JET for your{" "}
                <span className="text-white bg-swPrimary600 rounded-full px-4 md:px-6">
                  Journey
                </span>
              </p>
              <p className="text-base md:text-lg mt-6">
                Experience the epitome of safety, luxury and convenience with{" "}
                <span className="font-bold">
                  <span
                    className={`${libre_baskerville.className} text-swPrimary500 no-text-shadow font-bold`}
                  >
                    Swift<i className="font-normal">Wings</i>
                  </span>{" "}
                  private jet charter service
                </span>
              </p>
            </div>
          </div>
        </section>
        <section className="py-16">
          {/* <div className="grid grid-cols-3 gap-4">
                        <div className="p-12 max-w-sm w-full  ">
                            <div className="w-full mt-5">
                                <InputField
                                    label={<span className="flex items-center mb-3 "><SwSearchIcon className="text-xl mr-2" />Search</span>}
                                    placeholder="Enter Aircraft"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="w-full mt-12">
                                <SortFilter />
                            </div>
                            <div className="md:w-1/3 md:flex-shrink-0 mt-6 md:mt-0 md:pl-6">
                                <TypeFilter />
                            </div>
                        </div>
                    </div> */}
          <div className="mt-12 md:mt-16">
            {status === "loading" ? (
              <div className="flex justify-center">
                <PuffLoader
                  color="#54052e"
                  loading={true}
                  size={100}
                  margin={2}
                />
              </div>
            ) : status === "failed" ? (
              <p className="text-center text-red-500">
                Error: Failed to fetch aircrafts
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 px-6 md:px-12">
                {filteredAircrafts.map((aircraft) => (
                  <AircraftCard key={aircraft.id} aircraft={aircraft} />
                ))}
              </div>
            )}
          </div>
        </section>
        <section className="py-12 md:py-16">
          <div className="px-6 md:px-12">
            <FooterHero />
          </div>
        </section>
      </NavAndFooter>
    </main>
  );
};

export default FleetPage;
