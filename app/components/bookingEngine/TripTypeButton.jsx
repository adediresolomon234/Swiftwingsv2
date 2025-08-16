"use client";
import { usePathname } from "next/navigation";

const TripTypeButton = ({ type, isActive, onClick }) => {
  const pathname = usePathname();
  const activeClasses =
    pathname === "/"
      ? "text-black bg-white/20 backdrop-blur-md border border-white/30 shadow-lg"
      : "text-black bg-swPrimary500 border border-swPrimary600 shadow-md";
  const inactiveClasses =
    pathname === "/"
      ? "text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
      : "text-slate-600 hover:text-slate-800 hover:bg-gray-100 transition-all duration-200";

  return (
    <button
      className={`${
        isActive ? `${activeClasses} font-semibold` : inactiveClasses
      } py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200`}
      onClick={onClick}
    >
      {type}
    </button>
  );
};

export default TripTypeButton;
