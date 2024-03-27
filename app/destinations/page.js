"use client";

import DestinationSliders from "../components/shared/DestionationSlider";
import { useEffect, useState } from 'react'; 
import Swiftwings from "../../public/images/Swiftwings.png";
import DestinationList from "../components/helpers/DestinationList";
import NavAndFooter from "../components/shared/NavAndFooter";
import FooterHero from "../components/shared/footerHero";
import Image from "next/image";

const Destinations = () => {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  return (
    <main className="relative bg-swLightBgGray">
      <NavAndFooter>
        <section className="w-full p-10 pt-18 text-white relative pb-10">
          <div className="relative w-full ">
            <div className="min-h-screen flex">
              <div className="container m-auto px-20 py-40 md:px-18 lg:py-0 lg:px-32">
                <div className="flex items-center flex-wrap gap-10 lg:gap-0">
                  <div className="lg:w-1/3 space-y-2">
                    <h1 className="text-4xl  md:text-7xl  text-swGray700 mb-4">See the world on</h1>
                    {isBrowser && <Image src={Swiftwings} alt="" width={190} height={190} />}
                    <p className="text-sm  text-swGray700 mt-8">Explore the best of destinations that we cover</p>
                  </div>
                  <div className="hidden relative md:block lg:w-2/3">
                    <DestinationSliders />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16">
          <div class="xl:container m-auto px-6 text-gray-600 md:px-12 xl:px-16">
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
