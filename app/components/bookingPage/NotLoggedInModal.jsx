import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import InputField from "../shared/InputField";
import { FiMail, FiPhone } from "react-icons/fi";
import { SWClose, SWLogo, SwUserIcon } from "../svgs";
import Button from "../Button";
import bgImg from "../../../public/images/nologgedInImg.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addBooking } from "@/redux/slices/bookingSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NotLoggedInModal({
  open,
  onClick,
  bookingDetails,
  unCheckAllBoxes,
  setSuccess,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.booking);
  const [formData, setFormData] = useState({
    email: ``,
    firstName: ``,
    lastName: ``,
    phone: "",
  });
  const handleQuote = () => {
    if (Object.values(formData).some((e) => e === "")) {
      alert("input all");
    } else {
      bookingDetails.status = "New";
      bookingDetails.user = formData;
      bookingDetails.email = formData.email;
      dispatch(addBooking(bookingDetails));
      dispatch(addBooking(bookingDetails))
        .unwrap()
        .then((response) => {
          if (response?.message === "Booking created successfully") {
            unCheckAllBoxes();
            setFormData({
              email: ``,
              firstName: ``,
              lastName: ``,
              phone: "",
            });
            setSuccess(true);
            onClick(false);
          } else {
            toast.error(response?.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // useEffect(() => {
  //   if (data?.response?.data?.error) {
  //     toast.error(data?.response?.data?.error);
  //   } else if (data?.message) {
  //     setFormData({
  //       email: ``,
  //       firstName: ``,
  //       lastName: ``,
  //       phone: "",
  //     });
  //     onClick(false);
  //   }
  //   if (error) {
  //     toast.error(error?.message);
  //   }
  // }, [data, error]);
  // console.log(formData);

  if (!open) return;
  return (
    <main className="fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-25 flex justify-center items-center p-5 z-50">
      <ToastContainer />
      <div className="max-w-4xl w-full rounded-3xl bg-white flex overflow-hidden relative">
        <div className="absolute right-5 top-5 p-2 rounded-full  cursor-pointer border sm:hidden">
          <SWClose className="text-2xl" onClick={() => onClick(false)} />
        </div>
        <div className="px-5 py-10 w-full sm:w-[45%]">
          <p className="text-center text-2xl font-semibold">Complete booking</p>
          <p className="text-center text-sm max-w-72 mx-auto text-swGray900 my-5">
            Provide the following details to complete booking or sign in
          </p>
          <div className="flex flex-col gap-5 ">
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
            <InputField
              label={"Phone Number"}
              placeholder={"Enter phone number"}
              name={"phone"}
              startIcon={<FiPhone size={25} />}
              value={formData.phone}
              onChange={handleInputChange}
            />
            <Button
              label="Submit"
              bgColor={"bg-swPrimary500 hover:bg-swPrimary600"}
              textColor={"text-white"}
              // endIcon={<HiArrowRight size={20} />}
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
                localStorage.setItem("bookingInComplete", true);
                router.push("/sign-in");
              }}
            />
          </div>
        </div>
        <div className="hidden sm:block w-[55%] bg-cover bg-center bg-no-repeat relative">
          <Image
            src={bgImg} // Adjust the path according to where you placed the image
            layout="fill"
            objectFit="cover"
            quality={100}
            alt="Background Image"
          />
          <div className="absolute right-5 top-5 p-2 rounded-full bg-white cursor-pointer">
            <SWClose className="text-2xl" onClick={() => onClick(false)} />
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
