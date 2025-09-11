"use client";

import React, { useState, useEffect } from "react";
import AccountDetailsUpdateCard from "./AccountDetailsUpdate";
import PasswordUpdateCard from "./UserPasswordUpdate";
import InfoSection from "./InfoSection";
import PersonalInfoSection from "./PersonalInfoSection";
import PasswordSection from "./PasswordSection";
import SubscriptionSection from "./SubscriptionSection";

const ProfileCard = () => {
  const [pageState, setPageState] = useState("profile");
  const [userData, setUserData] = useState(null);
  // const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const userDataString = localStorage.getItem("user");
    setUserData(userDataString ? JSON.parse(userDataString) : null);
  }, []);

  return (
    <div className="pb-10">
      {pageState === "profile" && (
        <>
          <InfoSection
            title="Personal Information"
            description="Manage your personal information"
          >
            <PersonalInfoSection
              userData={userData}
              onEdit={() => setPageState("update-profile")}
            />
          </InfoSection>
          <InfoSection
            title="Password"
            description="Manage your password and security information"
          >
            <PasswordSection
              // showPassword={showPassword}
              // setShowPassword={setShowPassword}
              onChangePassword={() => setPageState("update-password")}
            />
          </InfoSection>
          <InfoSection
            title="Subscription"
            description="Manage your subscription plan"
            titleSide={
              <button
                className="text-[18px] text-swPrimary500 hover:underline"
                // onClick={handleUpgrade}
              >
                Upgrade to Premium
              </button>
            }
          >
            <SubscriptionSection />
          </InfoSection>
        </>
      )}
      {pageState === "update-profile" && (
        <AccountDetailsUpdateCard setPageState={setPageState} />
      )}
      {pageState === "update-password" && (
        <PasswordUpdateCard setPageState={setPageState} />
      )}
    </div>
  );
};

export default ProfileCard;
