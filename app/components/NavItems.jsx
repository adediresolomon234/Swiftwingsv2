import {
    SwArrivalPlaneIcon, SWBookingIcon, SwUserIcon,SWNeedhelpIcon
  } from "../components/svgs";


  export const navItems = [
    {
        id: 1,
        name: "Booking a Jet",
        icon: <SwArrivalPlaneIcon className="text-xl" />,
        href: "/userprofile" 
      },
      {
        id: 2,
        name: "Booking",
        icon: <SWBookingIcon className="text-xl" />,
        href: "/booking" 
      },
      {
        id: 3,
        name: "User",
        icon: <SwUserIcon className="text-xl"/>,
        href: "/profile-page" 
      },
     
    ]
