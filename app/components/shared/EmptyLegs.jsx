import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmptyLegs } from "../../../redux/slices/emptylegs";
import Button from "../Button";
import { IoAirplaneOutline } from "react-icons/io5";

const EmptyLegsSlider = () => {
  const dispatch = useDispatch();
  const { data: availableLegs, isLoading, error } = useSelector(
    (state) => state.emptylegs
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  const fetchData = useCallback(() => {
    dispatch(fetchEmptyLegs({ page: 1, limit: 10, search: "" }));
  }, [dispatch]);

  useEffect(() => {
    fetchData();

    const rotateInterval = setInterval(() => {
      setCurrentIndex((prev) =>
        (prev + 1) * itemsPerPage < availableLegs?.length ? prev + 1 : 0
      );
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
        <p className="text-lg text-red-500 font-semibold">
          Oops! Something went wrong. Please try again later.
        </p>
      </div>
    );
  }

  if (!availableLegs.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg text-gray-600">
          No available empty legs at the moment. Check back soon!
        </p>
      </div>
    );
  }

  const visibleLegs = availableLegs.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  return (
    <div className="max-w-screen-2xl mx-auto px-0 text-gray-500">
      <h2 className="text-lg text-swPrimary500 text-center mb-20 font-medium">
        Available Empty Legs
      </h2>

      <div className="grid gap-4 md:mx-auto sm:grid-cols-2 lg:w-full xl:grid-cols-4">
        {visibleLegs.map((leg, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 group space-y-6 rounded-3xl  px-8 py-8 text-centertransition-all duration-300"
          >
            <h5 className="mb-4 text-2xl font-semibold text-gray-800">
              {leg?.aircraft_name}
            </h5>
            <div className="space-y-8">
              <div className="flex items-center space-x-6 h-20">
                <div className="flex items-center space-x-2">
                  <IoAirplaneOutline className="w-5 h-5 text-gray-900" />
                  <p className="text-gray-700 text-xs font-semibold">
                    {leg?.departure}
                  </p>
                </div>
                <div className="flex-1 h-0.5 bg-gray-300"></div>
                <div className="flex items-center space-x-6">
                  <IoAirplaneOutline className="w-5 h-5 text-gray-900 rotate-180" />
                  <p className="text-gray-700 text-xs font-semibold">
                    {leg?.arrival}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 text-base">
                <span className="font-semibold text-gray-900">Date:</span>{" "}
                {new Date(leg?.dates).toLocaleDateString()}
              </p>
              <p className="text-gray-700 text-lg font-medium text-end">
                ${new Intl.NumberFormat().format(leg?.price)}
              </p>
            </div>
            <div className="flex justify-center mt-6">
              <Button
                label="Book Now"
                bgColor="bg-swPrimary500 hover:bg-swPrimary600"
                textColor="text-white"
                className="w-full px-6 py-3 rounded-lg shadow-md transition-all duration-300 text-lg font-semibold"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: Math.ceil(availableLegs.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-swPrimary500" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default EmptyLegsSlider;
