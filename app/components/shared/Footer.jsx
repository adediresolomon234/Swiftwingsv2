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

        <footer className="w-full relative rounded-3xl bg-swPrimary700 relative flex flex-col items-center overflow-hidden py-12 md:py-12">
            <div className="mb-16 mx-auto max-w-[990px]">
                <h2 className="mb-4 text-center text-[38px] text-white md:text-[38px]">
                    Let’s work together
                </h2>
                <p className="text-white dark:text-gray-300 mt-8 text-xl text-center sm:text-xl md:text-xl">
                    Swift Wings Ltd offers an exclusive Jet Card Membership, providing discerning travelers with unparalleled access to private jet charter services. As a Jet Card member, you enjoy priority booking and seamless travel experiences tailored to your preferences.
                </p>
            </div>
            <div className="flex justify-center mt-12">
                <Button
                    label="Contact Us"
                    textColor={"text-gray-700"}
                />
            </div>
            <div className="w-[80%] px-4 md:px-8 lg:px-16 xl:px-32 justify-center mt-20">
                <div className="newsletter w-full relative rounded-3xl bg-white  overflow-hidden flex flex-col items-start justify-start p-8 md:p-10 lg:p-12 xl:p-16 box-border gap-4 md:gap-6 text-left text-lg lg:text-xl text-gray-800 font-header-sm-semi-bold">
                    <div className="self-stretch relative tracking-tighter leading-tight font-semibold">
                        Sign Up to our Newsletter
                    </div>
                    <div className="self-stretch flex flex-col md:flex-row items-start justify-start gap-4 md:gap-6 text-sm lg:text-base text-gray-900">
                        <div class="relative mb-6">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <CiMail className="w-6 h-10 font-bold" />
                            </div>
                            <input type="text" id="input-group-1" class="max-w-xs lg:max-w-none  border border-swPrimary600 text-gray-900 text-sm rounded-lg focus:ring-swPrimary600 focus:border-swPrimary600  block w-full lg:w-[780px] ps-10 p-3.5" placeholder="name@flowbite.com" />
                        </div>

                        <div className="flex justify-center ">
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
                <footer class="w-full relative rounded-3xl bg-swWine relative flex flex-col items-center overflow-hidden py-20 md:py-40">
                    <div class="mx-auto w-full max-w-screen-2xl p-4 py-6 lg:py-8">
                        <div class="md:flex md:justify-between">
                            <div class="mb-6 md:mb-0">
                                <a href="https://swiftwings.com/" class="flex items-center">
                                    <Image src={logo} alt="swiftwings Logo" />
                                    <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Swiftwings</span>
                                </a>
                            </div>
                            <div class="grid grid-cols-2 gap-3 sm:gap-2 sm:grid-cols-4">
                                <div>
                                    <h2 class="mb-6 text-xl font-semibold uppercase text-white">Service</h2>
                                    <ul class="text-white dark:text-gray-400 font-medium">
                                        <li class="mb-4">
                                            <a href="" class="">Luxurious trips</a>
                                        </li>
                                        <li class="mb-4">
                                            <a href="" class="">Inflight catering</a>
                                        </li>
                                        <li class="mb-4">
                                            <a href="" class="">Air ambulance</a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 class="mb-6 text-xl font-semibold  uppercase text-white">Company</h2>
                                    <ul class="text-white font-medium">
                                        <li class="mb-4">
                                            <a href="" class="hover:underline">About Us</a>
                                        </li>
                                        <li class="mb-4">
                                            <a href="" class="hover:underline">Contact Us</a>
                                        </li>
                                        <li class="mb-4">
                                            <a href="" class="hover:underline">Career</a>
                                        </li>
                                        <li class="mb-4">
                                            <a href="" class="hover:underline">Outreach</a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 class="mb-6 text-xl font-semibold uppercase text-white">Legal</h2>
                                    <ul class="text-white font-medium">
                                        <li class="mb-4">
                                            <a href="" class="hover:underline ">Privacy Policy</a>
                                        </li>
                                        <li class="mb-4">
                                            <a href="" class="hover:underline ">Terms & Condition</a>
                                        </li>
                                        <li class="mb-4">
                                            <a href="" class="hover:underline ">Usage rights</a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 class="mb-6 text-xl font-semibold uppercase text-white">Company and Social</h2>
                                    <ul class="text-white font-medium">
                                        <li class="flex items-center mb-4">
                                            <div className="flex justify-center mr-3">
                                                <CiMail />
                                            </div>
                                            <a href="#" class="hover:underline">charter@swiftwingsjet.com</a>
                                        </li>
                                        <li class="flex items-center mb-4">
                                            <div className="flex justify-center mr-3">
                                                <FaInstagram />
                                            </div>
                                            <a href="#" class="hover:underline">swiftwingsjet</a>
                                        </li>
                                        <li class="flex items-center mb-4">
                                            <div className="flex justify-center mr-3">
                                                <FaXTwitter />
                                            </div>
                                            <a href="#" class="">swiftwingsjet</a>
                                        </li>
                                        <li class="flex items-center mb-4">
                                            <div className="flex justify-center mr-3">
                                                <FaPhoneAlt />
                                            </div>
                                            <a href="#" class="">09028792910</a>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                        <hr class="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
                        <div class="sm:flex sm:items-center sm:justify-between">
                            <span class="text-sm text-white sm:text-center d"> 9b Ike Asogwa Cl, Maryland 100211, Lagos.
                            </span>
                            <div class="flex mt-4 sm:justify-center sm:mt-0">
                                <span class="text-sm text-white sm:text-center ">{currentYear} <a href="https:swiftwings.com" class="hover:underline">SwiftWings</a>. All Rights Reserved.
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
