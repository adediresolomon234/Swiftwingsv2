import Button from "../Button";

import React from 'react';

    const Footer = () => {
        return (

            <footer className="w-full relative rounded-3xl bg-swWine relative flex flex-col items-center overflow-hidden py-20 md:py-40">
            <div className="mb-16 mx-auto max-w-[990px]">
                <h2 className="mb-4 text-center text-[38px] text-white dark:text-white md:text-[38px]">
                    Let’s work together
                </h2>
                <p className="text-white dark:text-gray-300 mt-8 text-xl text-center sm:text-xl md:text-xl">
                    Swift Wings Ltd offers an exclusive Jet Card Membership, providing discerning travelers with unparalleled access to private jet charter services. As a Jet Card member, you enjoy priority booking and seamless travel experiences tailored to your preferences.
                </p>
            </div>
            <div className="flex justify-center mt-12">
            <Button
                  label="Contact Us"
                  textColor={"text-gray-700"}
                />
              </div>
        </footer>
    );
};

     
    export default Footer;
