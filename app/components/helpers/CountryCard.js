"use client";
import React from "react";
import { FaChevronDown } from "react-icons/fa";
import Button from "../../components/Button";
import { useState } from 'react';

const CountryCard = ({ country }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="w-full overflow-hidden flex flex-col lg:flex-row items-start justify-start gap-16">
      <div className="relative w-full lg:w-96 h-96 mb-0 md:mb-32">
        <img
          src={country.image}
          alt={country.name}
          className="w-full h-auto object-cover  rounded-2xl"
          width="640"
          height="805"
        />
      </div>
      <div className="lg:flex-1 flex flex-col items-start justify-start relative p-4 mt-6">
        <div className="flex items-center">
          <div className="relative group">
            <div className="text-lg font-medium flex">
              {country.name}       
                <button
                  onClick={toggleDropdown}
                  className="rounded px-2 py-1 text-sm ml-12 flex items-center"
                >
                  <FaChevronDown />
                </button>
                {isOpen && (
                  <div className="absolute mt-16 w-48 ">
                    <button className="bg-swPrimary500 text-white font-bold py-2 px-8 rounded-full  text-center">
                      Book A Jet
                    </button>
                  </div>
                )}
            
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-700 mb-4 lg:mb-32">
          {country.location}
        </div>
        <div className="swGray500 flex-grow text-[16px] mb-8">
          {country.description}
        </div>
        <div className="absolute bottom-0 right-0 rounded-lg bg-primary-500 h-10 flex items-center justify-center py-4 px-3 text-white">
          <div className="text-lg font-medium">Select destination</div>
        </div>
      </div>

    </div>
  );
};

export default CountryCard;
