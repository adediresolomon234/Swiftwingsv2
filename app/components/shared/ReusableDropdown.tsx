import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import React, { useState, useRef, useEffect } from "react";
// import { ArrowDown } from "../../../../public/icons";

interface DropdownProps {
  label?: string;
  options?: { label: string; value: string }[];
  placeHolder?: string;
  value?: { label: string; value: string };
  css?: string;
  textColor?: string;
  borderColor?: string;
  onChange?: (option: { label: string; value: string }) => void;
}

const ReusableDropDown = ({
  label,
  options = [],
  css,
  placeHolder,
  textColor,
  borderColor,
  value,
  onChange,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: { label: string; value: string }) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange?.(option);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={popupRef} className="w-full">
      {label && <p className="text-swGray800 text-sm mb-3">{label}</p>}
      <div
        className={`flex justify-center relative w-full mt-1 cursor-pointer`}
      >
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 px-4 h-11 bg-white rounded border border-swGray300 hover:border-swPrimary500 w-full flex justify-between items-center  ${
            textColor ? textColor : "text-swGray500"
          } ${css}`}
        >
          {value
            ? value.label
            : selectedOption
            ? selectedOption.label
            : placeHolder
            ? placeHolder
            : "Select an option"}

          {/* <ThreeDots className="text-2xl" /> */}
          <ArrowDropDownIcon className="text-sm text-black" />
        </div>
        {isOpen && (
          <div>
            {options.length > 0 ? (
              <ul
                className={`absolute bg-white rounded border ${
                  borderColor ? borderColor : "border-swGray300"
                } top-full left-0 mt-1 z-[40] w-full `}
              >
                {options.map((option, index) => (
                  <li
                    key={option.label}
                    onClick={() => handleOptionClick(option)}
                    className={`p-2 pl-6 hover:bg-gray-50 ${
                      index !== 0 ? "border-t" : ""
                    }`}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="absolute bg-white rounded border top-1 left-0 z-20 w-full font-medium">
                <div className="p-2 pl-6 text-sm text-swGray700">
                  No Options
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReusableDropDown;
