import { GoSignOut } from "react-icons/go";
import {
  SWBookingIcon,
  SwUserIcon,
  SwDeparturePlaneIcon,
  CancelFlight,
  SWBooking2Icon,
} from "../components/svgs";

export const navItems = [
  {
    id: 1,
    name: "Book a Jet",
    icon: <SwDeparturePlaneIcon className="text-2xl -mr-1" />,
    state: "book-a-jet",
  },
  {
    id: 2,
    name: "Bookings",
    icon: <SWBooking2Icon className="text-xl" />,
    state: "bookings",
  },
  {
    id: 3,
    name: "EmptyLegs",
    icon: <CancelFlight className="text-xl" />,
    state: "emptylegs",
  },
  {
    id: 4,
    name: "Profile",
    icon: <SwUserIcon className="text-xl" />,
    state: "profile",
  },
];
