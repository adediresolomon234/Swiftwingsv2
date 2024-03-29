"use client";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import FleetImage234 from "../../public/images/FleetImage234.png";
import NavAndFooter from "../components/shared/NavAndFooter";
import FooterHero from "../components/shared/footerHero";



const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const FleetSpec = () => {
    return (
        <main className="relative bg-swLightBgGray">
            <NavAndFooter>
                <section className="w-full p-10 pt-48 text-white relative pb-10">
                    <div className="absolute h-full w-full top-0 left-0 overflow-hidden">
                        <Image src={FleetImage234} alt="aiplane" className="h-full w-full object-cover" />
                    </div>
                    <div className="h-full w-full bg-swBlack absolute top-0 left-0 bg-opacity-10" />
                    <div className="max-w-7xl mx-auto mb-10 relative text-center">
                        <div className="pt-28 z-50">
                            <p className="text-8xl font-bold leading-snug z-50">
                                Experience Unmatched Luxury Travel
                            </p>
                            <p className="text-lg mt-10 z-10">
                                Experience the epitome of safety, luxury and convenience with{" "}
                                <br />
                                <span className="font-bold">
                                    Swiftwings private jet charter service
                                </span>
                            </p>
                        </div>

                        <div className="flex gap-10 justify-center text-center mt-10">
                            <div>
                                <p className="font-semibold text-2xl">10k</p>
                                <p className="text-xs">Flights</p>
                            </div>
                            <div>
                                <p className="font-semibold text-2xl">15k</p>
                                <p className="text-xs">Clients</p>
                            </div>
                            <div>
                                <p className="font-semibold text-2xl">100</p>
                                <p className="text-xs">Countries</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    {/* Your content for the second section */}
                </section>
                <section className="py-16">
                    <div className="xl:container m-auto px-6 text-gray-600 md:px-12 xl:px-16">
                        <FooterHero />
                    </div>
                </section>
            </NavAndFooter>
        </main>
    );
};

export default FleetSpec;
