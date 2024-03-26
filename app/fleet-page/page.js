"use client";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import Fleetsection from "../../public/images/Fleetsection.png";
import NavAndFooter from "../components/shared/NavAndFooter";
import FooterHero from "../components/shared/footerHero";




const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const FleetPage = () => {
    return (
        <main className="relative bg-swLightBgGray">
            <NavAndFooter>
                <section className="relative w-full pt-48 pb-10 text-white">
                    <div className="absolute inset-0 flex flex-col items-start justify-start">
                        <Image src={Fleetsection} alt="airplane" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-swBlack bg-opacity-10" />
                    </div>
                    <div className="max-w-4xl mx-auto relative text-center z-10">
                        <div className="pt-72">
                            <p className="text-4xl md:text-7xl font-bold leading-20 md:leading-20" style={{ lineHeight: "7rem" }}>
                                Explore the perfect JET for your <span className="text-white bg-swPrimary600 rounded-full px-6 ">Journey</span>
                            </p>
                            <p className="text-sm md:text-lg mt-10">
                                Experience the epitome of safety, luxury and convenience with{" "}
                                <span className="font-bold">Swiftwings private jet charter service</span>
                            </p>
                            <p className="mt-8" />
                        </div>
                    </div>
                </section>
                <section className="py-16">
                    <div class="grid grid-cols-3 gap-4">
                        <div class="...">06</div>
                        <div class="col-span-2 ...">07</div>
                    </div>
                </section>
                <section className="py-16">
                    <div class="xl:container m-auto px-6 text-gray-600 md:px-12 xl:px-16">
                        <FooterHero />
                    </div>
                </section>

            </NavAndFooter>
        </main>
    );

};

export default FleetPage;