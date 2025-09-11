import React from "react";

const InfoSection = ({ title, description, titleSide, children }) => (
  <div className="w-full relative bg-white overflow-hidden flex flex-col items-start justify-start box-border text-left text-base text-gray-800 font-body-md-regular">
    <div className="self-stretch flex flex-row flex-wrap items-center justify-between p-5 pb-0">
      <div>
        <h2 className="text-2xl font-medium">{title}</h2>
        <p className="text-base text-swGray600">{description}</p>
      </div>
      {titleSide && <div>{titleSide}</div>}
    </div>
    {children}
  </div>
);

export default InfoSection;
