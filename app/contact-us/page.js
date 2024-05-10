
"use client";
import "../../styles.css";
import Image from "next/image";
import NavAndFooter from "../components/shared/NavAndFooter";
import Destinationsection from "../../public/images/Destinationsection.png"
import Serviceexecllence from "../../public/images/Serviceexecllence.png"
import Safetyfirst from "../../public/images/Safetyfirst.png"
import team from "../../public/images/team.png"
import { SWTLocationIcon, SWTCallPhoneIcon, SwMailIcon, SWTFacebookIcon, SWTInstagramIcon, SWTLinkedInIcon, SWTTikTokIcon, SWTTwitterIcon, SwUserIcon } from "../components/svgs"
import InputField from "../components/shared/InputField";

const AboutUs = () => {


    return (
        <main className="relative bg-swLightBgGray">
            <NavAndFooter Nav={true}>
                <div class="relative">
                    <Image className="absolute inset-0 w-full h-full object-cover object-top" src={Destinationsection} width="400" height="500" alt="hero background image" />
                    {/* <div aria-hidden="true" class="absolute inset-0 w-full h-full bg-gray-900 bg-opacity-30 backdrop-blur-sm"></div> */}
                    <div className="relative mx-auto max-w-screen-full px-4 py-28 sm:px-6 lg:flex lg:h-[70vh]  lg:items-center lg:px-8">
                        <div className="max-w-xl mx-auto text-center">
                            <h1 className="text-3xl font-extrabold sm:text-6xl uppercase">REACH OUT  TO US</h1>
                            <p className="text-md">Swiftwings Jets contact channels</p>
                        </div>
                    </div>
                </div>
                <section className="py-16">
                    <div className="m-auto px-6 text-gray-600 md:px-12 xl:px-16">
                        <div className="text-container">
                            <div className=" inset-0 flex flex-col items-start justify-start sm:flex-row sm:items-center py-8 px-0 ">
                                <div className="mr-8 flex flex-col items-start">
                                    <div className="text-xl md:text-md font-semibold text-black mb-3">Contact Information:</div>
                                    <div class="flex flex-col md:flex-row mt-10">
                                        <div class="mb-12 w-full shrink-0 grow-0 basis-auto md:w-4/12 md:px-3 lg:px-6">
                                            <div class="flex items-start">
                                                <div class="shrink-0">
                                                    <div class="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
                                                        <SWTLocationIcon />
                                                    </div>
                                                </div>
                                                <div class="ml-6 grow">
                                                    <p class="mb-2 font-bold">
                                                        Address
                                                    </p>
                                                    <p class="text-neutral-500 ">
                                                        9b, Ike Asogwa Close Mende, Maryland Ikeja, Lagos State.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mb-12 w-full shrink-0 grow-0 basis-auto md:w-4/12 md:px-3 lg:px-6">
                                            <div class="flex items-start">
                                                <div class="shrink-0">
                                                    <div class="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
                                                        <SWTCallPhoneIcon />
                                                    </div>
                                                </div>
                                                <div class="ml-6 grow">
                                                    <p class="mb-2 font-bold ">
                                                        Phone Number
                                                    </p>
                                                    <p class="text-neutral-500 ">
                                                        +234 902 879 2910
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                                            <div class="flex items-start">
                                                <div class="shrink-0">
                                                    <div class="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
                                                        <SwMailIcon />
                                                    </div>
                                                </div>
                                                <div class="ml-6 grow">
                                                    <p class="mb-2 font-bold ">
                                                        Email
                                                    </p>
                                                    <p class="text-neutral-500 ">
                                                        charter@swiftwingsjet.com
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-3">
                    <div className="m-auto px-6 text-gray-600 md:px-12 xl:px-16">
                        <div className="text-container">
                            <div className=" inset-0 flex flex-col items-start justify-start sm:flex-row sm:items-center py-8 px-4 ">
                                <div className="mr-8 flex flex-col items-start">
                                    <div className="text-xl md:text-md font-semibold text-black mb-3">Office Hours</div>
                                    <div class="  text-justify p- ">
                                        <ul class="list-disc">
                                            <li>Monday-Friday: [Opening Time] - [Closing Time]</li>
                                            <li>Saturday: [Opening Time] - [Closing Time]</li>
                                            <li>Sunday: Closed</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-16">
                    <div className="m-auto px-6 text-gray-600 md:px-12 xl:px-16">
                        <div className="text-container">
                            <div className=" inset-0 flex flex-col items-start justify-start sm:flex-row sm:items-center py-8 px-0 ">
                                <div className="mr-8 flex flex-col items-start">
                                    <div className="text-xl md:text-md font-semibold text-black mb-3">Connect with us on social media</div>
                                    <div class="py-16 ">
                                        <div class="container m-auto px-6 space-y-8 md:px-12 lg:px-56 ">
                                            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-28 gap-6 lg:gap-60 justify-items-center text-center">
                                                <div class="px-12 py-6 flex flex-col items-center text-center bg-gray-100">
                                                    <SWTInstagramIcon className="w-12 h-12 mb-6" />
                                                    <p className="text-gray-600 text-base" >@swiftwingsjet</p>
                                                </div>
                                                <div class="px-12 py-6 flex flex-col items-center text-center bg-gray-100">
                                                    <SWTTwitterIcon className="w-12 h-12 mb-6" />
                                                    <p className="text-gray-600 text-base" >@swiftwingsjet</p>
                                                </div>
                                                <div class="px-12 py-6 flex flex-col items-center text-center bg-gray-100">
                                                    <SWTFacebookIcon className="w-12 h-12 mb-6" />
                                                    <p className="text-gray-600 text-base" >@swiftwingsjet</p>
                                                </div>
                                                <div class="px-12 py-6 flex flex-col items-center text-center bg-gray-100">
                                                    <SWTLinkedInIcon className="w-12 h-12 mb-6" />
                                                    <p className="text-gray-600 text-base" >@swiftwingsjet</p>
                                                </div>
                                                <div class="px-12 py-6 flex flex-col items-center text-center bg-gray-100">
                                                    <SWTTikTokIcon className="w-12 h-12 mb-6" />
                                                    <p className="text-gray-600 text-base" >@swiftwingsjet</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-3">
                    <div className="m-auto px-6 text-gray-600 md:px-12 xl:px-16">
                        <div className="text-container">
                            <div className=" inset-0  items-start justify-start sm:flex-row sm:items-center py-8 px-0 ">
                                <div className="mr-8  items-start">
                                    <div className="text-xl md:text-md font-semibold text-black mb-3">Inquiry Form</div>
                                    <div className="w-1/2 mt-5">
                                        <InputField
                                            label={"Full Name"}
                                            placeholder={"Full Name"}
                                            startIcon={<SwUserIcon className="text-xl" />}

                                        />
                                    </div>
                                    <div className="w-1/2 mt-5">
                                        <InputField
                                            label={"Email"}
                                            placeholder={"Enter email address"}
                                            startIcon={<SwMailIcon className="text-xl" />}

                                        />
                                    </div>
                                    <div className="w-1/2 mt-5">
                                        <InputField
                                            label={"Phone"}
                                            placeholder={"Phone number"}
                                            startIcon={<SWTCallPhoneIcon className="text-xl" />}

                                        />
                                    </div>
                                    <div className="w-1/2 mt-5">
                                        <InputField
                                            label={"Subject"}
                                            placeholder={"Enter Subject"}


                                        />
                                    </div>
                                    <div class="w-1/2 mt-5 flex">

                                        <div class="flex-1">
                                            <div>
                                                <label for="message" class="block text-xl mb-2 text-gray-700">Message</label>
                                                <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"/>
                                          </div>
                                          
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    {/* <div class="py-12">
                        <div class="xl:container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                            <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                <div class="group p-6 sm:p-8 rounded-3xl bg-white ">
                                    <div class="mt-6 relative">
                                        <h3 class="text-2xl font-semibold text-gray-800 dark:text-white">
                                            Global coverage
                                        </h3>
                                        <p class="mt-6 mb-8 text-gray-600 dark:text-gray-300">
                                            Swift Wings offers extensive global coverage to meet the travel needs of our clients, seamlessly connecting them to destinations worldwide, including Europe, North America, South America, and beyond. With a network of trusted partners and affiliates, we ensure convenience and flexibility in air travel on a global scale, even to the most remote corners of the world.
                                        </p>
                                    </div>
                                </div>
                                <div className="group p-6 sm:p-8 rounded-3xl bg-white ">
                                    <div className="mt-6 relative">
                                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                            World-class experience
                                        </h3>
                                        <p className="mt-6 mb-8 text-gray-600 dark:text-gray-300">
                                            At Swift Wings, we ensure every journey is a remarkable experience by maintaining a tailored fleet of private jets that epitomize luxury, comfort, and convenience. From the moment you step on board, you will experience an unparalleled level of service that stands unrivaled in the industry. Our aviation experts are dedicated to customizing every aspect of your journey to align with your preferences and needs, ensuring a truly unforgettable experience.
                                        </p>
                                    </div>
                                </div>
                                <div className="group p-6 sm:p-8 rounded-3xl bg-white  ">
                                    <div className="mt-6 relative">
                                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                            Private jets supremacy
                                        </h3>
                                        <p className="mt-6 mb-8 text-gray-600 dark:text-gray-300">
                                            At Swift Wings, we prioritize accessibility in private jet travel with our diverse fleet, accommodating various budgets and travel needs. Whether it is a short trip on a light jet or a long-haul journey on a spacious cabin jet, our advanced aircraft, such as the Hawker 850xp and Bombardier Challenger 604, ensure unparalleled comfort, luxury, and reliability for every passenger.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                </section>
                <section className="py-16">


                </section>

                <section className="mt-64 py-16">
                    <div className="xl:container m-auto px-6 text-gray-600 md:px-12 xl:px-16">
                        {/* <FooterHero /> */}
                    </div>
                </section>
            </NavAndFooter>
        </main >

    );
};

export default AboutUs;





