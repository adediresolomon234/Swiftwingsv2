import { usePathname } from "next/navigation";
import React from "react";

const DetailCard = ({
  icon,
  icon_bg,
  onClick,
  headerText,
  rounded_css,
  children,
}) => {
  const pathname = usePathname();
  return (
    <div
      className={`flex h-[4.5rem] z-10 px-4 py-3 relative w-full items-center gap-4 border cursor-pointer text-base font-normal transition-all duration-200 hover:shadow-md ${
        pathname === "/"
          ? "border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20"
          : "border-gray-200 bg-white hover:border-gray-300"
      } ${rounded_css ? rounded_css : "rounded-xl"}`}
      onClick={onClick}
    >
      {icon && (
        <>
          {icon_bg ? (
            <div className="bg-swPrimary500 p-2.5 rounded-full text-white shadow-lg flex-shrink-0">
              <div className="h-6 w-6 relative flex justify-center items-center">
                {icon}
              </div>
            </div>
          ) : (
            <div className="text-slate-600 flex-shrink-0">
              <div className="h-6 w-6 relative flex justify-center items-center">
                {icon}
              </div>
            </div>
          )}
        </>
      )}
      <div className="flex-1 min-w-0 text-left w-full">
        <p className={`text-xs font-medium uppercase tracking-wide mb-1 ${
          pathname === "/" ? "text-white/70" : "text-slate-500"
        }`}>
          {headerText}
        </p>
        <p
          className={`${
            pathname === "/" ? "text-white" : "text-slate-800"
          } font-semibold text-xs leading-tight overflow-hidden text-ellipsis whitespace-nowrap`}
        >
          {children}
        </p>
      </div>
    </div>
  );
};

export default DetailCard;
