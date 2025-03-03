import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmptyLegs } from "../../../redux/slices/emptylegs";
import Button from "../Button";
import Link from "next/link";

const EmptyLegsSlider = () => {
  const dispatch = useDispatch();
  const { data: availableLegs = [], isLoading, error } = useSelector(
    (state) => state.emptylegs
  );
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
        <p className="text-lg text-gray-700 animate-pulse">Loading available empty legs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M204-318q-22-38-33-78t-11-82q0-134 93-228t227-94h7l-64-64 56-56 160 160-160 160-56-56 64-64h-7q-100 0-170 70.5T240-478q0 26 6 51t18 49l-60 60ZM481-40 321-200l160-160 56 56-64 64h7q100 0 170-70.5T720-482q0-26-6-51t-18-49l60-60q22 38 33 78t11 82q0 134-93 228t-227 94h-7l64 64-56 56Z"/></svg>
        <p className="text-lg text-red-500 font-semibold">
          Oops! Something went wrong. Please try again later.
        </p>
      </div>
    );
  }

  if (!availableLegs.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
       <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M204-318q-22-38-33-78t-11-82q0-134 93-228t227-94h7l-64-64 56-56 160 160-160 160-56-56 64-64h-7q-100 0-170 70.5T240-478q0 26 6 51t18 49l-60 60ZM481-40 321-200l160-160 56 56-64 64h7q100 0 170-70.5T720-482q0-26-6-51t-18-49l60-60q22 38 33 78t11 82q0 134-93 228t-227 94h-7l64 64-56 56Z"/></svg>
        <p className="text-lg text-gray-600">
          No available empty legs at the moment. Check back soon!
        </p>
      </div>
    );
  }

  const currentLeg = availableLegs[currentIndex];

  return (
    <div className="max-w-4xl mx-auto py-10">
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
            <path d="M204-318q-22-38-33-78t-11-82q0-134 93-228t227-94h7l-64-64 56-56 160 160-160 160-56-56 64-64h-7q-100 0-170 70.5T240-478q0 26 6 51t18 49l-60 60ZM481-40 321-200l160-160 56 56-64 64h7q100 0 170-70.5T720-482q0-26-6-51t-18-49l60-60q22 38 33 78t11 82q0 134-93 228t-227 94h-7l64 64-56 56Z"/>
          </svg>
        </button>
      </div>
      <div className="relative">
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm mx-auto transition-all duration-500 ease-in-out">
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              {currentLeg?.aircraft_name}
            </h5>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">Departure:</span> {currentLeg?.origin}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Arrival:</span> {currentLeg?.destination}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Date:</span>{" "}
                {new Date(currentLeg?.departure_date).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Price:</span> ${currentLeg?.price}
              </p>
            </div>
            <Link href="">
            <Button className="mt-4 inline-flex items-center px-4 py-2 bg-swPrimary500 hover:bg-swPrimary800 text-white rounded-lg transition-colors">
              Book Now
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Button>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-4 space-x-2">
          {availableLegs.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-swPrimary500" : "bg-swPrimary500"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmptyLegsSlider;
