"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";

import FleetImage234 from "../../../../public/images/FleetImage234.png";
import NavAndFooter from "../../../components/shared/NavAndFooter";
import FooterHero from "../../../components/shared/footerHero";
import FleetSpecSlider from "../../../components/shared/Fleetspec/FleetSpecSlider";
import Loading from "../../../components/Loading";
import { fetchAircrafts } from "../../../../redux/slices/aircraftdetails";

import {
  SWGlobeIcon,
  SwSeatIcon,
  SwMeterIcon,
  SWTLocationIcon,
} from "../../../components/svgs";

const FleetSpec = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [aircraftDetails, setAircraftDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchAircrafts())
      .unwrap()
      .then((res) => {
        const aircraft = res.find((a) => a?.id === id);
        setAircraftDetails(aircraft || null);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleQuickBooking = () => router.push("/booking");

  const primaryImage = useMemo(
    () => aircraftDetails?.image || FleetImage234,
    [aircraftDetails]
  );

  if (loading) return <Loading />;
  if (!aircraftDetails)
    return <div className="p-10 text-center">No aircraft found</div>;

  // quick stats config
  const stats = [
    {
      icon: <SWGlobeIcon />,
      value: aircraftDetails?.kilometer,
      label: "Range",
    },
    {
      icon: <SwSeatIcon />,
      value: aircraftDetails?.features?.no_of_seats,
      label: "Passengers",
    },
    { icon: <SwMeterIcon />, value: aircraftDetails?.speed, label: "Speed" },
    {
      icon: <SWTLocationIcon />,
      value: aircraftDetails?.location,
      label: "Location",
    },
  ];

  // technical specifications config
  const specifications = [
    { label: "Luggage Capacity", value: aircraftDetails?.feet },
    {
      label: "Interior Height",
      value: aircraftDetails?.features?.interior_height,
    },
    {
      label: "Interior Width",
      value: aircraftDetails?.features?.interior_width,
    },
    { label: "Aircraft Type", value: "Helicopter" },
    { label: "Aircraft Name", value: aircraftDetails?.name },
    {
      label: "Classification",
      value: aircraftDetails?.features?.classification,
    },
  ];

  return (
    <main className="relative bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <NavAndFooter Nav={true}>
        {/* Floating Book Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={handleQuickBooking}
            className="bg-swPrimary500 hover:bg-swPrimary600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group"
            title="Quick Booking"
          >
            <div className="flex items-center space-x-2">
              <span className="text-md font-medium">Book Now</span>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </button>
        </div>

        {/* Hero Section */}
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={primaryImage}
              alt={`${aircraftDetails?.features?.manufacturer || "Aircraft"} ${
                aircraftDetails?.name || ""
              }`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div
            className={`relative z-10 text-center text-white max-w-6xl mx-auto px-6 pt-20 pb-5 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-medium mb-6 leading-tight text-shadow">
              {aircraftDetails?.features?.manufacturer} {aircraftDetails?.name}
            </h1>
            <p className="text-xl md:text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
              {aircraftDetails?.features?.classification}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-black/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex justify-center mb-3 text-swPrimary200 text-3xl">
                    {stat.icon}
                  </div>
                  <div className="text-lg font-medium text-white">
                    {stat.value || "-"}
                  </div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-medium text-swPrimary700 mb-6">
              Aircraft Overview
            </h2>
            <div className="w-24 h-1 bg-swPrimary500 mx-auto mb-12 rounded-full"></div>
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-3xl p-8 shadow-xl border border-slate-200">
              <p className="text-xl text-slate-700 leading-relaxed font-medium">
                {aircraftDetails?.features?.overview_summary}
              </p>
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-medium text-swPrimary700 mb-6">
              Technical Specifications
            </h2>
            <div className="w-24 h-1 bg-swPrimary500 mx-auto mb-12 rounded-full"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {specifications.map((spec, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-md font-medium text-swPrimary700 mb-3">
                    {spec.label}
                  </h3>
                  <p className="text-lg font-medium text-slate-800">
                    {spec.value || "-"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        {Array.isArray(aircraftDetails?.features?.list) &&
          aircraftDetails.features.list.length > 0 && (
            <section className="py-20 bg-white">
              <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-medium text-swPrimary700 mb-6">
                  Key Features
                </h2>
                <div className="w-24 h-1 bg-swPrimary500 mx-auto mb-12 rounded-full"></div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {aircraftDetails.features.list.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 shadow-lg border border-slate-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-swPrimary500 rounded-full"></div>
                        <p className="text-md font-medium text-slate-800">
                          {feature}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

        {/* Gallery */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-medium text-swPrimary700 mb-6">
              Photo Gallery
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-6">
              Explore every detail of this magnificent aircraft through our
              interactive image gallery
            </p>
            <div className="w-24 h-1 bg-swPrimary500 mx-auto mb-12 rounded-full"></div>
            <div className="max-w-5xl mx-auto">
              <FleetSpecSlider aircraft={aircraftDetails} />
            </div>
          </div>
        </section>

        {/* Footer Hero */}
        <section className="py-16 bg-slate-50">
          <div className="xl:container m-auto px-6 text-gray-600 md:px-12 xl:px-16">
            <FooterHero />
          </div>
        </section>
      </NavAndFooter>
    </main>
  );
};

export default FleetSpec;
