import EliteClientPageComp from "../../components/elite-client/EliteClientPageComp";
// import PerFlightPreferencePageComp from "../../components/perflight-preference/PerFlightPreferencePageComp";
import NavAndFooter from "../../components/shared/NavAndFooter";

const FlightBriefPage = () => {
  return (
    <div className="bg-gray-50">
      <NavAndFooter Nav={true}>
        <EliteClientPageComp />
        {/* <PerFlightPreferencePageComp /> */}
      </NavAndFooter>
    </div>
  );
};

export default FlightBriefPage;
