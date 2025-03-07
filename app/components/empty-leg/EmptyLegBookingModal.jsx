import { useState } from "react";
import InputField from "../shared/InputField";
import { SWClose, SWLogo, SwUserIcon } from "../svgs";
import Button from "../Button";
import bgImg from "../../../public/images/nologgedInImg.png";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isValidEmail } from "../helpers/emailValidation";

const initialState = {
  name: ``,
  email: ``,
  phone: "",
};

function EmptyLegBookingModal({ open, onClose, leg }) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

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

  const shareOnWhatsApp = async (phoneNumber, message) => {
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  const closeModal = () => {
    setFormData(initialState);
    setErrors(initialState);
    onClose();
  };

  const handleBook = () => {
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
      return;
    }
    if (formData.email && !isValidEmail(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
      return;
    }
    const message = `
    Hello, I would like to book the empty leg from '${leg?.departure}' to '${
      leg?.arrival
    }' with the aircraft ${leg.aircraft} on ${new Date(
      leg?.dates
    ).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })}.
Name: ${formData.name}
Email: ${formData.email}
Phone Number: ${formData.phone}
    `;

    shareOnWhatsApp(`+2349076850024`, message);
    closeModal();
  };

  if (!open) return null;

  return (
    <main className="fixed w-screen h-screen -top-8 left-0 bg-black bg-opacity-25 flex justify-center items-center p-5 z-50">
      <ToastContainer />
      <div className="max-w-4xl w-full rounded-3xl bg-white flex overflow-hidden relative">
        <div className="absolute right-5 top-5 p-2 rounded-full cursor-pointer border sm:hidden">
          <SWClose className="text-2xl" onClick={() => closeModal()} />
        </div>
        <div className="px-5 py-10 w-full sm:w-[45%]">
          <p className="text-center text-2xl font-semibold">Book Empty Leg</p>
          <p className="text-center text-sm max-w-72 mx-auto text-swGray900 my-5">
            Provide the following details to complete booking
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
          </div>
          <Button
            label="Book Now"
            bgColor={"border-2 hover:bg-swGray50 w-full mt-10"}
            textColor={"text-swGray800"}
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
