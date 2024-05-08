import React from "react";

const CountryCard = ({ country }) => {
  return (
    <div className="w-full overflow-hidden flex flex-col lg:flex-row items-start justify-start gap-16">
      <div className="relative w-full lg:w-96 h-96 mb-0 md:mb-32">
        <img
          src={country.image}
          alt={country.name}
          className="w-full h-full object-cover  rounded-2xl"
          width="640"
          height="805"
        />
      </div>
      <div className="lg:flex-1 flex flex-col items-start justify-start relative p-4">
        <div className="text-lg font-medium ">
          {country.name}
        </div>
        <div className="text-sm text-gray-700 mb-4 mb-56">
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
