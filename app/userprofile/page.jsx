"use client"
import React from "react";
import Button from "../components/Button";
import TopSectionPage from "../components/shared/user-dashboard/Topsection";
import Image from "next/image";
import logo from "../../public/images/fullLogo.png";
import Link from "next/link";
import { navItems } from "../components/NavItems";
import { SWNeedhelpIcon } from "../components/svgs";
import BookingEngine from "../components/bookingEngine/bookingEngine";

const UserProfilePage = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden bg-swPrimary50 pt-3 px-4 pb-6 ">
      <div className="max-h-screen w-98 rounded-xl bg-white flex flex-col items-start justify-start pt-12 px-10 pb-2 gap-8">
        <div className="flex items-center mb-8">
          <Link href={"/"}>
            <Image src={logo} alt="" />
          </Link>
        </div>
        <nav className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <Link  className="flex items-center space-x-8 text-primary-500" href={item.href} key={item.id}>
                {item.icon}
                <span>{item.name}</span>
           
            </Link>
          ))}
        </nav>
        <div className="mt-auto ">
          <div className="flex items-center mb-2">
            <SWNeedhelpIcon className="text-xl"/>
            <span className="ml-2">Need Help?</span>
          </div>
          <p className="mb-4 text-sm">We can attend to any booking issues</p>
          <Button
            label={"Contact support"}
            textColor={"w-full text-swPrimary500 border border-swGray100 hover:bg-swPrimary500 hover:text-swSecondary50"}
          />
        </div>
      </div>
      <section className="flex flex-col w-full p-4 md:overflow-auto">
        <TopSectionPage />
        <div className="rounded-xl bg-white p-4 mt-8">
       <BookingEngine/>
        </div>
      </section>
    </div>
  );
};

export default UserProfilePage;
