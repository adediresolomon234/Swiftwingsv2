"use client";
import React, { useEffect, useState } from "react";

const InputField = ({
  css,
  label,
  placeholder,
  inputType,
  borderColor,
  onChange,
  value,
  name,
  endIcon,
  startIcon,
  disabled,
}) => {
  return (
    <div className="">
      {label && (
        <label htmlFor={name} className=" text-swGray800 text-sm mb-2">
          {label}
        </label>
      )}

      <div
        className={`${css} relative flex items-center cursor-pointer text-swGray800 hover:border-swPrimary500 rounded-lg overflow-hidden border mt-2 ${borderColor} focus:outline-none cursor-pointer ${
          startIcon ? "pl-8" : ""
        } ${endIcon ? "pr-8" : ""}`}
      >
        {startIcon && (
          <div className="absolute inset-y-0 left-3 flex items-center">
            {startIcon}
          </div>
        )}

        <input
          type={inputType ? inputType : "text"}
          id={name}
          name={name}
          placeholder={placeholder}
          className={`w-full h-11 px-3 py-2 font-light cursor-pointer focus:outline-none`}
          onChange={onChange}
          value={value}
          disabled={disabled}
        />

        {endIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 pt-5 pb-5 flex items-center">
            {endIcon}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
