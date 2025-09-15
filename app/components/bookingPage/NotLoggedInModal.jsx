import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import InputField from "../shared/InputField";
import { FiMail, FiPhone } from "react-icons/fi";
import { SWClose, SWLogo, SwUserIcon } from "../svgs";
import Button from "../Button";
import bgImg from "../../../public/images/nologgedInImg.png";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addBooking } from "../../../redux/slices/bookingSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneNumberValidation from "../shared/PhoneNumberValidation";

function NotLoggedInModal({
  open,
  onClose,
  bookingDetails,
  unCheckAllBoxes,
  setSuccess,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useSearchParams();
  const { loading, error, data } = useSelector((state) => state.booking);
  const [formData, setFormData] = useState({
    email: ``,
    firstName: ``,
    lastName: ``,
    phone: "",
  });
  const source = params.get("source");

  useEffect(() => {
    // Keep booking details persisted even after an error.
    const persistedDetails = JSON.parse(
      sessionStorage.getItem("bookingDetails")
    );
    if (persistedDetails) {
      setFormData(persistedDetails);
    }
  }, []);

  const handleQuote = () => {
    if (Object.values(formData).some((e) => e === "")) {
      alert("Please fill in all fields.");
    } else {
      // Persist booking details in case of an error
      sessionStorage.setItem("bookingDetails", JSON.stringify(formData));

      bookingDetails.status = "New";
      bookingDetails.user = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone_number: formData.phone,
      };
      bookingDetails.email = formData.email;
      bookingDetails.source = source || "web";

      dispatch(addBooking(bookingDetails))
        .unwrap()
        .then((response) => {
          if (response?.message === "Booking created successfully") {
            unCheckAllBoxes();
            setFormData({
              email: "",
              firstName: "",
              lastName: "",
              phone: "",
            });
            setSuccess(true);
            sessionStorage.removeItem("bookingDetails"); // Clear persisted details on success
            onClose?.(false);
          } else {
            toast.error(response?.message);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error occurred while submitting booking.");
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!open) return null;

  return (
    <main className="fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-25 flex justify-center items-center p-5 z-50">
      <ToastContainer />
      <div className="max-w-4xl w-full rounded-3xl bg-white flex overflow-hidden relative">
        <div className="absolute right-5 top-5 p-2 rounded-full cursor-pointer border sm:hidden">
          <SWClose className="text-2xl" onClick={() => onClose?.(false)} />
        </div>
        <div className="px-5 py-10 w-full sm:w-[45%]">
          <p className="text-center text-2xl font-semibold">Complete booking</p>
          <p className="text-center text-sm max-w-72 mx-auto text-swGray900 my-5">
            Provide the following details to complete booking or sign in
          </p>
          <div className="flex flex-col gap-5">
            <InputField
              label={"Email"}
              placeholder={"Enter email address"}
              name={"email"}
              startIcon={<FiMail size={25} />}
              value={formData.email}
              onChange={handleInputChange}
            />
            <InputField
              label={"First Name"}
              placeholder={"Enter Your First Name"}
              name={"firstName"}
              startIcon={<SwUserIcon size={25} className="text-2xl" />}
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <InputField
              label={"Last Name"}
              placeholder={"Enter Your Last Name"}
              name={"lastName"}
              startIcon={<SwUserIcon size={25} className="text-2xl" />}
              value={formData.lastName}
              onChange={handleInputChange}
            />

            <div>
              <PhoneNumberValidation
                label={"Enter Phone No"}
                inputValue={formData.phone}
                onChange={(val) => {
                  setFormData((prev) => ({ ...prev, phone: val }));
                }}
              />
            </div>
            <Button
              label="Submit"
              bgColor={"bg-swPrimary500 hover:bg-swPrimary600"}
              textColor={"text-white"}
              disabled={
                Object.values(formData).some((e) => e === "") ||
                loading === "pending"
              }
              onClick={handleQuote}
            />

            <p className="text-swGray900 text-sm">
              Save and use your previously entered information when you are
              signed in.
            </p>
            <Button
              label="Sign in"
              bgColor={"border-2 hover:bg-swGray50"}
              textColor={"text-swGray800"}
              onClick={() => {
                sessionStorage.setItem("bookingInComplete", true);
                router.push("/sign-in");
              }}
            />
          </div>
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
            <SWClose className="text-2xl" onClick={() => onClose?.(false)} />
          </div>
          <div className="absolute right-5 -bottom-10 text-white cursor-pointer">
            <SWLogo className="text-[10rem]" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default NotLoggedInModal;
