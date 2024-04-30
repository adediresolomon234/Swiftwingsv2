import { useState } from "react";
import AllBookings from "./AllBookings";

const Bookings = () => {
  const [pageState, setPageState] = useState("all-bookings");

  return <div>{pageState === "all-bookings" && <AllBookings />}</div>;
};

export default Bookings;
