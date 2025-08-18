"use client";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import FleetImage234 from "../../../../public/images/FleetImage234.png";
import NavAndFooter from "../../../components/shared/NavAndFooter";
import FooterHero from "../../../components/shared/footerHero";
import FleetSpecSlider from "../../../components/shared/Fleetspec/FleetSpecSlider";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import { fetchAircrafts } from "../../../../redux/slices/aircraftdetails";
import { useDispatch } from "react-redux";
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
  const [isVisible, setIsVisible] = useState(false);

  const [aircraftDetails, setAircraftDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //     if (id) {
  //         fetchAircraftDetails(id).then(details => {
  //             setAircraftDetails(details);
  //         }).catch(error => {
  //             console.error('Error fetching aircraft details:', error);
  //         });
  //     }
  // }, [id]);

  // console.log(aircraftDetails);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    dispatch(fetchAircrafts())
      .unwrap()
      .then((res) => {
        console.log(res);

        const aircraft = res.find((aircraft) => aircraft.id === id);
        console.log({ aircraft });
        setAircraftDetails(aircraft);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleQuickBooking = () => {
    // Navigate to booking page or open booking modal
    router.push('/booking');
  };

  // Get the primary image for the hero section
  const getPrimaryImage = (aircraft) => {
    return aircraft?.image || FleetImage234;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="relative bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <NavAndFooter Nav={true}>
        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={handleQuickBooking}
            className="bg-swPrimary500 hover:bg-swPrimary600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group"
            title="Quick Booking"
          >
            <div className="flex items-center space-x-2">
              <span className="text-md font-medium">Book Now</span>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </button>
        </div>

        {/* Hero Section */}
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
          {aircraftDetails && (
            <>
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={getPrimaryImage(aircraftDetails)}
                  alt={`${aircraftDetails.features?.manufacturer || 'Aircraft'} ${aircraftDetails.name || ''}`}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
              </div>
              
              {/* Content */}
              <div className={`relative z-10 text-center text-white max-w-6xl mx-auto px-6 pt-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="mb-8">
                  <h1 className="text-5xl md:text-7xl font-medium mb-6 leading-tight text-shadow">
                    {aircraftDetails.features?.manufacturer} {aircraftDetails.name}
                  </h1>
                  <p className="text-xl md:text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
                    {aircraftDetails.features?.classification}
                  </p>
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover-lift">
                    <div className="flex items-center justify-center mb-3">
                      <SWGlobeIcon className="text-3xl text-swPrimary200" />
                    </div>
                    <div className="text-lg font-medium text-white mb-1">
                      {aircraftDetails.kilometer}
                    </div>
                    <div className="text-sm text-gray-300">Range</div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover-lift">
                    <div className="flex items-center justify-center mb-3">
                      <SwSeatIcon className="text-3xl text-swPrimary200" />
                    </div>
                    <div className="text-lg font-medium text-white mb-1">
                      {aircraftDetails.features?.no_of_seats}
                    </div>
                    <div className="text-sm text-gray-300">Passengers</div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover-lift">
                    <div className="flex items-center justify-center mb-3">
                      <SwMeterIcon className="text-3xl text-swPrimary200" />
                    </div>
                    <div className="text-lg font-medium text-white mb-1">
                      {aircraftDetails.speed}
                    </div>
                    <div className="text-sm text-gray-300">Speed</div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover-lift">
                    <div className="flex items-center justify-center mb-3">
                      <SWTLocationIcon className="text-3xl text-swPrimary200" />
                    </div>
                    <div className="text-md font-medium text-white mb-1">
                      {aircraftDetails.location}
                    </div>
                    <div className="text-sm text-gray-300">Location</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>

        {/* Overview Section */}
        {aircraftDetails && (
          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-medium text-swPrimary700 mb-6">
                  Aircraft Overview
                </h2>
                <div className="w-24 h-1 bg-swPrimary500 mx-auto rounded-full"></div>
              </div>
              
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200 hover-lift">
                <div className="max-w-4xl mx-auto text-center">
                  <p className="text-xl md:text-lg text-slate-700 leading-relaxed font-medium">
                    {aircraftDetails.features?.overview_summary}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Specifications Section */}
        {aircraftDetails && (
          <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-medium text-swPrimary700 mb-6">
                  Technical Specifications
                </h2>
                <div className="w-24 h-1 bg-swPrimary500 mx-auto rounded-full mt-6"></div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover-lift">
                  <h3 className="text-md font-medium text-swPrimary700 mb-3">Luggage Capacity</h3>
                  <p className="text-lg font-medium text-slate-800">{aircraftDetails.feet}</p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-lg hover-lift">
                  <h3 className="text-md font-medium text-swPrimary700 mb-3">Interior Height</h3>
                  <p className="text-lg font-medium text-slate-800">{aircraftDetails.features?.interior_height}</p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-lg hover-lift">
                  <h3 className="text-md font-medium text-swPrimary700 mb-3">Interior Width</h3>
                  <p className="text-lg font-medium text-slate-800">{aircraftDetails.features?.interior_width}</p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-lg hover-lift">
                  <h3 className="text-md font-medium text-swPrimary700 mb-3">Aircraft Type</h3>
                  <p className="text-lg font-medium text-slate-800">Helicopter</p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-lg hover-lift">
                  <h3 className="text-md font-medium text-swPrimary700 mb-3">Aircraft Name</h3>
                  <p className="text-xl font-medium text-slate-800">{aircraftDetails.name}</p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-lg hover-lift">
                  <h3 className="text-md font-medium text-swPrimary700 mb-3">Classification</h3>
                  <p className="text-md font-medium text-slate-800">{aircraftDetails.features?.classification}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        {aircraftDetails?.features && aircraftDetails.features.length > 0 && (
          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-medium text-swPrimary700 mb-6">
                  Key Features
                </h2>
                <div className="w-24 h-1 bg-swPrimary500 mx-auto rounded-full mt-6"></div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {aircraftDetails.features.map((feature, index) => (
                  <div key={index} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 shadow-lg hover-lift border border-slate-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-swPrimary500 rounded-full"></div>
                      <p className="text-md font-medium text-slate-800">{feature}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Interactive Gallery Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-medium text-swPrimary700 mb-6">
                Photo Gallery
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Explore every detail of this magnificent aircraft through our interactive image gallery
              </p>
              <div className="w-24 h-1 bg-swPrimary500 mx-auto rounded-full mt-6"></div>
            </div>
            
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
