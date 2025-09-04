"use client";

import { useMemo, useState } from "react";
import TextAreaField from "../shared/TextAreaField";
import ReusableDropDown from "../shared/ReusableDropdown";
import { format } from "date-fns";
import InputField from "../shared/InputField";
import SelectDate from "../../../utils/SelectDate";
import { FiPhone, FiUser } from "react-icons/fi";
import { PiAirplaneInFlight, PiCoffeeBold, PiGift } from "react-icons/pi";
import { IoCarSportOutline } from "react-icons/io5";
import { useForm } from "../../../hooks/useForm";
import { postFlightBriefSheets } from "../../../redux/slices/enquirySlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import ReusableSelect from "../shared/ReusableSelect";
import airportsData from "../helpers/airportsData.json";

const initialState = {
  fullName: "",
  preferredName: "",
  titleSalutation: "",
  repeatFlyer: false,
  specialNotes: "",
  flightDetails: {
    flightDate: "",
    departureAirportDetails: null,
    arrivalAirportDetails: null,
    // flightNumberBookingCode: "",
    numberOfPassengers: "",
  },
  onboardPreferences: {
    drinkOfChoice: "",
    mealPreference: "",
    snacksFruits: "",
    allergiesOrDietaryRestrictions: "",
    musicOrCabinAmbiance: "",
  },
  serviceHighlights: {
    surpriseElement: "",
    brandedGiftIncluded: false,
    crewAwareOfMoodOccasion: false,
  },
  groundCoordination: {
    groundTransportNeeded: false,
    vehicleTypeRequested: "",
    hotelConciergeArranged: false,
    contactOfGroundHandler: "",
    // Custom vehicle
    customVehicleType: "",
  },
  postFlightFollowUp: {
    contactWithin24hrs: false,
    preferredFollowUpChannel: "",
    nextFlightInterestNoted: false,
  },
};


