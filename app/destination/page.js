"use client";
import { Space_Grotesk } from "next/font/google";
import DestinationSliders from "../components/shared/DestionationSlider";
import Image from "next/image";
import Swiftwings from "../../public/images/swiftwings.png";
import NavAndFooter from "../components/shared/NavAndFooter";




const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const Destinations = () => {
    return (
      <NavAndFooter>
        <div className="relative w-full mt-20">
          
        <div className="min-h-screen flex">
          <div className="container m-auto px-20 py-40 md:px-18 lg:py-0 lg:px-32">
            <div className="flex items-center flex-wrap gap-12 lg:gap-0">
              <div className="lg:w-1/3 space-y-6">
                <h1 className="text-4xl  md:text-7xl dark:text-white">See the world on</h1>
                <Image src={Swiftwings} alt="" width={190} height={190} />
                <p className="text-sm text-gray-700 dark:text-gray-300">Explore the best of destinations that we cover</p>
              </div>
              <div className="hidden relative md:block lg:w-2/3">
                <DestinationSliders />
              </div>
            </div>
          </div>
        </div>
      </div>
      </NavAndFooter>
    );

};

export default Destinations;