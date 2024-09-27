"use client"

import { useState } from "react";
import AllBookings from "./AllBookings";
import { useRouter, useSearchParams } from "next/navigation";
import EachBooking from "./EachBooking";

const Bookings = () => {
  const [pageState, setPageState] = useState("all-bookings");
  const searchParams = useSearchParams();
  // console.log("router", searchParams.get("id"));
  return (
    <div>
      {searchParams.get("id") && <EachBooking />}
      {!searchParams.get("id") && <AllBookings />}
    </div>
  );
};

export default Bookings;
