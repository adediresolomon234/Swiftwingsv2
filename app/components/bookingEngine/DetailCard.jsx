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
      className={`flex h-[5.5rem] z-10 pl-5 relative w-full items-center gap-5 border backdrop-blur cursor-pointer text-base font-normal ${
        pathname === "/"
          ? "border-swGray900 bg-swBlack/40 hover:bg-swBlack/40"
          : ""
      } ${rounded_css ? rounded_css : "rounded-2xl"}`}
      onClick={onClick}
    >
      {icon && (
        <>
          {icon_bg ? (
            <div className="bg-swPrimary500 p-1 rounded-full text-white">
              <div className="h-7 w-7 relative flex justify-center items-center">
                {icon}
              </div>
            </div>
          ) : (
            icon
          )}
        </>
      )}
      <div>
        <p className="text-swGray400 text-sm">{headerText}</p>
        <p
          className={`${
            pathname == "/" ? "text-white" : "text-swGray900"
          }  font-medium`}
        >
          {children}
        </p>
      </div>
    </div>
  );
};

export default DetailCard;
