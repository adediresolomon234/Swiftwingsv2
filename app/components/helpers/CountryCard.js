"use client";
import React from "react";
import { FaChevronDown } from "react-icons/fa";
import Button from "../../components/Button";
import { useState } from "react";
import Link from 'next/link';
import { SWTButtoncircleIcon } from "../../components/svgs"

const CountryCard = ({ country }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
<div className="w-full overflow-hidden flex flex-col sm:flex-row mb-10 gap-16 ">
  <div className="relative w-full sm:w-2/5 ">
    <img
      src={country.image}
      name={country.name}
      alt= {country.alt}
      className="w-full object-cover rounded-2xl"
       width="200"
        height="400"
    />
  </div>
  <div className="w-full sm:w-1/2">
    <div className="flex flex-col items-start justify-start relative p-4 ">
      <div className="flex items-center">
        <div className="relative group">
          <div className="text-lg font-medium flex">
            {country.name}
            {/* <button
              onClick={toggleDropdown}
              className="rounded px-2 py-1 text-sm ml-12 flex items-center"
            >
              <FaChevronDown />
            </button>
            {isOpen && (
              <div className="absolute mt-16 w-48">
                <button className="bg-swPrimary500 text-white font-bold py-2 px-8 rounded-full text-center">
                  Book A Jet
                </button>
              </div>
            )} */}
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-700 mb-4 lg:mb-6">
        {country.location}
      </div>
      <div className="swGray500 flex-grow text-[16px] mb-4">
        {country.description}
      </div>
      <div className="w-full flex justify-start mt-10">
        <Link href="https://swiftwingsjet.com/">
            <Button
              label="Book A Jet"
              bgColor=" bg-swPrimary500 text-white font-bold"
            />
        </Link>
      </div>
      {/* <div className="absolute bottom-0 right-0 rounded-lg bg-primary-500 h-10 flex items-center justify-center py-4 px-3 text-white">
        <div className="text-lg font-medium">Select destination</div>
      </div> */}
    </div>
  </div>
</div>
  );
};

export default CountryCard;
