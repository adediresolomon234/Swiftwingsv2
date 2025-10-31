"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import "../../../styles.css";
import Image from "next/image";
import NavAndFooter from "../../components/shared/NavAndFooter";
import Destinationsection from "../../../public/images/Destinationsection.png";
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
} from "../../components/svgs";
import InputField from "../../components/shared/InputField";
import Button from "../../components/Button";
import { accordions } from "../../components/helpers/FrequentlyQuestions";
import FooterHero from "../../components/shared/footerHero";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { addEnquiry } from "../../../redux/slices/enquirySlice";
import SuccessModal from "../../components/shared/modals/SuccessModal";
import CancelModal from "../../components/shared/modals/CancelModal";
import Whatsapp from "../../components/shared/Whatsapp";

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
          <div className="relative mx-auto max-w-screen-full px-4 py-16 sm:px-6 lg:flex lg:h-[50vh] lg:items-center lg:px-8">
            <div className="max-w-lg mx-auto text-center">
              <h1 className="text-3xl font-extrabold sm:text-6xl uppercase">
                REACH OUT TO US
              </h1>
              <p className="text-md">Swiftwings Jets contact channels</p>
            </div>
          </div>
        </div>
        <section className="py-8">
          <div className="m-auto px-6 text-gray-600 md:px-12 xl:px-16">
            <div className="text-container">
              <div className="inset-0 flex flex-col items-start justify-start sm:flex-row sm:items-center py-4 px-0">
                <div className="mr-8 flex flex-col items-start">
                  <div className="text-xl md:text-md font-semibold text-black mb-2">
                    Contact Information:
                  </div>
                  <div className="flex flex-col md:flex-row mt-4">
                    <div className="mb-6 w-full shrink-0 grow-0 basis-auto md:w-4/12 md:px-3 lg:px-6">
                      <div className="flex items-start">
                        <div className="shrink-0">
                          <div className="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
                            <SWTLocationIcon />
                          </div>
                        </div>
                        <div className="ml-6 grow">
                          <p className="mb-2 font-bold">Address</p>
                          <p className="text-neutral-500">
                            9b, Ike Asogwa Close Mende, Maryland Ikeja, Lagos
                            State.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-6 w-full shrink-0 grow-0 basis-auto md:w-4/12 md:px-3 lg:px-6">
                      <div className="flex items-start">
                        <div className="shrink-0">
                          <div className="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
                            <SWTCallPhoneIcon />
                          </div>
                        </div>
                        <div className="ml-6 grow">
                          <p className="mb-2 font-bold">Phone Number</p>
                          <p className="text-neutral-500">+234 902 879 2910</p>
                          <p className="text-neutral-500">+234 911 720 4129</p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-6 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                      <div className="flex items-start">
                        <div className="shrink-0">
                          <div className="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
                            <SwMailIcon />
                          </div>
                        </div>
                        <div className="ml-6 grow">
                          <p className="mb-2 font-bold">Email</p>
                          <p className="text-neutral-500">
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
        {/* <section className="py-2">
          <div className="m-auto px-10 text-gray-600 md:px-12 xl:px-16">
            <div className="text-container">
              <div className="inset-0 flex flex-col items-start justify-start sm:flex-row sm:items-center py-4 px-4">
                <div className="mr-8 flex flex-col items-start">
                  <div className="text-xl md:text-md font-semibold text-black mb-2">
                    Office Hours
                  </div>
                  <div className="text-justify">
                    <ul className="list-disc">
                      <li>Monday-Sunday: 24 hours open</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        <section className="py-8">
          <div className="py-6">
            <div className="xl:container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
                <a
                  href="https://www.instagram.com/swiftwingsjet"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="group p-4 sm:p-6 rounded-3xl bg-white">
                    <div className="px-8 py-4 flex flex-col items-center text-center bg-gray-100">
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
                  <div className="group p-4 sm:p-6 rounded-3xl bg-white">
                    <div className="px-8 py-4 flex flex-col items-center text-center bg-gray-100">
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
                  <div className="group p-4 sm:p-6 rounded-3xl bg-white">
                    <div className="px-8 py-4 flex flex-col items-center text-center bg-gray-100">
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
                  <div className="group p-4 sm:p-6 rounded-3xl bg-white">
                    <div className="px-8 py-4 flex flex-col items-center text-center bg-gray-100">
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
                  <div className="group p-4 sm:p-6 rounded-3xl bg-white">
                    <div className="px-8 py-4 flex flex-col items-center text-center bg-gray-100">
                      <SWTTikTokIcon className="w-12 h-12 mb-6" />
                      <p className="text-gray-600 text-base">@swiftwingsjet</p>
                    </div>
                  </div>
                </a>
                <a
                  href="https://wa.link/2uccut?text=${encodedMessage}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="group p-4 sm:p-6 rounded-3xl bg-white">
                    <div className="px-8 py-4 flex flex-col items-center text-center bg-gray-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-12 h-12 mb-6 fill-gray-600"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      <p className="text-gray-600 text-base">@swiftwingsjet</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="py-2 w-full">
          <div className="px-6 text-gray-600 md:px-12 xl:px-16 w-full">
            <div className="text-container">
              <div className="inset-0 py-4 px-0 w-full">
                <div className="mr-8 flex flex-col items-center w-full">
                  <div className="text-xl md:text-md font-semibold text-black mb-2">
                    Inquiry Form
                  </div>
                  <div className="w-full lg:w-1/2 mt-3">
                    <InputField
                      label={"Full Name"}
                      value={formData.name}
                      name={"name"}
                      placeholder={"Full Name"}
                      onChange={handleChange}
                      startIcon={<SwUserIcon className="text-xl" />}
                    />
                  </div>
                  <div className="w-full lg:w-1/2 mt-3">
                    <InputField
                      label={"Email"}
                      value={formData.email}
                      name={"email"}
                      onChange={handleChange}
                      placeholder={"Enter email address"}
                      startIcon={<SwMailIcon className="text-xl" />}
                    />
                  </div>
                  <div className="w-full lg:w-1/2 mt-3">
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
                  <div className="mt-3 flex flex-col w-full lg:w-1/2">
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
                        "bg-swPrimary500 block mt-0 text-sm text-white rounded-lg shadow-md mt-6"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-32 lg:py-20 mb-0 lg:-mb-20">
          <div className="xl:container m-auto px-6 text-gray-600 md:px-12 xl:px-16">
            <FooterHero />
          </div>
        </section>
        <Whatsapp />
      </NavAndFooter>
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
