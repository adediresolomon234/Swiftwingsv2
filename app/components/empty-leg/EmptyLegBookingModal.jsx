import { useEffect, useState } from "react";
import InputField from "../shared/InputField";
import { SWClose, SWLogo, SwUserIcon } from "../svgs";
import Button from "../Button";
import bgImg from "../../../public/images/nologgedInImg.png";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isValidEmail } from "../helpers/emailValidation";
import { useDispatch } from "react-redux";
import { bookEmptyLeg } from "../../../redux/slices/emptylegs";
import { FiDollarSign } from "react-icons/fi";
import { IoInformationCircleOutline } from "react-icons/io5";
import {
  handleInputChangeWithComma,
  preventNonNumeric,
} from "../../../utils/utils";

const initialState = {
  name: "",
  email: "",
  phone: "",
  offer: 0,
};

function EmptyLegBookingModal({ open, onClose, leg, setBookingSuccess }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // const shareOnWhatsApp = async (phoneNumber, message) => {
  //   const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
  //     message
  //   )}`;
  //   window.open(url, "_blank");
  // };

  const closeModal = () => {
    setFormData(initialState);
    setErrors(initialState);
    onClose();
  };

  const handleBook = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      if (!formData.name) {
        setErrors((prev) => ({ ...prev, name: "Name is required" }));
      }
      if (!formData.email) {
        setErrors((prev) => ({ ...prev, email: "Email is required" }));
      }
      if (!formData.phone) {
        setErrors((prev) => ({ ...prev, phone: "Phone number is required" }));
      }
      if (!formData.offer || formData.offer < 4000) {
        if (!formData.offer) {
          setErrors((prev) => ({ ...prev, offer: "Offer is required" }));
        }
        if (formData.offer < 4000) {
          setErrors((prev) => ({ ...prev, offer: "Minimum offer is $4,000" }));
        }
      }
      return;
    }
    if (formData.email && !isValidEmail(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
      return;
    }
    //     const message = `
    //     Hello, I would like to book the empty leg from '${leg?.departure}' to '${
    //       leg?.arrival
    //     }' with the aircraft ${leg.aircraft} on ${new Date(
    //       leg?.dates
    //     ).toLocaleDateString("en-US", {
    //       weekday: "long",
    //       year: "numeric",
    //       month: "long",
    //       day: "numeric",
    //     })}.
    // Name: ${formData.name}
    // Email: ${formData.email}
    // Phone Number: ${formData.phone}
    //     `;

    //     shareOnWhatsApp(`+2349076850024`, message);

    setLoading(true);
    const payload = {
      aircraft: leg.aircraft,
      departure: leg.departure,
      arrival: leg.arrival,
      dates: leg.dates,
      offer: formData.offer,
      customer: {
        name: formData.name,
        email: formData.email,
        phone_number: formData.phone,
      },
    };

    try {
      const response = await dispatch(bookEmptyLeg(payload));
      if (response?.payload?.success) {
        setBookingSuccess(true);
        closeModal();
      } else {
        toast?.error(
          response?.payload?.response?.data?.error ||
            "An error occurred, please try again"
        );
      }
    } catch (error) {
      toast.error("An error occurred, please try again");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    if (open && user) {
      setFormData((prev) => ({
        ...prev,
        name: `${user?.first_name} ${user?.last_name}`,
        email: user?.email,
        phone: user?.phone_number,
      }));
    }
  }, [open]);

  console.log(formData);

  if (!open) return null;

  return (
    <main className="fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-25 flex justify-center items-center p-5 z-50">
      <ToastContainer />
      <div className="max-w-4xl w-full rounded-3xl bg-white flex overflow-hidden relative">
        <div className="absolute right-5 top-5 p-2 rounded-full cursor-pointer border sm:hidden">
          <SWClose className="text-2xl" onClick={() => closeModal()} />
        </div>
        <div className="px-5 py-10 w-full sm:w-[45%]">
          <p className="text-center text-2xl font-semibold">Make An Offer</p>
          <p className="text-center text-sm max-w-72 mx-auto text-swGray900">
            Provide the following details to make an offer
          </p>
          <div className="flex flex-col gap-3">
            <InputField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && (
              <p className="text-red-500 text-xs -mt-3">{errors.name}</p>
            )}

            <InputField
              label="Email"
              value={formData.email}
              name="email"
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs -mt-3">{errors.email}</p>
            )}

            <InputField
              label="Phone Number"
              value={formData.phone}
              name="phone"
              onChange={handleInputChange}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs -mt-3">{errors.phone}</p>
            )}
            <InputField
              label="Offer"
              value={Number(formData?.offer)?.toLocaleString()}
              name="offer"
              startIcon={<FiDollarSign size={15} />}
              onKeyDown={preventNonNumeric}
              onChange={(e) => {
                handleInputChangeWithComma(e, setFormData);
                setErrors((prev) => ({
                  ...prev,
                  [e.target.name]: "",
                }));
              }}
            />
            {errors.offer ? (
              <p className="text-red-500 text-xs -mt-3">{errors.offer}</p>
            ) : (
              <p className="text-red-500 text-xs -mt-3">Min offer $4,000</p>
            )}

            <div className="text-xs">
              <IoInformationCircleOutline
                size={20}
                color="orange"
                className="inline"
              />{" "}
              The minimum price for an empty leg flight is $4,000, but it may
              vary based on route, aircraft and availability.
            </div>
          </div>
          <Button
            label="Make Offer"
            bgColor={"border-2 hover:bg-swGray50 w-full mt-10"}
            textColor={"text-swGray800"}
            loader={loading}
            disabled={loading}
            onClick={handleBook}
          />
        </div>
        <div className="hidden sm:block w-[55%] bg-cover bg-center bg-no-repeat relative">
          <Image
            src={bgImg}
            layout="fill"
            objectFit="cover"
            quality={100}
            alt="Background Image"
          />
          <div className="absolute right-5 top-5 p-2 rounded-full bg-white cursor-pointer">
            <SWClose className="text-2xl" onClick={() => closeModal()} />
          </div>
          <div className="absolute right-5 -bottom-10 text-white cursor-pointer">
            <SWLogo className="text-[10rem]" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default EmptyLegBookingModal;
