// app/user-dashboard/page.tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import TopSectionPage from "../components/user-dashboard/Topsection";
import BookingPageInformation from "../components/bookingPage/BookingPage";
import ProfileCard from "../components/user-dashboard/ProfileCard";
import Bookings from "../components/user-dashboard/Bookings";
import UserDashBoardNav from "../components/user-dashboard/userDashBoardNav";
import { useSearchParams } from "next/navigation";
import Loading from "../components/Loading";

const UserBookingPage = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden bg-swPrimary50 p-5 ">
      <div className="w-1/4 hidden xl:block">
        <UserDashBoardNav />
      </div>
      <section className="flex flex-col ml-0 xl:ml-5 gap-5 w-full overflow-auto">
        <TopSectionPage />
        <div className="rounded-xl">
          {searchParams.get("page") === "book-a-jet" && (
            <BookingPageInformation />
          )}
          {searchParams.get("page") === "bookings" && <Bookings />}
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
