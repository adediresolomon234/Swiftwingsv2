import Button from "../Button";
import React from 'react';

const FooterHero = () => {
    return (
            <div className="xl:container m-auto py-20 px-8 md:px-16 lg:px-16 overflow-hidden bg-floralwhite">
                <div className="w-full relative flex flex-row items-start justify-between pb-[276px] pr-[236px] pl-[201px] box-border tracking-[normal] gap-[20px] text-left text-xl text-gray-900 font-header-sm-semi-bold lg:flex-wrap lg:pl-5 lg:pr-5 lg:box-border lg:pl-[195px] lg:pr-[120px] md:box-border">
                <section className="w-full absolute !m-[0] bottom-[-140px] left-[calc(50%_-_676px)] rounded-t-45xl rounded-b-none bg-floralwhite" />
                <img
                  className="h-[826px] w-[706px] absolute !m-[0] right-[-200px] bottom-[-312px] object-cover z-[1]"
                  loading="lazy"
                  alt=""
                  src="/images/Circles.png"
                />
                <div className="w-[440px] relative leading-[32px] font-semibold inline-block shrink-0 max-w-full z-[2] ">
                  You’re one click away from booking the perfect Jet for your journey.
                </div>
                <div className="absolute right-[200px] bottom-[180px] z-[2]">
                  <Button
                    label="Book a jet"
                    bgColor="bg-swPrimary500"
                    textColor="text-white"
                    className="h-12 px-6 text-base"
                  />
                </div>
                <img
                  className="h-[600px] w-[650px] absolute !m-[0] bottom-[-130.4px] left-[-9.5px] object-contain z-[2]"
                  alt=""
                  src="/images/airplane-footer.png"
                />
              </div>
            </div>
            );
        };
export default FooterHero;
