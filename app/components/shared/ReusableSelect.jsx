import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { SwSearchIcon } from "../svgs";

const ReusableSelect = ({
  isOpen,
  searchable,
  searchValue,
  onClose,
  placeholder,
  format,
  optionValue,
  setValue,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const modalRef = useRef(null);

  useEffect(() => {
    if (searchValue) {
      setSearchTerm(searchValue);
    }
  }, [searchValue]);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose?.(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const filter = format?.filter((item) => {
    const value = item?.value;
    if (typeof value !== "object" || value === null) return false;

    return Object.keys(value).some((key) => {
      const fieldValue = value[key];
      return (
        typeof fieldValue === "string" &&
        fieldValue.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  });

  if (!isOpen) return null;

  const content = (
    <div className="fixed top-0 left-0 h-screen w-full z-[50] flex items-center justify-center bg-black/25">
      <div
        className="w-[90%] max-w-md h-fit bg-white rounded-xl p-5 z-[10000]"
        ref={modalRef}
      >
        {/* Search Input */}
        {searchable && (
          <div className="flex items-center border border-gray-300 rounded-lg px-3 mb-4 gap-1">
            <SwSearchIcon className="text-xl" />
            <input
              className="flex-1 h-10 outline-none"
              type="text"
              placeholder={placeholder || "Search"}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        {/* Options List */}
        <div className="space-y-2 max-h-72 overflow-y-auto">
          {filter && filter.length > 0 ? (
            filter.map((item, i) => (
              <div
                key={i}
                className={`cursor-pointer px-4 py-2 hover:bg-swPrimary100 rounded-md ${
                  i !== 0 ? "border-t border-gray-200" : ""
                }`}
                onClick={() => {
                  setValue?.(item?.value);
                  onClose?.(false);
                }}
              >
                <div>{item?.label}</div>
              </div>
            ))
          ) : optionValue && optionValue.length > 0 ? (
            optionValue.map((item, i) => (
              <div
                key={i}
                className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                  i !== 0 ? "border-t border-gray-200" : ""
                }`}
                onClick={() => {
                  setValue?.(item.value);
                }}
              >
                <p>{item.label}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <p>No options found</p>
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={() => onClose?.(false)}
          className="mt-5 w-full bg-swPrimary500 text-white font-semibold py-2 rounded-lg hover:bg-swPrimary700 transition cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.body);
};

export default ReusableSelect;
