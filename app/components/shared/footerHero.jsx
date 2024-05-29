import Button from "../Button";
import React from 'react';

const FooterHero = () => {
    return (
      <div className="xl:container m-auto py-20 px-8 md:px-16 lg:px-16 overflow-hidden bg-floralwhite">
      <div className="relative w-full flex flex-col lg:flex-row items-center justify-between lg:items-start pb-24 lg:pb-[276px] lg:pr-[236px] lg:pl-[201px] box-border tracking-normal gap-5 text-left text-xl text-gray-900 font-header-sm-semi-bold">
        
        <section className="w-full absolute bottom-[-140px] left-[50%] transform -translate-x-1/2 rounded-t-45xl rounded-b-none bg-floralwhite" />
        
        <img
          className="h-[826px] w-[706px] absolute right-[-200px] bottom-[-312px] object-cover z-1 hidden lg:block"
          loading="lazy"
          alt=""
          src="/images/Circles.png"
        />
        
        <div className="relative leading-8 font-semibold z-2 text-center lg:text-left max-w-full w-[440px] lg:order-none order-2 mt-5 lg:mt-0">
          You’re one click away from booking the perfect Jet for your journey.
        </div>
        
        <div className="relative z-2 order-3 lg:order-none mt- lg:mt-0">
          <Button
            label="Book a jet"
            bgColor="bg-swPrimary500"
            textColor="text-white"
            className="h-12 px-6 text-base"
          />
        </div>
      <div>
        <img
          className="h-auto max-w-xs lg:max-w-lg absolute bottom-[-80.4px] left-0 lg:left-[-9.5px] object-contain z-1 order-1 lg:order-none"
          alt=""
          src="/images/airplane-footer.png"
        />
        </div>
      </div>
    </div>
            );
        };
export default FooterHero;
