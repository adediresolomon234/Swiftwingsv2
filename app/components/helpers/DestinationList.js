import React, { useState, useEffect } from "react";
import { countries } from "./countries";
import CountryCard from "./CountryCard";
import { SwSearchIcon } from "../../components/svgs";
import InputField from "../shared/InputField";

const DestinationList = () => {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const scrollToDestination = (letter) => {
    setSelectedLetter(letter);
    const element = document.getElementById(letter);
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useEffect(() => {
    if (selectedLetter) {
      scrollToDestination(selectedLetter);
    }
  }, [selectedLetter]);

  return (
    <div className="flex flex-col lg:flex-row mt-34">
      <div className="w-full mt-5 lg:w-auto lg:mt-0">
        <div className="mb-8 lg:hidden">
          <InputField
            className="w-full"
            placeholder="Search destinations"
            startIcon={<SwSearchIcon className="text-xl" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="lg:block hidden">
        <div className="md:w-40 md:mb-0 text-sm flex flex-col justify-between sticky top-20">
          {Array.from({ length: 26 }, (_, i) =>
            String.fromCharCode("A".charCodeAt(0) + i)
          ).map((letter) => (
            <p
              key={letter}
              onClick={() => scrollToDestination(letter)}
              className="cursor-pointer mb-[0.2rem]"
            >
              {letter}
            </p>
          ))}
        </div>
      </div>
      <div className="flex-grow w-full">
        <div className="">
          {countries
            .filter((country) =>
              country.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((country, index) => (
              <div key={index} className="flex items-center justify-center">
                <div id={country.name[0]}></div>
                <CountryCard country={country} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationList;
