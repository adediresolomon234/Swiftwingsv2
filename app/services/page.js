"use client";
import "../../styles.css";
import Image from "next/image";
import NavAndFooter from "../components/shared/NavAndFooter";
import Destinationsection from "../../public/images/Destinationsection.png";
import Serviceexecllence from "../../public/images/Serviceexecllence.png";
import Safetyfirst from "../../public/images/Safetyfirst.png";
import team from "../../public/images/team.png";
import { Libre_Baskerville } from "next/font/google";

const libre_baskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Service = () => {
    return (
        <main className="relative bg-swLightBgGray">
            <NavAndFooter Nav={true}>
                <div class="relative">
                    <Image className="absolute inset-0 w-full h-full object-cover object-top" src={Destinationsection} width="400" height="500" alt="hero background image" />
                    {/* <div aria-hidden="true" class="absolute inset-0 w-full h-full bg-gray-900 bg-opacity-30 backdrop-blur-sm"></div> */}
                    <div className="relative mx-auto max-w-screen-full px-4 py-28 sm:px-6 lg:flex lg:h-[70vh]  lg:items-center lg:px-8">
                        <div className="max-w-xl mx-auto text-center">
                            <h1 className="text-3xl font-extrabold sm:text-3xl uppercase mb-3">
                             Swift Wings Sets the Standard in Aviation Services
                            </h1>
                            <p className="px-2 sm:text-md lg:text-lg ">
                             Our Services are designed to give you a first class experience tailored to your needs.
                            </p>
                        </div>
                    </div>
                </div>
                {/* <section className="py-16">
                    <div className="m-auto px-6 text-gray-600 md:px-12 xl:px-16">
                        <div className="max-w-3xl mx-auto text-justify lg:text-center">
                            <h1 className="px-2 sm: text-md lg:text-lg ">
                                Welcome to SwiftWings, where the sky is not the limit – it is just the beginning.
                                Since our establishment in June 2017, we have been dedicated to revolutionizing the aviation industry in Nigeria and beyond.
                            </h1>
                        </div>
                    </div>
                </section> */}
                {/* <section className="py-16">
                    <div className="m-auto px-6 text-gray-600 md:px-12 xl:px-16">
                        <div className="max-w-5xl mx-auto text-justify lg:text-center">
                            <ul className="p-2 mb-12 flex flex-col sm:flex-row overflow-x-auto no-scrollbar">
                                <li className="w-full mx-2 p-3 px-2 sm: text-xl lg:text-2xl border-gray-200 font-bold sm:w-auto sm:text-start  whitespace-nowrap">
                                    Our Mission
                                </li>
                                <li className="w-auto mx-1 p-3 sm: text-md lg:text-lg px-2 border-gray-200 sm:w-auto sm:text-start ">
                                    At SwiftWings, our mission is simple yet profound: to offer exceptional aviation services that redefine luxury, reliability, and safety. We aim to exceed the expectations of our clients by providing unparalleled experiences with every flight.
                                </li>
                            </ul>
                        </div>
                    </div>
                </section> */}
                {/* <section className="py-16">
                    <div className="m-auto px-6 text-gray-600 md:px-12 xl:px-16">
                        <div className="max-w-5xl mx-auto text-justify lg:text-center">
                            <ul className="p-2 mb-12 flex flex-col-reverse sm:flex-row overflow-x-auto no-scrollbar">
                                <li className="w-auto mx-1 p-3 sm:text-md lg:text-lg px-2 border-gray-200 sm:w-auto sm:text-justify lg:text-end sm:order-2 lg:order-1 ">
                                    At SwiftWings, our mission is simple yet profound: to offer exceptional aviation services that redefine luxury, reliability, and safety. We aim to exceed the expectations of our clients by providing unparalleled experiences with every flight.
                                </li>
                                <li className="w-full mx-2 p-3 px-2 sm:text-xl lg:text-2xl border-gray-200 font-bold sm:w-auto sm:text-start whitespace-nowrap sm:order-1 lg:order-2">
                                    Our Vision
                                </li>
                            </ul>
                        </div>
                    </div>
                </section> */}
                {/* <section className="py-16">
                    <div className="w-full relative h-[1033px] text-left text-5xl text-gray-900 font-body-md-regular hidden sm:block">
                        <Image
                            className="absolute top-[0px] left-[calc(50%_+_7px)] w-[677px] h-[664px] object-cover"
                            alt=""
                            src={Serviceexecllence}
                        />
                        <div className="absolute top-[66px] left-[calc(50%_-_684px)] w-[634px] flex flex-col items-start justify-start gap-[26px]">
                            <b className="self-stretch relative tracking-[-0.02em] leading-[32px]">
                                Safety First
                            </b>
                            <div className="self-stretch relative text-xl leading-[30px] text-gray-800">
                                Safety is the cornerstone of our operations. At SwiftWings, we
                                prioritize the safety and well-being of our passengers above all else.
                                With rigorous safety standards and meticulous attention to detail, we
                                ensure every journey with us is secure and stress-free.
                            </div>
                        </div>
                        <div className="relative text-left text-5xl text-gray-900 font-body-md-regular">
                            <div className="absolute top-[825px] left-[calc(50%_-_138px)] w-[634px] flex flex-col items-start justify-start gap-[26px]">
                                <b className="self-stretch relative tracking-[-0.02em] leading-[32px]">
                                    Service Excellence
                                </b>
                                <div className="self-stretch relative text-xl leading-[30px] text-gray-800">
                                    Service excellence is ingrained in our DNA. From the moment you book your flight to the second you touch down at your destination, our team of dedicated professionals is committed to delivering unparalleled service that caters to your every need.
                                </div>
                            </div>
                            <Image
                                className="absolute top-[352px] left-[calc(45%_-_605px)] w-[467px] h-[681px] object-cover mt-16" // Added mt-16 for margin-top
                                alt=""
                                src={Safetyfirst}
                            />
                        </div>
                    </div>
                    <div className="w-full relative text-left text-5xl text-gray-900 font-body-md-regular">
                        <div className="sm:hidden">
                            <div className="">
                                <Image
                                    className="w-full h-auto mb-8"
                                    alt=""
                                    src={Serviceexecllence}
                                />
                                <div className="text-lg text-gray-800 p-6">
                                    <p className="text-2xl font-semibold mb-3">Safety First</p>
                                    <p className="text-md lg:text-lg">Safety is the cornerstone of our operations. At SwiftWings, we prioritize the safety and well-being of our passengers above all else. With rigorous safety standards and meticulous attention to detail, we ensure every journey with us is secure and stress-free.</p>
                                </div>
                            </div>
                        </div>
                        <div className="sm:hidden mt-8">
                            <div className="">
                                <Image
                                    className="w-full h-auto mb-8"
                                    alt=""
                                    src={Safetyfirst}
                                />
                                <div className="text-lg text-gray-800 p-6">
                                    <p className="text-2xl font-semibold mb-3">Safety First</p>
                                    <p className="text-md lg:text-lg">Safety is the cornerstone of our operations. At SwiftWings, we prioritize the safety and well-being of our passengers above all else. With rigorous safety standards and meticulous attention to detail, we ensure every journey with us is secure and stress-free.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
                {/* <section className="py-16">
                    <div class="py-16 bg-gray-100">
                        <div class="xl:container m-auto px-6 text-gray-600 md:px-12 xl:px-16 ">
                            <div class="lg:bg-gray-50 dark:lg:bg-darker lg:p-16 rounded-[4rem] space-y-6 md:flex md:gap-6 justify-center md:space-y-0 lg:items-center">
                                <div class="md:5/12 lg:w-1/2">
                                    <h2 class="text-4xl font-bold text-gray-900 md:text-8xl dark:text-white">
                                        WHY CHOOSE US?
                                    </h2>
                                </div>
                                <div class="md:7/12 lg:w-4/5">
                                    <p class="my-8 text-gray-600 dark:text-gray-300">
                                        Choosing SwiftWings means choosing quality, reliability, and unparalleled luxury.
                                        With our commitment to excellence, passion for innovation, and customer-centric approach,
                                        we offer a level of service that goes above and beyond your expectations.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
                {/* <section className="py-16">
                    <div class="py-12">
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
                    </div>

                </section> */}
                {/* <section className="py-16">

                    <div class="py-20">
                        <div class="xl:container mx-auto px-6 md:px-12">
                            <div class="mb-16 md:w-2/3 lg:w-1/2">
                                <h2 class="mb-4 text-2xl font-bold text-gray-800 dark:text-white md:text-4xl">
                                    Our Team
                                </h2>

                            </div>
                            <div class="grid gap-6 px-4 sm:px-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                <div className="group relative rounded-3xl space-y-6 overflow-hidden">
                                    <Image
                                        className="mx-auto h-[26rem] w-full object-cover object-top transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                                        src={team}
                                        alt="woman"
                                        loading="lazy"
                                        width="640"
                                        height="805"
                                    />
                                    <div className="absolute inset-x-0 bottom-10 flex justify-center">
                                        <div className="w-auto rounded-2xl  px-4 py-2  bg-white bg-opacity-20 backdrop-filter backdrop-blur text-start">
                                            <h4 className="text-md font-semibold text-swPrimary500">FirstName & LastName</h4>
                                            <span className="block text-sm text-gray-500">Position</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="group relative rounded-3xl space-y-6 overflow-hidden">
                                    <Image
                                        className="mx-auto h-[26rem] w-full object-cover object-top transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                                        src={team}
                                        alt="woman"
                                        loading="lazy"
                                        width="640"
                                        height="805"
                                    />
                                    <div className="absolute inset-x-0 bottom-10 flex justify-center">
                                        <div className="w-auto rounded-2xl  px-4 py-2  bg-white bg-opacity-20 backdrop-filter backdrop-blur text-start">
                                            <h4 className="text-md font-semibold text-swPrimary500">FirstName & LastName</h4>
                                            <span className="block text-sm text-gray-500">Position</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="group relative rounded-3xl space-y-6 overflow-hidden">
                                    <Image
                                        className="mx-auto h-[26rem] w-full object-cover object-top transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                                        src={team}
                                        alt="woman"
                                        loading="lazy"
                                        width="640"
                                        height="805"
                                    />
                                    <div className="absolute inset-x-0 bottom-10 flex justify-center">
                                        <div className="w-auto rounded-2xl px-4 py-2 bg-white bg-opacity-20 backdrop-filter backdrop-blur text-start">
                                            <h4 className="text-md font-semibold text-swPrimary500">FirstName & LastName</h4>
                                            <span className="block text-sm text-gray-500">Position</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="group relative rounded-3xl space-y-6 overflow-hidden">
                                    <Image
                                        className="mx-auto h-[26rem] w-full object-cover object-top transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                                        src={team}
                                        alt="woman"
                                        loading="lazy"
                                        width="640"
                                        height="805"
                                    />
                                    <div className="absolute inset-x-0 bottom-10 flex justify-center">
                                        <div className="w-auto rounded-2xl  px-4 py-2  bg-white bg-opacity-20 backdrop-filter backdrop-blur text-start">
                                            <h4 className="text-md font-semibold text-swPrimary500">FirstName & LastName</h4>
                                            <span className="block text-sm text-gray-500">Position</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}

        {/* <section className="mt-64 py-16">
          <div className="xl:container m-auto px-6 text-gray-600 md:px-12 xl:px-16">
            {/* <FooterHero /> */}
          </div>
        </section> */}
      </NavAndFooter>
    </main>
  );
};

export default Service;
