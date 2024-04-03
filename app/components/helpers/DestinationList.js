import React, { useState, useEffect } from 'react';
import { countries } from './countries';
import CountryCard from './CountryCard';

const DestinationList = () => {
  const [selectedLetter, setSelectedLetter] = useState(null);

  const scrollToDestination = (letter) => {
    setSelectedLetter(letter);
    const element = document.getElementById(letter);
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  useEffect(() => {
    if (selectedLetter) {
      scrollToDestination(selectedLetter);
    }
  }, [selectedLetter]);

  return (
    <div className="flex flex-col lg:flex-row">
    <div className="flex-shrink-0 w-1/12 hidden lg:block">
      <div className="md:w-64 md:mb-0 mb-8 flex flex-col space-y-4 sticky top-0">
        {Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i)).map((letter) => (
          <p key={letter} onClick={() => scrollToDestination(letter)} className="cursor-pointer">
            {letter}
          </p>
        ))}
      </div>
    </div>
    <div className="flex-grow w-full lg:w-9/12">
      <div className="md:flex-grow">
        {countries.map((country, index) => (
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
