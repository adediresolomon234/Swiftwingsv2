"use client";
import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { addEnquiry } from "../../redux/slices/enquirySlice";
import SuccessModal from "../components/shared/modals/SuccessModal";
import CancelModal from "../components/shared/modals/CancelModal";
import Whatsapp from "../components/shared/Whatsapp"

const ContactUs = () => {
  const dispatch = useDispatch();
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingEnquiry, setLoadingEnquiry] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "", 
    enquiry: "",
  });

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoadingEnquiry(true);
    dispatch(addEnquiry(formData))
      .unwrap()
      .then((res) => {
        if (res?.success === true) {
          setSuccess(true);
          setFormData({
            name: "",
            email: "",
            service: "",
            enquiry: "",
          });
          setLoadingEnquiry(false);
        } else {
          setFailed(true);
          setLoadingEnquiry(false);
        }
      })
      .catch((err) => {
        setFailed(true);
        setLoadingEnquiry(false);
      });
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
        <div className="relative">
          <Image
            className="absolute inset-0 w-full h-full object-cover object-top"
            src={Destinationsection}
            width="400"
            height="500"
            alt="hero background image"
          />
          <div className="relative mx-auto max-w-screen-full px-4 py-28 sm:px-6 lg:flex lg:h-[70vh] lg:items-center lg:px-8">
            <div className="max-w-xl mx-auto text-center">
              <h1 className="text-3xl font-extrabold sm:text-6xl uppercase">
                REACH OUT TO US
              </h1>
              <p className="text-md">Swiftwings Jets contact channels</p>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <section className="py-16">
          <div className="m-auto px-6 text-gray-600 md:px-12 xl:px-16">
            <div className="text-container">
              <div className=" inset-0 flex flex-col items-start justify-start sm:flex-row sm:items-center py-8 px-0 ">
                <div className="mr-8 flex flex-col items-start">
                  <div className="text-xl md:text-md font-semibold text-black mb-3">
                    Contact Information:
                  </div>
                  <div className="flex flex-col md:flex-row mt-10">
                    <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-4/12 md:px-3 lg:px-6">
                      <div className="flex items-start">
                        <div className="shrink-0">
                          <div className="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
                            <SWTLocationIcon />
                          </div>
                        </div>
                        <div className="ml-6 grow">
                          <p className="mb-2 font-bold">Address</p>
                          <p className="text-neutral-500 ">
                            9b, Ike Asogwa Close Mende, Maryland Ikeja, Lagos
                            State.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-4/12 md:px-3 lg:px-6">
                      <div className="flex items-start">
                        <div className="shrink-0">
                          <div className="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
                            <SWTCallPhoneIcon />
                          </div>
                        </div>
                        <div className="ml-6 grow">
                          <p className="mb-2 font-bold ">Phone Number</p>
                          <p className="text-neutral-500 ">+234 902 879 2910</p>
                          <p className="text-neutral-500 ">+234 911 720 4129</p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                      <div className="flex items-start">
                        <div className="shrink-0">
                          <div className="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
                            <SwMailIcon />
                          </div>
                        </div>
                        <div className="ml-6 grow">
                          <p className="mb-2 font-bold ">Email</p>
                          <p className="text-neutral-500 ">
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

        {/* Office Hours Section */}
        <section className="py-3">
          <div className="m-auto px-10 text-gray-600 md:px-12 xl:px-16">
            <div className="text-container">
              <div className=" inset-0 flex flex-col items-start justify-start sm:flex-row sm:items-center py-8 px-4 ">
                <div className="mr-8 flex flex-col items-start">
                  <div className="text-xl md:text-md font-semibold text-black mb-3">
                    Office Hours
                  </div>
                  <div className="text-justify p-">
                    <ul className="list-disc">
                      <li>Monday-Sunday: 24 hours open</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="py-16">
          <div className="py-12">
            <div className="xl:container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
                <a
                  href="https://www.instagram.com/swiftwingsjet"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="group p-6 sm:p-8 rounded-3xl bg-white ">
                    <div className="px-12 py-6 flex flex-col items-center text-center bg-gray-100">
                      <SWTInstagramIcon className="w-12 h-12 mb-6" />
                      <p className="text-gray-600 text-base">@swiftwingsjet</p>
                    </div>
                  </div>
                </a>
                <a
                  href="https://www.twitter.com/swiftwingsjet"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="group p-6 sm:p-8 rounded-3xl bg-white ">
                    <div className="px-12 py-6 flex flex-col items-center text-center bg-gray-100">
                      <SWTTwitterIcon className="w-12 h-12 mb-6" />
                      <p className="text-gray-600 text-base">@swiftwingsjet</p>
                    </div>
                  </div>
                </a>
                <a
                  href="https://www.facebook.com/swiftwingsjet"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="group p-6 sm:p-8 rounded-3xl bg-white  ">
                    <div className="px-12 py-6 flex flex-col items-center text-center bg-gray-100">
                      <SWTFacebookIcon className="w-12 h-12 mb-6" />
                      <p className="text-gray-600 text-base">@swiftwingsjet</p>
                    </div>
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/swiftwingsjet"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="group p-6 sm:p-8 rounded-3xl bg-white  ">
                    <div className="px-12 py-6 flex flex-col items-center text-center bg-gray-100">
                      <SWTLinkedInIcon className="w-12 h-12 mb-6" />
                      <p className="text-gray-600 text-base">@swiftwingsjet</p>
                    </div>
                  </div>
                </a>
                <a
                  href="https://www.tiktok.com/swiftwingsjet"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="group p-6 sm:p-8 rounded-3xl bg-white  ">
                    <div className="px-12 py-6 flex flex-col items-center text-center bg-gray-100">
                      <SWTTikTokIcon className="w-12 h-12 mb-6" />
                      <p className="text-gray-600 text-base">@swiftwingsjet</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Inquiry Form Section */}
        <section className="py-3 w-full">
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
                      value={formData.name}
                      name={"name"}
                      placeholder={"Full Name"}
                      onChange={handleChange}
                      startIcon={<SwUserIcon className="text-xl" />}
                    />
                  </div>
                  <div className="w-full lg:w-1/2 mt-5">
                    <InputField
                      label={"Email"}
                      value={formData.email}
                      name={"email"}
                      onChange={handleChange}
                      placeholder={"Enter email address"}
                      startIcon={<SwMailIcon className="text-xl" />}
                    />
                  </div>

                  {/* Dropdown for Services */}
                  <div className="w-full lg:w-1/2 mt-5">
                    <label
                      htmlFor="service"
                      className="block text-sm mb-2 text-gray-700"
                    >
                      Select Service
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none hover:border-swPrimary500"
                    >
                      <option value="">Select a service</option>
                      <option value="Inflight Catering">
                        Inflight Catering
                      </option>
                      <option value="Helicopter Services">
                        Helicopter Services
                      </option>
                      <option value="Air Ambulance">Air Ambulance</option>
                      <option value="Empty Leg Services">
                        Empty Leg Services
                      </option>
                      <option value="Chauffeur Services">
                        Chauffeur Services
                      </option>
                      <option value="Group/Corporate Flights">
                        Group/Corporate Flights
                      </option>
                    </select>
                  </div>

                  {/* Message Field */}
                  <div className="mt-5 flex flex-col w-full lg:w-1/2">
                    <div className="w-full lg:mb-0">
                      <label
                        htmlFor="message"
                        className="block text-sm mb-2 text-gray-700"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="enquiry"
                        rows="4"
                        value={formData.enquiry}
                        onChange={handleChange}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none hover:border-swPrimary500"
                      ></textarea>
                    </div>
                    <Button
                      label={"Send"}
                      className={`${
                        loadingEnquiry ||
                        Object.values(formData).some((value) => value === "")
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      } w-full md:w-1/2 mx-auto`}
                      disabled={
                        loadingEnquiry ||
                        Object.values(formData).some((value) => value === "")
                      }
                      onClick={handleSubmit}
                      bgColor={
                        "bg-swPrimary500 block mt-0 text-sm text-white rounded-lg shadow-md mt-10"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Hero Section */}
        <section className="lg:py-60 mb-0 lg:-mb-60">
          <div className="xl:container m-auto px-6 text-gray-600 md:px-12 xl:px-16">
            <FooterHero />
          </div>
        </section>
        <Whatsapp/>
      </NavAndFooter>

      {/* Success and Failure Modals */}
      <SuccessModal
        open={success}
        onClose={setSuccess}
        singleBtn={true}
        firstBtnText={"Done"}
        firstBtnClick={() => setSuccess(false)}
        headingText={"Enquiry Sent"}
        text={"Your enquiry has been sent successfully"}
      />
      <CancelModal
        open={failed}
        onClose={setFailed}
        singleBtn={true}
        noInput={true}
        firstBtnText={"Ok"}
        firstBtnClick={() => setFailed(false)}
        headingText={"Enquiry Failed"}
        text={"Your enquiry could not be sent. Please try again"}
      />
    </main>
  );
};

export default ContactUs;