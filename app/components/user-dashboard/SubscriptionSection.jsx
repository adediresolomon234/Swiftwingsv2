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
    <div className="self-stretch flex flex-col gap-2 text-gray-700 p-4 border border-swGray300 rounded-lg mx-5">
      <div className="flex justify-between items-center flex-wrap">
        <div className="flex items-center gap-2 mb-2">
          Plan type:{" "}
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
            {planType}
          </span>
        </div>
        <div className="">
          <span className="mr-2">Subscription end date:</span>
          <span className="bg-gray-100 px-2 py-1 rounded text-gray-700">
            {subscriptionEndDate}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-5 mt-4 mb-2 flex-wrap w-full">
        <div className="flex items-center gap-5">
          <div className="min-w-[60px] w-[60px] min-h-[60px] h-[60px] flex items-center justify-center rounded-full border-[3px] border-[#8C4964] text-[#8C4964] font-bold text-2xl">
            {bookingTokensLeft}
          </div>
          <div className="flex flex-col justify-between h-full">
            <p className="font-medium -mt-2">Booking tokens left</p>
            <p className="text-xs text-gray-500 mt-2">
              Next Reset: {nextReset}
            </p>
          </div>
        </div>
        <div className="font-bold text-lg">{price}</div>
      </div>
    </div>
  );
};

export default SubscriptionSection;
