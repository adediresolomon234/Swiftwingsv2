"use client";
import React from "react";
import Image from "next/image";
import NavAndFooter from "../../components/shared/NavAndFooter";
import CareerImage from "../../../public/images/CareerPage.jpg";
import People from "../../../public/images/people-office-work-day.jpg";
import Button from "../../components/Button";
import Opening from "../../../public/images/web-careers-job-openings.jpg";

const Career = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById("next-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <NavAndFooter Nav={true}>
      <section
        className="bg-cover bg-top py-20 min-h-[80vh] flex flex-col items-center justify-center text-white relative"
        style={{ backgroundImage: `url(${CareerImage.src})` }}
      >
        <div className="absolute inset-0 bg-white/70 z-0"></div>

        <div className="relative z-10 flex flex-col items-center">
          <h1 className=" text-2xl lg:text-6xl mb-0 lg:mb-8 font-bold text-swPrimary500 text-center">
            Find Your Next
            <br />
            Dream Job
          </h1>
          <p className="text-center text-swPrimary500 max-w-xl mx-auto mb-8 p-8">
            Swiftwings thrives on a spirit of agility and youthful enthusiasm,
            leveraging our technological prowess to swiftly adapt to market
            conditions and customer demands.
          </p>
          <div>
            <div className="relative z-10 flex flex-col items-center">
              {/* Other content */}
              <svg
                className="w-6 h-6 text-white cursor-pointer mt-10 animate-bounce hover:animate-bounce-slow focus:outline-none mx-auto block"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleScroll}
                role="button"
                aria-label="Scroll to next section"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>
      <section className="overflow-hidden py-32">
        <div className="mx-auto max-w-7xl space-y-16 px-6">
          <h2 className="text-title text-swPrimary500 relative z-10 max-w-xl text-4xl font-medium lg:text-5xl">
            Benefits & Perks
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24 items-stretch">
            {/* Text Container */}
            <div className="relative z-10 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <p className="text-body">
                  You might think we are limited in what benefits we can offer
                  <span className="text-title font-medium">
                    {" "}
                    Well, think again.{" "}
                  </span>
                  These benefits and perks
                </p>
                <p>
                  are available to those who join the Swiftwings Jet dynamic
                  staff.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-6 sm:gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#5f6368"
                    >
                      <path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z" />
                    </svg>
                    <h3 className="text-title text-swPrimary500 text-sm font-medium">
                      Competitive Pay
                    </h3>
                  </div>
                  <p className="text-body text-sm">
                    Earn competitively, grow exponentially
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#5f6368"
                    >
                      <path d="M420-340h120v-100h100v-120H540v-100H420v100H320v120h100v100Zm60 260q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z" />
                    </svg>
                    <h3 className="text-title text-swPrimary500  text-sm font-medium">
                      Health & Wellness
                    </h3>
                  </div>
                  <p className="text-body text-sm">
                    Prioritize your well-being with a holistic approach to
                    health and wellness
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-6 sm:gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#5f6368"
                    >
                      <path d="m798-274-60-60q11-27 16.5-53.5T760-440q0-116-82-198t-198-82q-24 0-51 5t-56 16l-60-60q38-20 80.5-30.5T480-800q60 0 117.5 20T706-722l56-56 56 56-56 56q38 51 58 108.5T840-440q0 42-10.5 83.5T798-274ZM520-552v-88h-80v8l80 80ZM792-56l-96-96q-48 35-103.5 53.5T480-80q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-60 18.5-115.5T192-656L56-792l56-56 736 736-56 56ZM480-160q42 0 82-13t75-37L248-599q-24 35-36 75t-12 84q0 116 82 198t198 82ZM360-840v-80h240v80H360Zm83 435Zm113-112Z" />
                    </svg>
                    <h3 className="text-title text-sm text-swPrimary500  font-medium">Time Off</h3>
                  </div>
                  <p className="text-body text-sm">
                    Your well-being matters. We prioritize self-care and return
                    refreshed, ready to thrive.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z"/></svg>
                    <h3 className="text-title  text-swPrimary500 text-sm font-medium">
                      Hybrid work
                    </h3>
                  </div>
                  <p className="text-body text-sm">
                    With our hybrid work model, enjoy the best of both worlds—collaborative in-office experiences and the freedom of remote work.
                  </p>
                </div>
              </div>
            </div>

            {/* Image Container */}
            <div className="relative flex items-center justify-center">
              <div className="tls-shadow-md rounded-card relative overflow-hidden shadow-gray-950/[0.03] w-full h-full">
                <Image
                  className="relative dark:hidden object-cover w-full h-full"
                  src={People.src}
                  width={400}
                  height={500}
                  alt="People working in an office"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="next-section" className="overflow-hidden py-32">
        <div className="mx-auto max-w-7xl space-y-16 px-6">
          <h2 className="text-title relative z-10 max-w-xl text-4xl font-medium lg:text-5xl">
            Current Openings
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24 items-stretch">
            <div className="relative z-10 space-y-4 flex flex-col justify-between">
              <div className="space-y-8">
                <p className="text-body">
                  The Swiftwings Jet is consistently looking for talented
                  individuals to join the organization
                </p>
                <div className={` flex  text-xl py-8 lg:p-0 mt-20 `}>
                  <Button
                    label="Explore Opportunities"
                    bgColor={"bg-swPrimary500"}
                    textColor={"text-white"}
                  />
                </div>
              </div>
            </div>

            {/* Image Container */}
            <div className="relative flex items-center justify-center">
              <div className="tls-shadow-md rounded-card relative overflow-hidden shadow-gray-950/[0.03] w-full h-full">
                <Image
                  className="relative dark:hidden object-cover w-full h-full"
                  src={Opening.src}
                  width={400}
                  height={500}
                  alt="People working in an office"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </NavAndFooter>
  );
};

export default Career;
