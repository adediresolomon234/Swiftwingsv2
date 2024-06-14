
"use client";
import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useState } from 'react';
import "../../styles.css";
import Image from "next/image";
import NavAndFooter from "../components/shared/NavAndFooter";
import Destinationsection from "../../public/images/Destinationsection.png"
import { SWTLocationIcon, SWTCallPhoneIcon, SwMailIcon, SWTFacebookIcon, SWTAccordionsOpenIcon, SWTAccordionsCloseIcon, SWTInstagramIcon, SWTLinkedInIcon, SWTTikTokIcon, SWTTwitterIcon, SwUserIcon } from "../components/svgs"
import InputField from "../components/shared/InputField";
import Button from "../components/Button"
import { accordions } from '../components/helpers/FrequentlyQuestions';
import FooterHero from '../components/shared/footerHero';


const ContactUs = () => {

    const [activeAccordion, setActiveAccordion] = useState(null);

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);

    };


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
                                    <div class="  text-justify ">
                                        <ul class="list-disc">
                                            <li>Monday-Friday: 12:00AM - 12:00AM </li>
                                            <li>Saturday: 12:00AM  - 12:00AM </li>
                                            <li>Sunday: Closed</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div class="py-12">
                        <div class="xl:container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                            <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
                                <div class="group p-6 sm:p-8 rounded-3xl bg-white ">
                                    <div class="px-12 py-6 flex flex-col items-center text-center bg-gray-100">
                                        <SWTInstagramIcon className="w-12 h-12 mb-6" />
                                        <p className="text-gray-600 text-base" >@swiftwingsjet</p>
                                    </div>
                                </div>
                                <div className="group p-6 sm:p-8 rounded-3xl bg-white ">
                                    <div class="px-12 py-6 flex flex-col items-center text-center bg-gray-100">
                                        <SWTTwitterIcon className="w-12 h-12 mb-6" />
                                        <p className="text-gray-600 text-base" >@swiftwingsjet</p>
                                    </div>
                                </div>
                                <div className="group p-6 sm:p-8 rounded-3xl bg-white  ">
                                    <div class="px-12 py-6 flex flex-col items-center text-center bg-gray-100">
                                        <SWTFacebookIcon className="w-12 h-12 mb-6" />
                                        <p className="text-gray-600 text-base" >@swiftwingsjet</p>
                                    </div>
                                </div>
                                <div className="group p-6 sm:p-8 rounded-3xl bg-white  ">
                                    <div class="px-12 py-6 flex flex-col items-center text-center bg-gray-100">
                                        <SWTLinkedInIcon className="w-12 h-12 mb-6" />
                                        <p className="text-gray-600 text-base" >@swiftwingsjet</p>
                                    </div>
                                </div>
                                <div className="group p-6 sm:p-8 rounded-3xl bg-white  ">
                                    <div class="px-12 py-6 flex flex-col items-center text-center bg-gray-100">
                                        <SWTTikTokIcon className="w-12 h-12 mb-6" />
                                        <p className="text-gray-600 text-base" >@swiftwingsjet</p>
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
                                    <div className="w-full lg:w-1/2 mt-5">
                                        <InputField
                                            label={"Full Name"}
                                            placeholder={"Full Name"}
                                            startIcon={<SwUserIcon className="text-xl" />}

                                        />
                                    </div>
                                    <div className="w-full lg:w-1/2 mt-5">
                                        <InputField
                                            label={"Email"}
                                            placeholder={"Enter email address"}
                                            startIcon={<SwMailIcon className="text-xl" />}

                                        />
                                    </div>
                                    <div className="w-full lg:w-1/2 mt-5">
                                        <InputField
                                            label={"Phone"}
                                            placeholder={"Phone number"}
                                            startIcon={<SWTCallPhoneIcon className="text-xl" />}

                                        />
                                    </div>
                                    <div className="w-full lg:w-1/2 mt-5">
                                        <InputField
                                            label={"Subject"}
                                            placeholder={"Enter Subject"}


                                        />
                                    </div>
                                    <div className="mt-5 flex flex-col lg:flex-row lg:items-center">
                                        <div className="w-full lg:w-1/2  lg:mb-0">
                                            <label for="message" className="block text-xl mb-2  text-gray-700">Message</label>
                                            <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"></textarea>
                                        </div>
                                        <Button label={'Send'} bgColor={"bg-swPrimary500 block w-1/2 mt-0 lg:w-auto  text-sm text-white rounded-lg shadow-md lg:ml-4 mt-24"} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                    <section className="py-16 mb-0 md:mb-8 lg:mb-16">
                    <div className="xl:container m-auto px-6 text-gray-600 md:px-12 xl:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-40 lg:gap-16">
                        <div className="mb-30">
                            <div className="flex relative">
                                <div className="w-72 h-60 bg-swPrimary700 card-container-3 transform transition-all absolute rounded-lg top-3 -left-6"></div>
                                <div className="w-72 h-72 card-container-2 bg-swPrimary600 transform transition-all absolute -top-2 -left-12 rounded-lg"></div>
                                <div className="w-full card-container md:w-80 h-full md:h-80 bg-swPrimary500 flex flex-col justify-start items-center transform transition-all absolute -top-6 md:-left-20 rounded-lg">
                                    <h2 className="text-2xl font-bold md:text-4xl text-white px-12 py-4">Frequently Asked Questions</h2>
                                    <p className="text-md px-12 mb-8 lg:mb-0 md:text-xl text-white">Here are previously answered questions.</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 px-4 lg:mt-0">
                            <div>
                                {accordions.map((accordion, index) => (
                                    <Accordion
                                        key={accordion.id}
                                        expanded={activeAccordion === index}
                                        onChange={() => toggleAccordion(index)}
                                    >
                                        <AccordionSummary
                                            aria-controls={`panel${accordion.id}-content`}
                                            id={`panel${accordion.id}-header`}
                                            className="font-bold"
                                            expandIcon={activeAccordion === index ? <SWTAccordionsOpenIcon /> : <SWTAccordionsCloseIcon />}
                                        >
                                            {accordion.header}
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {accordion.content}
                                        </AccordionDetails>
                                        {accordion.id === 3 && (
                                            <AccordionActions>
                                                {/* Add any actions here if needed */}
                                            </AccordionActions>
                                        )}
                                    </Accordion>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                    </section>
                <section className=" lg:py-60 mb-0 lg:-mb-60">
                    <div className="xl:container m-auto px-6 text-gray-600 md:px-12 xl:px-16">
                        <FooterHero />
                    </div>
                </section>
            </NavAndFooter>
        </main >

    );
};

export default ContactUs;





