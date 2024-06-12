import Button from "../Button";
import React from "react";

const FooterHero = () => {
  return (
    <div className="mx-auto bg-floralwhite overflow-hidden mt-8 -mb-40">
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-8 lg:gap-96 relative ">
        <div className="relative font-semibold inline-block shrink-0 w-full z-[2]">
          <div className="relative z-10 p-5 max-w-[350px] sm:mx-auto">
            You&apos;re one click away from booking the perfect Jet for your
            journey.
          </div>
          <img
            className="w-full mx-auto z-[3] transform lg:translate-x-[30px]mb:0 mb:4 lg:mb-12"
            alt=""
            src="/images/airplane-footer.png"
          />
        </div>
        <div className="relative flex justify-center items-center w-full z-[1] mb-12 md:mb-0 lg:mb-0">
          <img
            className="w-full max-h-[700px] right-0 object-contain rotate-90"
            loading="lazy"
            alt=""
            src="/images/Circles.png"
          />

          <div className="absolute top-1/2 ">
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
  );
};
export default FooterHero;
