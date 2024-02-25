import Button from "../Button";
import { Typography } from "@material-tailwind/react";
import React from "react";
import logo from "../../../public/images/Logo (1).png";
import Image from "next/image";

const LINKS = [
  {
    title: "Product",
    items: ["Overview", "Features", "Solutions", "Tutorials"],
  },
  {
    title: "Company",
    items: ["About us", "Careers", "Press", "News"],
  },
  {
    title: "Resource",
    items: ["Blog", "Newsletter", "Events", "Help center"],
  },
];

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="w-full relative rounded-3xl bg-swPrimary500 flex flex-col items-center overflow-hidden py-20 md:py-40">
      <div className="mb-16 mx-auto max-w-[990px]">
        <h2 className="mb-4 text-center text-[38px] text-white md:text-[38px]">
          Let’s work together
        </h2>
        <p className="text-white dark:text-gray-300 mt-8 text-xl text-center sm:text-xl md:text-xl">
          Swift Wings Ltd offers an exclusive Jet Card Membership, providing
          discerning travelers with unparalleled access to private jet charter
          services. As a Jet Card member, you enjoy priority booking and
          seamless travel experiences tailored to your preferences.
        </p>
      </div>
      <div className="flex justify-center mt-12">
        <Button label="Contact Us" textColor={"text-gray-700"} />
      </div>
      <div className="w-[80%] px-4 md:px-8 lg:px-16 xl:px-32 justify-center mt-8">
        <div className="w-full relative rounded-3xl bg-white shadow-md overflow-hidden flex flex-col items-start justify-start p-8 md:p-10 lg:p-12 xl:p-16 box-border gap-4 md:gap-6 text-left text-lg lg:text-xl text-gray-800 font-header-sm-semi-bold">
          <div className="self-stretch relative tracking-tighter leading-tight font-semibold">
            Sign Up to our Newsletter
          </div>
          <div className="self-stretch flex flex-col md:flex-row items-start justify-start gap-4 md:gap-6 text-sm lg:text-base text-gray-900">
            <div className="flex-1 flex flex-col items-start justify-start gap-2">
              <div className="w-full relative leading-normal">
                <input
                  type="email"
                  placeholder="Enter Email address"
                  className="w-full rounded-xl bg-white box-border h-10 md:h-12 overflow-hidden flex flex-row items-center justify-start py-2 px-4 md:px-6 gap-2 md:gap-3 text-gray-500 border border-solid border-swPrimary500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                />
              </div>
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
      <div className="relative w-full mt-36">
        <div className="mx-auto w-full max-w-7xl px-8">
          <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
            <div className="flex items-center">
              <Image src={logo} alt="" />
              <Typography variant="h5" className=" ml-2 text-white">
                SwiftWings
              </Typography>
            </div>
            <div className="grid grid-cols-3 justify-between gap-4 ">
              {LINKS.map(({ title, items }) => (
                <ul key={title}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-3 font-medium text-white"
                  >
                    {title}
                  </Typography>
                  {items.map((link) => (
                    <li key={link}>
                      <Typography
                        as="a"
                        href="#"
                        color="gray"
                        className="py-1.5 font-normal text-white"
                      >
                        {link}
                      </Typography>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
            <Typography
              variant="small"
              className="mb-4 text-center font-normal text-white md:mb-0"
            >
              9b Ike Asogwa Cl, Maryland 100211, Lagos.
            </Typography>
            <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
              <Typography
                variant="small"
                className="mb-4 text-center font-normal text-white md:mb-0"
              >
                &copy; {currentYear} Swift wings. All rights reserved
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
