// import NavAndFooter from "@/app/components/shared/NavAndFooter";
"use client";

import BookingEngine from "@/app/components/BookingEnginge";
import Button from "@/app/components/Button";
import NavAndFooter from "@/app/components/shared/NavAndFooter";
import {
  SwArrowRightIcon,
  SwLeftRightArrowIcon,
  SwLuggageIcon,
  SwMeterIcon,
  SwPlaneIcon,
  SwSeatIcon,
  SwTopBottomArrowIcon,
  SwWeightIcon,
} from "@/app/components/svgs";

const BookJet = () => {
  return (
    <NavAndFooter>
      <div className="bg-swLightBgGray py-20">
        <div className="m-5 mx-auto max-w-[90rem]">
          <BookingEngine />
          <div className="flex gap-10 text-swGray800 mt-10">
            <div className="w-2/3">
              <p className="text-xl font-medium mb-5">Select Private Jet</p>
              <div className="w-full rounded-3xl border p-5 bg-white">
                {Array(4)
                  .fill()
                  .map((_, index) => (
                    <div key={index} className="">
                      <div className="transition ease-in-out delay-100 duration-1000 flex justify-between items-center hover:bg-swLighterBgGray p-5 rounded-xl cursor-pointer focus:border focus:outline-swPrimary500">
                        <div className="flex gap-5 items-center">
                          <input type="checkbox" className="h-5 w-5" />
                          <div className="text-swLightGray">
                            <p className="text-2xl font-medium">Hawker 800XP</p>
                            <p className="text-sm">Midsize Business Jet</p>
                          </div>
                        </div>
                        <div className="text-swGray800 gap-10 flex">
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-between gap-5">
                              <div className="flex items-center gap-2">
                                <SwSeatIcon className="text-xl" />
                                <p className="text-sm">8 seats</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <SwMeterIcon className="text-xl" />
                                <p className="text-sm">826 km/h speed</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <SwLeftRightArrowIcon className="text-xl" />
                                <p className="text-sm">6 feet</p>
                              </div>
                            </div>

                            <div className="flex justify-between gap-5">
                              <div className="flex items-center gap-2">
                                <SwLuggageIcon className="text-xl" />
                                <p className="text-sm">8 seats</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <SwMeterIcon className="text-xl" />
                                <p className="text-sm">826 km/h speed</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <SwTopBottomArrowIcon className="text-xl" />
                                <p className="text-sm">6 feet</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 py-2 px-4 rounded-full hover:bg-white">
                            <p className="font-medium">View details</p>
                            <SwArrowRightIcon className="text-sm" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                <Button
                  label={"Add to quote"}
                  className="border mt-5 text-swGray800 font-semibold"
                  bgColor={"bg-white hover:bg-swLightBgGray"}
                />
              </div>
            </div>
            <div className="w-1/3">
              <p className="text-xl font-medium mb-5">Flight Summary</p>
              <div className="w-full rounded-3xl border p-5  bg-white">
                <p className="font-semibold text-lg">
                  Flight from Abuja, Nigeria - Abu Dhabi Dubai
                </p>
                <div className="flex gap-5 mt-5">
                  <div className="flex flex-col justify-between">
                    <div className="">
                      <p className="font-semibold text-lg">10:00 am</p>
                      <p className="text-sm">Wed 20, Jan</p>
                    </div>
                    <div className="">
                      <p className="font-semibold text-lg">22:00 pm</p>
                      <p className="text-sm">Wed 20, Jan</p>
                    </div>
                  </div>

                  <div className="flex items-center flex-col gap-1 h-60 py-4">
                    <div className="p-1 bg-swError500 rounded-full" />
                    <div className="h-full border border-r border-dashed" />
                    <div className="w-fit h-fit">
                      <SwPlaneIcon className="text-base" />
                    </div>
                    <div className="h-full border border-r border-dashed" />
                    <div className="p-1 bg-swSuccess500 rounded-full" />
                  </div>

                  <div className="flex flex-col justify-between">
                    <div className="">
                      <p className="font-semibold text-lg">10:00 am</p>
                      <p className="text-sm">Nnamdi Azikwe Airport, Abuja</p>
                    </div>
                    <p className="font-medium">12 Hours</p>
                    <div className="">
                      <p className="font-semibold text-lg">22:00 pm</p>
                      <p className="text-sm">Nnamdi Azikwe Airport, Abuja</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-swLighterBgGray rounded-xl my-7">
                  <p className="text-sm">
                    Include free Baggage & Cabin in capacity Per person
                  </p>
                  <div className="flex gap-5 mt-2">
                    <div className="flex gap-2 items-center">
                      <SwLuggageIcon className="text-lg" />
                      <p>40 Kg</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <SwWeightIcon className="text-lg" />
                      <p>10 Kg</p>
                    </div>
                  </div>
                </div>

                <Button
                  label={"Request Quote"}
                  bgColor={"bg-swPrimary500 hover:bg-swPrimary600"}
                  className="w-full text-white text-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavAndFooter>
  );
};

export default BookJet;
