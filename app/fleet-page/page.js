"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchAircrafts } from '../../redux/slices/aircraftdetails';
import { SwSearchIcon } from "../components/svgs";
import AircraftCard from '../components/shared/AircraftCard';
import InputField from "../components/shared/InputField";
import SortFilter from "../components/shared/SortFilter";
import TypeFilter from "../components/shared/TypeFilter";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import Fleetsection from "../../public/images/Fleetsection.png";
import NavAndFooter from "../components/shared/NavAndFooter";
import FooterHero from "../components/shared/footerHero";

const FleetPage = () => {
    const dispatch = useDispatch();
    const aircrafts = useSelector(state => state.aircrafts.aircrafts);
    const status = useSelector(state => state.aircrafts.status);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(fetchAircrafts());
    }, [dispatch]);

  
    const filteredAircrafts = aircrafts.filter(aircraft => {
        return aircraft.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

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
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-12 max-w-sm w-full  ">
                            <div className="w-full mt-5">
                                <InputField
                                    label={<span className="flex items-center mb-3 "><SwSearchIcon className="text-xl mr-2" />Search</span>}
                                    placeholder="Enter Aircraft"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="w-full mt-12">
                                <SortFilter />
                            </div>
                            <div className="w-full mt-3">
                                <TypeFilter />
                            </div>
                        </div>
                        <div className="col-span-2 ">
                            <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                {status === 'loading' ? (
                                    <p>Loading...</p>
                                ) : status === 'failed' ? (
                                    <p>Error: Failed to fetch aircrafts</p> 
                                ) : (
                                    filteredAircrafts.map((aircraft) => (
                                        <AircraftCard key={aircraft.id} aircraft={aircraft} />
                                    ))
                                )}

                            </div>
                        </div>
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

export default FleetPage;
