import React, { useState, useEffect } from "react";
import Button from "../Button";
import SWheader from "../../../public/images/SWheader.png"
import SWFooter from "../../../public/images/SWFooter.png";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { Libre_Baskerville } from "next/font/google";
import Link from "next/link";

const currentYear = new Date().getFullYear();
const libre_baskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Footer = () => {
  const [selectedSection, setSelectedSection] = useState(null);

  const scrollToSection = (sectionId) => {
    setSelectedSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useEffect(() => {
    if (selectedSection) {
      scrollToSection(selectedSection);
    }
  }, [selectedSection]);

  return (
    <footer className="w-full sm:rounded-t-[4rem] bg-swPrimary500 relative flex flex-col items-center overflow-hidden py-12 md:py-12">
      <div className="mb-16 sm:mx-auto w-full sm:w-5/4 md:w-1/2">
        <h2 className="mb-4 text-center text-xl text-white md:text-3xl md:text-center">
          Let&apos;s work together
        </h2>
        <p className="text-white p-8 mt-8 text-md text-center">
          Let&apos;s bring the world closer to you with Swiftwingsjet&apos;s private jet charter services. Experience the convenience and luxury of flying on your terms. Reach out today, and let&apos;s work together to make your travel dreams a reality.
        </p>
      </div>
      <div className="w-full md:w-3/4 lg:w-4/5 mx-auto px-4 sm:px-8 lg:px-16 xl:px-32 m-20">
        <div className="newsletter w-full relative rounded-2xl bg-white overflow-hidden flex flex-col items-start justify-start p-6 md:p-8 lg:p-12 xl:p-10 gap-4 md:gap-6 text-left text-lg lg:text-xl text-swGray800 font-semibold">
          <div className="self-stretch tracking-tighter leading-tight p-2 text-2xl">
            Sign Up to our Newsletter
          </div>
          <div className="self-stretch flex flex-col md:flex-row items-start justify-start gap-4 md:gap-6 text-sm lg:text-base text-swGray300">
            <div className="relative w-full md:w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <CiMail className="w-6 h-10 font-bold" />
              </div>
              <input
                type="text"
                id="input-group-1"
                className="w-full border border-swGray300 text-swGray300 text-sm rounded-lg focus:ring-swPrimary500 focus:border-swPrimary500 hover:border-swPrimary500 ps-10 p-3.5"
                placeholder="name@gmail.com"
              />
            </div>
            <div className="flex justify-center w-full md:w-1/6">
              <Button
                label="Subscribe"
                bgColor={"bg-swPrimary500"}
                textColor={"text-white"}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full ">
        <footer className="w-full bg-swWine relative flex flex-col items-center overflow-hidden">
          <div className="mx-auto w-full max-w-screen-2xl p-4 py-6 lg:py-8">
            <div className="flex flex-col gap-6 justify-between sm:flex-row">
              <div className="mb-6 md:mb-0 w-2/5">
                <a href="https://swiftwings.com/" className="flex items-center">
                  <Image
                   className="text-white w-60 "
                    src={SWFooter}
                    alt="swiftwings Logo"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </a>
              </div>
              <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:flex sm:flex-row flex-wrap gap-3 md:gap-5 justify-between">
                <div>
                  <h2 className="mb-4 text-md font-medium text-white">Service</h2>
                  <ul className="text-white">
                    <li className="mb-4">
                      <Link href="/services#medical-evacuation">
                        <p className="hover:underline text-sm" onClick={() => scrollToSection("service-section")}>Air Ambulance</p>
                      </Link>
                    </li>
                    <li className="mb-4">
                      <Link href="/services#inflight-catering">
                        <p className="hover:underline text-sm" onClick={() => scrollToSection("service-section")}>Inflight catering</p>
                      </Link>
                    </li>
                    <li className="mb-4">
                      <Link href="/services#concierge">
                        <p className="hover:underline text-sm" onClick={() => scrollToSection("service-section")}>Concierge</p>
                      </Link>
                    </li>
                    <li className="mb-4">
                      <Link href="/services#group-charter">
                        <p className="hover:underline text-sm" onClick={() => scrollToSection("service-section")}>Group/Corporate Charter</p>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="mb-4 text-md font-medium text-white">Company</h2>
                  <ul className="text-white">
                    <li className="mb-4">
                      <a href="/about-us" className="hover:underline text-sm">
                        About Us
                      </a>
                    </li>
                    <li className="mb-4">
                      <a href="/contact-us" className="hover:underline text-sm">
                        Contact Us
                      </a>
                    </li>
                    <li className="mb-4">
                      <a href="#" className="hover:underline text-sm">
                        Career
                      </a>
                    </li>
                    <li className="mb-4">
                      <a href="#" className="hover:underline text-sm">
                        Membership
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="mb-4 text-md font-medium text-white">Platform</h2>
                  <ul className="text-white">
                    <li className="mb-4">
                      <a href="#" className="hover:underline text-sm">
                        Privacy Policy
                      </a>
                    </li>
                    <li className="mb-4">
                      <a href="#" className="hover:underline text-sm">
                        Terms & Conditions
                      </a>
                    </li>
                    <li className="mb-4">
                      <a href="#" className="hover:underline text-sm">
                        FAQ
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="mb-4 text-md font-medium text-white">Contact</h2>
                  <ul className="text-white">
                    <li className="flex items-center mb-4 text-xs">
                      <div className="flex justify-center mr-3">
                        <CiMail />
                      </div>
                      <a href="mailto:charter@swiftwingsjet.com" className="hover:underline">
                        charter@swiftwingsjet.com
                      </a>
                    </li>
                    <li className="flex items-center mb-4 text-sm">
                      <div className="flex justify-center mr-3">
                        <FaInstagram />
                      </div>
                      <a href="https://www.instagram.com/swiftwingsjet" className="hover:underline">
                        swiftwingsjet
                      </a>
                    </li>
                    <li className="flex items-center mb-4 text-sm">
                      <div className="flex justify-center mr-3">
                        <FaXTwitter />
                      </div>
                      <a href="https://www.twitter.com/swiftwingsjet" className="hover:underline">
                        swiftwingsjet
                      </a>
                    </li>
                    <li className="flex items-center mb-4 text-sm">
                      <div className="flex justify-center mr-3">
                        <FaPhoneAlt />
                      </div>
                      <a href="tel:09028792910" className="hover:underline">
                        09028792910
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between">
              <span className="text-sm text-white sm:text-center">
                9b Ike Asogwa Cl, Maryland 100211, Lagos.
              </span>
              <div className="flex mt-4 sm:justify-center sm:mt-0">
                <span className="text-sm text-white sm:text-center">
                  {currentYear}{" "}
                  <a href="https://swiftwingsjet.com/" className="hover:underline">
                    <span
                      className={`${libre_baskerville.className} no-text-shadow font-bold`}
                    >
                      Swift<i className="font-normal">Wings</i>
                    </span>
                  </a>
                  . All Rights Reserved.
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </footer>
  );
};

export default Footer;
