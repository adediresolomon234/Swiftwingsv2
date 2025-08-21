"use client";

import Button from "../../components/Button";
import JetImagesPopup from "./JetImagesPopup";
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
import { toast } from "react-toastify";
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
import PremiumRideModal from "./PremiumRideModal";

const BookingPageInformation = () => {
  const [jetImagesOpen, setJetImagesOpen] = useState(false);
  const [currentJetImages, setCurrentJetImages] = useState([]);
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
  const [openPremiumRideModal, setOpenPremiumModal] = useState(false);
  const source = params.get("source");

  const { error, data } = useSelector((state) => state.booking);
  const {
    status: jetLoading,
    error: jetError,
    aircrafts: jetData,
  } = useSelector((state) => state.aircrafts);

  console.log({ jetData });

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

  const handleAircraftSelect = (e, aircraftDetails, index) => {
    const isChecked = e.target.checked;
    setBookingDetails((prevState) => {
      const additional_quote = prevState?.additional_quote || [];
      if (isChecked) {
        return {
          ...prevState,
          additional_quote: [...additional_quote, aircraftDetails],
        };
      } else {
        return {
          ...prevState,
          additional_quote: additional_quote.filter(
            (aircraft) => aircraft !== aircraftDetails
          ),
        };
      }
    });
  };

  const uncheckBoxes = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  const handleNavigationWithRefresh = (path) => {
    router.push(path).then(() => {
      window.location.reload();
    });
  };

  const handleQuote = () => {
    if (loggedInUser) {
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
      // setNotLoggedInModal(true);
      localStorage.setItem("bookingInComplete", "true");
      toast.error("You are not logged in. Kindly login to continue");
      // router.push("/sign-in");
      handleNavigationWithRefresh("/sign-in");
      // window.location.href = "/sign-in";
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
          {/* <ToastContainer /> */}
          <div className="bg-swLightBgGray z-10">
            <div className="m-5 mx-auto max-w-[90rem] z-10">
              <BookingEngine setBookingDetails={setBookingDetails} />
              <div className="flex flex-col lg:flex-row gap-10 text-swGray800 mt-10">
                <div className="w-full">
                  <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-6 bg-gradient-to-b from-swPrimary500 to-swPrimary600 rounded-full"></div>
                      <div>
                        <h2 className="text-lg font-bold text-slate-800">
                          Select Private Jet
                        </h2>
                        <p className="text-xs text-slate-500">
                          Choose from our premium fleet
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        label={"Additional Note"}
                        bgColor={"bg-white hover:bg-gray-50"}
                        className="text-slate-700 text-center text-xs border border-slate-200 hover:border-slate-300 px-3 py-2"
                        onClick={() =>
                          setOpenAdditionalNote(!openAdditionalNote)
                        }
                      />
                      <Button
                        label={"Request Quote"}
                        bgColor={"bg-swPrimary500 hover:bg-swPrimary600"}
                        className="text-white text-center text-xs shadow-md hover:shadow-lg px-3 py-2"
                        // onClick={handleQuote}
                        onClick={() => setOpenPremiumModal(true)}
                        loader={loading}
                        disabled={handleQuoteDisable()}
                      />
                    </div>
                  </div>
                  <div className="w-full max-h-96 overflow-y-auto border border-slate-200 rounded-lg bg-white">
                    <div className="p-2">
                      {jetData?.map((item, index) => (
                        <div key={item?.id} className="mb-2 last:mb-0">
                          <div className="bg-white border border-slate-200 rounded-lg p-3 hover:shadow-md transition-all duration-200 group">
                            <div className="flex items-center gap-4">
                              {/* Checkbox */}
                              <input
                                type="checkbox"
                                onChange={(e) =>
                                  handleAircraftSelect(e, item, index)
                                }
                                className="h-4 w-4 accent-swPrimary500 rounded border border-slate-300 hover:border-swPrimary500 transition-colors duration-200"
                              />

                              {/* Aircraft Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-sm font-semibold text-slate-800 truncate">
                                    {item?.name}
                                  </h3>
                                  {item?.rank && item?.rank === 3 && (
                                    <GoldWing className="h-4 w-8" />
                                  )}
                                  {item?.rank && item?.rank === 2 && (
                                    <SilverWing className="h-4 w-8" />
                                  )}
                                  {item?.rank && item?.rank === 1 && (
                                    <BronzeWing className="h-4 w-8" />
                                  )}
                                </div>
                                <p className="text-xs text-slate-500 mb-2">
                                  {item?.features?.classification}
                                </p>

                                {/* Location */}
                                <div className="flex items-center gap-1">
                                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                  <p className="text-xs text-slate-600 font-medium">
                                    {item?.location}
                                  </p>
                                </div>
                              </div>

                              {/* Specs Grid */}
                              <div className="hidden md:grid grid-cols-4 gap-3 text-center">
                                <div className="flex flex-col items-center">
                                  <SwSeatIcon className="text-sm text-swPrimary600 mb-1" />
                                  <p className="text-xs font-semibold text-slate-800">
                                    {item?.features?.no_of_seats}
                                  </p>
                                  <p className="text-xs text-slate-500">
                                    Seats
                                  </p>
                                </div>
                                <div className="flex flex-col items-center">
                                  <SwLuggageIcon className="text-sm text-swPrimary600 mb-1" />
                                  <p className="text-xs font-semibold text-slate-800">
                                    {item?.feet}
                                  </p>
                                  <p className="text-xs text-slate-500">ft³</p>
                                </div>
                                <div className="flex flex-col items-center">
                                  <SwMeterIcon className="text-sm text-swPrimary600 mb-1" />
                                  <p className="text-xs font-semibold text-slate-800">
                                    {item?.speed}
                                  </p>
                                  <p className="text-xs text-slate-500">
                                    Speed
                                  </p>
                                </div>
                                <div className="flex flex-col items-center">
                                  <SWMeterIconNew className="text-sm text-swPrimary600 mb-1" />
                                  <p className="text-xs font-semibold text-slate-800">
                                    {item?.kilometer}
                                  </p>
                                  <p className="text-xs text-slate-500">
                                    Range
                                  </p>
                                </div>
                              </div>

                              {/* Action Button */}
                              {pathname === "/user-booking" ? (
                                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-slate-200 transition-colors duration-200">
                                  <SwArrowRightIcon className="text-sm text-slate-600" />
                                </div>
                              ) : (
                                <button
                                  className="flex items-center gap-2 py-2 px-3 rounded-full bg-slate-100 hover:bg-slate-200 transition-all duration-200"
                                  onClick={() => {
                                    // Try to get images from item, fallback to []
                                    setCurrentJetImages(item?.images || []);
                                    setJetImagesOpen(true);
                                  }}
                                >
                                  <p className="text-xs font-medium text-slate-700 whitespace-nowrap">
                                    View
                                  </p>
                                  <SwArrowRightIcon className="text-xs text-slate-600" />
                                </button>
                              )}
                              <JetImagesPopup
                                name={item?.name}
                                images={currentJetImages}
                                open={jetImagesOpen}
                                onClose={() => setJetImagesOpen(false)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:w-1/3 w-full">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-1 h-6 bg-gradient-to-b from-swPrimary500 to-swPrimary600 rounded-full"></div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-800">
                        Flight Summary
                      </h2>
                      <p className="text-xs text-slate-500">
                        Your journey details
                      </p>
                    </div>
                  </div>
                  <div className="w-full rounded-2xl border border-slate-200 p-6 bg-white shadow-sm">
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
                    {additionalNote && (
                      <div className="mb-6">
                        <h3 className="text-base font-semibold text-slate-800 mb-3">
                          Additional Notes
                        </h3>
                        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-amber-600 text-xs font-bold">
                                !
                              </span>
                            </div>
                            <p className="text-sm text-slate-700 leading-relaxed">
                              {additionalNote}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col gap-3">
                      {/* <Button
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
                      /> */}
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
        onClose={setNotLoggedInModal}
        bookingDetails={bookingDetails}
        unCheckAllBoxes={uncheckBoxes}
        setSuccess={setNotLoggedInSuccess}
      />
      <PremiumRideModal
        bookingDetails={bookingDetails}
        setBookingDetails={setBookingDetails}
        open={openPremiumRideModal}
        setOpen={setOpenPremiumModal}
        isSubmitting={handleQuote}
      />
    </>
  );
};

export default BookingPageInformation;
