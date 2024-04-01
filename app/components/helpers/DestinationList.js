"use client";

import React, { useState, useRef, useEffect } from 'react';
import { countries } from './countries';
import CountryCard from './CountryCard';

const DestinationList = () => {
  const countryRefs = useRef(Array(countries.length).fill(null));
  const [selectedLetter, setSelectedLetter] = useState(null);

  const scrollToDestination = (letter) => {
    setSelectedLetter(letter);
    const element = document.getElementById(letter);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToLetter = (letter) => {
    const element = document.getElementById(letter);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (selectedLetter) {
      scrollToLetter(selectedLetter);
    }
  }, [selectedLetter]);

  return (
    <div className="flex flex-col lg:flex-row gap-3">
      <div className="py-8 flex flex-wrap md:flex-nowrap space-x-1">
        
        <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
          {Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i)).map((letter) => (
            <p key={letter} onClick={() => scrollToDestination(letter)} className="cursor-pointer">
              {letter}
            </p>
          ))}
        </div>
      </div>
      <div className="flex-grow">
        <div className="md:flex-grow">
          {countries.map((country, index) => (
            <div key={index} className="flex items-center justify-center">
              <CountryCard country={country} />
              <div id={country.name[0]} ref={(el) => (countryRefs.current[index] = el)}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationList;