const FlightBriefPageComp = () => {
  const dispatch = useDispatch();
  const [openDateComp, setOpenDateComp] = useState(false);
  const [loading, setLoading] = useState(false);
  const airports = airportsData || [];
  const [openAirports, setOpenAirports] = useState({ state: false, type: "" });
  const { formData, setFormData, errors, setError, setErrors, validate } =
    useForm(initialState);
  const requiredFields = [
    "fullName",
    "flightDetails.flightDate",
    "flightDetails.departureAirportDetails",
    "flightDetails.arrivalAirportDetails",
    // "flightDetails.flightNumberBookingCode",
    "flightDetails.numberOfPassengers",
    "postFlightFollowUp.preferredFollowUpChannel",
  ];


  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [section, subField] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [subField]: value,
        },
      }));
      setErrors((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [subField]: undefined,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const options = useMemo(() => {
    return airports.map((item) => ({
      label: (
        <div className="flex justify-between hover:rounded-lg py-4 px-2">
          <div className="flex gap-1">
            <p className="text-[14px]">
              {item.city}
              {item.city && ", "}
              {item.country}
            </p>
            <p className="font-light italic text-sm text-swGray pl-1 text-[14px]">
              {item.name}
            </p>
          </div>
          <p className="text-swGray700">{item.iata_code}</p>
        </div>
      ),
      value: item,
    }));
  }, []);

  const titleSalutationOptions = [
    { label: "Mr.", value: "Mr." },
    { label: "Ms.", value: "Ms." },
    { label: "Mrs.", value: "Mrs." },
    { label: "Dr.", value: "Dr." },
    { label: "Prof.", value: "Prof." },
  ];

  const preferredFollowUpChannelOptions = [
    { label: "Email", value: "Email" },
    { label: "Phone Call", value: "Phone Call" },
    { label: "WhatsApp", value: "WhatsApp" },
    { label: "SMS", value: "SMS" },
  ];

  const vehicleTypeOptions = [
    { label: "Luxury Sedan", value: "Luxury Sedan" },
    { label: "SUV", value: "SUV" },
    { label: "Limousine", value: "Limousine" },
    { label: "Van", value: "Van" },
    { label: "Other", value: "Other" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate(requiredFields)) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await dispatch(postFlightBriefSheets(formData)).unwrap();
      toast.success(response?.message || "Form submitted successfully!");
      setFormData(initialState);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-24 mb-5 min-h-screen py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Premium Flight Service Form
          </h1>
          <p className="mt-2 text-gray-600">
            Customize your luxury flight experience
          </p>
        </div>

        <form onSubmit={handleSubmit} method="post" className="space-y-6">
          {/* Personal Information */}
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <div className="mb-4">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <FiUser size={20} className="text-swPrimary500" />
                Personal Information
              </div>
              <div className="text-sm text-gray-500">
                Basic passenger details and preferences
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <ReusableDropDown
                    label="Title/Salutation"
                    options={titleSalutationOptions}
                    value={
                      titleSalutationOptions.find(
                        (option) => option.value === formData?.titleSalutation
                      ) || { label: "Select Title", value: "" }
                    }
                    onChange={(value) =>
                      handleInputChange("titleSalutation", value.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <InputField
                    name="fullName"
                    placeholder="Alice Johnson"
                    label="Full Name"
                    error={errors?.fullName}
                    value={formData?.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <InputField
                    name="preferredName"
                    placeholder="Ali"
                    label="Preferred Name"
                    value={formData.preferredName}
                    onChange={(e) =>
                      handleInputChange("preferredName", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="repeatFlyer"
                    className="text-gray-800 text-sm flex gap-2 items-center cursor-pointer"
                  >
                    <input
                      id="repeatFlyer"
                      type="checkbox"
                      checked={formData.repeatFlyer}
                      className="h-4 w-4 text-swPrimary500 border-gray-300 rounded focus:ring-swPrimary500 accent-swPrimary500"
                      onChange={(e) =>
                        handleInputChange("repeatFlyer", e.target.checked)
                      }
                    />
                    <p>Repeat Flyer</p>
                  </label>
                </div>
                <div className="space-y-2">
                  <InputField
                    name="specialNotes"
                    placeholder="Birthday"
                    label="Special Notes"
                    value={formData.specialNotes}
                    onChange={(e) =>
                      handleInputChange("specialNotes", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Flight Details */}
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <div className="mb-4">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <PiAirplaneInFlight
                  size={25}
                  className="-rotate-45 text-swPrimary500"
                />
                Flight Details
              </div>
              <div className="text-sm text-gray-500">
                Essential flight information and passenger count
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <InputField
                    name="flightDate"
                    placeholder="YYYY-MM-DD / HH:MM"
                    label="Flight Date/Time"
                    error={errors?.flightDetails?.flightDate}
                    title={
                      formData?.flightDetails?.flightDate
                        ? `${format(
                            new Date(formData?.flightDetails?.flightDate),
                            "yyyy-MM-dd"
                          )} / ${format(
                            new Date(formData?.flightDetails?.flightDate),
                            "hh:mm a"
                          )}`
                        : ""
                    }
                    value={
                      formData?.flightDetails?.flightDate
                        ? `${format(
                            new Date(formData?.flightDetails?.flightDate),
                            "yyyy-MM-dd"
                          )} / ${format(
                            new Date(formData?.flightDetails?.flightDate),
                            "hh:mm a"
                          )}`
                        : ""
                    }
                    onClick={() => setOpenDateComp(true)}
                    readOnly
                    required
                  />
                </div>
                <div className="space-y-2">
                  <InputField
                    name="numberOfPassengers"
                    placeholder="10"
                    label="Number of Passengers"
                    type="number"
                    error={errors?.flightDetails?.numberOfPassengers}
                    min="1"
                    value={formData?.flightDetails?.numberOfPassengers}
                    onChange={(e) =>
                      handleInputChange(
                        "flightDetails.numberOfPassengers",
                        Number.parseInt(e.target.value) || ""
                      )
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <InputField
                    name="departureAirportDetails"
                    placeholder="Paris"
                    label="Departure City/Airport"
                    error={errors?.flightDetails?.departureAirportDetails}
                    title={
                      formData?.flightDetails?.departureAirportDetails?.city
                        ? `${formData?.flightDetails.departureAirportDetails?.city} / ${formData?.flightDetails?.departureAirportDetails?.name}`
                        : ""
                    }
                    value={
                      formData?.flightDetails?.departureAirportDetails?.city
                        ? `${formData?.flightDetails?.departureAirportDetails?.city} / ${formData.flightDetails.departureAirportDetails?.name}`
                        : ""
                    }
                    readOnly
                    // onChange={(e) =>
                    //   handleInputChange("destination", e.target.value)
                    // }
                    onClick={() =>
                      setOpenAirports({ state: true, type: "departure" })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <InputField
                    name="arrivalAirportDetails"
                    placeholder="Abuja"
                    label="Destination City/Airport"
                    error={errors?.flightDetails?.arrivalAirportDetails}
                    title={
                      formData?.flightDetails?.arrivalAirportDetails?.city
                        ? `${formData?.flightDetails?.arrivalAirportDetails?.city} / ${formData?.flightDetails?.arrivalAirportDetails?.name}`
                        : ""
                    }
                    value={
                      formData?.flightDetails?.arrivalAirportDetails?.city
                        ? `${formData?.flightDetails?.arrivalAirportDetails?.city} / ${formData?.flightDetails?.arrivalAirportDetails?.name}`
                        : ""
                    }
                    readOnly
                    // onChange={(e) =>
                    //   handleInputChange("destination", e.target.value)
                    // }
                    onClick={() =>
                      setOpenAirports({ state: true, type: "destination" })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Onboard Preferences */}
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <div className="mb-4">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <PiCoffeeBold size={20} className="text-swPrimary500" />
                Onboard Preferences
              </div>
              <div className="text-sm text-gray-500">
                Your comfort and dining preferences during the flight
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <InputField
                    name="drinkOfChoice"
                    placeholder="Coffee"
                    label="Drink of Choice"
                    value={formData.onboardPreferences.drinkOfChoice}
                    onChange={(e) =>
                      handleInputChange(
                        "onboardPreferences.drinkOfChoice",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <InputField
                    name="mealPreference"
                    placeholder="Light Snacks"
                    label="Meal Preference"
                    value={formData.onboardPreferences.mealPreference}
                    onChange={(e) =>
                      handleInputChange(
                        "onboardPreferences.mealPreference",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <InputField
                    name="snacksFruits"
                    placeholder="Bananas"
                    label="Snacks/Fruits"
                    value={formData.onboardPreferences.snacksFruits}
                    onChange={(e) =>
                      handleInputChange(
                        "onboardPreferences.snacksFruits",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <InputField
                    name="musicOrCabinAmbiance"
                    placeholder="Quiet"
                    label="Music/Cabin Ambiance"
                    value={formData.onboardPreferences.musicOrCabinAmbiance}
                    onChange={(e) =>
                      handleInputChange(
                        "onboardPreferences.musicOrCabinAmbiance",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <TextAreaField
                  label="Allergies or Dietary Restrictions"
                  placeholder="None"
                  value={
                    formData.onboardPreferences.allergiesOrDietaryRestrictions
                  }
                  onChange={(e) =>
                    handleInputChange(
                      "onboardPreferences.allergiesOrDietaryRestrictions",
                      e.target.value
                    )
                  }
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Service Highlights */}
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <div className="mb-4">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <PiGift size={20} className="text-swPrimary500" />
                Service Highlights
              </div>
              <div className="text-sm text-gray-500">
                Special touches to enhance your experience
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <InputField
                  name="surpriseElement"
                  placeholder="Cake"
                  label="Surprise Element"
                  value={formData.serviceHighlights.surpriseElement}
                  onChange={(e) =>
                    handleInputChange(
                      "serviceHighlights.surpriseElement",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="flex flex-col gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="brandedGiftIncluded"
                    className="text-gray-800 text-sm flex gap-2 items-center cursor-pointer"
                  >
                    <input
                      id="brandedGiftIncluded"
                      type="checkbox"
                      checked={formData.serviceHighlights.brandedGiftIncluded}
                      className="h-4 w-4 text-swPrimary500 border-gray-300 rounded focus:ring-swPrimary500 accent-swPrimary500"
                      onChange={(e) =>
                        handleInputChange(
                          "serviceHighlights.brandedGiftIncluded",
                          e.target.checked
                        )
                      }
                    />
                    <p>Branded gift included</p>
                  </label>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="crewAwareOfMoodOccasion"
                    className="text-gray-800 text-sm flex gap-2 items-center cursor-pointer"
                  >
                    <input
                      id="crewAwareOfMoodOccasion"
                      type="checkbox"
                      checked={
                        formData.serviceHighlights.crewAwareOfMoodOccasion
                      }
                      className="h-4 w-4 text-swPrimary500 border-gray-300 rounded focus:ring-swPrimary500 accent-swPrimary500"
                      onChange={(e) =>
                        handleInputChange(
                          "serviceHighlights.crewAwareOfMoodOccasion",
                          e.target.checked
                        )
                      }
                    />
                    <p>Crew aware of mood/occasion</p>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Ground Coordination */}
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <div className="mb-4">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <IoCarSportOutline size={20} className="text-swPrimary500" />
                Ground Coordination
              </div>
              <div className="text-sm text-gray-500">
                Transportation and ground services arrangement
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="groundTransportNeeded"
                    className="text-gray-800 text-sm flex gap-2 items-center cursor-pointer"
                  >
                    <input
                      id="groundTransportNeeded"
                      type="checkbox"
                      checked={
                        formData.groundCoordination.groundTransportNeeded
                      }
                      className="h-4 w-4 text-swPrimary500 border-gray-300 rounded focus:ring-swPrimary500 accent-swPrimary500"
                      onChange={(e) =>
                        handleInputChange(
                          "groundCoordination.groundTransportNeeded",
                          e.target.checked
                        )
                      }
                    />
                    <p>Ground transport needed</p>
                  </label>
                </div>

                {formData.groundCoordination.groundTransportNeeded && (
                  <div className="space-y-2 ml-6">
                    <ReusableDropDown
                      label="Vehicle Type Requested"
                      options={vehicleTypeOptions}
                      value={
                        vehicleTypeOptions.find(
                          (option) =>
                            option.value ===
                            formData.groundCoordination.vehicleTypeRequested
                        ) || { label: "Select Vehicle Type", value: "" }
                      }
                      onChange={(value) => {
                        handleInputChange(
                          "groundCoordination.vehicleTypeRequested",
                          value.value
                        );
                        if (value.value !== "Other") {
                          handleInputChange(
                            "groundCoordination.customVehicleType",
                            ""
                          );
                        }
                      }}
                    />
                    {formData.groundCoordination.vehicleTypeRequested ===
                      "Other" && (
                      <InputField
                        name="customVehicleType"
                        placeholder="Custom Vehicle Type"
                        label="Custom Vehicle Type"
                        value={formData.groundCoordination.customVehicleType}
                        onChange={(e) =>
                          handleInputChange(
                            "groundCoordination.customVehicleType",
                            e.target.value
                          )
                        }
                      />
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <label
                    htmlFor="hotelConciergeArranged"
                    className="text-gray-800 text-sm flex gap-2 items-center cursor-pointer"
                  >
                    <input
                      id="hotelConciergeArranged"
                      type="checkbox"
                      checked={
                        formData.groundCoordination.hotelConciergeArranged
                      }
                      className="h-4 w-4 text-swPrimary500 border-gray-300 rounded focus:ring-swPrimary500 accent-swPrimary500"
                      onChange={(e) =>
                        handleInputChange(
                          "groundCoordination.hotelConciergeArranged",
                          e.target.checked
                        )
                      }
                    />
                    <p>Hotel concierge arranged</p>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <InputField
                  name="contactOfGroundHandler"
                  placeholder="ground@swiftwingsjet.com"
                  label="Contact of Ground Handler"
                  type="email"
                  value={formData.groundCoordination.contactOfGroundHandler}
                  onChange={(e) =>
                    handleInputChange(
                      "groundCoordination.contactOfGroundHandler",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          </div>

          {/* Post Flight Follow Up */}
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <div className="mb-4">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <FiPhone size={20} className="text-swPrimary500" />
                Post Flight Follow Up
              </div>
              <div className="text-sm text-gray-500">
                Communication preferences after your flight
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="contactWithin24hrs"
                    className="text-gray-800 text-sm flex gap-2 items-center cursor-pointer"
                  >
                    <input
                      id="contactWithin24hrs"
                      type="checkbox"
                      checked={formData.postFlightFollowUp.contactWithin24hrs}
                      className="h-4 w-4 text-swPrimary500 border-gray-300 rounded focus:ring-swPrimary500 accent-swPrimary500"
                      onChange={(e) =>
                        handleInputChange(
                          "postFlightFollowUp.contactWithin24hrs",
                          e.target.checked
                        )
                      }
                    />
                    <p>Contact within 24 hours</p>
                  </label>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="nextFlightInterestNoted"
                    className="text-gray-800 text-sm flex gap-2 items-center cursor-pointer"
                  >
                    <input
                      id="nextFlightInterestNoted"
                      type="checkbox"
                      checked={
                        formData.postFlightFollowUp.nextFlightInterestNoted
                      }
                      className="h-4 w-4 text-swPrimary500 border-gray-300 rounded focus:ring-swPrimary500 accent-swPrimary500"
                      onChange={(e) =>
                        handleInputChange(
                          "postFlightFollowUp.nextFlightInterestNoted",
                          e.target.checked
                        )
                      }
                    />
                    <p>Next flight interest noted</p>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <ReusableDropDown
                  label="Preferred Follow Up Channel"
                  options={preferredFollowUpChannelOptions}
                  value={
                    preferredFollowUpChannelOptions.find(
                      (option) =>
                        option.value ===
                        formData?.postFlightFollowUp?.preferredFollowUpChannel
                    ) || { label: "Select Channel", value: "" }
                  }
                  onChange={(value) => {
                    handleInputChange(
                      "postFlightFollowUp.preferredFollowUpChannel",
                      value.value
                    );
                    setError(
                      "postFlightFollowUp.preferredFollowUpChannel",
                      undefined
                    );
                  }}
                  error={errors?.postFlightFollowUp?.preferredFollowUpChannel}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 bg-swPrimary500 text-white rounded-lg hover:bg-swPrimary600 focus:outline-none focus:ring-2 focus:ring-swPrimary500 focus:ring-offset-2 font-medium ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Submitting..." : "Submit Flight Service Request"}
            </button>
          </div>
        </form>
      </div>

      <SelectDate
        isOpen={openDateComp}
        onClose={setOpenDateComp}
        value={formData.flightDetails.flightDate}
        disablePast={true}
        onChange={(val) => {
          handleInputChange("flightDetails.flightDate", new Date(val));
        }}
      />
      <ReusableSelect
        isOpen={openAirports.state}
        placeholder={
          openAirports.type === "departure"
            ? "Search Departure City"
            : "Search Destination City"
        }
        searchable={true}
        onClose={() => setOpenAirports({ state: false, type: "" })}
        format={options}
        setValue={(selectedOption) => {
          console.log({ selectedOption });
          // updateBookingState({ source: selectedOption }, index);
          if (openAirports.type === "departure") {
            setFormData((prev) => ({
              ...prev,
              flightDetails: {
                ...prev.flightDetails,
                departureAirportDetails: selectedOption,
              },
            }));
          } else {
            setFormData((prev) => ({
              ...prev,
              flightDetails: {
                ...prev.flightDetails,
                arrivalAirportDetails: selectedOption,
              },
            }));
          }

          setOpenAirports({ state: false, type: "" });
        }}
      />
    </div>
  );
};

export default FlightBriefPageComp;
