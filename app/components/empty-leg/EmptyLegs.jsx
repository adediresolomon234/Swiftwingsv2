import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmptyLegs } from "../../../redux/slices/emptylegs";
import { SwPlaneIcon } from "../svgs";
import EmptyLegBookingModal from "./EmptyLegBookingModal";
import Image from "next/image";
import Button from "../Button";
import { useRouter } from "next/navigation";
import SuccessModal from "../shared/modals/SuccessModal";

const EmptyLegsSlider = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    data: availableLegs,
    isLoading,
    error,
  } = useSelector((state) => state.emptylegs);
  const [loading, setLoading] = useState(false);
  const [bookLeg, setBookLeg] = useState("");
  const [isHovered, setIsHovered] = useState(-1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const itemsPerPage = 8;
  const imgs = [
    "https://images.unsplash.com/photo-1517505964376-f1d72fcd566b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fGJlYXV0aWZ1bCUyMHBsYWNlc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1551749005-6b94ff060954?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXRpZnVsJTIwcGxhY2VzfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1499678329028-101435549a4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVhdXRpZnVsJTIwcGxhY2VzfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1598901627264-c1d0c98a61f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU2fHxiZWF1dGlmdWwlMjBwbGFjZXN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1453747063559-36695c8771bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJlYXV0aWZ1bCUyMHBsYWNlc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJlYXV0aWZ1bCUyMHBsYWNlc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1461598198498-686a2c168484?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGJlYXV0aWZ1bCUyMHBsYWNlc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1611392229396-dc86a663928e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fGJlYXV0aWZ1bCUyMHBsYWNlc3xlbnwwfHwwfHx8MA%3D%3D",
  ];

  const fetchData = useCallback(() => {
    dispatch(fetchEmptyLegs({ page: 1, limit: 10, search: "" }));
  }, [dispatch]);

  const handleModalClose = () => {
    setBookLeg("");
  };

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
      <div className="flex items-center justify-between mb-20 max-w-[85rem] mx-auto px-5">
        <h2 className="text-lg text-swPrimary500 text-center  font-medium">
          Available Empty Legs
        </h2>
        {visibleLegs && visibleLegs?.length > 0 && (
          <Button
            label="View All"
            textColor="text-white"
            bgColor={"bg-swPrimary500"}
            onClick={() => {
              setLoading(true);
              router.push("/empty-legs");
            }}
            loader={loading}
            className="transition-all duration-300"
          />
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4  lg:w-full mx-auto my-auto p-5 md:p-10">
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
                setBookingSuccess={setBookingSuccess}
              />
            </div>
            <div className="absolute top-2 right-2">
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
      <SuccessModal
        open={bookingSuccess}
        singleBtn={true}
        headingText={"Empty Leg Quote Requsted Successfully"}
        text={
          "Your Emtpty Leg quote request has been successfully submitted. Our team will get back to you shortly."
        }
        onClose={setBookingSuccess}
        firstBtnText={"Ok"}
        firstBtnClick={() => {
          setBookingSuccess(false);
        }}
      />
    </div>
  );
};

export default EmptyLegsSlider;
