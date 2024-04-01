"use client";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import FleetImage234 from "../../public/images/FleetImage234.png";
import NavAndFooter from "../components/shared/NavAndFooter";
import FooterHero from "../components/shared/footerHero";
import { SWGlobeIcon, SwSeatIcon, SwMeterIcon } from "../components/svgs";
import FleetSpecSlider from "../components/shared/Fleetspec/FleetSpecSlider";
import { useRouter } from "next/navigation";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const FleetSpec = () => {
    const router = useRouter();
    const { image, range, seat, speed, manufacturer } = router.query || {};

    if (!router.isReady || !image || !range || !seat || !speed || !manufacturer) {
        return null;
    }

    return (
        <main className="relative bg-swLightBgGray ">
            <NavAndFooter>
                <section className="w-full h-full p-10 pt-48 text-white relative pb-10  ">
                    <div className="absolute h-full w-full top-0 left-0 overflow-hidden ">
                        <Image src={image} alt="airplane" className="h-full w-full object-cover" />
                    </div>
                    <div className="h-full w-full bg-swBlack absolute top-0 left-0 bg-opacity-10" />
                    <div className="max-w-7xl mx-auto mb-10 relative text-center">
                        <div className="pt-8 z-50">
                            <p className="text-4xl font-bold leading-snug text-swPrimary700">
                                {manufacturer}
                            </p>
                            <div className="grid md:grid-cols-2 gap-28 pt-[27rem]">
                                <div className="mt-20">
                                    <p className="text-lg text-swPrimary600  text-start">
                                        The Global 8000 private jet is the flagship for a new era where the fastest speed, the longest range and the smoothest ride converge in a single business aircraft with proven reliability and the healthiest, best-connected cabin in the industry.
                                    </p>
                                </div>
                                <div className="mt-20">
                                    <div className="ml-10">
                                        <div className="grid grid-cols-3 gap-4 w-full max-w-full rounded-xl bg-white border border-gray-200 overflow-hidden">
                                            <div className="flex flex-col items-center justify-center py-6 px-8">
                                                <div className="flex items-center justify-center mb-3 text-swPrimary600">
                                                    <SWGlobeIcon className="text-swPrimary600 text-xl" />
                                                </div>
                                                <div className="text-center font-semibold text-swGray700">RANGE</div>
                                                <div className="text-center text-swGray500">{range}</div>
                                            </div>
                                            <div className="flex flex-col items-center justify-center py-6 px-6">
                                                <div className="flex items-center justify-center mb-3 text-swPrimary600">
                                                    <SwSeatIcon className="text-swPrimary600 text-xl" />
                                                </div>
                                                <div className="text-center font-semibold text-swGray700">Passengers</div>
                                                <div className="text-center text-swGray500">{seat}</div>
                                            </div>
                                            <div className="flex flex-col items-center justify-center py-6 px-4">
                                                <div className="flex items-center justify-center mb-3 text-swPrimary600">
                                                    <SwMeterIcon className="text-swPrimary600 text-xl" />
                                                </div>
                                                <div className="text-center font-semibold text-swGray700">Speed</div>
                                                <div className="text-center text-swGray500">{speed}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-16">
                    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                        <div className="mx-auto mb-10 lg:max-w-xl sm:text-center">
                            <p className="text-base text-gray-700 md:text-lg">
                                Feature
                            </p>
                        </div>
                        <div className="grid gap-10 mx-auto sm:grid-cols-2 lg:grid-cols-3 lg:max-w-screen-lg">
                            <div>
                                <div className="relative pb-56 mb-4 rounded shadow lg:pb-64">
                                    <Image
                                        className="absolute object-cover w-full h-full rounded"
                                        src="/images/Bombadier Global 8000-1.png"
                                        alt="Bombadier Global 8000"
                                        width="640"
                                        height="805"
                                    />
                                </div>
                                <div className="flex flex-col sm:text-center">
                                    <p className="inline-block px-0 py-3 mb-6 text-xs font-semibold tracking-wider text-swGray800 uppercase rounded-full bg-swGray100">
                                        Supersonic luxury
                                    </p>
                                    <p className="mb-5 text-sm text-gray-800 leading-6">If you thought Mach 0.94 was fast, you would be surprised to know that the Global 8000 is capable of so much more after Bombardier managed to break the sound barrier more than 2 years ago. In May 2021, during a test flight, engineers and test pilots flew a modified Global 7500, which served as a test bed for the Global 8000, to a supersonic Mach 1.015 – a whopping 779 miles per hour, or 1,243 kilometers per hour.</p>

                                </div>
                            </div>
                            <div>
                                <div className="relative pb-56 mb-4 rounded shadow lg:pb-64">
                                    <Image
                                        className="absolute object-cover w-full h-full rounded"
                                        src="/images/Bombadier Global 8000-2.png"
                                        alt="Bombadier Global 8000"
                                        width="640"
                                        height="805"
                                    />
                                </div>
                                <div className="flex flex-col sm:text-center">
                                    <p className="inline-block px-1 py-3 mb-6 text-xs font-semibold tracking-wider text-swGray800 uppercase rounded-full bg-swGray100">
                                        Ultra-long rang
                                    </p>
                                    <p className="mb-5 text-sm text-gray-800 leading-6">Flight range is yet another field where the Global 8000 has taken the top spot in the world, in an era where ultra-long-haul flights are ranking up as favorites across all passenger types.</p>
                                </div>
                            </div>
                            <div>
                                <div className="relative pb-56 mb-4 rounded shadow lg:pb-64">
                                    <Image
                                        className="absolute object-cover w-full h-full rounded"
                                        src="/images/Bombadier Global 8000-3.png"
                                        alt="Bombadier Global 8000"
                                        width="376"
                                        height="208"
                                    />
                                </div>
                                <div className="flex flex-col sm:text-center">
                                    <p className="inline-block px-1 py-3 mb-6 text-xs font-semibold tracking-wider text-swGray800 uppercase rounded-full bg-swGray100">
                                        Exotic Internal beauty
                                    </p>
                                    <p className="mb-5 text-sm text-gray-800 leading-6">Since private and business jets are all about emphasizing the essence of luxury, the Global 8000 definitely nailed it with an interior that is both aesthetic and functional. Built for both business and luxury, the new Bombardier business jet generally rolls off the production line with 6 total cabins - four of which are the main living spaces.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-16 flex justify-center items-center">
                    <div className="max-w-[50%]">
                        <FleetSpecSlider />
                    </div>
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
