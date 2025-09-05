"use client";
import React from "react";
import { motion } from "framer-motion";
import NavAndFooter from "../components/shared/NavAndFooter";
import { Check } from "lucide-react";
import HeroJet from "../../public/images/hero-jet.jpg";
import Image from "next/image";
import Head from "next/head";

export default function PricingPage() {
  const primaryColor = "#5c0632";
  
  return (
    <main className="relative bg-swLightBgGray">
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
        <div className="bg-white min-h-screen text-gray-900">
          {/* Hero Section */}
          <section className="relative w-full h-[500px] md:h-[650px] flex items-center justify-center text-center px-6">
            <div className="absolute inset-0">
              <Image
                src={HeroJet}
                alt="Private Jet"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-extrabold tracking-wider text-white"
              >
                Fly in Style,{" "}
                <span>Without {" "} Limits</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mt-6 text-lg md:text-xl text-gray-200 tracking-wide"
              >
                Choose the perfect plan for your journey. Whether it’s casual
                travel or VIP luxury, we’ve got you covered.
              </motion.p>
            </div>
          </section>

          {/* Pricing Section */}
          <section className="px-6 py-20 max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
            {/* Free Plan */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-50 rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col transition-shadow"
              style={{ boxShadow: `0 0 20px ${primaryColor}30` }}
            >
              <h3 className="text-2xl font-bold">Free Plan</h3>
              <p className="text-gray-500 mt-2">
                Experience private jet booking basics.
              </p>
              <p className="mt-6 text-4xl font-extrabold text-gray-900">
                $0<span className="text-lg font-normal">/mo</span>
              </p>
              <ul className="mt-8 space-y-4 flex-1">
                {["Basic booking access", "Up to 3 flights/month", "Email support"].map((item, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className="w-5 h-5 mr-3" style={{ color: primaryColor }} /> {item}
                  </li>
                ))}
              </ul>
              <button
                className="mt-8 text-white font-bold py-3 rounded-lg transition"
                style={{ backgroundColor: primaryColor }}
              >
                Get Started
              </button>
            </motion.div>

            {/* Premium Plan */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl shadow-lg p-8 flex flex-col text-black transition-shadow"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}cc)`,
                boxShadow: `0 0 20px ${primaryColor}50`
              }}
            >
              <h3 className="text-2xl font-bold text-white">Premium Plan</h3>
              <p className="text-gray-100 mt-2">
                Ultimate VIP travel experience.
              </p>
              <p className="mt-6 text-4xl font-extrabold text-white">
                $999<span className="text-lg font-normal">/mo</span>
              </p>
              <ul className="mt-8 space-y-4 flex-1">
                {[
                  "Unlimited bookings",
                  "Access to all empty legs ",
                  "24/7 concierge",
                  "Luxury in-flight dining"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center text-white">
                    <Check className="w-5 h-5 mr-3" style={{ color: "#fff" }} /> {item}
                  </li>
                ))}
              </ul>
              <button
                className="mt-8 text-black-900 font-bold py-3 rounded-lg transition"
                style={{ backgroundColor: "#ffff" }}
              >
                Upgrade Now
              </button>
            </motion.div>
          </section>
        </div>
      </NavAndFooter>
    </main>
  );
}
