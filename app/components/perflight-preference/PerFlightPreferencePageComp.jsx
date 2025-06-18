"use client";

import { useState } from "react";
import { format } from "date-fns";
import InputField from "../shared/InputField";
import TextAreaField from "../shared/TextAreaField";
import { useForm } from "../../../hooks/useForm";
import ReusableDropDown from "../shared/ReusableDropdown";
import MultiSelectCheckbox from "../../components/MultiSelectCheckBox";
import GuestManager from "./GuestManager";
import SelectOnlyDate from "../../../utils/SelectOnlyDate";
import { PiAirplaneInFlight } from "react-icons/pi";
import { TbMoodCheck } from "react-icons/tb";
import { SiInfluxdb } from "react-icons/si";
import { GrNotes } from "react-icons/gr";
import { IoCarSportOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { postPerFlightPreferences } from "../../../redux/slices/enquirySlice";
import { useDispatch } from "react-redux";

const initialState = {
  fullName: "",
  flightDate: "",
  departureCity: "",
  destination: "",
  numberOfPassengers: "",
  additionalVIPGuests: [],
  tripMoodPurpose: {
    mood: "",
    preferredAmbiance: "",
  },
  onboardPreferences: {
    extras: [],
    mealRequest: "",
    allergiesOrDietaryRestrictions: "",
    drinks: [],
  },
  onGroundNeeds: {
    groundTransportation: false,
    vehicleType: "",
    hotelConcierge: false,
    hotelStatus: "",
  },
  finalNotes: "",
};

const VIPFlightBookingComp = () => {
  const dispatch = useDispatch();
  const [openDateComp, setOpenDateComp] = useState(false);
  const { formData, setFormData, errors, setErrors, setError, validate } =
    useForm(initialState);
  const [loading, setLoading] = useState(false);
  const requiredFields = [
    "fullName",
    "flightDate",
    "departureCity",
    "destination",
    "numberOfPassengers",
    "tripMoodPurpose.mood",
    "tripMoodPurpose.preferredAmbiance",
    "onboardPreferences.mealRequest",
  ];

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [section, subField] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...(prev[section] || {}),
          [subField]: value,
        },
      }));
      setErrors((prev) => ({
        ...prev,
        [section]: {
          ...(prev[section] || {}),
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate(requiredFields)) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await dispatch(
        postPerFlightPreferences(formData)
      ).unwrap();
      console.log("Response:", response);
      toast.success(response?.message || "Form submitted successfully!");
      setFormData(initialState);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  // console.log("Form Data:", formData);

  return (
    <div className="mt-24 mb-5 min-h-screen py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Flight Preference & Booking Form
          </h1>
          <p className="mt-2 text-gray-600">
            Book your premium travel experience
          </p>
        </div>
        <form onSubmit={handleSubmit} method="post" className="space-y-6">
          {/* Flight Information */}
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <div className="mb-4">
              <div className="flex items-center gap-2 text-lg font-semibold">
                {/* <div className="w-5 h-5 bg-gray-400 rounded"></div> */}
                <PiAirplaneInFlight
                  size={25}
                  className="-rotate-45 text-swPrimary500"
                />
                Flight Information
              </div>
              <div className="text-sm text-muted-foreground">
                Basic flight details and passenger information
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <InputField
                  name="fullName"
                  placeholder="Thread Miller"
                  label="Full Name "
                  value={formData.fullName}
                  error={errors.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <InputField
                    name="flightDate"
                    placeholder="YYYY-MM-DD"
                    label="Flight Date "
                    value={formData.flightDate}
                    error={errors.flightDate}
                    onClick={() => setOpenDateComp(true)}
                    onChange={(e) =>
                      handleInputChange("flightDate", e.target.value)
                    }
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <InputField
                    name="departureCity"
                    placeholder="London"
                    label="Departure City "
                    error={errors.departureCity}
                    value={formData.departureCity}
                    onChange={(e) =>
                      handleInputChange("departureCity", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <InputField
                    name="destination"
                    placeholder="Paris"
                    label="Destination "
                    error={errors.destination}
                    value={formData.destination}
                    onChange={(e) =>
                      handleInputChange("destination", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <InputField
                  name="numberOfPassengers"
                  placeholder="10"
                  label="Number of Passengers "
                  error={errors.numberOfPassengers}
                  value={formData.numberOfPassengers.toString()}
                  onChange={(e) =>
                    handleInputChange(
                      "numberOfPassengers",
                      Number.parseInt(e.target.value) || ""
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <GuestManager
                  label="Additional VIP Guests"
                  guests={formData.additionalVIPGuests}
                  onChange={(guests) =>
                    handleInputChange("additionalVIPGuests", guests)
                  }
                />
              </div>
            </div>
          </div>

          {/* Trip Mood & Purpose */}
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <div className="mb-4">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <TbMoodCheck size={25} className="text-swPrimary500" />
                Trip Mood & Purpose
              </div>
              <div className="text-sm text-muted-foreground">
                Set the tone for your journey
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <ReusableDropDown
                    label="Trip Mood "
                    options={[
                      { label: "Business", value: "Business" },
                      { label: "Celebration", value: "Celebration" },
                      { label: "Quiet Recharge", value: "Quiet Recharge" },
                      { label: "Medical", value: "Medical" },
                      { label: "Family Time", value: "Family Time" },
                    ]}
                    onChange={(value) =>
                      handleInputChange("tripMoodPurpose.mood", value.value)
                    }
                  />
                  {errors.tripMoodPurpose?.mood && (
                    <p className="text-red-500 text-xs">
                      {errors.tripMoodPurpose.mood}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <ReusableDropDown
                    label="Preferred Ambiance "
                    options={[
                      { label: "Quiet", value: "Quiet" },
                      {
                        label: "Light Conversation",
                        value: "Light Conversation",
                      },
                      { label: "Mood Music", value: "Mood Music" },
                      { label: "Complete Silence", value: "Complete Silence" },
                      { label: "Other", value: "Other" },
                    ]}
                    onChange={(value) => {
                      handleInputChange(
                        "tripMoodPurpose.preferredAmbiance",
                        value.value
                      );
                      setError("tripMoodPurpose.preferredAmbiance", undefined);
                    }}
                  />
                  {errors.tripMoodPurpose?.preferredAmbiance && (
                    <p className="text-red-500 text-xs">
                      {errors.tripMoodPurpose.preferredAmbiance}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Onboard Preferences */}
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <div className="mb-4">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <SiInfluxdb size={25} className="text-swPrimary500" />
                Onboard Preferences
              </div>
              <div className="text-sm text-muted-foreground">
                Customize your in-flight experience
              </div>
            </div>

            <div className="space-y-6">
              <MultiSelectCheckbox
                label="Extras"
                options={[
                  "Cold Towel",
                  "Fragrance-Free",
                  "Reading Materials",
                  "Fruit Basket",
                  "Branded Gift",
                ]}
                selectedValues={formData.onboardPreferences.extras}
                onChange={(values) =>
                  handleInputChange("onboardPreferences.extras", values)
                }
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <ReusableDropDown
                    label="Meal Request "
                    options={[
                      { label: "Light Snacks", value: "Light Snacks" },
                      { label: "Full Meal", value: "Full Meal" },
                      { label: "Fruits Only", value: "Fruits Only" },
                      { label: "No Food", value: "No Food" },
                      { label: "Other", value: "Other" },
                    ]}
                    onChange={(value) => {
                      handleInputChange(
                        "onboardPreferences.mealRequest",
                        value.value
                      );
                      setError("onboardPreferences.mealRequest", undefined);
                    }}
                  />
                  {errors.onboardPreferences?.mealRequest && (
                    <p className="text-red-500 text-xs">
                      {errors.onboardPreferences.mealRequest}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <InputField
                    name="allergiesOrDietaryRestrictions"
                    placeholder="None"
                    label="Allergies/Dietary Restrictions"
                    value={
                      formData.onboardPreferences.allergiesOrDietaryRestrictions
                    }
                    onChange={(e) =>
                      handleInputChange(
                        "onboardPreferences.allergiesOrDietaryRestrictions",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <MultiSelectCheckbox
                label="Drinks"
                options={[
                  "Water",
                  "Sparkling",
                  "Juice",
                  "Coffee/Tea",
                  "Red Wine",
                  "White Wine",
                  "Champagne",
                  "Other",
                ]}
                selectedValues={formData.onboardPreferences.drinks}
                onChange={(values) =>
                  handleInputChange("onboardPreferences.drinks", values)
                }
              />
            </div>
          </div>

          {/* On Ground Needs */}
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <div className="mb-4">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <IoCarSportOutline size={25} className="text-swPrimary500" />
                On Ground Needs
              </div>
              <div className="text-sm text-muted-foreground">
                Ground transportation and accommodation services
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="groundTransportation"
                    className="text-swGray800 text-sm flex gap-2 items-center cursor-pointer"
                  >
                    <input
                      id="groundTransportation"
                      type="checkbox"
                      checked={formData.onGroundNeeds.groundTransportation}
                      className="h-4 w-4 text-swPrimary500 border-gray-300 rounded focus:ring-swPrimary500 accent-swPrimary500"
                      onChange={(e) => {
                        handleInputChange(
                          "onGroundNeeds.groundTransportation",
                          e.target.checked
                        );
                        if (!e.target.checked) {
                          handleInputChange("onGroundNeeds.vehicleType", "");
                        }
                      }}
                    />
                    <p>Ground Transportation Required</p>
                  </label>
                </div>

                {formData.onGroundNeeds.groundTransportation && (
                  <div className="space-y-2 ml-6">
                    <ReusableDropDown
                      label="Vehicle Type"
                      options={[
                        { label: "SUV", value: "SUV" },
                        { label: "Luxury Sedan", value: "Luxury Sedan" },
                        { label: "Bulletproof", value: "Bulletproof" },
                        { label: "Other", value: "Other" },
                      ]}
                      onChange={(value) =>
                        handleInputChange(
                          "onGroundNeeds.vehicleType",
                          value.value
                        )
                      }
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label
                    htmlFor="hotelConcierge"
                    className="text-swGray800 text-sm flex gap-2 items-center cursor-pointer"
                  >
                    <input
                      id="hotelConcierge"
                      type="checkbox"
                      checked={formData.onGroundNeeds.hotelConcierge}
                      className="h-4 w-4 text-swPrimary500 border-gray-300 rounded focus:ring-swPrimary500 accent-swPrimary500"
                      onChange={(e) => {
                        handleInputChange(
                          "onGroundNeeds.hotelConcierge",
                          e.target.checked
                        );
                        if (!e.target.checked) {
                          handleInputChange("onGroundNeeds.hotelStatus", "");
                        }
                      }}
                    />
                    <p>Hotel Concierge Service</p>
                  </label>
                </div>

                {formData.onGroundNeeds.hotelConcierge && (
                  <div className="space-y-2 ml-6">
                    <ReusableDropDown
                      label="Hotel Status"
                      options={[
                        { label: "Booked already", value: "Booked already" },
                        {
                          label: "Need recommendations",
                          value: "Need recommendations",
                        },
                      ]}
                      onChange={(value) => {
                        handleInputChange(
                          "onGroundNeeds.hotelStatus",
                          value.value
                        );
                        setError("onGroundNeeds.hotelStatus", undefined);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Final Notes */}
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <div className="mb-4">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <GrNotes size={25} className="text-swPrimary500" />
                Final Notes
              </div>
              <div className="text-sm text-muted-foreground">
                Any additional requests or special instructions
              </div>
            </div>

            <div className="space-y-4">
              <TextAreaField
                label="Special Requests"
                placeholder="Anniversary celebration"
                value={formData.finalNotes}
                onChange={(e) =>
                  handleInputChange("finalNotes", e.target.value)
                }
              />
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 bg-swPrimary500 text-white rounded-lg hover:bg-swPrimary600 focus:outline-none focus:ring-2 focus:ring-swPrimary500 focus:ring-offset-2 font-medium ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
      <SelectOnlyDate
        isOpen={openDateComp}
        onClose={setOpenDateComp}
        value={formData.flightDate}
        onChange={(val) => {
          handleInputChange("flightDate", format(val, "yyyy-MM-dd"));
          setError("flightDate", undefined);
        }}
      />
    </div>
  );
};

export default VIPFlightBookingComp;
