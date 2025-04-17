"use client";
import { usePathname } from "next/navigation";

const TripTypeButton = ({ type, isActive, onClick }) => {
  const pathname = usePathname();
  const activeClasses =
    pathname === "/"
      ? "text-white backdrop-blur bg-none md:bg-swBlack/50"
      : "text-swGray300 bg-white";
  const inactiveClasses =
    "text-swGray300 font-medium hover:backdrop-blur hover:bg-white/5";

  return (
    <button
      className={`${
        isActive ? `${activeClasses} font-semibold` : inactiveClasses
      } py-2 px-4 rounded-full text-sm md:text-lg`}
      onClick={onClick}
    >
      {type}
    </button>
  );
};

export default TripTypeButton;
