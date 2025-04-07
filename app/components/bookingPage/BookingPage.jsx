"use client";

import Button from "../../components/Button";
import {
  SwArrowRightIcon,
  SwLeftRightArrowIcon,
  SwLuggageIcon,
  SwMeterIcon,
  SwPlaneIcon,
  SwSeatIcon,
  SwTopBottomArrowIcon,
  SwWeightIcon,
  SWMeterIconNew,
  GoldWing,
  SilverWing,
  BronzeWing,
} from "../../components/svgs";
import redCircle from "../svgs/Redcircle.gif";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { addBooking } from "../../../redux/slices/bookingSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookingEngine from "../../components/bookingEngine/bookingEngine";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SuccessModal from "../shared/modals/SuccessModal";
import Image from "next/image";
import loadingGif from "../../../public/images/loading.gif";
import {
  fetchAircrafts,
  fetchRankedAircrafts,
} from "../../../redux/slices/aircraftdetails";
import NotLoggedInModal from "./NotLoggedInModal";
import AdditionalNoteModal from "./AdditionalNoteModal";
import { validatePassengersAgainstLowestSeats } from "../helpers/utils";
import CancelModal from "../shared/modals/CancelModal";

const BookingPageInformation = () => {
  const pathname = usePathname();
  const params = useSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dateValue, setDateValue] = useState(dayjs());
  const [additionalNote, setAdditionalNote] = useState("");
  const [openAdditionalNote, setOpenAdditionalNote] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [sourceDetails, setSourceDetails] = useState(null);
  const [destinationDetails, setDestinationDetails] = useState(null);
  const [success, setSuccess] = useState(false);
  const [notLoggedInSuccess, setNotLoggedInSuccess] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [notLoggedInModal, setNotLoggedInModal] = useState(false);
  const [isPassengerError, setPassengerError] = useState(false);
  const [passengersErrors, setPassengersErrors] = useState([]);
  const source = params.get("source");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAircrafts, setSelectedAircrafts] = useState([]);
  const { error, data } = useSelector((state) => state.booking);
  const {
    status: jetLoading,
    error: jetError,
    aircrafts: jetData,
  } = useSelector((state) => state.aircrafts);

  const resetBookingState = () => {
    setBookingDetails([
      {
        source: null,
        destination: null,
        depatureTime: null,
        depatureDate: null,
        returningTime: null,
        returningDate: null,
        passengers: {
          adults: 0,
          children: 0,
          pets: 0,
        },
        additional_quote: [],
      },
    ]);
  };
  const saveSelectedAircrafts = () => {
    setBookingDetails((prev) => ({
      ...prev,
      additional_quote: [...selectedAircrafts],
    }));
    setIsModalOpen(false);
  };

  const handleAircraftSelect = (e, aircraftDetails) => {
    const isChecked = e.target.checked;
    setSelectedAircrafts((prev) => {
      if (isChecked) {
        return [...prev, aircraftDetails];
      } else {
        return prev.filter((aircraft) => aircraft.id !== aircraftDetails.id);
      }
    });
  };

  const uncheckBoxes = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    setSelectedAircrafts([]);
  };
  const handleModalOpen = () => {
    setSelectedAircrafts(bookingDetails?.additional_quote || []);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleQuote = () => {
    setPassengersErrors([]);
    const errors = validatePassengersAgainstLowestSeats(
      bookingDetails?.additional_quote,
      bookingDetails?.booking_details?.formData
    );
    if (errors?.length > 0) {
      setPassengerError(true);
      setPassengersErrors(errors);
      return;
    }
    if (loggedInUser) {
      setLoading(true);
      bookingDetails.status = "New";
      bookingDetails.user = loggedInUser;
      bookingDetails.email = loggedInUser.email;
      bookingDetails.additional_note = additionalNote;
      bookingDetails.source = source ? source : "web";

      dispatch(addBooking(bookingDetails))
        .unwrap()
        .then((response) => {
          if (response?.response?.data?.error) {
            toast.error(response?.response?.data?.error);
          } else if (response?.message) {
            setAdditionalNote("");
            uncheckBoxes();
            resetBookingState();
            localStorage.removeItem("bookingDetails");
            setSuccess(true);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setLoading(false));
    } else {
      setNotLoggedInModal(true);
    }
  };

  const handleQuoteDisable = () => {
    return (
      loading ||
      !bookingDetails?.booking_details?.formData[0]?.source ||
      !bookingDetails?.booking_details?.formData[0]?.destination ||
      !bookingDetails?.booking_details?.formData[0]?.depatureDate ||
      bookingDetails?.booking_details?.formData[0]?.passengers.adults < 1 ||
      !bookingDetails?.additional_quote ||
      bookingDetails?.additional_quote?.length < 1
    );
  };

  useEffect(() => {
    dispatch(fetchRankedAircrafts("Jet"));

    const userDetails =
      localStorage.getItem("user") !== (null || undefined)
        ? JSON.parse(localStorage.getItem("user"))
        : null;

    if (userDetails) {
      setLoggedInUser(userDetails);
      delete userDetails.token;
      delete userDetails.isLoggedIn;
      setBookingDetails((prevState) => ({
        ...prevState,
        user: userDetails, // Replace the entire user object
      }));
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    const formData = bookingDetails?.booking_details?.formData?.[0];
    if (formData) {
      setSourceDetails({ ...formData.source });
      setDestinationDetails({ ...formData.destination });
      setDateValue(dayjs(`${formData.depatureDate} ${formData.depatureTime}`));
    }
  }, [bookingDetails]);

  return (
    <>
      {hydrated ? (
        <main>
          <ToastContainer />
          <div className="bg-swLightBgGray z-10">
            <div className="m-5 mx-auto max-w-[90rem] z-10">
              <BookingEngine setBookingDetails={setBookingDetails} />
              <div className="lg:flex block md:gap-10 text-swGray800 mt-10">
                <div className="w-full">
                  <p className="text-xl font-medium mb-5">Select Private Jet</p>

                  <button
                    onClick={handleModalOpen}
                    className="mb-4 bg-swPrimary500 text-white py-2 px-4 rounded-lg hover:bg-swPrimary600 transition"
                  >
                    Browse Aircraft
                  </button>
                  {bookingDetails?.additional_quote?.length > 0 && (
                 <div className="mb-6">
                 <h3 className="font-medium mb-2">Selected Aircraft:</h3>
                 <div className="flex flex-col gap-3">
                   {bookingDetails.additional_quote.map((aircraft) => (
                     <div
                       key={aircraft.id}
                       className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-gray-50 rounded-lg"
                     >
                       <div className="flex items-start sm:items-center w-full">
                         <input
                           type="checkbox"
                           checked={true}
                           readOnly
                           className="h-5 w-5 accent-swPrimary500 flex-shrink-0"
                         />
                         <div className="ml-2 sm:ml-3 flex-1 min-w-0">
                           <p className="font-medium truncate">{aircraft.name}</p>
                           <p className="text-sm text-gray-600 truncate">
                             {aircraft.features?.classification} • {aircraft.location}
                           </p>
                         </div>
                       </div>
                       <button
                         onClick={() => {
                           setBookingDetails((prev) => ({
                             ...prev,
                             additional_quote: prev.additional_quote.filter(
                               (a) => a.id !== aircraft.id
                             ),
                           }));
                           setSelectedAircrafts((prev) =>
                             prev.filter((a) => a.id !== aircraft.id)
                           );
                         }}
                         className="text-red-500 hover:text-red-700 text-sm sm:text-base px-2 py-1 sm:px-3 sm:py-1.5 border border-red-300 hover:border-red-400 rounded-md self-end sm:self-auto"
                       >
                         Remove
                       </button>
                     </div>
                   ))}
                 </div>
               </div>
               
                  )}

                  {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[80vh] flex flex-col">
                        <div className="p-6 flex-shrink-0">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-medium">
                              Select Aircraft
                            </h3>
                            <button
                              onClick={handleModalClose}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                        <div className="overflow-y-auto px-6">
                          <div className="space-y-4">
                            {jetData?.map((item, index) => (
                              <div key={item?.id} className="mb-8">
                                <div className="transition ease-in-out delay-100 duration-1000 flex flex-col md:flex-row gap-6  justify-between items-center hover:bg-swLighterBgGray p-5 rounded-xl cursor-pointer focus:border focus:outline-swPrimary500">
                                  <div className="w-full lg:w-[37rem] flex gap-5 items-center whitespace-nowrap">
                                    <input
                                      type="checkbox"
                                      onChange={(e) =>
                                        handleAircraftSelect(e, item, index)
                                      }
                                      className="h-6 w-6 accent-swPrimary500"
                                    />
                                    <div className="text-swLightGray">
                                      <p className="text-lg font-medium flex items-center gap-3">
                                        {item?.name}
                                        {item?.rank && item?.rank === 3 && (
                                          <GoldWing className="h-5 w-10" />
                                        )}
                                        {item?.rank && item?.rank === 2 && (
                                          <SilverWing className="h-5 w-10" />
                                        )}
                                        {item?.rank && item?.rank === 1 && (
                                          <BronzeWing className="h-5 w-10" />
                                        )}
                                      </p>
                                      <p className="text-sm">
                                        {item?.features?.classification}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="w-full text-swGray800 grid grid-cols-3 gap-x-3 gap-y-8 sm:grid-cols-2">
                                    <div className="flex flex-col gap-4">
                                      <div className="flex items-center gap-2">
                                        <SwSeatIcon className="text-lg" />
                                        <p className="text-xs">
                                          {item?.features?.no_of_seats} Seats
                                        </p>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <SwLuggageIcon className="text-lg" />
                                        <p className="text-xs">
                                          {item?.feet} ft³ Luggage
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                      <div className="flex items-center gap-2">
                                        <SwMeterIcon className="text-lg" />
                                        <p className="text-xs">
                                          {item?.speed} mph
                                        </p>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <SWMeterIconNew className="text-lg" />
                                        <p className="text-xs">
                                          {item?.kilometer} km Range
                                        </p>
                                      </div>
                                    </div>

                                    {/* Third Column: Dimensions */}
                                    <div className="flex flex-col gap-2">
                                      <div className="flex items-center gap-2">
                                        <SwLeftRightArrowIcon className="text-lg" />
                                        <p className="text-xs">
                                          {item?.features?.interior_width} ft
                                          Width
                                        </p>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <SwTopBottomArrowIcon className="text-lg" />
                                        <p className="text-xs">
                                          {item?.features?.interior_height} ft
                                          Height
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                      <div className="flex items-center gap-2">
                                        <Image
                                          src={redCircle}
                                          alt={location}
                                          width={20}
                                          height={20}
                                        />
                                        <p className="text-xs">
                                          {item?.location}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  {pathname === "/user-booking" ? (
                                    <SwArrowRightIcon className="text-2xl" />
                                  ) : (
                                    <div className="flex items-center gap-3 py-2 px-4 rounded-full hover:bg-white">
                                      <p className="font-medium whitespace-nowrap">
                                        View Jet
                                      </p>
                                      <SwArrowRightIcon className="text-sm" />
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="p-4 border-t bg-white sticky bottom-0 rounded-b-2xl">
                          <div className="flex justify-end gap-3">
                            <button
                              onClick={() => {
                                setSelectedAircrafts([]);
                                handleModalClose();
                              }}
                              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={saveSelectedAircrafts}
                              className="px-4 py-2 rounded-lg bg-swPrimary500 text-white hover:bg-swPrimary600"
                            >
                              Save Selection
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="md:w-1/3 w-full">
                  <p className="text-xl font-medium mb-5 ">Flight Summary</p>
                  <div className="w-full rounded-2xl border p-5 p-0 bg-white">
                    <p className="font-semibold text-lg">
                      Flight from {sourceDetails?.city || "Select city"} ,{" "}
                      {sourceDetails?.country} -{" "}
                      {destinationDetails?.city || "Select city"},{" "}
                      {destinationDetails?.country}
                    </p>

                    {bookingDetails?.booking_details?.formData.map(
                      (item, index) => (
                        <div
                          key={index}
                          className="flex gap-1 mt-5 justify-center"
                        >
                          <div className="flex flex-col justify-between">
                            <div className="">
                              <p className="font-semibold text-lg">
                                {dayjs(
                                  `${item?.depatureDate} ${item?.depatureTime}`
                                ).format("h:mm a") === "Invalid Date"
                                  ? "Select date"
                                  : dayjs(
                                      `${item?.depatureDate} ${item?.depatureTime}`
                                    ).format("h:mm a")}
                              </p>
                              <p className="text-sm">
                                {dayjs(
                                  `${item?.depatureDate} ${item?.depatureTime}`
                                ).format(`ddd D, MMM`) === "Invalid Date"
                                  ? "Select date"
                                  : dayjs(
                                      `${item?.depatureDate} ${item?.depatureTime}`
                                    ).format(`ddd D, MMM`)}
                              </p>
                            </div>
                            <div className="">
                              {item?.returningDate && (
                                <p className="font-semibold text-lg">
                                  {dayjs(
                                    `${item?.returningDate} ${item?.returningTime}`
                                  ).format("h:mm a") === "Invalid Date"
                                    ? "Select date"
                                    : dayjs(
                                        `${item?.returningDate} ${item?.returningTime}`
                                      ).format("h:mm a")}
                                </p>
                              )}

                              {item?.returningDate && (
                                <p className="text-sm">
                                  {dayjs(
                                    `${item?.returningDate} ${item?.returningTime}`
                                  ).format(`ddd D, MMM`) === "Invalid Date"
                                    ? "Select date"
                                    : dayjs(
                                        `${item?.returningDate} ${item?.returningTime}`
                                      ).format(`ddd D, MMM`)}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center flex-col gap-1 h-60 p-2">
                            <div className="p-1 bg-swError500 rounded-full" />
                            <div className="h-full border border-r border-dashed" />
                            <div className="w-fit h-fit">
                              <SwPlaneIcon className="text-base" />
                            </div>
                            <div className="h-full border border-r border-dashed" />
                            <div className="p-1 bg-swSuccess500 rounded-full" />
                          </div>

                          <div className="flex flex-col justify-between">
                            <div className="">
                              <p className="text-sm">
                                {item?.source?.city || "Select city"},{" "}
                                {item?.source?.country}
                              </p>
                            </div>

                            <div className="">
                              <p className="text-sm">
                                {item?.destination?.city || "Select city"},{" "}
                                {item?.destination?.country}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    )}

                    <div className="p-3 bg-swLighterBgGray rounded-xl my-7">
                      <p className="text-sm">
                        Include free Baggage & Cabin in capacity Per person
                      </p>
                      <div className="flex gap-5 mt-2">
                        <div className="flex gap-2 items-center">
                          <SwLuggageIcon className="text-lg" />
                          <p>40 Kg</p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <SwWeightIcon className="text-lg" />
                          <p>10 Kg</p>
                        </div>
                      </div>
                    </div>
                    {additionalNote && (
                      <div className="p-5 text-sm bg-gray-100 mb-5 rounded-md">
                        {additionalNote}
                      </div>
                    )}
                    <div className="flex flex-col gap-3">
                      <Button
                        label={"Additional Note"}
                        bgColor={"bg-swPrimary500 hover:bg-swPrimary600"}
                        className="w-full text-white text-center"
                        onClick={() =>
                          setOpenAdditionalNote(!openAdditionalNote)
                        }
                      />
                      <Button
                        label={"Request Quote"}
                        bgColor={"bg-swPrimary500 hover:bg-swPrimary600"}
                        className="w-full text-white text-center"
                        onClick={handleQuote}
                        loader={loading}
                        disabled={handleQuoteDisable()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SuccessModal
            open={success}
            headingText={"Booking complete"}
            text={
              "You can check out your booking status in your profile or wait for our mail."
            }
            onClose={setSuccess}
            firstBtnText={"Go home"}
            firstBtnClick={() => {
              setSuccess(false);
              // router.push("/");
              window.location.href = "/";
            }}
            secondBtnText={"View Profile"}
            secondBtnClick={() => {
              setSuccess(false);
              router.push("/user-dashboard?page=profile");
            }}
          />
          <SuccessModal
            open={notLoggedInSuccess}
            singleBtn={true}
            headingText={"Booking complete"}
            text={
              "You can check out your booking status in your profile or wait for our mail."
            }
            onClose={setNotLoggedInSuccess}
            firstBtnText={"Go home"}
            firstBtnClick={() => {
              setNotLoggedInSuccess(false);
              window.location.href = "/";
              // router.push("/");
            }}
          />
          <AdditionalNoteModal
            open={openAdditionalNote}
            onClose={setOpenAdditionalNote}
            // additionalNote={additionalNote}
            setAdditionalNote={setAdditionalNote}
          />
          <CancelModal
            open={isPassengerError}
            onClose={setPassengerError}
            singleBtn={true}
            noInput={true}
            firstBtnText={"Ok"}
            firstBtnClick={() => setPassengerError(false)}
            headingText={"Booking Failed"}
            text={passengersErrors.map((error, i) => (
              <p key={i} className="mt-1">
                {error}
              </p>
            ))}
          />
        </main>
      ) : (
        <div className="flex justify-center items-center h-[70vh]">
          <div>
            <Image src={loadingGif} alt="loading" height={50} width={50} />
          </div>
        </div>
      )}

      <NotLoggedInModal
        open={notLoggedInModal}
        onClick={setNotLoggedInModal}
        bookingDetails={bookingDetails}
        unCheckAllBoxes={uncheckBoxes}
        setSuccess={setNotLoggedInSuccess}
      />
    </>
  );
};

export default BookingPageInformation;
