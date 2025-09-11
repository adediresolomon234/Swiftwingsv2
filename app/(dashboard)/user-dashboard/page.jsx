// app/user-dashboard/page.tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import TopSectionPage from "../../components/user-dashboard/Topsection";
import BookingPageInformation from "../../components/bookingPage/BookingPage";
import ProfileCard from "../../components/user-dashboard/ProfileCard";
import Bookings from "../../components/user-dashboard/Bookings";
import EmptyLegsBookings from "../../components/user-dashboard/EmptyLegs";
import UserDashBoardNav from "../../components/user-dashboard/userDashBoardNav";
import { useSearchParams } from "next/navigation";
import Loading from "../../components/Loading";

const UserBookingPage = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  const pageDetails = searchParams.get("page") === "book-a-jet" ? {
    title: "Book a Jet",
    description: "Book a private jet for your next trip",
  } : searchParams.get("page") === "bookings" ? {
    title: "Your Bookings",
    description: "Manage your existing bookings",
  } : searchParams.get("page") === "emptylegs" ? {
    title: "Empty Legs",
    description: "View your empty leg bookings",
  } : searchParams.get("page") === "profile" ? {
    title: "Profile",
    description: "Manage your bookings, subscriptions, and account settings",
  } : null;

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden bg-white">
      <div className="w-[277px] hidden xl:block">
        <UserDashBoardNav />
      </div>
      <section className="flex flex-col w-full overflow-auto">
        <TopSectionPage pageDetails={pageDetails} />
        <div className="rounded-xl">
          {searchParams.get("page") === "book-a-jet" && (
            <BookingPageInformation />
          )}
          {searchParams.get("page") === "bookings" && <Bookings />}
          {searchParams.get("page") === "emptylegs" && <EmptyLegsBookings />}
          {searchParams.get("page") === "profile" && <ProfileCard />}
        </div>
      </section>
    </div>
  );
};

const UserBookingPageWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <UserBookingPage />
  </Suspense>
);

export default UserBookingPageWithSuspense;
