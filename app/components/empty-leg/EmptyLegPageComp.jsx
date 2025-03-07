"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaginatedEmptyLegs } from "../../../redux/slices/emptylegs";
import { SwPlaneIcon, SwSearchIcon } from "../svgs";
import EmptyLegBookingModal from "./EmptyLegBookingModal";
import Image from "next/image";

const EmptyLegPageComp = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [search, setSearch] = useState("");
  const [bookLeg, setBookLeg] = useState("");
  const [isHovered, setIsHovered] = useState(-1);

  const imgs = [
    "https://images.unsplash.com/photo-1517505964376-f1d72fcd566b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fGJlYXV0aWZ1bCUyMHBsYWNlc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1551749005-6b94ff060954?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXRpZnVsJTIwcGxhY2VzfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1499678329028-101435549a4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVhdXRpZnVsJTIwcGxhY2VzfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1598901627264-c1d0c98a61f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU2fHxiZWF1dGlmdWwlMjBwbGFjZXN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1453747063559-36695c8771bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJlYXV0aWZ1bCUyMHBsYWNlc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJlYXV0aWZ1bCUyMHBsYWNlc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1461598198498-686a2c168484?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGJlYXV0aWZ1bCUyMHBsYWNlc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1611392229396-dc86a663928e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fGJlYXV0aWZ1bCUyMHBsYWNlc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1605449427208-be4ecba7563f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGJlYXV0aWZ1bCUyMHBsYWNlc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1482784160316-6eb046863ece?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fGJlYXV0aWZ1bCUyMHBsYWNlc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1654530050931-3b02b28570c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTk1fHxiZWF1dGlmdWwlMjBwbGFjZXN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1673297510290-e3a29d0ced9b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjMyfHxiZWF1dGlmdWwlMjBwbGFjZXN8ZW58MHx8MHx8fDA%3D",
  ];

  const {
    data: availableLegs,
    isLoading,
    error,
  } = useSelector((state) => state.emptylegs);

  console.log({ availableLegs });
  const handleModalClose = () => {
    setBookLeg("");
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const totalPages = Math.ceil(
      availableLegs?.links?.totalDocuments / parseInt(limit, 10)
    );

    if (availableLegs?.links) {
      const startPage = Math.max(1, page - 2);
      const endPage = Math.min(totalPages, page + 2);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      while (pageNumbers.length < 5 && pageNumbers[0] > 1) {
        pageNumbers.unshift(pageNumbers[0] - 1);
      }
      while (
        pageNumbers.length < 5 &&
        pageNumbers[pageNumbers.length - 1] < totalPages
      ) {
        pageNumbers.push(pageNumbers[pageNumbers.length - 1] + 1);
      }
    }

    return pageNumbers;
  };

  const pageNumbers = generatePageNumbers();

  useEffect(() => {
    dispatch(fetchPaginatedEmptyLegs({ page, limit, search }));
  }, [page, limit, search, dispatch]);
  return (
    <div>
      <h2 className="text-lg text-swPrimary500 text-center mb-10 font-medium">
        Available Empty Legs
      </h2>
      {availableLegs && availableLegs?.emptyLegs?.length > 0 ? (
        <div className="max-w-[85rem] mx-auto">
          <div className="max-w-[77rem] mx-auto">
            <div className="rounded-full p-2 px-4 border border-swPrimary500 flex items-center gap-2 w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
              <SwSearchIcon className="text-xl text-swPrimary500" />
              <input
                type="text"
                value={search}
                placeholder="Search"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                className="focus:outline-none p-1 text-sm w-full"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-swPrimary500 border-opacity-70 mb-4"></div>
              <p className="text-lg text-gray-700 animate-pulse">
                Loading available empty legs...
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4  lg:w-full mx-auto my-auto p-5 md:p-10">
              {availableLegs?.emptyLegs.map((leg, index) => (
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
          )}

          <div className="flex flex-col sm:items-center sm:flex-row gap-5 px-5 md:px-10 mt-10">
            <p>
              Showing {(page - 1) * parseInt(limit, 10) + 1} -{" "}
              {Math.min(
                page * Number(limit),
                availableLegs?.links?.totalDocuments
              )}
            </p>

            <div>
              <button
                className={`pr-3 ${
                  availableLegs?.links?.prev === null
                    ? "text-armtInputBorderBrown"
                    : "text-armtNavBlack"
                }`}
                disabled={page === 1}
                onClick={() => setPage(Math.max(1, page - 1))}
              >
                Previous
              </button>

              {pageNumbers.map((item) => (
                <button
                  key={item}
                  onClick={() => setPage(item)}
                  className={`w-7 h-7 text-black ${
                    item === page && "text-white bg-swPrimary500 rounded"
                  }`}
                >
                  {item}
                </button>
              ))}

              <button
                disabled={page === pageNumbers.length}
                onClick={() => setPage(page + 1)}
              >
                <p
                  className={`pl-4 ${
                    availableLegs?.links?.next === null
                      ? "text-armtInputBorderBrown"
                      : "text-armtNavBlack"
                  }`}
                >
                  Next
                </p>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-swPrimary500 border-opacity-70 mb-4"></div>
              <p className="text-lg text-gray-700 animate-pulse">
                Loading available empty legs...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-10 pb-20 px-5 md:px-10 text-center">
              <p className="text-lg text-gray-600">
                No available empty legs at the moment. Check back soon!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyLegPageComp;
