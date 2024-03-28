"use client";
import { useState } from 'react';
import { SWArrowsChevron,SWFilterIcon} from "../svgs";

const SortFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = ['Airplane', 'Airplane', 'Airplane'];

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
     <label htmlFor="title" className="block font-medium text-swGray900 mb-2 text-lg flex items-center">
        <SWFilterIcon className="mr-2 h-6 w-6" />
        Filter
      </label>
      <button onClick={() => setIsOpen(!isOpen)} className="relative border border-gray-300 rounded-md px-4 py-2 w-full text-left">
        {selectedOption || 'Sort by'}
        <SWArrowsChevron className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl" />
      </button>
      {isOpen && (
        <div className="absolute w-full mt-2 border border-gray-300 rounded-md shadow-md bg-white z-10">
          {options.map((option) => (
            <div key={option} onClick={() => handleSelect(option)} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


  
  export default SortFilter ;
  