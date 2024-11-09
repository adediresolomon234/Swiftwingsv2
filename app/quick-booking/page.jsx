"use client";
import NavAndFooter from "@/app/components/shared/NavAndFooter";
import BookingPageInformation from "../components/bookingPage/BookingPage";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const BookJet = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <NavAndFooter Nav={true}>
      <div className="py-24 bg-white px-5">
        <BookingPageInformation />
      </div>
    </NavAndFooter>
  );
};

export default BookJet;
