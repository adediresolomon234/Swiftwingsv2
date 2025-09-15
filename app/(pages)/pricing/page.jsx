"use client";
import React, { useState } from "react";
import { Check, X } from "lucide-react";
import NavAndFooter from "../../components/shared/NavAndFooter";
import SubImage from "../../../public/images/subImage.png";
import Head from "next/head";
import Link from "next/link";

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState("yearly");
  const [showModal, setShowModal] = useState(false);

  const pricing = {
    free: {
      monthly: "$0 / month",
      yearly: "$0 / year",
    },
    premium: {
      monthly: "$999 / month",
      yearly: "$9,999 / year",
    },
  };

  const features = [
    "Unlimited monthly bookings",
    "Access to full charter",
    "Dedicated concierge service",
    "Priority booking & scheduling",
    "24/7 premium assistance",
  ];

  const planPrice = pricing.premium[activeTab];

  return (
    <main>
      <Head>
        <title>
          Private Jet Destinations | Local and International Flights
        </title>
        <meta
          name="description"
          content="Our Private Jet destinations span across Lagos, Abuja, Port Harcourt, Ghana, South Africa, USA, Japan, Australia, France, Italy, Spain, etc."
        />
      </Head>
      <NavAndFooter Nav={true}>
        <section className="py-32">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <h2 className="text-2xl font-semibold lg:text-3xl">
                Membership & Subscriptions
              </h2>
              <p className="text-base">
                SwiftWingsJet membership gives you the freedom to choose. Start
                free, or upgrade to Premium for the complete experience.
              </p>
            </div>
            <div className="tabs py-10">
              <div className="flex justify-center items-center bg-swPrimary500 rounded-full p-1.5 max-w-sm mx-auto">
                <button
                  className={`inline-block w-1/2 text-center transition-all duration-500 rounded-full font-semibold py-3 px-3 lg:px-11 ${
                    activeTab === "monthly"
                      ? "bg-white text-swPrimary500"
                      : "text-gray-400 hover:text-swPrimary500"
                  }`}
                  onClick={() => setActiveTab("monthly")}
                  aria-selected={activeTab === "monthly"}
                  role="tab"
                >
                  Bill Monthly
                </button>
                <button
                  className={`inline-block w-1/2 text-center transition-all duration-500 rounded-full font-semibold py-3 px-3 lg:px-11 ${
                    activeTab === "yearly"
                      ? "bg-white text-swPrimary500"
                      : "text-gray-400 hover:text-swPrimary500"
                  }`}
                  onClick={() => setActiveTab("yearly")}
                  aria-selected={activeTab === "yearly"}
                  role="tab"
                >
                  Bill Yearly
                </button>
              </div>
              <div className="mt-20 grid gap-6 md:grid-cols-3">
                <div
                  className="relative text-white rounded-lg shadow-lg p-6 max-w-sm h-full flex items-end"
                  style={{
                    backgroundImage: `url(${SubImage.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
                  <div className="relative z-10 p-2 w-full text-start">
                    <h2 className="text-xl font-semibold mb-2">
                      Choose the Perfect Plan for Your Travel Needs
                    </h2>
                    <div className="border-t border-gray-600 my-2"></div>
                    <p className="text-sm">
                      Start with Free and enjoy up to 3 bookings a month with
                      basic services, or unlock unlimited travel, concierge, and
                      exclusive perks with Premium.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col p-6 max-w-sm text-start text-gray-900 bg-white rounded-lg border border-swPrimary500 shadow-lg h-full">
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-4 overflow-auto">
                      <div>
                        <h2 className="text-lg font-medium">Free</h2>
                        <span className="my-3 block text-xl font-semibold">
                          {pricing.free[activeTab]}
                        </span>
                        <p className="text-xs text-gray-500">
                          A simple way to explore private jet travel perfect for
                          new travelers.
                        </p>
                      </div>
                      <hr className="border-dashed border-gray-300" />
                      <ul className="space-y-3 pl-5 text-sm text-gray-700">
                        {[
                          "Maximum of 3 bookings",
                          "Empty leg flights only",
                          "Basic concierge support",
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-swPrimary500 mr-2">
                              <Check className="w-3 h-3 text-white" />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-8">
                      <p className="text-xs text-gray-500">
                        Start with Free. Upgrade to Premium anytime in your
                        account settings.
                      </p>
                    </div>
                    <div className="space-y-4 mt-auto">
                      <hr className="border-dashed border-gray-300" />
                      <Link
                        href="/signup"
                        className="inline-block w-full py-2 px-4 bg-swPrimary500 text-white font-semibold rounded-2xl hover:bg-swPrimary500 text-center"
                      >
                        Join for free
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col p-6 max-w-sm text-start text-gray-900 bg-white rounded-lg border border-swPrimary500 shadow-lg h-full">
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-4 overflow-auto">
                      <div>
                        <h2 className="text-lg font-medium">Premium</h2>
                        <span className="my-3 block text-xl font-semibold">
                          {pricing.premium[activeTab]}
                        </span>
                        <p className="text-xs text-gray-500">
                          The complete SwiftWing experience without limits
                        </p>
                      </div>
                      <hr className="border-dashed border-gray-300" />
                      <ul className="space-y-3 pl-5 text-sm text-gray-700">
                        {features.map((item, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-swPrimary500 mr-2">
                              <Check className="w-3 h-3 text-white" />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-6">
                      <p className="text-xs text-gray-500">
                        Don’t limit your journeys, experience freedom in the
                        skies with SwiftWingsJet Premium.
                      </p>
                    </div>
                    <div className="space-y-4 mt-auto">
                      <hr className="border-dashed border-gray-300" />
                      <button
                        onClick={() => setShowModal(true)}
                        className="inline-block w-full py-2 px-4 border border-swPrimary500 text-gray-600 font-semibold rounded-2xl hover:bg-swPrimary500 hover:text-white text-center"
                      >
                        Upgrade to Premium
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div
                  className="absolute inset-0 bg-black bg-opacity-50"
                  onClick={() => setShowModal(false)}
                />
                <div className="relative bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl z-10 max-h-[90vh] flex flex-col">
                  <button
                    className="absolute top-4 right-4 flex items-center justify-center w-4 h-4 rounded-full border text-gray-900 "
                    onClick={() => setShowModal(false)}
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <div className="flex-1 flex flex-col border border-swPrimary500 rounded-xl p-6">
                    <div className="space-y-4 overflow-y-auto pr-2">
                      <h2 className="text-xl font-semibold mb-2 text-center">
                        Confirm Premium Subscription
                      </h2>
                      <p className="text-sm text-gray-500 mb-4 text-center">
                        You are about to subscribe to SwiftWingsJet Premium:
                      </p>

                      <div className="flex justify-between items-center border rounded-lg p-4 mb-4">
                        <span className="font-medium">Premium Plan</span>
                        <span className="font-semibold text-lg">
                          {planPrice}
                        </span>
                      </div>
                      <ul className="space-y-3 pl-5 text-sm text-gray-700">
                        {features.map((item, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-swPrimary500 mr-2">
                              <Check className="w-3 h-3 text-white" />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="bg-yellow-100 text-yellow-800 text-xs p-3 rounded-md">
                        Important: You will be charged immediately. You can
                        cancel anytime from your account settings. Billing is
                        handled securely by Stripe.
                      </div>
                    </div>
                    <div className="mt-4">
                      <hr className="border-dashed border-gray-300 mb-4" />
                      <button
                        onClick={() => {
                          console.log(
                            "Proceeding to Stripe payment for",
                            planPrice
                          );
                          setShowModal(false);
                        }}
                        className="inline-block w-full py-2 px-4 bg-swPrimary500 text-white font-semibold rounded-2xl hover:bg-swPrimary600 text-center"
                      >
                        Continue to payment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <p className="text-base">
                All members enjoy access to SwiftWingsJet. Premium unlocks the
                full luxury experience. Billing powered by Stripe.{" "}
                <a href="#" className="text-blue-500 underline ml-1">
                  Cancel anytime.
                </a>
              </p>
            </div>
          </div>
        </section>
      </NavAndFooter>
    </main>
  );
}
