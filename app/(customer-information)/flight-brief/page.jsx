import React from "react";
import NavAndFooter from "../../components/shared/NavAndFooter";
import FlightBriefPageComp from "../../components/flight-brief/FlightBriefPageComp";

const FlightBriefPage = () => {
  return (
    <div className="bg-gray-50">
      <NavAndFooter Nav={true}>
        <FlightBriefPageComp />
      </NavAndFooter>
    </div>
  );
};

export default FlightBriefPage;
