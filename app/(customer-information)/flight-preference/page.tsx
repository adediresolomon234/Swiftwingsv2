import NavAndFooter from "../../components/shared/NavAndFooter";
import PerFlightPreferencePageComp from "../../components/perflight-preference/PerFlightPreferencePageComp";

const FlightPreferencePage = () => {
  return (
    <div className="bg-gray-50">
      <NavAndFooter Nav={true}>
        <PerFlightPreferencePageComp />
      </NavAndFooter>
    </div>
  );
};

export default FlightPreferencePage;
