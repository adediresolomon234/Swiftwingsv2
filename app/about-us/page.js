"use client";
import "../../styles.css";
import Image from "next/image";
import NavAndFooter from "../components/shared/NavAndFooter";
import Destinationsection from "../../public/images/Destinationsection.png";
import Serviceexecllence from "../../public/images/Serviceexecllence.png";
import Safetyfirst from "../../public/images/Safetyfirst.png";
import team from "../../public/images/team.png";
import { Libre_Baskerville } from "next/font/google";
import FooterHero from "../components/shared/footerHero";

const libre_baskerville = Libre_Baskerville({
    subsets: ["latin"],
    weight: ["400", "700"],
});

const AboutUs = () => {


    return (
        <main className="relative bg-swLightBgGray">
            <NavAndFooter Nav={true}>
                <div class="relative">
                    <Image className="absolute inset-0 w-full h-full object-cover object-top" src={Destinationsection} width="400" height="500" alt="hero background image" />
                    {/* <div aria-hidden="true" class="absolute inset-0 w-full h-full bg-gray-900 bg-opacity-30 backdrop-blur-sm"></div> */}
                    <div className="relative mx-auto max-w-screen-full px-4 md:py-20 py-40 sm:px-6 lg:flex lg:h-[50vh]  lg:items-center lg:px-8">
                        <div className="max-w-xl mx-auto text-center">
                            <h1 className="text-3xl font-extrabold sm:text-6xl uppercase">
                                About Us
                            </h1>
                        </div>
                    </div>
                </div>
                <section className="py-16">
                    <div className="m-auto px-6 text-gray-600 md:px-12 xl:px-16">
                        <div className="max-w-3xl mx-auto text-md lg:text-center">
                            <h1 className="text-md md:text-lg text-swGray900" >
                                Swift Wings was founded in June 2017 with a mission to provide extraordinary aviation services to individuals with a keen eye for quality, as well as to esteemed corporate leaders and organisations throughout Nigeria. Speed, luxury, safety and delivery of top-notch service are the cornerstones of everything we do at Swift Wings. Our dedication lies in not just meeting but exceeding our clients expectations by constantly exploring new horizons and pushing the limits.
                            </h1>
                        </div>
                    </div>
                </section>
                <section className="py-8">
                    <div className="m-auto px-2 text-gray-600 md:px-12 xl:px-16">
                        <div className="max-w-5xl mx-auto text-justify lg:text-center">
                            <ul className="p-2 mb-3 flex flex-col sm:flex-row overflow-x-auto no-scrollbar">
                                <li className="w-full mx-2 p-3 px-2 sm: text-3xl sm:w-auto sm:text-start  whitespace-nowrap text-black">
                                    Our Mission
                                </li>
                                <li className="w-auto text-xl mx-1 p-3 sm: text-md lg:text-lg px-2 sm:w-auto sm:text-start " style={{ fontFamily: "auto" }}>
                                    To be the leading private jet charter company
                                    in the industry, renowned for our commitment
                                    to excellence, innovation, and personalised
                                    service.

                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section className="py-8">
                    <div className="m-auto px-2 text-gray-600 md:px-12 xl:px-16">
                        <div className="max-w-5xl mx-auto text-justify lg:text-center">
                            <ul className="p-2 mb-3 flex flex-col-reverse sm:flex-row overflow-x-auto no-scrollbar">
                                <li className="text-xl w-auto mx-1 p-3 sm:text-lg lg:text-lg px-2  sm:w-auto sm:text-justify lg:text-end" style={{ fontFamily: "auto" }}>
                                    We aim to provide seamless, personalised experiences that exceed your expectations every time you fly with us. Our mission is to ensure your journey is safe, comfortable,
                                    and unforgettable, no matter where you&apos;re headed

                                </li>
                                <li className="w-full mx-2 p-3 px-2 sm: text-3xl text-black sm:w-auto sm:text-start  whitespace-nowrap">
                                    Our Vision
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section className="py-16">
                    <div className="w-full relative h-[1033px] text-left text-5xl text-gray-900 font-body-md-regular hidden sm:block">
                        <Image
                            className="absolute top-[0px] left-[calc(50%_+_7px)] w-[677px] h-[664px] object-cover"
                            alt=""
                            src={Serviceexecllence}
                        />
                        <div className="absolute top-[66px] left-[calc(50%_-_684px)] w-[634px] flex flex-col items-start justify-start gap-[26px]">
                            <p className="text-md">
                                Safety First
                            </p>
                            <div className="text-sm">
                                Recognising that our team of aviation professionals is our most valuable asset, Swift Wings has meticulously assembled a group of highly experienced and dedicated individuals who share a passion for delivering unmatched service. Each team member is committed to ensuring that every aspect of your journey is safe, comfortable, speedy, and hassle-free.

                            </div>
                        </div>
                        <div className="relative text-left text-5xl text-gray-900 font-body-md-regular">
                            <div className="absolute top-[825px] left-[calc(50%_-_138px)] w-[634px] flex flex-col items-start justify-start gap-[26px]">
                                <p className="text-md">
                                    Service Excellence
                                </p>
                                <div className="text-sm">
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
                                    <p className="text-2xl font-semibold mb-3">Our Team</p>
                                    <p className="text-md lg:text-lg text-swGray800">Safety is the cornerstone of our operations. At SwiftWings, we prioritize the safety and well-being of our passengers above all else. With rigorous safety standards and meticulous attention to detail, we ensure every journey with us is secure and stress-free.</p>
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
                                    <p className="text-md lg:text-lg text-swGray800">Safety is the cornerstone of our operations. At SwiftWings, we prioritize the safety and well-being of our passengers above all else. With rigorous safety standards and meticulous attention to detail, we ensure every journey with us is secure and stress-free.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-16">
                    <div class="py-16 bg-gray-100">
                        <div class="xl:container m-auto px-6 text-gray-600 md:px-12 xl:px-16 ">
                            <div class="bg-swGray50 lg:p-16 rounded-[4rem] space-y-6 md:flex md:gap-6 justify-center md:space-y-0 lg:items-center">
                                <div class="md:5/12 lg:w-1/2">
                                    <h2 class="text-4xl font-bold text-gray-900 md:text-6xl">
                                        WHY <br></br> CHOOSE  <br></br> US?
                                    </h2>
                                </div>
                                <div class="md:7/12 lg:w-4/5">
                                    <p class="my-8 text-swGray800">
                                        Choosing SwiftWings means choosing quality, reliability, and unparalleled luxury.
                                         With our commitment to excellence, passion for innovation, and customer-centric approach,
                                        we offer a level of service that goes above and beyond your expectations.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="">
                  
                        <div class="xl:container m-auto px-0 text-gray-600 md:px-12">
                            <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                <div class="group p-6 sm:p-8 rounded-3xl bg-white ">
                                    <div class="mt-6 relative">
                                        <h3 class="text-2xl font-semibold text-gray-800 ">
                                            Global coverage
                                        </h3>
                                        <p class="mt-6 mb-8 text-swGray800">
                                            Swift Wings offers extensive global coverage to meet the travel needs of our clients, seamlessly connecting them to destinations worldwide, including Europe, North America, South America, and beyond. With a network of trusted partners and affiliates, we ensure convenience and flexibility in air travel on a global scale, even to the most remote corners of the world.
                                        </p>
                                    </div>
                                </div>
                                <div className="group p-6 sm:p-8 rounded-3xl bg-white ">
                                    <div className="mt-6 relative">
                                        <h3 className="text-2xl font-semibold text-gray-800 ">
                                            World-class experience
                                        </h3>
                                        <p className="mt-6 mb-8 text-swGray800">
                                            At Swift Wings, we ensure every journey is a remarkable experience by maintaining a tailored fleet of private jets that epitomize luxury, comfort, and convenience. From the moment you step on board, you will experience an unparalleled level of service that stands unrivaled in the industry. Our aviation experts are dedicated to customizing every aspect of your journey to align with your preferences and needs, ensuring a truly unforgettable experience.
                                        </p>
                                    </div>
                                </div>
                                <div className="group p-6 sm:p-8 rounded-3xl bg-white  ">
                                    <div className="mt-6 relative">
                                        <h3 className="text-2xl font-semibold text-gray-800 ">
                                            Private jets supremacy
                                        </h3>
                                        <p className="mt-6 mb-8 text-swGray800">
                                            At Swift Wings, we prioritize accessibility in private jet travel with our diverse fleet, accommodating various budgets and travel needs. Whether it is a short trip on a light jet or a long-haul journey on a spacious cabin jet, our advanced aircraft, such as the Hawker 850xp and Bombardier Challenger 604, ensure unparalleled comfort, luxury, and reliability for every passenger.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
             

                </section>
            
                    <div class="xl:container mx-auto md:px-12">
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
            

                <section className="">
                    <div className="xl:container m-auto px-6 text-gray-600 md:px-12 xl:px-16">
                        <FooterHero />
                    </div>
                </section>
            </NavAndFooter>
        </main>
    );
};

export default AboutUs;
