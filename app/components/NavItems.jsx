import {
  SWBookingIcon,
  SwUserIcon,
  SwDeparturePlaneIcon,
} from "../components/svgs";

export const navItems = [
  {
    id: 1,
    name: "Booking a Jet",
    icon: <SwDeparturePlaneIcon className="text-3xl" />,
    state: "book-a-jet",
  },
  {
    id: 2,
    name: "Bookings",
    icon: <SWBookingIcon className="text-xl" />,
    state: "bookings",
  },
  {
    id: 3,
    name: "User",
    icon: <SwUserIcon className="text-xl" />,
    state: "profile",
  },
];
