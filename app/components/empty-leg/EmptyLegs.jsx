import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmptyLegs } from "../../../redux/slices/emptylegs";
import { SwPlaneIcon } from "../svgs";
import EmptyLegBookingModal from "./EmptyLegBookingModal";
import Image from "next/image";
import Button from "../Button";
import { useRouter } from "next/navigation";
import SuccessModal from "../shared/modals/SuccessModal";
import { PuffLoader } from "react-spinners";
import Link from "next/link";

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
      <div className="flex flex-col items-center justify-center pt-10 pb-20 px-5 md:px-10">
        <h2 className="text-lg text-swPrimary500 text-center mb-20 font-medium">
          Available Empty Legs
        </h2>
        <p className="text-lg text-red-500 font-semibold text-center">
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
    <div className="max-w-7xl mx-auto px-6">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-swPrimary700 mb-4">
          Available Empty Legs
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-6">
          Discover exclusive deals on one-way flights and maximize your travel savings
        </p>
        <div className="w-24 h-1 bg-swPrimary500 mx-auto rounded-full"></div>
      </div>

      {/* View All Link */}
      <div className="flex justify-center mb-8">
        {loading ? (
          <PuffLoader size={20} color="#5c0632" />
        ) : (
          <Link
            href="/empty-legs"
            onClick={() => setLoading(true)}
            className="inline-flex items-center gap-2 text-swPrimary500 hover:text-swPrimary600 font-medium transition-colors duration-300"
          >
            <span>View All Empty Legs</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      {/* Empty Legs Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleLegs.map((leg, index) => (
          <div
            key={index}
            className="group relative bg-gradient-to-br from-white via-slate-50 to-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.16)] transition-all duration-700 hover:-translate-y-3 border border-slate-100/50 overflow-hidden backdrop-blur-sm"
            onMouseEnter={() => setIsHovered(index)}
            onMouseLeave={() => setIsHovered(-1)}
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-swPrimary500/5 via-transparent to-swPrimary500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />
            
            {/* Image Section */}
            <div className="relative h-52 overflow-hidden rounded-t-3xl">
              <Image
                src={imgs[index]}
                alt={leg?.aircraft_name}
                fill
                className={`object-cover transition-all duration-700 ${
                  isHovered === index ? "scale-110 rotate-1" : "scale-100 rotate-0"
                }`}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Date and Aircraft Info */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 font-medium mb-1">
                        {new Date(leg?.dates).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-sm font-bold text-slate-800">
                        {leg?.aircraft_name || leg?.aircraft}
                      </p>
                    </div>
                    <div className="bg-swPrimary500/10 p-2 rounded-full">
                      <svg className="w-4 h-4 text-swPrimary500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Route Information */}
            <div className="p-6">
              {/* Route Display */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-center flex-1">
                  <p className="text-xs text-slate-400 font-medium mb-1 tracking-wider">DEPARTURE</p>
                  <p className="text-xs font-normal text-slate-800 leading-tight">
                    {leg?.departure}
                  </p>
                </div>

                {/* Route Line */}
                <div className="flex items-center mx-3 flex-shrink-0">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />

              
                  <div className="w-6 h-px bg-slate-300 border-dashed border-t border-slate-200" />
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                </div>

                <div className="text-center flex-1">
                  <p className="text-xs text-slate-400 font-medium mb-1 tracking-wider">ARRIVAL</p>
                  <p className="text-xs font-normal text-slate-800 leading-tight">
                    {leg?.arrival}
                  </p>
                </div>
              </div>

              {/* Additional Details */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                  <span className="text-xs text-slate-500 font-medium">One-way flight</span>
                </div>
                <div className="bg-gradient-to-r from-swPrimary500 to-swPrimary600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md">
                  Special rate
                </div>
              </div>
            </div>

            {/* Modal */}
            <EmptyLegBookingModal
              open={bookLeg === leg?._id}
              leg={leg}
              onClose={handleModalClose}
              setBookingSuccess={setBookingSuccess}
            />
          </div>
        ))}
      </div>

      {/* Success Modal */}
      <SuccessModal
        open={bookingSuccess}
        singleBtn={true}
        headingText={"Empty Leg Quote Requested Successfully"}
        text={
          "Your Empty Leg quote request has been successfully submitted. Our team will get back to you shortly."
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
