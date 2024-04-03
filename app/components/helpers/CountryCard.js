import React from "react";

const CountryCard = ({ country }) => {
  return (
    <div className="w-full overflow-hidden flex flex-row items-start justify-start gap-16">
      <img
        className="w-96 relative rounded-lg h-96 object-cover mb-32"
        alt={country.name}
        src={country.image}
      />
      <div className="flex-1 flex flex-col items-start justify-start relative h-96">
        <div className="flex flex-col items-start justify-between h-full">
          <div>
            <div className="text-lg font-medium">
              {country.name}
            </div>

            <div className="text-sm text-gray-700">
              {country.location}

            </div>
          </div>
          {/* <div className="text-sm text-gray-700">{country.location}</div> */}
          <div className="swGray500 flex-grow text-[16px] absolute bottom-0 left-0">
            {country.description}
          </div>
          <div className="absolute top-[-20px] right-0 rounded-lg bg-primary-500 h-10 flex flex-row items-center justify-center py-4 px-3 gap-2 text-white">
            <div className="flex flex-row items-center justify-center">
              <div className="text-lg font-medium">Select destination</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
