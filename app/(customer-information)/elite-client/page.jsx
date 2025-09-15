import EliteClientPageComp from "../../components/elite-client/EliteClientPageComp";
import NavAndFooter from "../../components/shared/NavAndFooter";

const FlightBriefPage = () => {
  return (
    <div className="bg-gray-50">
      <NavAndFooter Nav={true}>
        <EliteClientPageComp />
      </NavAndFooter>
    </div>
  );
};

export default FlightBriefPage;
