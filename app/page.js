"use client";
import { useState, useEffect, useRef } from "react";
import { Space_Grotesk, Libre_Baskerville } from "next/font/google";
import Image from "next/image";
import Button from "./components/Button";
import { HiArrowRight } from "react-icons/hi";
import "../styles.css";
import { services } from "./components/servicedata";
import { textAreas } from "./components/servicesgrid";
import NavAndFooter from "./components/shared/NavAndFooter";
import heroBgImg from "../public/images/heroBackgroundImage.png";
import MbheroBgImg from "../public/images/Hero-Section-Mobile[1].jpg";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchAircrafts } from "../redux/slices/aircraftdetails";
import { mdiCarSeat, mdiSpeedometer, mdiArrowLeftRight } from "@mdi/js";
import BookingEngine from "./components/bookingEngine/bookingEngine";
import Head from "next/head";
import {
  SWTStarBlackIcon,
  SWTAddPersonBlackIcon,
  SWTSandClockBlackIcon,
  SWTGalaglobeIcon,
} from "./components/svgs";
import { homePageKeywords } from "./components/helpers/relatedKeywords";
import Cubana from "../public/images/cubana.jpg";
import Polaris from "../public/images/polaris-bank.png";
import Odu from "../public/images/Odu'aInvestment.jpg";
import Neveah from "../public/images/Neveah_Home_Assets-01.png";
import Aella from "../public/images/aella.gif";
import Century from "../public/images/century-group.png";
import Gluwa from "../public/images/gluwa.png";
import Zenco from "../public/images/ZencoLogo.jpg";
import Delborough from "../public/images/delborough.png";
import Loading from "./components/Loading";
import Link from "next/link";
import { getHomeData } from "../redux/slices/aviPagesSlice";
import { formatThousand } from "./components/helpers/utils";
import CountUp from "react-countup";
import EmptyLegsSlider from "./components/empty-leg/EmptyLegs";
import Whatsapp from "./components/shared/Whatsapp";

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});
const libre_baskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const aircrafts = useSelector((state) => state?.aircrafts?.aircrafts);
  const [fleet, setFleet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { data: homeData } = useSelector((state) => state?.aviPages);

  console.log("homeData", homeData);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(fetchAircrafts());
    dispatch(getHomeData());
  }, [dispatch]);

  useEffect(() => {
    if (aircrafts.length > 0) {
      setFleet(aircrafts.slice(0, 3));
    }
  }, [aircrafts]);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(0);
  };

  const handleSeeAllClick = () => {
    router.push("/fleet-page");
  };

  useEffect(() => {
    if (typeof window !== "undefined") setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="relative bg-white overflow-x-hidden">
      <Head>
        <title>
          Best Private Jet Charter in Nigeria | Private Jet Fastest Flights | On
          Demand Private Jets Africa
        </title>
        <meta
          name="description"
          content="Enjoy the latest and finest Private Jets in the market, Top-tier concierge services and exclusive empty legs deal."
        />
        <meta name="keywords" content={homePageKeywords} />
      </Head>
      <NavAndFooter Nav={true}>
        {/* Hero Section */}
        <section className="relative w-full min-h-screen flex items-center justify-center">
          <div className="absolute inset-0 w-full h-full">
            {isMobile ? (
              <Image
                src={MbheroBgImg}
                alt="Private Jet Hero"
                fill
                className="object-cover"
                priority
              />
            ) : (
              <Image
                src={heroBgImg}
                alt="Private Jet Hero"
                fill
                className="object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div className="relative z-10 text-center text-white max-w-7xl mx-auto px-6 pt-20">
            <div className="mb-12">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-shadow animate-fade-in">
                The World is Closer to You
              </h1>

              {/* Stats Section */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 justify-center text-center mb-8 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <p className="font-bold text-2xl md:text-3xl mb-1">
                    <CountUp
                      end={homeData?.data?.no_users}
                      duration={2}
                      formattingFn={formatThousand}
                    />
                  </p>
                  <p className="text-xs md:text-sm text-gray-200">
                    Happy Clients
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <p className="font-bold text-2xl md:text-3xl mb-1">
                    <CountUp
                      end={homeData?.data?.no_aircrafts}
                      duration={2}
                      formattingFn={formatThousand}
                    />
                  </p>
                  <p className="text-xs md:text-sm text-gray-200">Aircraft</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <p className="font-bold text-2xl md:text-3xl mb-1">
                    <CountUp
                      end={homeData?.data?.no_bookings}
                      duration={2}
                      formattingFn={formatThousand}
                    />
                  </p>
                  <p className="text-xs md:text-sm text-gray-200">Bookings</p>
                </div>
              </div>
            </div>

            {/* Booking Engine */}
            <div className="max-w-4xl mx-auto">
              <BookingEngine />
            </div>
          </div>
        </section>

        {/* Empty Legs Section */}
        <section className="py-20 bg-white">
          <EmptyLegsSlider />
        </section>

        {/* Why Choose SwiftWings Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-swPrimary700 mb-6">
                Why Choose{" "}
                <span
                  className={`${libre_baskerville?.className} text-swPrimary500 font-bold`}
                >
                  Swift<i className="font-normal">Wings</i>
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
                Experience luxury, convenience, and excellence in every flight
              </p>
              <div className="w-24 h-1 bg-swPrimary500 mx-auto rounded-full"></div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-200">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-swPrimary100 p-4 rounded-full group-hover:bg-swPrimary200 transition-colors duration-300">
                    <SWTStarBlackIcon className="text-3xl text-swPrimary600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-swPrimary700 mb-4 text-center">
                  VIP Treatment
                </h3>
                <p className="text-slate-600 text-center leading-relaxed">
                  Enjoy luxurious comfort, in-flight catering customized to your
                  taste. Get entertained by favorite shows or stay connected
                  with work using free Wi-Fi.
                </p>
              </div>

              <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-200">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-swPrimary100 p-4 rounded-full group-hover:bg-swPrimary200 transition-colors duration-300">
                    <SWTGalaglobeIcon className="text-3xl text-swPrimary600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-swPrimary700 mb-4 text-center">
                  Global Access
                </h3>
                <p className="text-slate-600 text-center leading-relaxed">
                  <span
                    className={`${libre_baskerville?.className} text-swPrimary500 font-bold`}
                  >
                    Swift<i className="font-normal">Wings</i>
                  </span>{" "}
                  grants you exclusive access to private jets for seamless
                  travel anywhere in the globe.
                </p>
              </div>

              <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-200">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-swPrimary100 p-4 rounded-full group-hover:bg-swPrimary200 transition-colors duration-300">
                    <SWTSandClockBlackIcon className="text-3xl text-swPrimary600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-swPrimary700 mb-4 text-center">
                  Save Time
                </h3>
                <p className="text-slate-600 text-center leading-relaxed">
                  Skip the crowds & time wasters! Time is precious. Fly private,
                  fast and secure with{" "}
                  <span
                    className={`${libre_baskerville?.className} text-swPrimary500 font-bold`}
                  >
                    Swift<i className="font-normal">Wings</i>
                  </span>
                  .
                </p>
              </div>

              <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-200">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-swPrimary100 p-4 rounded-full group-hover:bg-swPrimary200 transition-colors duration-300">
                    <SWTAddPersonBlackIcon className="text-3xl text-swPrimary600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-swPrimary700 mb-4 text-center">
                  Membership
                </h3>
                <p className="text-slate-600 text-center leading-relaxed">
                  Network with high profile individuals and get access to
                  premium services: unlimited private jet access, personalized
                  travel experience, priority scheduling.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-swPrimary700 mb-6">
                Our Services
              </h2>
              <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
                We offer world-class exotic experience
              </p>
              <div className="w-24 h-1 bg-swPrimary500 mx-auto rounded-full"></div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {services?.map((service, index) => (
                <div key={index} className="group">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                    <div className="aspect-[4/5] relative">
                      <Image
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                        src={service?.imageSrc}
                        alt={service?.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="bg-black/40 backdrop-blur-sm rounded-t-2xl p-4 -mt-4">
                        <h4 className="text-xl font-bold mb-2 text-white">
                          {service?.title}
                        </h4>
                        <p className="text-sm text-gray-100 leading-relaxed">
                          {service?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fleet Showcase Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-swPrimary700 mb-6">
                Our Premium Fleet
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
                Discover our exclusive collection of luxury aircraft, each
                designed for unparalleled comfort and performance
              </p>
              <div className="w-24 h-1 bg-swPrimary500 mx-auto rounded-full"></div>
            </div>

            {/* Featured Aircraft Display */}
            <div className="mb-16">
              {hoveredIndex >= 0 && fleet[hoveredIndex]?.image && (
                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white">
                  <div className="aspect-[16/9] relative">
                    <Image
                      className="w-full h-full object-cover"
                      src={fleet[hoveredIndex]?.image}
                      alt={`${fleet[hoveredIndex]?.name} aircraft`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 1200px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-3xl md:text-4xl font-bold mb-2">
                            {fleet[hoveredIndex]?.name}
                          </h3>
                          <p className="text-lg text-gray-200 opacity-90">
                            {fleet[hoveredIndex]?.features?.classification ||
                              "Premium Aircraft"}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                            <span className="text-sm font-medium">
                              Featured
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Fleet Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {fleet?.map((item, index) => (
                <div
                  key={item?.id}
                  className="group cursor-pointer"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={`/fleet-specification/${item?.id}`}
                    className="block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-200 overflow-hidden"
                  >
                    {/* Aircraft Image */}
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <Image
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        src={item?.image}
                        alt={`${item?.name} aircraft`}
                        width={400}
                        height={300}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 right-4 bg-swPrimary500 text-white rounded-full px-3 py-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {index + 1}
                      </div>
                    </div>

                    {/* Aircraft Details */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-swPrimary600 transition-colors duration-300">
                        {item?.name}
                      </h3>

                      {/* Specs Grid */}
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <div className="flex justify-center mb-2">
                            <svg
                              className="w-5 h-5 text-swPrimary500"
                              viewBox="0 0 24 24"
                            >
                              <path fill="currentColor" d={mdiCarSeat} />
                            </svg>
                          </div>
                          <p className="text-sm font-semibold text-slate-700">
                            {item?.features?.no_of_seats}
                          </p>
                          <p className="text-xs text-slate-500">Seats</p>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <div className="flex justify-center mb-2">
                            <svg
                              className="w-5 h-5 text-swPrimary500"
                              viewBox="0 0 24 24"
                            >
                              <path fill="currentColor" d={mdiSpeedometer} />
                            </svg>
                          </div>
                          <p className="text-sm font-semibold text-slate-700">
                            {item?.speed}
                          </p>
                          <p className="text-xs text-slate-500">Speed</p>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <div className="flex justify-center mb-2">
                            <svg
                              className="w-5 h-5 text-swPrimary500"
                              viewBox="0 0 24 24"
                            >
                              <path fill="currentColor" d={mdiArrowLeftRight} />
                            </svg>
                          </div>
                          <p className="text-sm font-semibold text-slate-700">
                            {item?.feet}
                          </p>
                          <p className="text-xs text-slate-500">Range</p>
                        </div>
                      </div>

                      {/* View Details Button */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">
                          Click to view details
                        </span>
                        <div className="bg-swPrimary500 text-white rounded-full p-2 group-hover:bg-swPrimary600 transition-colors duration-300">
                          <HiArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200 max-w-2xl mx-auto text-center">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  Ready to Experience Luxury in the Sky?
                </h3>
                <p className="text-slate-600 mb-6">
                  Explore our complete fleet and find the perfect aircraft for
                  your next journey
                </p>
                <div className="flex justify-center">
                  <Button
                    label="View Complete Fleet"
                    bgColor={"bg-swPrimary500"}
                    textColor={"text-white"}
                    endIcon={<HiArrowRight size={20} />}
                    onClick={handleSeeAllClick}
                    className="px-8 py-4 text-base md:text-lg font-semibold rounded-full hover:bg-swPrimary600 transition-colors duration-300 shadow-lg hover:shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Membership Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-swPrimary700 mb-6">
                Membership
              </h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8">
                Enjoy the benefits of{" "}
                <span
                  className={`${libre_baskerville?.className} text-swPrimary500 font-bold`}
                >
                  Swift<i className="font-normal">Wings</i>
                </span>{" "}
                Network with high profile individuals like you, strike a deeper
                connection, and get access to premium services like: unlimited
                private jet access, highly personalized travel experience,
                priority scheduling,{" "}
                <a
                  href="https://www.swiftwingsjet.com/services"
                  className="text-swPrimary500 font-bold hover:underline"
                >
                  empty leg prior notification
                </a>{" "}
                , etc
              </p>
              <div className="w-24 h-1 bg-swPrimary500 mx-auto rounded-full"></div>
            </div>

            <div className="mb-16">
              <h3 className="text-2xl font-bold text-slate-800 text-center mb-12">
                Membership Features
              </h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {textAreas?.map((area, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 text-center border border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="text-slate-700 text-lg leading-relaxed">
                      {area?.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-swPrimary700 mb-6">
                Our Clients
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
                Trusted by top brands, we offer a world-class exotic experience.
              </p>
              <div className="w-24 h-1 bg-swPrimary500 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-5 gap-8 md:gap-12">
              {[
                Cubana,
                Polaris,
                Odu,
                Neveah,
                Aella,
                Gluwa,
                Century,
                Zenco,
                Delborough,
              ]?.map((logo, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center group"
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <Image
                      className="w-full h-full object-contain filter grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-110"
                      src={logo}
                      alt="Client Logo"
                      width={96}
                      height={96}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Whatsapp />
      </NavAndFooter>
    </main>
  );
}