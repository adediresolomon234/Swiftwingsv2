"use client";
import { Poppins } from "next/font/google";
import { useState } from "react";
import { FiUser } from "react-icons/fi";
import InputField from "../shared/InputField";
import TextAreaField from "../shared/TextAreaField";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ReusableDropDown from "../shared/ReusableDropdown";
import { format } from "date-fns";
import SelectOnlyDate from "../../../utils/SelectOnlyDate";
import { FaRegHeart } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { useForm } from "../../../hooks/useForm";
import { useDispatch } from "react-redux";
import { postFirstTimeEliteClients } from "../../../redux/slices/enquirySlice";
import { toast } from "react-toastify";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

const initialState = {
  fullName: "",
  preferredName: "",
  phoneNumber: "",
  emailAddress: "",
  preferredContactMethod: "",
  assistantOrPAContact: "",
  dateOfBirth: "",
  nationality: "",
  cityOfResidence: "",
  lifestyleTravelStyle: {
    preferredDrink: "",
    favoriteSnacksOrFruits: "",
    dietaryPreference: "",
    knownAllergies: "",
    petOnboard: false,
    petType: "",
    typicalLuggageQuantity: "",
    musicPreference: "",
    preferredCabinAmbiance: "",
  },
  additionalServices: {
    handleHotelBookings: false,
    receiveDeals: false,
    specialNotes: "",
  },
};

