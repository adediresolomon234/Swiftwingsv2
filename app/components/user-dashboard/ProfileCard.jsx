"use client";

import React, { useState, useEffect } from "react";
import AccountDetailsUpdateCard from "./AccountDetailsUpdate";
import PasswordUpdateCard from "./UserPasswordUpdate";
import InfoSection from "./InfoSection";
import PersonalInfoSection from "./PersonalInfoSection";
import PasswordSection from "./PasswordSection";
import SubscriptionSection from "./SubscriptionSection";

const ProfileCard = ({ subscriptionData }) => {
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
        <div className="flex flex-col gap-4">
          <PersonalInfoSection
            userData={userData}
            onEdit={() => setPageState("update-profile")}
          />
          <PasswordSection
            onChangePassword={() => setPageState("update-password")}
          />

          <SubscriptionSection subscriptionData={subscriptionData} />
        </div>
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
