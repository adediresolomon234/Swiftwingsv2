import Button from "../Button";
import React from "react";

const FooterHero = () => {
  return (
   
    <div className="container mx-auto bg-floralwhite md:px-16 overflow-hidden my-8">
  <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-96 relative">
    <div className="relative font-semibold inline-block shrink-0 w-full z-[2]">
      <div className="md:p-16 p-2 max-w-[400px]">
        You&apos;re one click away from booking the perfect Jet for your journey.
      </div>
      <img
        className=" lg:w-full lg:w-full mx-auto lg:mx-0 mt-0 lg:left-16 lg:mt-[-120px] z-[3] transform lg:translate-x-[30px]"
        alt=""
        src="/images/airplane-footer.png"
      />
    </div>
    <div className="relative flex justify-center items-center w-full z-[1]">
      <img
        className="w-full max-h-[500px] object-contain"
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


  
  );
};
export default FooterHero;
