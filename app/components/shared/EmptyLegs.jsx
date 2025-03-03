import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmptyLegs } from "../../../redux/slices/emptylegs";
import Button from "../Button";
import Link from "next/link";
import { IoAirplaneOutline } from "react-icons/io5";

const EmptyLegsSlider = () => {
  const dispatch = useDispatch();
  const {
    data: availableLegs,
    isLoading,
    error,
  } = useSelector((state) => state.emptylegs);

  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchData = useCallback(() => {
    dispatch(fetchEmptyLegs({ page: 1, limit: 10, search: "" }));
  }, [dispatch]);

  useEffect(() => {
    fetchData();

    const rotateInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (availableLegs?.length || 1));
    }, 10000);

    const refreshInterval = setInterval(fetchData, 60000);

    return () => {
      clearInterval(rotateInterval);
      clearInterval(refreshInterval);
    };
  }, [availableLegs?.length, fetchData]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-swPrimary500 border-opacity-70 mb-4"></div>
        <p className="text-lg text-gray-700 animate-pulse">
          Loading available empty legs...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
        >
          <path d="M204-318q-22-38-33-78t-11-82q0-134 93-228t227-94h7l-64-64 56-56 160 160-160 160-56-56 64-64h-7q-100 0-170 70.5T240-478q0 26 6 51t18 49l-60 60ZM481-40 321-200l160-160 56 56-64 64h7q100 0 170-70.5T720-482q0-26-6-51t-18-49l60-60q22 38 33 78t11 82q0 134-93 228t-227 94h-7l64 64-56 56Z" />
        </svg>
        <p className="text-lg text-red-500 font-semibold">
          Oops! Something went wrong. Please try again later.
        </p>
      </div>
    );
  }

  if (!availableLegs.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
        >
          <path d="M204-318q-22-38-33-78t-11-82q0-134 93-228t227-94h7l-64-64 56-56 160 160-160 160-56-56 64-64h-7q-100 0-170 70.5T240-478q0 26 6 51t18 49l-60 60ZM481-40 321-200l160-160 56 56-64 64h7q100 0 170-70.5T720-482q0-26-6-51t-18-49l60-60q22 38 33 78t11 82q0 134-93 228t-227 94h-7l64 64-56 56Z" />
        </svg>
        <p className="text-lg text-gray-600">
          No available empty legs at the moment. Check back soon!
        </p>
      </div>
    );
  }

  const currentLeg = availableLegs[currentIndex];

  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Available Empty Legs
        </h2>
        <button
          onClick={fetchData}
          className="text-gray-600 hover:text-gray-900"
          aria-label="Refresh Data"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#5f6368"
          >
            <path d="M204-318q-22-38-33-78t-11-82q0-134 93-228t227-94h7l-64-64 56-56 160 160-160 160-56-56 64-64h-7q-100 0-170 70.5T240-478q0 26 6 51t18 49l-60 60ZM481-40 321-200l160-160 56 56-64 64h7q100 0 170-70.5T720-482q0-26-6-51t-18-49l60-60q22 38 33 78t11 82q0 134-93 228t-227 94h-7l64 64-56 56Z" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableLegs.map((leg, index) => (
          <div
            key={index}
            className="max-w-2xs"
          >
            <div className="p-6">
              {/* Aircraft Name */}
              <h5 className="mb-4 text-3xl font-semibold text-gray-800">
                {leg?.aircraft_name}
              </h5>

              {availableLegs.map((leg, index) => (
                <div
                  key={index}
                  className="max-w-xs bg-white border border-gray-200 rounded-lg  transition-all duration-300 mb-4"
                >
                  <div className="p-6">
                    {/* Aircraft Name */}
                    <h5 className="mb-4 text-3xl font-semibold text-gray-800">
                      {leg?.aircraft_name}
                    </h5>

                    <div className="space-y-4">
                      {/* Departure and Arrival with Connecting Line */}
                      <div className="flex items-center space-x-6 h-20">
                        <div className="flex items-center space-x-2">
                          <IoAirplaneOutline className="w-5 h-5 text-gray-900" />{" "}
                          {/* Departure icon */}
                          <p className="text-gray-700 text-xs">
                            <span className="font-semibold text-gray-900">
                              {leg?.departure}
                            </span>
                          </p>
                        </div>

                        <div className="flex-1 h-0.5 bg-gray-300"></div>

                        <div className="flex items-center space-x-2">
                          <IoAirplaneOutline className="w-5 h-5 text-gray-900 transform rotate-180" />{" "}
                          {/* Arrival icon with rotation */}
                          <p className="text-gray-700 text-xs">
                            <span className="font-semibold text-gray-900">
                              {leg?.arrival}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Date */}
                      <p className="text-gray-700 text-base">
                        <span className="font-semibold text-gray-900">
                          Date:
                        </span>{" "}
                        {new Date(leg?.dates).toLocaleDateString()}
                      </p>

                      {/* Price */}
                      <p className="text-gray-700 text-md text-end font-medium">
                
                        ${leg?.price}
                      </p>
                    </div>

                    {/* Book Now Button */}
                    <div className="flex justify-center mt-6">
                      <Button
                        label="Book Now"
                        bgColor="bg-swPrimary500 hover:bg-swPrimary600"
                        textColor="text-white"
                        className="w-full px-6 py-3 rounded-lg shadow-md transition-all duration-300 transform text-lg font-semibold"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Book Now Button */}
              <div className="flex justify-center mt-6">
                <Button
                  label="Book Now"
                  bgColor="bg-swPrimary500 hover:bg-swPrimary600"
                  textColor="text-white"
                  className="text-xs w-full px-6 py-3 rounded-lg shadow-md transition-all duration-300 transform text-lg font-semibold"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {availableLegs.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-swPrimary500" : "bg-swPrimary300"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default EmptyLegsSlider;
