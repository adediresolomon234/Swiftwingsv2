"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Button from "../Button";
import JetImagesPopup from "./JetImagesPopup";
import BookingEngine from "../bookingEngine/bookingEngine";
import SuccessModal from "../shared/modals/SuccessModal";
import NotLoggedInModal from "./NotLoggedInModal";
import AdditionalNoteModal from "./AdditionalNoteModal";
import CancelModal from "../shared/modals/CancelModal";
import PremiumRideModal from "./PremiumRideModal";
import Loading from "../Loading";

// Icons and Assets
import {
  SwArrowRightIcon,
  SwLuggageIcon,
  SwMeterIcon,
  SwPlaneIcon,
  SwSeatIcon,
  SWMeterIconNew,
  GoldWing,
  SilverWing,
  BronzeWing,
} from "../svgs";
import Image from "next/image";
import loadingGif from "../../../public/images/loading.gif";

// Redux actions
import { addBooking } from "../../../redux/slices/bookingSlice";
import { fetchRankedAircrafts } from "../../../redux/slices/aircraftdetails";

// Utils
import { validatePassengersAgainstLowestSeats } from "../helpers/utils";
import { GrRefresh } from "react-icons/gr";

// Constants
const INITIAL_BOOKING_STATE = {
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
};

const BookingPageInformation = () => {
  // Router and path hooks
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  // State management
  const [jetImagesOpen, setJetImagesOpen] = useState(false);
  const [currentJetImages, setCurrentJetImages] = useState([]);
  const [currentAircraft, setCurrentAircraft] = useState(null);
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

  // Performance optimization
  const [isPending, startTransition] = useTransition();

  // URL params
  const source = params.get("source");

  // Redux selectors with memoization
  const { error, data } = useSelector((state) => state.booking);
  const {
    status: jetLoading,
    error: jetError,
    aircrafts: jetData,
  } = useSelector((state) => state.aircrafts);
  // console.log("Jet status", jetLoading);

  // Memoized values for performance
  const memoizedJetData = useMemo(() => jetData || [], [jetData]);
  const memoizedBookingDetails = useMemo(
    () => bookingDetails,
    [bookingDetails]
  );

  // Reset booking state function
  const resetBookingState = useCallback(() => {
    setBookingDetails([INITIAL_BOOKING_STATE]);
  }, []);

  // Handle aircraft selection with optimization
  const handleAircraftSelect = useCallback(
    (e, aircraftDetails, index) => {
      setBookingDetails((prevState) => {
        if (!prevState) return prevState;
        const additional_quote = prevState.additional_quote || [];
        const alreadyBooked = additional_quote.some(
          (a) => a.id === aircraftDetails.id
        );
        if (!alreadyBooked) {
          // Add aircraft
          return {
            ...prevState,
            additional_quote: [...additional_quote, aircraftDetails],
          };
        } else {
          // Remove aircraft
          return {
            ...prevState,
            additional_quote: additional_quote.filter(
              (aircraft) => aircraft.id !== aircraftDetails.id
            ),
          };
        }
      });
    },
    [bookingDetails]
  );

  console.log("booking", bookingDetails);

  // Uncheck all checkboxes
  const uncheckBoxes = useCallback(() => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }, []);

  // Handle quote submission with better error handling
  const handleQuote = useCallback(async () => {
    try {
      setPassengersErrors([]);

      // Validate passengers
      const errors = validatePassengersAgainstLowestSeats(
        bookingDetails?.additional_quote,
        bookingDetails?.booking_details?.formData
      );

      if (errors?.length > 0) {
        setPassengerError(true);
        setPassengersErrors(errors);
        return;
      }

      if (!loggedInUser) {
        // setNotLoggedInModal(true);
        sessionStorage.setItem("bookingInComplete", "true");
        sessionStorage.setItem(
          "bookingDetails",
          JSON.stringify(bookingDetails)
        );
        toast.error("You are not logged in. Kindly login to continue");
        router.push("/sign-in");
        // handleNavigationWithRefresh("/sign-in");
        // window.location.href = "/sign-in";
        return;
      }

      setLoading(true);
      delete loggedInUser.token;
      delete loggedInUser.isLoggedIn;
      delete loggedInUser.id;

      // Prepare booking data
      const bookingPayload = {
        ...bookingDetails,
        status: "New",
        user: loggedInUser,
        email: loggedInUser.email,
        additional_note: additionalNote,
        source: source || "web",
      };

      const response = await dispatch(addBooking(bookingPayload)).unwrap();

      if (response?.response?.data?.error) {
        toast.error(response.response.data.error);
        return;
      } else if (response?.message) {
        // Success handling
        setAdditionalNote("");
        uncheckBoxes();
        resetBookingState();
        sessionStorage.removeItem("bookingDetails");
        setSuccess(true);
        toast.success("Booking submitted successfully!");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [
    bookingDetails,
    loggedInUser,
    additionalNote,
    source,
    dispatch,
    uncheckBoxes,
    resetBookingState,
  ]);

  // Memoized quote button disable logic
  const isQuoteDisabled = useMemo(() => {
    if (!bookingDetails?.booking_details?.formData?.[0]) return true;

    const formData = bookingDetails.booking_details.formData[0];
    return (
      loading ||
      !formData.source ||
      !formData.destination ||
      !formData.depatureDate ||
      formData.passengers?.adults < 1 ||
      !bookingDetails.additional_quote ||
      bookingDetails.additional_quote.length < 1
    );
  }, [bookingDetails, loading]);

  // Handle jet images view
  const handleViewJetImages = useCallback((item) => {
    try {
      // console.log("handleViewJetImages called with item:", item);

      if (!item) {
        console.error("No aircraft item provided to handleViewJetImages");
        toast.error("No aircraft data available");
        return;
      }

      if (!item.images || !Array.isArray(item.images)) {
        console.warn(
          "Aircraft has no images or images is not an array:",
          item.images
        );
        setCurrentJetImages([]);
      } else {
        setCurrentJetImages(item.images);
      }

      setCurrentAircraft(item);
      setJetImagesOpen(true);

      // console.log("Successfully set current aircraft and images");
    } catch (error) {
      console.error("Error in handleViewJetImages:", error);
      toast.error("Failed to load aircraft images");
    }
  }, []);

  // Memoized aircraft card component
  const AircraftCard = useCallback(
    ({ item, index }) => (
      <div key={item?.id} className="mb-2 last:mb-0">
        <div className="bg-white border border-slate-200 rounded-lg p-3 hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center gap-4">
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={
                bookingDetails?.additional_quote?.some(
                  (aircraft) => String(aircraft.id) === String(item.id)
                ) || false
              }
              onChange={(e) => handleAircraftSelect(e, item, index)}
              className="h-4 w-4 accent-swPrimary500 rounded border border-slate-300 hover:border-swPrimary500 transition-colors duration-200"
            />

            {/* Aircraft Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-semibold text-slate-800 truncate">
                  {item?.name}
                </h3>
                {item?.rank === 3 && <GoldWing className="h-4 w-8" />}
                {item?.rank === 2 && <SilverWing className="h-4 w-8" />}
                {item?.rank === 1 && <BronzeWing className="h-4 w-8" />}
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
                <p className="text-xs text-slate-500">Seats</p>
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
                <p className="text-xs text-slate-500">Speed</p>
              </div>
              <div className="flex flex-col items-center">
                <SWMeterIconNew className="text-sm text-swPrimary600 mb-1" />
                <p className="text-xs font-semibold text-slate-800">
                  {item?.kilometer}
                </p>
                <p className="text-xs text-slate-500">Range</p>
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
                onClick={() => handleViewJetImages(item)}
              >
                <p className="text-xs font-medium text-slate-700 whitespace-nowrap">
                  View
                </p>
                <SwArrowRightIcon className="text-xs text-slate-600" />
              </button>
            )}
          </div>
        </div>
      </div>
    ),
    [handleAircraftSelect, handleViewJetImages, bookingDetails, pathname]
  );

  // Memoized flight summary component
  const FlightSummary = useCallback(({ item, index }) => {
    const departureDateTime = `${item?.depatureDate} ${item?.depatureTime}`;
    const returnDateTime = `${item?.returningDate} ${item?.returningTime}`;

    const formatDateTime = (dateTime, format) => {
      try {
        return dayjs(dateTime).format(format);
      } catch {
        return "Select date";
      }
    };

    return (
      <div key={index} className={`flex gap-1 mt-5 justify-center`}>
        <div className="flex flex-col justify-between">
          <div>
            <p className="font-semibold text-lg">
              {item?.depatureDate
                ? formatDateTime(departureDateTime, "h:mm a")
                : "Select Date/Time"}
            </p>
            <p className="text-sm">
              {item?.depatureDate &&
                formatDateTime(departureDateTime, "ddd D, MMM")}
            </p>
          </div>
          {item?.returningDate && (
            <div>
              <p className="font-semibold text-lg">
                {formatDateTime(returnDateTime, "h:mm a")}
              </p>
              <p className="text-sm">
                {formatDateTime(returnDateTime, "ddd D, MMM")}
              </p>
            </div>
          )}
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
          <div>
            <p className="text-sm">
              {item?.source?.city || "Select city"}, {item?.source?.country}
            </p>
          </div>
          <div>
            <p className="text-sm">
              {item?.destination?.city || "Select city"},{" "}
              {item?.destination?.country}
            </p>
          </div>
        </div>
      </div>
    );
  }, []);

  const fetchAircrafts = () => {
    dispatch(fetchRankedAircrafts("Jet"));
  };

  // Initialize component
  useEffect(() => {
    const initializeComponent = async () => {
      try {
        // Fetch aircraft data
        fetchAircrafts();

        // Get user details from localStorage
        const userDetails = sessionStorage.getItem("user");
        if (userDetails) {
          const parsedUser = JSON.parse(userDetails);
          setLoggedInUser(parsedUser);

          // Clean user object
          const { token, isLoggedIn, ...cleanUser } = parsedUser;

          setBookingDetails((prevState) => ({
            ...prevState,
            user: cleanUser,
          }));
        }

        setHydrated(true);
      } catch (error) {
        console.error("Initialization error:", error);
        toast.error("Failed to initialize booking page");
      }
    };

    initializeComponent();
  }, [dispatch]);

  // Update derived state when booking details change
  useEffect(() => {
    const formData = bookingDetails?.booking_details?.formData?.[0];
    if (formData) {
      setSourceDetails({ ...formData.source });
      setDestinationDetails({ ...formData.destination });
      setDateValue(dayjs(`${formData.depatureDate} ${formData.depatureTime}`));
    }
  }, [bookingDetails]);

  // Handle success modal close
  const handleSuccessClose = useCallback(() => {
    setSuccess(false);
    startTransition(() => {
      window.location.href = "/";
    });
  }, []);

  const handleProfileView = useCallback(() => {
    setSuccess(false);
    startTransition(() => {
      router.push("/user-dashboard?page=profile");
    });
  }, [router]);

  // Loading state
  if (!hydrated) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <main>
        <div
          className={`bg-swLightBgGray z-10 ${
            pathname !== "/booking" ? "px-4" : ""
          }`}
        >
          <div className="m-5 mx-auto max-w-[90rem] z-10">
            <BookingEngine setBookingDetails={setBookingDetails} />

            <div className="flex flex-col lg:flex-row gap-10 text-swGray800 mt-10">
              {/* Aircraft Selection Section */}
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
                      label="Additional Note"
                      bgColor="bg-white hover:bg-gray-50"
                      className="text-slate-700 text-center text-xs border border-slate-200 hover:border-slate-300 px-3 py-2"
                      onClick={() => setOpenAdditionalNote(!openAdditionalNote)}
                    />
                    <Button
                      label="Request Quote"
                      bgColor="bg-swPrimary500 hover:bg-swPrimary600"
                      className="text-white text-center text-xs shadow-md hover:shadow-lg px-3 py-2"
                      onClick={() => setOpenPremiumModal(true)}
                      loader={loading}
                      disabled={isQuoteDisabled}
                    />
                  </div>
                </div>

                {/* Aircraft List */}
                <div className="w-full max-h-96 overflow-y-auto border border-slate-200 rounded-lg bg-white">
                  <div className="p-2">
                    {jetLoading === "loading" ? (
                      <div className="flex justify-center items-center h-32">
                        <Loading />
                      </div>
                    ) : jetError ? (
                      <div className="flex flex-col justify-center items-center h-32 text-red-500">
                        <p>Failed to load aircraft data</p>
                        <button
                          onClick={() => fetchAircrafts()}
                          className="underline"
                        >
                          Retry
                          <GrRefresh className="inline" />
                        </button>
                      </div>
                    ) : memoizedJetData.length === 0 ? (
                      <div className="flex justify-center items-center h-32 text-gray-500">
                        No aircraft available
                      </div>
                    ) : (
                      memoizedJetData.map((item, index) => (
                        <AircraftCard key={item.id} item={item} index={index} />
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Flight Summary Section */}
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
                  {bookingDetails?.booking_details?.formData?.map(
                    (item, index) => (
                      <FlightSummary key={index} item={item} index={index} />
                    )
                  )}

                  {/* Additional Notes Display */}
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
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <SuccessModal
          open={success}
          headingText="Booking complete"
          text="You can check out your booking status in your profile or wait for our mail."
          onClose={setSuccess}
          firstBtnText="Go home"
          firstBtnClick={handleSuccessClose}
          secondBtnText="View Profile"
          secondBtnClick={handleProfileView}
        />

        <SuccessModal
          open={notLoggedInSuccess}
          singleBtn={true}
          headingText="Booking complete"
          text="You can check out your booking status in your profile or wait for our mail."
          onClose={setNotLoggedInSuccess}
          firstBtnText="Go home"
          firstBtnClick={() => {
            setNotLoggedInSuccess(false);
            startTransition(() => {
              window.location.href = "/";
            });
          }}
        />

        <AdditionalNoteModal
          open={openAdditionalNote}
          onClose={setOpenAdditionalNote}
          setAdditionalNote={setAdditionalNote}
        />

        <CancelModal
          open={isPassengerError}
          onClose={setPassengerError}
          singleBtn={true}
          noInput={true}
          firstBtnText="Ok"
          firstBtnClick={() => setPassengerError(false)}
          headingText="Booking Failed"
          text={passengersErrors.map((error, i) => (
            <p key={i} className="mt-1">
              {error}
            </p>
          ))}
        />
      </main>

      {/* Jet Images Popup */}
      <JetImagesPopup
        name={currentAircraft?.name || "Aircraft"}
        images={currentJetImages}
        open={jetImagesOpen}
        onClose={() => setJetImagesOpen(false)}
      />

      {/* Not Logged In Modal */}
      <NotLoggedInModal
        open={notLoggedInModal}
        onClose={setNotLoggedInModal}
        bookingDetails={bookingDetails}
        unCheckAllBoxes={uncheckBoxes}
        setSuccess={setNotLoggedInSuccess}
      />

      {/* Premium Ride Modal */}
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
