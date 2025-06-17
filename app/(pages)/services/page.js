"use client";
import React, { useState, useEffect } from "react";
import "../../../styles.css";
import Image from "next/image";
import NavAndFooter from "../../components/shared/NavAndFooter";
import Serivcepage from "../../../public/images/Serivcepage.png";
import Inflightcatering2 from "../../../public/images/Inflightcatering2.png";
import ChauffeurServices from "../../../public/images/ChauffeurServices.png";
import MedicalEvacuation from "../../../public/images/MedicalEvacuation.png";
import GroupFlight from "../../../public/images/GroupFlight.jpg";
import EmptyLegs from "../../../public/images/emeptylegs.jpg";
import HeliServices from "../../../public/images/HeliServices.jpg";
import { Libre_Baskerville } from "next/font/google";
import {
  SWTBespokeIcon,
  SWTStarBlack2Icon,
  SWTUserServiceIcon,
  SWTLuxuryFleetIcon,
  SWTDoortoDoorIcon,
  SWTCustomizatioIconIcon,
  SWTDietaryIconIcon,
  SWTStarIconIcon,
  SWTAdvancedMedicalIcon,
  SWTTwoPersonBlackIcon,
  SWTGlobalCoverageIcon,
  SWTClockBlackIcon,
} from "../../components/svgs";
import Button from "../../components/Button";
import FooterHero from "../../components/shared/footerHero";
import Head from "next/head";
import Loading from "../../components/Loading";
import { servicesPageKeywords } from "../../components/helpers/relatedKeywords";
import { useScrollToHash } from "../../components/shared/ScrollHook";
import InputField from "../../components/shared/InputField";
import { useDispatch, useSelector } from "react-redux";
import { SwUserIcon, SwMailIcon } from "../../components/svgs";
import SuccessModal from "../../components/shared/modals/SuccessModal";
import CancelModal from "../../components/shared/modals/CancelModal";
import { addEnquiry } from "../../../redux/slices/enquirySlice";
import Whatsapp from "../../components/shared/Whatsapp"

