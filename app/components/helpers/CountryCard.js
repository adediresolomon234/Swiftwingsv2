import React from "react";

const CountryCard = ({ country }) => {
  return (
    <div className="w-full overflow-hidden flex flex-col lg:flex-row items-start justify-start gap-16">
      <div className="relative w-full lg:w-96 h-96 mb-3 md:mb-32">
        <img
          src={country.image}
          alt={country.name}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Content */}
      <div className="lg:flex-1 flex flex-col items-start justify-start relative">
        <div className="text-lg font-medium">
          {country.name}
        </div>
        <div className="text-sm text-gray-700">
          {country.location}
        </div>
        <div className="swGray500 flex-grow text-[16px] mb-3">
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