const EliteClientPageComp = () => {
  const dispatch = useDispatch();
  const [openDateComp, setOpenDateComp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { formData, setFormData, errors, setErrors, validate } =
    useForm(initialState);
  const requiredFields = [
    "fullName",
    "phoneNumber",
    "emailAddress",
    "preferredContactMethod",
    "nationality",
    "cityOfResidence",
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

  const preferedContactOptions = [
    { label: "WhatsApp", value: "WhatsApp" },
    { label: "Phone Call", value: "Phone Call" },
    { label: "Email", value: "Email" },
  ];

  const dietaryPreferenceOptions = [
    { label: "Vegan", value: "Vegan" },
    { label: "Halal", value: "Halal" },
    { label: "Keto", value: "Keto" },
    { label: "Others", value: "Others" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate(requiredFields)) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await dispatch(
        postFirstTimeEliteClients(formData)
      ).unwrap();
      toast.success("Your message has been sent to our admin successfully!");
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
            First Time Elite Client Form
          </h1>
          <p className="mt-2 text-gray-600">
            Help us personalize your travel experience
          </p>
        </div>
        <form onSubmit={handleSubmit} method="post" className="space-y-6">
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <div className="mb-4">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <FiUser size={20} className="text-swPrimary500" />
                Personal Information
              </div>
              <div className="text-sm text-muted-foreground">
                Basic contact and personal details
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <InputField
                    name="fullName"
                    placeholder="Thread Miller"
                    label="Full Name"
                    error={errors.fullName}
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <InputField
                    name="preferredName"
                    placeholder="Thread"
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
                  <div className={`text-sm text-swGray800 mb-3`}>Phone *</div>
                  <div className="relative rounded-lg border border-swGray300 hover:border-swPrimary500">
                    <PhoneInput
                      country={"ng"}
                      autoFormat={false}
                      value={formData.phoneNumber}
                      onChange={(phone) => {
                        handleInputChange("phoneNumber", phone);
                      }}
                      containerClass="h-11 !static !rounded-l-4xl"
                      buttonClass="!border-none !absolute !rounded-l-lg !hover:border-none !hover:outline-none !focus:border-none !focus:outline-none"
                      inputClass={`${poppins.className} min-h-11 min-w-full text-gray-500 !text-base font-normal !border-none !rounded-l-4xl !rounded-r-lg`}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs">{errors.phoneNumber}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <InputField
                    name="email"
                    placeholder="threadermiller@email.com"
                    error={errors.emailAddress}
                    label="Email Address "
                    value={formData.emailAddress}
                    onChange={(e) =>
                      handleInputChange("emailAddress", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <ReusableDropDown
                    label="Preferred Contact Method "
                    options={preferedContactOptions}
                    value={
                      preferedContactOptions.find(
                        (option) =>
                          option.value === formData.preferredContactMethod
                      ) || { label: "Select Method", value: "" }
                    }
                    onChange={(value) =>
                      handleInputChange("preferredContactMethod", value.value)
                    }
                  />
                  {errors.preferredContactMethod && (
                    <p className="text-red-500 text-xs">
                      {errors.preferredContactMethod}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <InputField
                    name="assistantOrPAContact"
                    placeholder="assistant@email.com"
                    label="Assistant/PA Contact"
                    value={formData.assistantOrPAContact}
                    onChange={(e) =>
                      handleInputChange("assistantOrPAContact", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <InputField
                    name="dateOfBirth"
                    placeholder="YYYY-MM-DD"
                    label="Date Of Birth "
                    value={formData.dateOfBirth}
                    onClick={() => setOpenDateComp(true)}
                    // onChange={(e) =>
                    //   handleInputChange("dateOfBirth", e.target.value)
                    // }
                    readOnly
                  />
                  {/* </div> */}
                </div>
                <div className="space-y-2">
                  <InputField
                    name="nationality"
                    placeholder="Nigerian"
                    error={errors.nationality}
                    label="Nationality "
                    value={formData.nationality}
                    onChange={(e) =>
                      handleInputChange("nationality", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <InputField
                    name="cityOfResidence"
                    placeholder="Lagos"
                    error={errors.cityOfResidence}
                    label="City of Residence "
                    value={formData.cityOfResidence}
                    onChange={(e) =>
                      handleInputChange("cityOfResidence", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <div className="mb-4">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <FaRegHeart size={20} className="text-swPrimary500" />
                Lifestyle & Travel Preferences
              </div>
              <div className="text-sm text-muted-foreground">
                Your personal preferences for a comfortable journey
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <InputField
                    name="preferredDrink"
                    placeholder="Water"
                    label="Preferred Drink"
                    value={formData.lifestyleTravelStyle.preferredDrink}
                    onChange={(e) =>
                      handleInputChange(
                        "lifestyleTravelStyle.preferredDrink",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <InputField
                    name="favoriteSnacksOrFruits"
                    placeholder="Apples"
                    label="Favorite Snacks/Fruits"
                    value={formData.lifestyleTravelStyle.favoriteSnacksOrFruits}
                    onChange={(e) =>
                      handleInputChange(
                        "lifestyleTravelStyle.favoriteSnacksOrFruits",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <ReusableDropDown
                    label="Dietary Preference "
                    options={dietaryPreferenceOptions}
                    value={
                      dietaryPreferenceOptions.find(
                        (option) =>
                          option.value ===
                          formData.lifestyleTravelStyle.dietaryPreference
                      ) || { label: "Select Preference", value: "" }
                    }
                    onChange={(value) =>
                      handleInputChange(
                        "lifestyleTravelStyle.dietaryPreference",
                        value.value
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <InputField
                    name="knownAllergies"
                    placeholder="Peanuts"
                    label="Known Allergies"
                    value={formData.lifestyleTravelStyle.knownAllergies}
                    onChange={(e) =>
                      handleInputChange(
                        "lifestyleTravelStyle.knownAllergies",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="petOnboard"
                    className="text-swGray800 text-sm flex gap-2 items-center cursor-pointer"
                  >
                    <input
                      id="petOnboard"
                      type="checkbox"
                      checked={formData.lifestyleTravelStyle.petOnboard}
                      className="h-4 w-4 text-swPrimary500 border-gray-300 rounded focus:ring-swPrimary500 accent-swPrimary500"
                      onChange={(e) =>
                        handleInputChange(
                          "lifestyleTravelStyle.petOnboard",
                          e.target.checked
                        )
                      }
                    />{" "}
                    <p>Travelling with pet</p>
                  </label>
                </div>
                {formData.lifestyleTravelStyle.petOnboard && (
                  <div className="space-y-2">
                    <InputField
                      name="petType"
                      placeholder="Dog"
                      label="Pet Type"
                      value={formData.lifestyleTravelStyle.petType}
                      onChange={(e) =>
                        handleInputChange(
                          "lifestyleTravelStyle.petType",
                          e.target.value
                        )
                      }
                    />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <InputField
                    name="typicalLuggageQuantity"
                    placeholder="10"
                    label="Typical Luggage Quantity"
                    value={formData.lifestyleTravelStyle.typicalLuggageQuantity}
                    onChange={(e) =>
                      handleInputChange(
                        "lifestyleTravelStyle.typicalLuggageQuantity",
                        e.target.value || ""
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <InputField
                    name="musicPreference"
                    placeholder="Pop"
                    label="Music Preference"
                    value={formData.lifestyleTravelStyle.musicPreference}
                    onChange={(e) =>
                      handleInputChange(
                        "lifestyleTravelStyle.musicPreference",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <InputField
                    name="preferredCabinAmbiance"
                    placeholder="Quiet"
                    label="Preferred Cabin Ambiance"
                    value={formData.lifestyleTravelStyle.preferredCabinAmbiance}
                    onChange={(e) =>
                      handleInputChange(
                        "lifestyleTravelStyle.preferredCabinAmbiance",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <div className="mb-4">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <IoSettingsOutline size={20} className="text-swPrimary500" />
                Additional Services
              </div>
              <div className="text-sm text-muted-foreground">
                Optional services and special requests
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="handleHotelBookings"
                    className="text-swGray800 text-sm flex gap-2 items-center cursor-pointer"
                  >
                    <input
                      id="handleHotelBookings"
                      type="checkbox"
                      checked={formData.additionalServices.handleHotelBookings}
                      className="h-4 w-4 text-swPrimary500 border-gray-300 rounded focus:ring-swPrimary500 accent-swPrimary500"
                      onChange={(e) =>
                        handleInputChange(
                          "additionalServices.handleHotelBookings",
                          e.target.checked
                        )
                      }
                    />{" "}
                    <p>Handle hotel bookings</p>
                  </label>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="receiveDeals"
                    className="text-swGray800 text-sm flex gap-2 items-center cursor-pointer"
                  >
                    <input
                      id="receiveDeals"
                      type="checkbox"
                      checked={formData.additionalServices.receiveDeals}
                      className="h-4 w-4 text-swPrimary500 border-gray-300 rounded focus:ring-swPrimary500 accent-swPrimary500"
                      onChange={(e) =>
                        handleInputChange(
                          "additionalServices.receiveDeals",
                          e.target.checked
                        )
                      }
                    />{" "}
                    <p>Receive promotional deals and offers</p>
                  </label>
                </div>

                <TextAreaField
                  // css="h-24"
                  label="Special Notes"
                  placeholder="Any additional information or requests"
                  value={formData.additionalServices.specialNotes}
                  onChange={(e) =>
                    handleInputChange(
                      "additionalServices.specialNotes",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center pt-4">
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
        value={formData.dateOfBirth}
        onChange={(val) => {
          handleInputChange("dateOfBirth", format(new Date(val), "yyyy-MM-dd"));
        }}
      />
    </div>
  );
};

export default EliteClientPageComp;
