"use client";

import { PuffLoader } from "react-spinners";

const Button = ({
  onClick,
  bgColor,
  textColor,
  label,
  startIcon,
  endIcon,
  className,
  disabled,
  loader,
  loaderSize,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={` ${bgColor ? bgColor : "bg-white"} ${
        textColor ? textColor : "text-gray-400"
      } py-3 px-6 rounded-full flex justify-center items-center gap-2 relative overflow-hidden ${
        disabled && "cursor-not-allowed"
      } ${className}`}
    >
      {startIcon && <span>{startIcon}</span>}
      {loader && (
        <div className="mr-2 -mt-2">
          <PuffLoader size={loaderSize || 4} color="#d5d5d5" />
        </div>
      )}
      <span className="text-center">{label}</span>
      {endIcon && <span>{endIcon}</span>}
      {disabled && (
        <div
          className={`absolute h-full w-full top-0 left-0 bg-white bg-opacity-35`}
        ></div>
      )}
    </button>
  );
};

export default Button;
