import React from "react";

const SubscriptionSection = () => {
  // Replace with real data or context as needed
  const planType = "Free";
  const subscriptionEndDate = "2025-02-01";
  const bookingTokensLeft = 3;
  const nextReset = "2025-02-01";
  const price = "$0.00";
  const handleUpgrade = () => {
    // Implement upgrade logic here
    alert("Upgrade to Premium clicked");
  };

  return (
    <div className="p-4 border border-swPrimary200 rounded-lg bg-white">
      <h2 className="text-lg md:text-2xl font-medium mb-5">
        Subscription Plan
      </h2>
      <div className="self-stretch flex flex-col  gap-5 text-gray-700">
        <div className="flex justify-between items-center flex-wrap gap-5 border-y py-3">
          <div className="flex items-center gap-2">
            Plan type:{" "}
            <span className="bg-swSuccess50 text-swSuccess500 h-[35px] w-[144px] rounded-md text-base flex justify-center items-center font-medium">
              {planType}
            </span>
          </div>
          <div className=" flex flex-wrap items-center gap-2">
            <span className="mr-2">Subscription end date:</span>
            <span className="bg-swWarning50 px-2 py-1 rounded text-swWarning500 whitespace-nowrap">
              {subscriptionEndDate}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-5 mt-4 mb-2 flex-wrap w-full">
          <div className="flex items-center gap-5">
            <div className="min-w-[60px] w-[60px] min-h-[60px] h-[60px] flex items-center justify-center rounded-full border-[3px] border-[#8C4964] text-[#8C4964] font-medium text-2xl">
              {bookingTokensLeft}
            </div>
            <div className="flex flex-col justify-between h-full">
              <p className="font-medium -mt-2">Booking tokens left</p>
              <p className="text-xs text-gray-500 mt-2">
                Next Reset: {nextReset}
              </p>
            </div>
          </div>
          <div className="font-medium text-2xl">{price}</div>
        </div>
        <div className="flex justify-end items-center gap-2">
          <button
            // onClick={() => setCompState("view")}
            className="flex items-center justify-center h-[36px] w-[84px] gap-2 rounded-full text-base relative font-medium cursor-pointer border border-swGray800 hover:bg-swPrimary100"
          >
            Cancel
          </button>
          <button
            // onClick={() => setCompState("view")}
            className="flex items-center justify-center rounded-full text-base text-swPrimary500 underline font-medium cursor-pointer"
          >
            Renew Subscription
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSection;
