import Button from "../Button";
import React from 'react';
import logo from "../../../public/images/Logo (1).png";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { CiMail } from "react-icons/ci";



const currentYear = new Date().getFullYear();

const Footer = () => {
    return (

        <footer className="w-full rounded-3xl bg-swPrimary700 relative flex flex-col items-center overflow-hidden py-12 md:py-12">        
            <div className="mb-16 sm:mx-auto w-full sm:w-1/2 md:w-1/2">
                <h2 className="mb-4 text-center text-[38px] text-white md:text-[38px]">
                    Let’s work together
                </h2>
                <p className="text-white  mt-8 text-base text-center sm:text-base md:text-base">
                    Swift Wings Ltd offers an exclusive Jet Card Membership, providing discerning travelers with unparalleled access to private jet charter services. As a Jet Card member, you enjoy priority booking and seamless travel experiences tailored to your preferences.
                </p>
            </div>
            <div className="flex justify-center mt-12">
                <Button
                    label="Contact Us"
                    textColor={"text-gray-700"}
                />
            </div>
            <div className="w-full md:w-3/4 lg:w-4/5 mx-auto px-4 sm:px-8 lg:px-16 xl:px-32 mt-20">
                <div className="newsletter w-full relative rounded-2xl bg-white overflow-hidden flex flex-col items-start justify-start p-6 md:p-8 lg:p-12 xl:p-10 gap-4 md:gap-6 text-left text-lg lg:text-xl text-swGray800 font-semibold">
                    <div className="self-stretch tracking-tighter leading-tight p-2 text-2xl">
                        Sign Up to our Newsletter
                    </div>
                    <div className="self-stretch flex flex-col md:flex-row items-start justify-start gap-4 md:gap-6 text-sm lg:text-base text-swGray300">
                        <div className="relative w-full md:w-3/4">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <CiMail className="w-6 h-10 font-bold" />
                            </div>
                            <input type="text" id="input-group-1" className="w-full border border-swGray300 text-swGray300 text-sm rounded-lg focus:ring-swPrimary500 focus:border-swPrimary500 hover:border-swPrimary500 ps-10 p-3.5" placeholder="name@gmail.com" />

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
                <footer className="w-full rounded-3xl bg-swWine relative flex flex-col items-center overflow-hidden py-20 md:py-40">
                    <div className="mx-auto w-full max-w-screen-2xl p-4 py-6 lg:py-8">
                        <div className="md:flex md:justify-between">
                            <div className="mb-6 md:mb-0">
                                <a href="https://swiftwings.com/" className="flex items-center">
                                    <Image src={logo} alt="swiftwings Logo" />
                                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Swiftwings</span>
                                </a>
                            </div>
                            <div className="grid grid-cols-2 gap-3 sm:gap-2 sm:grid-cols-4">
                                <div>
                                    <h2 className="mb-6 text-xl font-semibold uppercase text-white">Service</h2>
                                    <ul className="text-white font-medium">
                                        <li className="mb-4">
                                            <a href="" className="">Luxurious trips</a>
                                        </li>
                                        <li className="mb-4">
                                            <a href="" className="">Inflight catering</a>
                                        </li>
                                        <li className="mb-4">
                                            <a href="" className="">Air ambulance</a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="mb-6 text-xl font-semibold  uppercase text-white">Company</h2>
                                    <ul className="text-white font-medium">
                                        <li className="mb-4">
                                            <a href="" className="hover:underline">About Us</a>
                                        </li>
                                        <li className="mb-4">
                                            <a href="" className="hover:underline">Contact Us</a>
                                        </li>
                                        <li className="mb-4">
                                            <a href="" className="hover:underline">Career</a>
                                        </li>
                                        <li className="mb-4">
                                            <a href="" className="hover:underline">Outreach</a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="mb-6 text-xl font-semibold uppercase text-white">Legal</h2>
                                    <ul className="text-white font-medium">
                                        <li className="mb-4">
                                            <a href="" className="hover:underline ">Privacy Policy</a>
                                        </li>
                                        <li className="mb-4">
                                            <a href="" className="hover:underline ">Terms & Condition</a>
                                        </li>
                                        <li className="mb-4">
                                            <a href="" className="hover:underline ">Usage rights</a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="mb-6 text-xl font-semibold uppercase text-white">Company and Social</h2>
                                    <ul className="text-white font-medium">
                                        <li className="flex items-center mb-4">
                                            <div className="flex justify-center mr-3">
                                                <CiMail />
                                            </div>
                                            <a href="#" className="hover:underline">charter@swiftwingsjet.com</a>
                                        </li>
                                        <li className="flex items-center mb-4">
                                            <div className="flex justify-center mr-3">
                                                <FaInstagram />
                                            </div>
                                            <a href="#" className="hover:underline">swiftwingsjet</a>
                                        </li>
                                        <li className="flex items-center mb-4">
                                            <div className="flex justify-center mr-3">
                                                <FaXTwitter />
                                            </div>
                                            <a href="#" className="">swiftwingsjet</a>
                                        </li>
                                        <li className="flex items-center mb-4">
                                            <div className="flex justify-center mr-3">
                                                <FaPhoneAlt />
                                            </div>
                                            <a href="#" className="">09028792910</a>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                        <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
                        <div className="sm:flex sm:items-center sm:justify-between">
                            <span className="text-sm text-white sm:text-center d"> 9b Ike Asogwa Cl, Maryland 100211, Lagos.
                            </span>
                            <div className="flex mt-4 sm:justify-center sm:mt-0">
                                <span className="text-sm text-white sm:text-center ">{currentYear} <a href="https:swiftwings.com" className="hover:underline">SwiftWings</a>. All Rights Reserved.
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