const libre_baskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Service = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedService, setSelectedService] = useState(""); // State for selected service
  const [loadingEnquiry, setLoadingEnquiry] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    enquiry: "",
  });

  useScrollToHash();

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleMakeEnquiriesClick = (service) => {
    setSelectedService(service); // Set the selected service
    setIsModalOpen(true); // Open the modal
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoadingEnquiry(true);
    try {
      const result = await dispatch(addEnquiry(formData)).unwrap();
      if (result.success) {
        setSuccess(true); // Show success modal
        setIsModalOpen(false); // Close the inquiry modal
        setFormData({
          name: "",
          email: "",
          service: "",
          enquiry: "",
        });
      }
    } catch (error) {
      setFailed(true); // Show failure modal
    } finally {
      setLoadingEnquiry(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="relative bg-swLightBgGray">
      <Head>
        <title>Services</title>
        <meta
          name="description"
          content="Swiftwings provides services like private jet charter, empty leg flights, group/corporate flights, medical evacuation, helicopters, etc"
        />
        <meta name="keywords" content={servicesPageKeywords} />
      </Head>
      <NavAndFooter Nav={true}>
        {/* Hero Section */}
        <div className="relative">
          <Image
            className="absolute inset-0 w-full h-full object-top"
            src={Serivcepage}
            width={1200}
            height={300}
            alt="services"
          />
          <div className="relative mx-auto max-w-screen-full px-4 py-28 sm:px-6 lg:flex lg:h-[70vh] lg:items-center lg:px-8">
            <div className="max-w-5xl mx-auto text-center">
              <h1 className="text-3xl font-bold sm:text-4xl lg:text-6xl capitalize mb-3">
                Swift wings Sets the Standard in Aviation{" "}
                <span className="text-swPrimary500">Services</span>
              </h1>
              <p className="px-2 sm:text-md lg:text-lg max-w-lg mx-auto">
                Our services are designed to give you a first class experience in{" "}
                <a
                  href="https://www.swiftwingsjet.com/services"
                  className="font-bold hover:underline"
                >
                  private jet charters services
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Inflight Catering Section */}
        <section id="inflight-catering-section" className="py-5">
          <div className="m-auto text-gray-600 md:px-12 xl:px-16">
            <div className="p-5 mt-32">
              <div className="text-start">
                <h1 className="text-xl font-semibold sm:text-3xl capitalize mb-4 text-black">
                  Inflight Catering
                </h1>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <p className="sm:text-md lg:text-lg max-w-2xl">
                    <span
                      className={`${libre_baskerville.className} no-text-shadow font-bold`}
                    >
                      Swift<i className="font-normal">Wings</i>
                    </span>
                    &apos; provides flyers with a customized in-flight catering
                    service. Passengers can choose from a wide selection of meals
                    to suit their dietary needs and taste preferences.
                  </p>
                  <p className="sm:text-md lg:text-lg max-w-2xl">
                    Whether you&apos;re hosting a business meeting or celebrating
                    a special occasion, savor every moment with our exquisite
                    inflight dining experience.
                  </p>
                </div>
              </div>
            </div>

            {/* Image with Hover Effect */}
            <div className="w-full">
              <div className="relative group w-full">
                <div className="aspect-video w-full">
                  <Image
                    className="w-full h-full object-cover"
                    src={Inflightcatering2}
                    width={1200}
                    height={600}
                    alt="Inflight catering services"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                  <Button
                    label={"Make Enquires"}
                    bgColor={"bg-swPrimary500 text-white"}
                    onClick={() => handleMakeEnquiriesClick("Inflight Catering")}
                  />
                </div>
              </div>
            </div>

            {/* Catering Features */}
            <div className="py-16">
              <div className="px-2 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-swPrimary500">
                  <div className="p-2 flex items-center">
                    <SWTBespokeIcon className="mr-4" />
                    <p>Bespoke Menus</p>
                  </div>
                  <div className="p-2 flex items-center">
                    <SWTCustomizatioIconIcon className="mr-4" />
                    <p>Customization Options</p>
                  </div>
                  <div className="p-2 flex items-center">
                    <SWTStarIconIcon className="mr-4" />
                    <p>Premium Selections</p>
                  </div>
                  <div className="p-2 flex items-center">
                    <SWTDietaryIconIcon className="mr-4" />
                    <p>Dietary Accommodations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Helicopter Services Section */}
        <section id="helicopter-services-section" className="py-5">
          <div className="m-auto text-gray-600 md:px-12 xl:px-16">
            <div className="p-5">
              <div className="text-start">
                <h1 className="text-xl font-semibold sm:text-3xl capitalize mb-4 text-black">
                  Helicopter Services
                </h1>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <p className="sm:text-md lg:text-lg max-w-2xl">
                    Swiftwings no longer only deals with private jets. We are
                    excited to announce our elite helicopter services that are
                    meant to take you away to amazing hidden places and
                    experiences in unique ways.
                  </p>
                  <p className="sm:text-md lg:text-lg max-w-2xl">
                    Move from the familiarity of conventional trips and discover
                    flight liberty. In addition to providing luxurious helicopter
                    flight services, we’ve made sure they are comfortable by
                    operating at high speed within distant areas as well as
                    sightseeing over mountainsides.
                  </p>
                </div>
              </div>
            </div>

            {/* Image with Hover Effect */}
            <div className="w-full">
              <div className="relative group w-full">
                <div className="aspect-video w-full">
                  <Image
                    className="w-full h-full object-cover"
                    src={HeliServices}
                    width={1200}
                    height={600}
                    alt="Helicopter services"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                  <Button
                    label={"Make Enquires"}
                    bgColor={"bg-swPrimary500 text-white"}
                    onClick={() => handleMakeEnquiriesClick("Helicopter Services")}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Medical Evacuation Section */}
        <section id="medical-evacuation-section" className="py-5">
          <div className="m-auto text-gray-600 md:px-12 xl:px-16">
            <div className="w-full mx-auto text-justify lg:text-center">
              <div className="p-5">
                <div className="text-start">
                  <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold sm:text-3xl capitalize mb-4 text-black">
                      Air Ambulance
                    </h1>
                  </div>
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <p className="sm:text-md lg:text-lg max-w-2xl">
                      Swift Wings is your trusted partner for{" "}
                      <a
                        href="https://www.swiftwingsjet.com/"
                        className="font-bold hover:underline"
                      >
                        air ambulance medical evacuation flights
                      </a>
                      . Our dedicated team understands the critical nature of
                      medical emergencies, and we are here to provide swift and
                      reliable air ambulance services when you need them the
                      most.
                    </p>
                    <p className="sm:text-md lg:text-lg max-w-2xl">
                      With a commitment to safety, efficiency, and patient care,
                      we ensure that your{" "}
                      <a
                        href="https://www.swiftwingsjet.com"
                        className="font-bold hover:underline"
                      >
                        medical evacuation flight
                      </a>{" "}
                      is conducted with the utmost professionalism and urgency.
                    </p>
                  </div>
                </div>
              </div>

              {/* Image with Hover Effect */}
              <div className="w-full mt-8">
                <div className="relative group w-full">
                  <div className="aspect-video w-full">
                    <Image
                      className="w-full h-full object-cover"
                      src={MedicalEvacuation}
                      width={1200}
                      height={600}
                      alt="Medical Evacuation"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                    <Button
                      label={"Make Enquires"}
                      bgColor={"bg-swPrimary500 text-white"}
                      onClick={() => handleMakeEnquiriesClick("Air Ambulance")}
                    />
                  </div>
                </div>
              </div>

              <div className="py-16">
                <div className="px-2 space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-swPrimary500">
                    <div className="p-2 flex items-center">
                      <SWTClockBlackIcon className="mr-4" />
                      <p>Available 24/7</p>
                    </div>
                    <div className="p-2 flex items-center">
                      <SWTTwoPersonBlackIcon className="mr-4" />
                      <p>Emergency Response Team</p>
                    </div>
                    <div className="p-2 flex items-center">
                      <SWTGlobalCoverageIcon className="mr-4" />
                      <p>Global Coverage</p>
                    </div>
                    <div className="p-2 flex items-center">
                      <SWTAdvancedMedicalIcon className="mr-4" />
                      <p>Advanced Medical Equipment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Empty Leg Services Section */}
        <section id="empty-leg-section" className="py-5">
          <div className="m-auto text-gray-600 md:px-12 xl:px-16">
            <div className="w-full mx-auto text-justify lg:text-center">
              <div className="p-5">
                <div className="text-start">
                  <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold sm:text-3xl capitalize mb-4 text-black">
                      Empty Leg Services
                    </h1>
                  </div>
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <p className="sm:text-md lg:text-lg max-w-2xl">
                      Empty legs occur when our private jets need to reposition
                      between destinations without passengers. Instead of letting
                      these flights burn fuel empty, Swiftwings offers them to
                      discerning travelers like you. You will enjoy the same
                      luxurious amenities, spacious cabins, and personalized
                      service that define every Swiftwings flight, all at a
                      significantly reduced price.
                    </p>
                    <p className="sm:text-md lg:text-lg max-w-2xl">
                      Imagine soaring through the clouds on a private jet,
                      indulging in unmatched comfort and privacy. Now imagine
                      achieving this dream at a fraction of the usual cost.
                      Thats the magic of Swiftwings empty leg flights.
                    </p>
                  </div>
                </div>
              </div>

              {/* Image with Hover Effect */}
              <div className="w-full mt-8">
                <div className="relative group w-full">
                  <div className="aspect-video w-full">
                    <Image
                      className="w-full h-full object-cover"
                      src={EmptyLegs}
                      width={1200}
                      height={600}
                      alt="Empty Legs"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                    <Button
                      label={"Make Enquires"}
                      bgColor={"bg-swPrimary500 text-white"}
                      onClick={() => handleMakeEnquiriesClick("Empty Leg Services")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chauffeur Services Section */}
        <section id="concierge-section" className="py-5">
          <div className="m-auto text-gray-600 md:px-12 xl:px-16">
            <div className="w-full mx-auto text-justify lg:text-center">
              <div className="flex flex-col gap-8 lg:flex-row">
                <div className="p-5">
                  <div className="text-start">
                    <h1 className="text-xl font-semibold sm:text-3xl capitalize mb-4 text-black">
                      Chauffeur Services
                    </h1>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-10">
                      <p className="sm:text-md lg:text-lg max-w-2xl">
                        Arrive in style and comfort with{" "}
                        <span
                          className={`${libre_baskerville.className} no-text-shadow font-bold`}
                        >
                          Swift<i className="font-normal">Wings</i>
                        </span>
                        &apos; chauffeur services. Whether you need
                        transportation to and from the airport or prefer a
                        chauffeured car during your stay, our professional
                        drivers are at your service.
                      </p>
                      <p className="sm:text-md lg:text-lg max-w-2xl">
                        Sit back, relax, and enjoy a seamless journey from door
                        to door with our luxury chauffeur services.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image with Hover Effect */}
              <div className="w-full mt-8">
                <div className="relative group w-full">
                  <div className="aspect-video w-full">
                    <Image
                      className="w-full h-full object-cover"
                      src={ChauffeurServices}
                      width={1200}
                      height={600}
                      alt="Chauffeur Services"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                    <Button
                      label={"Make Enquires"}
                      bgColor={"bg-swPrimary500 text-white"}
                      onClick={() => handleMakeEnquiriesClick("Chauffeur Services")}
                    />
                  </div>
                </div>
              </div>

              <div className="py-5">
                <div className="px-2 space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-swPrimary500">
                    <div className="p-2 flex items-center">
                      <SWTStarBlack2Icon className="mr-4" />
                      <p>Corporate Travel</p>
                    </div>
                    <div className="p-2 flex items-center">
                      <SWTLuxuryFleetIcon className="mr-4" />
                      <p>Luxury Fleet</p>
                    </div>
                    <div className="p-2 flex items-center">
                      <SWTUserServiceIcon className="mr-4" />
                      <p>Professional Drivers</p>
                    </div>
                    <div className="p-2 flex items-center">
                      <SWTDoortoDoorIcon className="mr-4" />
                      <p>Door-to-Door Service</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Group/Corporate Flights Section */}
        <section id="group-corporate-section" className="py-5">
          <div className="m-auto text-gray-600 md:px-12 xl:px-16">
            <div className="w-full mx-auto text-justify lg:text-center">
              <div className="p-5">
                <div className="text-start">
                  <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold sm:text-3xl capitalize mb-4 text-black">
                      Group/Corporate Flights
                    </h1>
                  </div>
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <p className="sm:text-md lg:text-lg max-w-2xl">
                      Are you planning for training, seminar, tourism, etc., as a
                      group or company? Swiftwings takes your entire team to
                      their destination directly, on their schedule. Imagine no
                      more scrambling through terminals or waiting for delayed
                      flights.
                    </p>
                    <p className="sm:text-md lg:text-lg max-w-2xl">
                      Instead, board a luxurious private jet together, use the
                      in-flight workspace for strategic planning, or simply relax
                      and arrive focused. Swiftwings guarantees a smooth,
                      efficient journey that sets the stage for success.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full mt-8">
                <div className="relative group w-full">
                  <div className="aspect-video w-full">
                    <Image
                      className="w-full h-full object-cover"
                      src={GroupFlight}
                      width={1200}
                      height={600}
                      alt="Group/Corporate Flights"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                    <Button
                      label={"Make Enquires"}
                      bgColor={"bg-swPrimary500 text-white"}
                      onClick={() => handleMakeEnquiriesClick("Group/Corporate Flights")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-24">
          <div className="mx-auto text-gray-600 md:px-12 xl:px-16">
            <div className="flex flex-col justify-between md:flex-row items-start gap-8 px-8">
              <div className="max-w-md">
                <h2 className="text-xl text-swPrimary500 font-bold">
                  Why Choose{" "}
                  <span
                    className={`${libre_baskerville.className} no-text-shadow font-bold`}
                  >
                    Swift<i className="font-normal">Wings</i>
                  </span>{" "}
                  Service
                </h2>
              </div>
              <div className="hidden md:block w-full lg:w-1/3 mx-4 mt-3">
                <hr className="border-t border-gray-300 w-full" />
              </div>
              <div className="max-w-md ">
                <p className="text-lg">
                  <span
                    className={`${libre_baskerville.className} no-text-shadow font-bold`}
                  >
                    Swift<i className="font-normal">Wings</i>
                  </span>{" "}
                  is a premier provider of private jets charter flights
                  connecting global airports, offering unmatched convenience and
                  exclusivity for luxury travel.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Hero Section */}
        <section className="">
          <div className="xl:container m-auto px-6 text-gray-600 md:px-12 xl:px-16">
            <FooterHero />
          </div>
        </section>

        {/* Inquiry Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-2xl">
              <h2 className="text-xl font-semibold mb-4">Inquiry Form</h2>
              <div className="w-full mt-5">
                <InputField
                  label={"Full Name"}
                  value={formData.name}
                  name={"name"}
                  placeholder={"Full Name"}
                  onChange={handleChange}
                  startIcon={<SwUserIcon className="text-xl" />}
                />
              </div>
              <div className="w-full mt-5">
                <InputField
                  label={"Email"}
                  value={formData.email}
                  name={"email"}
                  onChange={handleChange}
                  placeholder={"Enter email address"}
                  startIcon={<SwMailIcon className="text-xl" />}
                />
              </div>
              <div className="w-full mt-5">
                <label
                  htmlFor="service"
                  className="block text-sm mb-2 text-gray-700"
                >
                  Select Service
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service || selectedService}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none hover:border-swPrimary500"
                >
                  <option value="">Select a service</option>
                  <option value="Inflight Catering">Inflight Catering</option>
                  <option value="Helicopter Services">Helicopter Services</option>
                  <option value="Air Ambulance">Air Ambulance</option>
                  <option value="Empty Leg Services">Empty Leg Services</option>
                  <option value="Chauffeur Services">Chauffeur Services</option>
                  <option value="Group/Corporate Flights">
                    Group/Corporate Flights
                  </option>
                </select>
              </div>
              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="block text-sm mb-2 text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="enquiry"
                  rows="4"
                  value={formData.enquiry}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none hover:border-swPrimary500"
                ></textarea>
              </div>
              <div className="mt-6 flex justify-end">
                <Button
                  label={"Send"}
                  onClick={handleSubmit}
                  bgColor={"bg-swPrimary500 text-white"}
                  disabled={loadingEnquiry}
                />
                <Button
                  label={"Close"}
                  onClick={() => setIsModalOpen(false)}
                  bgColor={"bg-gray-500 text-white ml-2"}
                />
              </div>
            </div>
          </div>
        )}

        {/* Success and Failure Modals */}
        <SuccessModal
          open={success}
          onClose={setSuccess}
          singleBtn={true}
          firstBtnText={"Done"}
          firstBtnClick={() => setSuccess(false)}
          headingText={"Enquiry Sent"}
          text={"Your enquiry has been sent successfully"}
        />
        <CancelModal
          open={failed}
          onClose={setFailed}
          singleBtn={true}
          noInput={true}
          firstBtnText={"Ok"}
          firstBtnClick={() => setFailed(false)}
          headingText={"Enquiry Failed"}
          text={"Your enquiry could not be sent. Please try again"}
        />
        <Whatsapp/>
      </NavAndFooter>
    </main>
  );
};

export default Service;