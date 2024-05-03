"use client";
import React, { useState } from "react";
import TopSectionPage from "../components/user-dashboard/Topsection";
import BookingPageInformation from "../components/bookingPage/BookingPage";
import ProfileCard from "../components/user-dashboard/ProfileCard";
import Bookings from "../components/user-dashboard/Bookings";
import UserDashBoardNav from "../components/user-dashboard/userDashBoardNav";

const UserBookingPage = () => {
  const [pageState, setPageState] = useState("book-a-jet");
  return (
    <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden bg-swPrimary50 pt-3 px-4 pb-6 ">
      <div className="w-1/4 hidden xl:block">
        <UserDashBoardNav pageState={pageState} setPageState={setPageState} />
      </div>
      <section className="flex flex-col p-0 md:p-4 gap-5 w-full overflow-auto">
        <TopSectionPage pageState={pageState} setPageState={setPageState} />
        <div className="rounded-xl">
          {pageState === "book-a-jet" && <BookingPageInformation />}
          {pageState === "bookings" && <Bookings />}
          {pageState === "profile" && <ProfileCard />}
        </div>
      </section>
    </div>
  );
};

export default UserBookingPage;
