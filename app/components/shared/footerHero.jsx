import Button from "../Button";
import React from "react";

const FooterHero = () => {
  return (
    <div className="bg-floralwhite py-20 px-8 md:px-16 lg:px-16 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex-1 w-[440px] relative leading-[32px] font-semibold inline-block shrink-0 max-w-full z-[2]">
          <div className="p-8 max-w-[400px]">
            You&apos;re one click away from booking the perfect Jet for your
            journey.
          </div>
          <img
            className="absolute lg:w-full lg:max-w-[850px] mx-auto lg:mx-0 mt-0 lg:right-36  lg:mt-[-145px]"
            alt=""
            src="/images/airplane-footer.png"
          />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="h-[826px] w-[706px] relative  lg:right-[-200px] lg: bottom-[-312px] object-cover z-[1]">
            <img
              className="w-full "
              loading="lazy"
              alt=""
              src="/images/Circles.png"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Button
                label="Book a jet"
                bgColor="bg-swPrimary500"
                textColor="text-white"
                className="h-12 px-6 text-base"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FooterHero;
