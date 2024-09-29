"use client";
import { useEffect, useState } from "react";
import InputField from "../components/shared/InputField";
import { FiMail, FiPhone } from "react-icons/fi";
import { SWLogo, SwUserIcon } from "../components/svgs";
import bgImg from "../../public/images/nologgedInImg.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addEmptyLeg } from "@/redux/slices/bookingSlice";
import { ToastContainer, toast } from "react-toastify";
import NavAndFooter from "../components/shared/NavAndFooter";
import Button from "../components/Button";
import { TbRuler3 } from "react-icons/tb";
import Loading from "../components/Loading";
import PhoneNumberValidation from "../components/shared/PhoneNumberValidation";

const EmptyLegPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loader, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: ``,
    name: ``,
    phone: "",
  });
  const handleEpmtyLegSubcription = () => {
    setLoading(TbRuler3);
    dispatch(addEmptyLeg(formData))
      .unwrap()
      .then((response) => {
        // console.log(response);
        if (response?.response?.data?.error) {
          toast.error(response?.response?.data?.error);
          setLoading(false);
        } else if (response?.message) {
          toast.success(response?.message);
          setFormData({
            email: ``,
            name: ``,
            phone: "",
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loader) {
    return <Loading />;
  }

  return (
    <NavAndFooter Nav={true}>
      <main className="flex justify-center items-center p-5 z-50 py-20 pt-32 bg-black bg-opacity-10">
        <ToastContainer />
        <div className="max-w-4xl w-full rounded-3xl bg-white flex overflow-hidden relative">
          <div className="px-5 py-10 w-full sm:w-[45%]">
            <p className="text-center text-2xl font-semibold">
              Empty Leg Subscription
            </p>
            <p className="text-center text-sm max-w-72 mx-auto text-swGray900 my-5">
              Provide the following details to subscribe to our empty leg
              waitlist
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
                label={"Name"}
                placeholder={"Enter Your Name"}
                name={"name"}
                startIcon={<SwUserIcon size={25} className="text-2xl" />}
                value={formData.name}
                onChange={handleInputChange}
              />

              {/* <InputField
                label={"Phone Number"}
                placeholder={"Enter phone number"}
                name={"phone"}
                startIcon={<FiPhone size={25} />}
                value={formData.phone}
                onChange={handleInputChange}
              /> */}
              <PhoneNumberValidation
                label={"Enter Phone No"}
                inputValue={formData.phone}
                onChange={(val) =>
                  setFormData((prev) => ({ ...prev, phone: val }))
                }
              />
              <Button
                label="Submit"
                bgColor={"bg-swPrimary500 hover:bg-swPrimary600"}
                textColor={"text-white"}
                // endIcon={<HiArrowRight size={20} />}
                disabled={
                  Object.values(formData).some((e) => e === "") || loading
                }
                onClick={handleEpmtyLegSubcription}
              />
              {/* 
              <p className="text-swGray900 text-sm">
                Save and use your previously entered information when you are
                signed in.
              </p> */}
              <Button
                label="Sign in"
                bgColor={"border-2 hover:bg-swGray50"}
                textColor={"text-swGray800"}
                onClick={() => {
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
            <div className="absolute right-5 -bottom-10 text-white cursor-pointer">
              <SWLogo className="text-[10rem]" />
            </div>
          </div>
        </div>
      </main>
    </NavAndFooter>
  );
};

export default EmptyLegPage;
