"use client";
import React, { useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useState } from "react";
import "../../styles.css";
import Image from "next/image";
import NavAndFooter from "../components/shared/NavAndFooter";
import Destinationsection from "../../public/images/Destinationsection.png";
import {
  SWTLocationIcon,
  SWTCallPhoneIcon,
  SwMailIcon,
  SWTFacebookIcon,
  SWTAccordionsOpenIcon,
  SWTAccordionsCloseIcon,
  SWTInstagramIcon,
  SWTLinkedInIcon,
  SWTTikTokIcon,
  SWTTwitterIcon,
  SwUserIcon,
} from "../components/svgs";
import InputField from "../components/shared/InputField";
import Button from "../components/Button";
import { accordions } from "../components/helpers/FrequentlyQuestions";
import FooterHero from "../components/shared/footerHero";
import Loading from "../components/Loading";

const ContactUs = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="relative bg-swLightBgGray">
      <NavAndFooter Nav={true}>
        <div class="relative">
          <Image
            className="absolute inset-0 w-full h-full object-cover object-top"
            src={Destinationsection}
            width="400"
            height="500"
            alt="hero background image"
          />
          {/* <div aria-hidden="true" class="absolute inset-0 w-full h-full bg-gray-900 bg-opacity-30 backdrop-blur-sm"></div> */}
          <div className="relative mx-auto max-w-screen-full px-4 py-28 sm:px-6 lg:flex lg:h-[70vh]  lg:items-center lg:px-8">
            <div className="max-w-xl mx-auto text-center">
              <h1 className="text-3xl font-extrabold sm:text-6xl uppercase">
                REACH OUT TO US
              </h1>
              <p className="text-md">Swiftwings Jets contact channels</p>
            </div>
          </div>
        </div>
        <section className="py-16">
          <div className="m-auto px-6 text-gray-600 md:px-12 xl:px-16">
            <div className="text-container">
              <div className=" inset-0 flex flex-col items-start justify-start sm:flex-row sm:items-center py-8 px-0 ">
                <div className="mr-8 flex flex-col items-start">
                  <div className="text-xl md:text-md font-semibold text-black mb-3">
                    Contact Information:
                  </div>
                  <div class="flex flex-col md:flex-row mt-10">
                    <div class="mb-12 w-full shrink-0 grow-0 basis-auto md:w-4/12 md:px-3 lg:px-6">
                      <div class="flex items-start">
                        <div class="shrink-0">
                          <div class="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
                            <SWTLocationIcon />
                          </div>
                        </div>
                        <div class="ml-6 grow">
                          <p class="mb-2 font-bold">Address</p>
                          <p class="text-neutral-500 ">
                            9b, Ike Asogwa Close Mende, Maryland Ikeja, Lagos
                            State.
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
                          <p class="mb-2 font-bold ">Phone Number</p>
                          <p class="text-neutral-500 ">+234 902 879 2910</p>
                          <p class="text-neutral-500 ">+234 911 720 4129</p>
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
                          <p class="mb-2 font-bold ">Email</p>
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
          <div className="m-auto px-10 text-gray-600 md:px-12 xl:px-16">
            <div className="text-container">
              <div className=" inset-0 flex flex-col items-start justify-start sm:flex-row sm:items-center py-8 px-4 ">
                <div className="mr-8 flex flex-col items-start">
                  <div className="text-xl md:text-md font-semibold text-black mb-3">
                    Office Hours
                  </div>
                  <div class="  text-justify p- ">
                    <ul class="list-disc">
                      <li>Monday-Sunday: 24 hours open</li>
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
              <a href="https://www.instagram.com/swiftwingsjet" target="_blank" rel="noopener noreferrer">
                <div class="group p-6 sm:p-8 rounded-3xl bg-white ">
                  <div class="px-12 py-6 flex flex-col items-center text-center bg-gray-100">
                    <SWTInstagramIcon className="w-12 h-12 mb-6" />
                    <p className="text-gray-600 text-base">@swiftwingsjet</p>
                  </div>
                </div>
              </a>
              <a href="https://www.twitter.com/swiftwingsjet" target="_blank" rel="noopener noreferrer">
                <div className="group p-6 sm:p-8 rounded-3xl bg-white ">
                  <div class="px-12 py-6 flex flex-col items-center text-center bg-gray-100">
                    <SWTTwitterIcon className="w-12 h-12 mb-6" />
                    <p className="text-gray-600 text-base">@swiftwingsjet</p>
                  </div>
                </div>
              </a>
              <a href="https://www.facebook.com/swiftwingsjet" target="_blank" rel="noopener noreferrer">
                <div className="group p-6 sm:p-8 rounded-3xl bg-white  ">
                  <div class="px-12 py-6 flex flex-col items-center text-center bg-gray-100">
                    <SWTFacebookIcon className="w-12 h-12 mb-6" />
                    <p className="text-gray-600 text-base">@swiftwingsjet</p>
                  </div>
                </div>
              </a>
              <a href="https://www.linkedin.com/swiftwingsjet" target="_blank" rel="noopener noreferrer">
                <div className="group p-6 sm:p-8 rounded-3xl bg-white  ">
                  <div class="px-12 py-6 flex flex-col items-center text-center bg-gray-100">
                    <SWTLinkedInIcon className="w-12 h-12 mb-6" />
                    <p className="text-gray-600 text-base">@swiftwingsjet</p>
                  </div>
                </div>
              </a>
              <a href="https://www.tiktok.com/swiftwingsjet" target="_blank" rel="noopener noreferrer">
                <div className="group p-6 sm:p-8 rounded-3xl bg-white  ">
                  <div class="px-12 py-6 flex flex-col items-center text-center bg-gray-100">
                    <SWTTikTokIcon className="w-12 h-12 mb-6" />
                    <p className="text-gray-600 text-base">@swiftwingsjet</p>
                  </div>
                </div>
              </a>
              </div>
            </div>
          </div>
        </section>
        <section className="py-3 w=full">
          <div className="px-6 text-gray-600 md:px-12 xl:px-16 w-full">
            <div className="text-container">
              <div className=" inset-0 py-8 px-0 w-full">
                <div className="mr-8 flex flex-col items-center w-full">
                  <div className="text-xl md:text-md font-semibold text-black mb-3">
                    Inquiry Form
                  </div>
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
                  <div className="mt-5 flex flex-col w-full lg:w-1/2">
                    <div className="w-full lg:mb-0">
                      <label
                        for="message"
                        className="block text-sm mb-2  text-gray-700"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none hover:border-swPrimary500"
                      ></textarea>
                    </div>
                    {/* <div className="w-full md:w-1/2"> */}
                    <Button
                      label={"Send"}
                      className="w-full md:w-1/2 mx-auto"
                      bgColor={
                        "bg-swPrimary500 block mt-0  text-sm text-white rounded-lg shadow-md mt-10"
                      }
                    />
                    {/* </div> */}
                  </div>
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
    </main>
  );
};

export default ContactUs;
