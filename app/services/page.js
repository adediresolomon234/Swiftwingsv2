"use client";
import "../../styles.css";
import Image from "next/image";
import NavAndFooter from "../components/shared/NavAndFooter";
import Destinationsection from "../../public/images/Destinationsection.png";
import Inflightcatering2 from "../../public/images/Inflightcatering2.png";
import ChauffeurServices from "../../public/images/ChauffeurServices.png";
import MedicalEvacuation from "../../public/images/MedicalEvacuation.png";
import team from "../../public/images/team.png";
import { Libre_Baskerville } from "next/font/google";
import {
  SWTBespokeIcon,
  SWTStarBlack2Icon,
  SWTUserServiceIcon,
  SWTLuxuryFleetIcon,
  SWTDoortoDoorIcon,
  SWTCustomizatioIconIcon,
  SWTDietaryIconIcon,
  SWTStarIconIcon,
  SWTAdvancedMedicalIcon,
  SWTTwoPersonBlackIcon,
  SWTGlobalCoverageIcon,
  SWTClockBlackIcon,
} from "../components/svgs";
import Button from "../components/Button";
import FooterHero from "../components/shared/footerHero";

const libre_baskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Service = () => {
  return (
    <main className="relative bg-swLightBgGray">
      <NavAndFooter Nav={true}>
        <div className="relative">
          <Image
            className="absolute inset-0 w-full  h-full object-cover object-top"
            src={Destinationsection}
            width="400"
            height="500"
            alt="hero background image"
          />
          {/* <div aria-hidden="true" class="absolute inset-0 w-full h-full bg-gray-900 bg-opacity-30 backdrop-blur-sm"></div> */}
          <div className="relative mx-auto max-w-screen-full px-4 py-28 sm:px-6 lg:flex lg:h-[70vh]  lg:items-center lg:px-8">
            <div className="max-w-5xl mx-auto text-center">
              <h1 className="text-3xl font-bold sm:text-4xl lg:text-6xl capitalize mb-3">
                Swift wings Sets the Standard in Aviation{" "}
                <span className="text-swPrimary500">Services</span>
              </h1>
              <p className="px-2 sm:text-md lg:text-lg max-w-lg mx-auto">
                Our Services are designed to give you a first class experience
                tailored to your needs.
              </p>
            </div>
          </div>
        </div>
        <section className="py-5">
          <div className="m-auto text-gray-600 md:px-12 xl:px-16">
            <div className="">
              {/* <div className="flex"> */}
              <div className="p-5">
                <div className="text-start">
                  <h1 className="text-xl font-semibold sm:text-3xl capitalize mb-4 text-black">
                    Inflight Catering
                  </h1>
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <p className="sm:text-md lg:text-lg max-w-2xl">
                      Indulge in gourmet dining at 40,000 feet with{" "}
                      <span
                        className={`${libre_baskerville.className} no-text-shadow font-bold`}
                      >
                        Swift<i className="font-normal">Wings</i>
                      </span>
                      &apos; inflight catering services. From decadent entrees
                      to tantalizing desserts, our culinary team crafts bespoke
                      menus tailored to your preferences
                    </p>
                    <p className=" sm:text-md lg:text-lg max-w-2xl">
                      Whether you&apos;re hosting a business meeting or
                      celebrating a special occasion, savor every moment with
                      our exquisite inflight dining experience.
                    </p>
                  </div>
                </div>
              </div>

              {/* <div class="basis-1/2 mx-8  ">
                  <div className="max-w-xl mx-auto text-start"></div>
                </div> */}
              {/* </div> */}
              <div className="w-full">
                <div className="relative">
                  <Image className=" w-full h-full" src={Inflightcatering2} />
                </div>
              </div>
              <div className="py-16">
                <div className="px-2 space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-swPrimary500">
                    <div className="p-2 flex items-center">
                      <SWTBespokeIcon className="mr-4" />
                      <p>Bespoke Menus</p>
                    </div>
                    <div className="p-2 flex items-center">
                      <SWTCustomizatioIconIcon className="mr-4" />
                      <p>Customization Options</p>
                    </div>
                    <div className="p-2 flex items-center">
                      <SWTStarIconIcon className="mr-4" />
                      <p>Premium Selections</p>
                    </div>
                    <div className="p-2 flex items-center">
                      <SWTDietaryIconIcon className="mr-4" />
                      <p>Dietary Accommodations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-5">
          <div className="m-auto text-gray-600 md:px-12 xl:px-16">
            <div className="w-full mx-auto text-justify lg:text-center">
              <div className="p-5">
                <div className="text-start">
                  <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold sm:text-3xl capitalize mb-4 text-black">
                      Medical Evacuation
                    </h1>
                  </div>
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <p className="sm:text-md lg:text-lg max-w-2xl">
                      Your safety is our priority.{" "}
                      <span
                        className={`${libre_baskerville.className} no-text-shadow font-bold`}
                      >
                        Swift<i className="font-normal">Wings</i>
                      </span>{" "}
                      offers medical evacuation services for emergencies,
                      ensuring prompt and efficient transportation to medical
                      facilities when needed most.
                    </p>
                    <p className=" sm:text-md lg:text-lg max-w-2xl">
                      With our dedicated team of professionals and
                      state-of-the-art equipment, you can travel with peace of
                      mind knowing that help is just a call away.
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className="my-7 px-6 lg:hidden">
                <Button
                  label={"Request quote"}
                  bgColor={"bg-swPrimary500 text-white w-md"}
                />
              </div> */}
              <div className="w-full mt-8">
                <div className="relative">
                  <Image
                    className=" w-full h-full lg:px-20 "
                    src={MedicalEvacuation}
                  />
                </div>
              </div>
              <div className="py-16">
                <div className="px-2 space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-swPrimary500">
                    <div className="p-2 flex items-center">
                      <SWTClockBlackIcon className="mr-4" />
                      <p>Available 24/7</p>
                    </div>
                    <div className="p-2 flex items-center">
                      <SWTTwoPersonBlackIcon className="mr-4" />
                      <p>Emergency Response Team</p>
                    </div>
                    <div className="p-2 flex items-center">
                      <SWTGlobalCoverageIcon className="mr-4" />
                      <p>Global Coverage</p>
                    </div>
                    <div className="p-2 flex items-center">
                      <SWTAdvancedMedicalIcon className="mr-4" />
                      <p>Advanced Medical Equipment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-5">
          <div className="m-auto text-gray-600 md:px-12 xl:px-16">
            <div className="w-full mx-auto text-justify lg:text-center">
              <div className="flex flex-col gap-8 lg:flex-row">
                <div className="p-5">
                  <div className="text-start">
                    <h1 className="text-xl font-semibold sm:text-3xl capitalize mb-4 text-black">
                      Chauffeur Services
                    </h1>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-10">
                      <p className="sm:text-md lg:text-lg max-w-2xl">
                        Arrive in style and comfort with{" "}
                        <span
                          className={`${libre_baskerville.className} no-text-shadow font-bold`}
                        >
                          Swift<i className="font-normal">Wings</i>
                        </span>
                        &apos; chauffeur services. Whether you need
                        transportation to and from the airport or prefer a
                        chauffeured car during your stay, our professional
                        drivers are at your service.
                      </p>
                      <p className=" sm:text-md lg:text-lg max-w-2xl">
                        Sit back, relax, and enjoy a seamless journey from door
                        to door with our luxury chauffeur services.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="my-7 px-6 lg:hidden">
                <Button
                  label={"Request quote"}
                  bgColor={"bg-swPrimary500 text-white w-md"}
                />
              </div> */}
              <div className="w-full mt-8">
                <div className="relative">
                  <Image
                    className=" w-full h-full lg:px-20 "
                    src={ChauffeurServices}
                  />
                </div>
              </div>
              <div className="py-5">
                <div className="px-2 space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-swPrimary500">
                    <div className="p-2 flex items-center">
                      <SWTStarBlack2Icon className="mr-4" />
                      <p>Corporate Travel</p>
                    </div>
                    <div className="p-2 flex items-center">
                      <SWTLuxuryFleetIcon className="mr-4" />
                      <p>Luxury Fleet</p>
                    </div>
                    <div className="p-2 flex items-center">
                      <SWTUserServiceIcon className="mr-4" />
                      <p>Professional Drivers</p>
                    </div>
                    <div className="p-2 flex items-center">
                      <SWTDoortoDoorIcon className="mr-4" />
                      <p>Door-to-Door Service</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-5">
          <div className="mx-auto text-gray-600 md:px-12 xl:px-16">
            <div className="flex flex-col justify-between md:flex-row items-start gap-8 px-8">
              <div className="max-w-md">
                <h2 className="text-xl text-swPrimary500 font-bold">
                  Why Choose{" "}
                  <span
                    className={`${libre_baskerville.className} no-text-shadow font-bold`}
                  >
                    Swift<i className="font-normal">Wings</i>
                  </span>{" "}
                  Service
                </h2>
              </div>
              <div className="hidden md:block w-full lg:w-1/3 mx-4 mt-3">
                <hr className="border-t border-gray-300 w-full" />
              </div>
              <div className="max-w-md ">
                <p className="text-lg">
                  <span
                    className={`${libre_baskerville.className} no-text-shadow font-bold`}
                  >
                    Swift<i className="font-normal">Wings</i>
                  </span>{" "}
                  is a premier provider of private jets charter flights
                  connecting global airports, offering unmatched convenience and
                  exclusivity for luxury travel.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="relative py-16">
            <div className="container relative m-auto px-6 text-gray-500 md:px-12 bg-swSecondary400">
              <div className="grid gap-6 md:mx-auto md:w-8/12 lg:w-full lg:grid-cols-3">
                <div className="group space-y-6  px-8 py-12 text-center">
                  <h3 className="text-xl font-semibold text-gray-800 p-3">
                    Exceptional Quality
                  </h3>
                  <p className="text-md">
                    From gourmet catering to medical evacuation, we uphold the
                    highest standards of quality and professionalism in every
                    service we offer.
                  </p>
                </div>
                <div className="group space-y-6  px-8 py-12 text-center">
                  <h3 className="text-xl font-semibold text-gray-800   p-3">
                    Personalized Solutions
                  </h3>
                  <p className="text-md">
                    Whether it&lsquo;s catering to dietary restrictions or
                    arranging urgent medical transport, we tailor our services
                    to meet your individual needs and preferences.
                  </p>
                </div>
                <div className="group space-y-6  px-8 py-12 text-center">
                  <h3 className="text-xl font-semibold text-gray-800   p-3">
                    Reliability and Efficiency
                  </h3>
                  <p className="text-md">
                    With{" "}
                    <span
                      className={`${libre_baskerville.className} no-text-shadow font-bold`}
                    >
                      Swift<i className="font-normal">Wings</i>
                    </span>
                    , you can trust that your needs will be met promptly and
                    efficiently, allowing you to focus on what matters most –
                    your journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

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

        <section className=" py-3">
          <div className="xl:container m-auto px-6 text-gray-600 md:px-12 xl:px-16">
            <FooterHero />
          </div>
        </section>
      </NavAndFooter>
    </main>
  );
};

export default Service;
