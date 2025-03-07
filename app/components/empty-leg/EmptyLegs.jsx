import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmptyLegs } from "../../../redux/slices/emptylegs";
import Button from "../Button";
import { IoAirplaneOutline } from "react-icons/io5";
import InputField from "../shared/InputField";
import { isValidEmail } from "../helpers/emailValidation";
import { SWClose, SwPlaneIcon } from "../svgs";
import EmptyLegBookingModal from "./EmptyLegBookingModal";
import Image from "next/image";
import cardImg1 from "../../../public/images/empty-legs/img1.jpg";
import cardImg2 from "../../../public/images/empty-legs/img2.jpg";
import cardImg3 from "../../../public/images/empty-legs/img3.jpg";
import cardImg4 from "../../../public/images/empty-legs/img4.jpg";
import cardImg5 from "../../../public/images/empty-legs/img5.jpg";
import cardImg6 from "../../../public/images/empty-legs/img6.jpg";
import cardImg7 from "../../../public/images/empty-legs/img7.jpg";
import cardImg8 from "../../../public/images/empty-legs/img8.jpg";

const EmptyLegsSlider = () => {
  const dispatch = useDispatch();
  const {
    data: availableLegs,
    isLoading,
    error,
  } = useSelector((state) => state.emptylegs);
  const [bookLeg, setBookLeg] = useState("");
  const [isHovered, setIsHovered] = useState(-1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 8;
  const imgs = [
    cardImg1,
    cardImg2,
    cardImg3,
    cardImg4,
    cardImg5,
    cardImg6,
    cardImg7,
    cardImg8,
  ];

  const fetchData = useCallback(() => {
    dispatch(fetchEmptyLegs({ page: 1, limit: 10, search: "" }));
  }, [dispatch]);

  const handleModalClose = () => {
    setBookLeg("");
  };

  console.log({ availableLegs });

  useEffect(() => {
    fetchData();
  }, []);

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
      <div className="flex flex-col items-center justify-center pt-10 pb-20">
        <h2 className="text-lg text-swPrimary500 text-center mb-20 font-medium">
          Available Empty Legs
        </h2>
        <p className="text-lg text-red-500 font-semibold">
          Oops! Something went wrong. Please try again later.
        </p>
      </div>
    );
  }

  if (!availableLegs?.length) {
    return (
      <div className="flex flex-col items-center justify-center pt-10 pb-20 px-5 md:px-10 text-center">
        <h2 className="text-lg text-swPrimary500 text-center mb-20 font-medium">
          Available Empty Legs
        </h2>
        <p className="text-lg text-gray-600">
          No available empty legs at the moment. Check back soon!
        </p>
      </div>
    );
  }

  const visibleLegs = availableLegs?.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  return (
    <div className="max-w-screen-2xl mx-auto px-0 text-gray-500">
      <h2 className="text-lg text-swPrimary500 text-center mb-20 font-medium">
        Available Empty Legs
      </h2>

      <div className="grid gap-4 md:mx-auto sm:grid-cols-2 lg:grid-cols-4  lg:w-full mx-auto my-auto p-5 md:p-10">
        {visibleLegs.map((leg, index) => (
          <div
            key={index}
            className="relative w-full max-w-[250px] overflow-hidden border-none transition-all duration-300 mx-auto"
            onMouseEnter={() => setIsHovered(index)}
            onMouseLeave={() => setIsHovered(-1)}
          >
            <div className="relative h-[250px] w-[250px] w-full overflow-hidden rounded-md">
              <div
                className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${
                  isHovered === index ? "scale-110" : "scale-100"
                }`}
              >
                <Image
                  src={imgs[index]}
                  alt={leg?.aircraft_name}
                  fill
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent"></div>
              <div className="absolute left-3 bottom-2 text-xs text-white font-medium z-20">
                <p>
                  {new Date(leg?.dates).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="mt-1 font-medium">{leg?.aircraft}</p>
              </div>
              <div className="absolute bottom-3 left-4 flex items-center gap-2 text-white">
                <span className="font-medium">{leg?.aircraft_name}</span>
              </div>
            </div>

            <div className="max-w-[250px] w-full mt-3">
              <div className="flex flex-col gap-2">
                <div className="">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    {/* <span className="text-xs">DEPARTURE</span> */}
                  </div>
                  <div>
                    <p className="text-sm text-black font-light">
                      {leg?.departure}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-start w-fit gap-1 -my-2">
                  <div className="p-1 w-fit bg-swError500 rounded-full" />
                  <div className="h-2 w-fit border border-r border-dashed" />
                  <div className="w-fit h-fit">
                    <SwPlaneIcon className="text-base" />
                  </div>
                  <div className="h-2 w-fit border border-r border-dashed" />
                  <div className="p-1 w-fit bg-swSuccess500 rounded-full" />
                </div>

                <div className="">
                  <div className="flex items-center justify-end gap-1">
                    {/* <span className="text-xs">ARRIVAL</span> */}
                  </div>
                  <div>
                    <p className="text-sm font-light text-black">
                      {leg?.arrival}
                    </p>
                  </div>
                </div>
              </div>
              <EmptyLegBookingModal
                open={bookLeg === leg?._id}
                leg={leg}
                onClose={handleModalClose}
              />
            </div>
            <div className="absolute top-2 right-2">
              {/* <Button
                label="Request Quote"
                bgColor="bg-white"
                textColor="text-black"
                onClick={() => setBookLeg(leg?._id)}
                className="w-full  transition-all duration-300"
              /> */}
              <button
                onClick={() => setBookLeg(leg?._id)}
                className="py-1 px-2 rounded-full text-xs font-medium bg-white text-black"
              >
                Request Quote
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="flex justify-center mt-4 space-x-2">
        {Array.from({
          length: Math.ceil(availableLegs?.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-swPrimary500" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div> */}
    </div>
  );
};

export default EmptyLegsSlider;
