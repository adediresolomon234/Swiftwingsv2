"use client";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import Fleetsection from "../../public/images/Fleetsection.png";
import NavAndFooter from "../components/shared/NavAndFooter";
import FooterHero from "../components/shared/footerHero";
import InputField from "../components/shared/InputField";
import { SwSearchIcon, SWFilterIcon, } from "../components/svgs";
import SortFilter from "../components/shared/SortFilter";
import TypeFilter from "../components/shared/TypeFilter";
import { mdiCarSeat, mdiSpeedometer, mdiArrowLeftRight } from '@mdi/js'

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const FleetPage = () => {
    return (
        <main className="relative bg-swLightBgGray">
            <NavAndFooter>
                <section className="relative w-full pt-48 pb-10 text-white">
                    <div className="absolute inset-0 flex flex-col items-start justify-start">
                        <Image src={Fleetsection} alt="airplane" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-swBlack bg-opacity-10" />
                    </div>
                    <div className="max-w-4xl mx-auto relative text-center z-10">
                        <div className="pt-72">
                            <p className="text-4xl md:text-7xl font-bold leading-20 md:leading-20" style={{ lineHeight: "7rem" }}>
                                Explore the perfect JET for your <span className="text-white bg-swPrimary600 rounded-full px-6 ">Journey</span>
                            </p>
                            <p className="text-sm md:text-lg mt-10">
                                Experience the epitome of safety, luxury and convenience with{" "}
                                <span className="font-bold">Swiftwings private jet charter service</span>
                            </p>
                            <p className="mt-8" />
                        </div>
                    </div>
                </section>
                <section className="py-16">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-12 max-w-sm w-full  ">
                            <div className="w-full mt-5">
                                <InputField
                                    label={<span className="flex items-center mb-3 "><SwSearchIcon className="text-xl mr-2" />Search</span>}
                                    placeholder="Enter Aircraft "
                                />
                            </div>
                            <div className="w-full mt-12">
                                <SortFilter />
                            </div>
                            <div className="w-full mt-3">
                                <TypeFilter />
                            </div>
                        </div>

                        <div className="col-span-2 ">
                            <div className="max-w-full grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 grid-rows-2 gap-y-8 justify-center items-center relative">
                                <div className="w-84 flex flex-col items-start justify-start pt-2 px-2 pb-[width] box-border gap-2 text-center text-base text-black font-body-xs-regular">
                                    <Image
                                        className="w-80 rounded-md h-43 object-cover"
                                        alt="Aircraft Image"
                                        src="/images/Features1.png"
                                        width={80}
                                        height={43}
                                    />
                                    <div className="self-stretch relative leading-6 font-medium">
                                    Bombardier Global 8000
                                    </div>
                                    <div className="self-stretch flex flex-row items-center justify-between py-0 px-[width] text-left text-xs text-gray-800">
                                        <div className="flex flex-row items-center justify-start gap-2.5">
                                        <mdiCarSeat/>
                                            <div className="relative leading-4.5">3 seats</div>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-2.5">
                                       < mdiSpeedometer/>
                                            <div className="relative leading-4.5"> 5km/h</div>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-2.5">
                                            <mdiArrowLeftRight/>
                                            <div className="relative leading-4.5">6feet</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-84 flex flex-col items-start justify-start pt-2 px-2 pb-[width] box-border gap-2 text-center text-base text-black font-body-xs-regular">
                                    <Image
                                        className="w-80 rounded-md h-43 object-cover"
                                        alt="Aircraft Image"
                                        src="/images/Features1.png"
                                        width={80}
                                        height={43}
                                    />
                                    <div className="self-stretch relative leading-6 font-medium">
                                    Bombardier Global 8000
                                    </div>
                                    <div className="self-stretch flex flex-row items-center justify-between py-0 px-[width] text-left text-xs text-gray-800">
                                        <div className="flex flex-row items-center justify-start gap-2.5">
                                        <mdiCarSeat/>
                                            <div className="relative leading-4.5">3 seats</div>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-2.5">
                                       < mdiSpeedometer/>
                                            <div className="relative leading-4.5"> 5km/h</div>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-2.5">
                                            <mdiArrowLeftRight/>
                                            <div className="relative leading-4.5">6feet</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-84 flex flex-col items-start justify-start pt-2 px-2 pb-[width] box-border gap-2 text-center text-base text-black font-body-xs-regular">
                                    <Image
                                        className="w-80 rounded-md h-43 object-cover"
                                        alt="Aircraft Image"
                                        src="/images/Features1.png"
                                        width={80}
                                        height={43}
                                    />
                                    <div className="self-stretch relative leading-6 font-medium">
                                    Bombardier Global 8000
                                    </div>
                                    <div className="self-stretch flex flex-row items-center justify-between py-0 px-[width] text-left text-xs text-gray-800">
                                        <div className="flex flex-row items-center justify-start gap-2.5">
                                        <mdiCarSeat/>
                                            <div className="relative leading-4.5">3 seats</div>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-2.5">
                                       < mdiSpeedometer/>
                                            <div className="relative leading-4.5"> 5km/h</div>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-2.5">
                                            <mdiArrowLeftRight/>
                                            <div className="relative leading-4.5">6feet</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-16">
                    <div className="xl:container m-auto px-6 text-gray-600 md:px-12 xl:px-16">
                        <FooterHero />
                    </div>
                </section>
            </NavAndFooter>
        </main>
    );

};

export default FleetPage;