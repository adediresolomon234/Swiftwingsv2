"use client";
import React, { useState } from "react";
import Button from "../components/Button";
//import TopSectionPage from "../components/shared/user-dashboard/TopSection";
import TopSectionPage from "../components/shared/user-dashboard/Topsection";
import Image from "next/image";
import logo from "../../public/images/fullLogo.png";
import Link from "next/link";
import { navItems } from "../components/NavItems";
import { SWNeedhelpIcon } from "../components/svgs";
import BookingPageInformation from "../components/bookingPage/BookingPage";
import ProfileCard from "../components/shared/ProfileCard";

const UserBookingPage = () => {
  const [pageState, setPageState] = useState("book-a-jet");
  return (
    <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden bg-swPrimary50 pt-3 px-4 pb-6 ">
      <div className="max-h-screen w-98 rounded-xl bg-white flex flex-col items-start justify-start pt-12 px-5 pb-2 gap-8 max-w-xs w-full">
        <div className="p-5 w-full">
          <div className="flex items-center mb-8">
            <Link href={"/"}>
              <Image src={logo} alt="" />
            </Link>
          </div>
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <div
                className={`${
                  pageState === item.state
                    ? "text-swPrimary500 font-semibold"
                    : "text-swGray700"
                } flex items-center justify-between cursor-pointer`}
                key={item.id}
                onClick={() => setPageState(item.state)}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.name}</span>
                </div>
                {pageState === item.state && (
                  <div className="h-5 p-[0.2rem] rounded-full bg-swPrimary500" />
                )}
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-5 shadow-md rounded-md w-full mb-3">
          <div className="flex items-center mb-2">
            <SWNeedhelpIcon className="text-xl" />
            <span className="ml-2">Need Help?</span>
          </div>
          <p className="mb-4 text-xs">We can attend to any booking issues</p>
          <Button
            label={"Contact support"}
            textColor={
              "w-full text-swPrimary500 border border-swGray100 hover:bg-swPrimary500 hover:text-swSecondary50"
            }
          />
        </div>
      </div>
      <section className="flex flex-col gap-5 w-full p-4 pt-0 md:overflow-auto">
        <TopSectionPage />
        <div className="rounded-xl">
          {pageState === "book-a-jet" && <BookingPageInformation />}
          {pageState === "profile" && <ProfileCard />}
        </div>
      </section>
    </div>
  );
};

export default UserBookingPage;
