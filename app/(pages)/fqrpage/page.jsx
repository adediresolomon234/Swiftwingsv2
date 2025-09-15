"use client";
import React, { useEffect } from "react";
import NavAndFooter from "../../components/shared/NavAndFooter";


const FQR = () => {
    return (
     <NavAndFooter Nav={true}>
        <section class="bg-[#fffcfc] text-gray-900 py-32 min-h-screen">
            <div class="container flex flex-col justify-center p-4 mx-auto md:p-8">
                <h2 class="mb-12 text-4xl font-bold leading-10 text-center sm:text-5xl text-swPrimary600">Frequently Asked Questions</h2>
                <div class="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 divide">
                    <details>
                        <summary class="py-2 outline-none cursor-pointer ">What is Swiftwingsjet?</summary>
                        <div class="px-4 pb-4">
                            <p>Swiftwingsjet is a private jet company providing a range of tailored travel services. We
                                specialize in providing reliable and comfortable air travel solutions for clients looking for privacy,
                                convenience, and flexibility. Our services are available across West Africa and beyond,
                                connecting clients to various destinations in Europe, the United States, the Middle East, Asia,
                                and neighboring African countries.
                            </p>
                        </div>
                    </details>
                    <details>
                        <summary class="py-2 outline-none cursor-pointer ">How do I book a flight with Swiftwings?</summary>
                        <div class="px-4 pb-4 space-y-5">
                            <p>Booking a flight with Swiftwings is straightforward. You can:</p>
                            <ul class="list-disc pl-6 space-y-5">
                                <li>
                                    <strong>Online:</strong> Visit our website here
                                    <a href="http://www.swiftwingsjet.com" class="text-blue-600 underline">www.swiftwingsjet.com</a>
                                    and use our booking tool to select your preferred jet, route, and travel dates.
                                </li>
                                <li>
                                    <strong>By Phone:</strong> Contact our customer service team at
                                    <a href="tel:+2349028792910" class="text-blue-600 underline">+2349028792910</a>
                                    to assist with your booking.
                                </li>
                                <li>
                                    <strong>Email:</strong> Send your travel details to our reservations team via
                                    <a href="mailto:charter@swiftwingsjet.com" class="text-blue-600 underline">charter@swiftwingsjet.com</a>,
                                    and they will handle the rest.
                                </li>
                            </ul>
                            <p>
                                Once your booking is confirmed, you’ll receive all the necessary details, including departure
                                times, aircraft specifications, and any additional services you may require.
                            </p>
                        </div>

                    </details>
                    <details>
                        <summary class="py-2 outline-none cursor-pointer ">What type of services do you offer?</summary>
                        <div class="px-4 pb-4 space-y-5">
                            <p>Swiftwings offers a range of services designed to enhance your travel experience:</p>
                            <ul class="list-disc pl-6 space-y-5">
                                <li>
                                    <strong>Inflight Catering:</strong> Enjoy gourmet meals, snacks, and beverages prepared by top chefs
                                    and served with attention to detail.
                                </li>
                                <li>
                                    <strong>Medical Evacuation:</strong> We provide emergency medical evacuation services for quick and
                                    safe transport to a medical facility if needed. Our aircraft are equipped to handle medical
                                    emergencies with specialized equipment and trained personnel.
                                </li>
                                <li>
                                    <strong>Chauffeur Services:</strong> Arrange for luxury ground transportation before and after your
                                    flight. Our chauffeur services ensure a smooth and comfortable journey from your
                                    doorstep to the jet and vice versa.
                                </li>
                                <li>
                                    <strong>Concierge Services:</strong>  Our concierge team can assist with travel arrangements, hotel
                                    bookings, event planning, and more, making your travel experience seamless and
                                    stress-free
                                </li>
                                <li>
                                    <strong>Empty Leg Flights:</strong> Take advantage of discounted rates on flights that are returning
                                    empty to their base. These empty leg flights provide a cost-effective way to enjoy private
                                    jet travel.
                                </li>
                            </ul>
                        </div>
                    </details>
                    <details>
                        <summary class="py-2 outline-none cursor-pointer ">How far in advance do I need to book?</summary>
                        <div class="px-4 pb-4">
                            <p>While we recommend booking your flight as early as possible, Swiftwings understands that
                                travel plans can change. Depending on aircraft availability, we can often accommodate
                                last-minute bookings. Contact us, and we will do our best to arrange your flight promptly.
                            </p>
                        </div>
                    </details>
                    <details>
                        <summary class="py-2 outline-none cursor-pointer ">Can I bring pets on board?</summary>
                        <div class="px-4 pb-4">
                            <p>Yes, pets are welcome on Swiftwings flights. We understand that pets are part of the family, so
                                we strive to make their travel experience as comfortable as yours. Please inform us during the
                                booking process if you plan to bring a pet, so we can make the necessary arrangements.
                            </p>
                        </div>
                    </details>
                    <details>
                        <summary class="py-2 outline-none cursor-pointer ">What is the cancellation policy?</summary>
                        <div class="px-4 pb-4 space-y-5">
                            <p>Our cancellation policy varies depending on the type of booking. Generally:</p>
                            <ul class="list-disc pl-6 space-y-5">
                                <li>
                                    <strong>Short-Notice Flights:</strong> Enjoy gourmet meals, snacks, and beverages prepared by top chefs
                                    and served with attention to detail.
                                </li>
                                <li>
                                    <strong>Longer-Notice Flights:</strong> If you cancel within a specified time frame, you may receive a
                                    partial or full refund
                                </li>
                                <p>For full details, please review the cancellation terms during the booking process or contact our
                                    customer service team.
                                </p>
                            </ul>
                        </div>
                    </details>
                    <details>
                        <summary class="py-2 outline-none cursor-pointer ">Can I charter a jet for a one-way flight?</summary>
                        <div class="px-4 pb-4">
                            <p>Yes, Swiftwings offers one-way flights. You are not required to book a round-trip unless that is
                                your preference. One-way charters are a great option if you have flexible travel plans or need to
                                reach multiple destinations without returning to your starting point.</p>
                        </div>
                    </details>
                    <details>
                        <summary class="py-2 outline-none cursor-pointer focus:underline">What destinations can Swiftwings fly to?</summary>
                        <div class="px-4 pb-4">
                            <div class="px-4 pb-4 space-y-5">
                                <p>Swiftwings can fly to different destinations, including:</p>
                                <ul class="list-disc pl-6 space-y-5">
                                    <li>
                                        <strong>West Africa:</strong> Ivory Coast, Ghana, Senegal, Nigeria, Mali, and more.
                                    </li>
                                    <li>
                                        <strong>International:</strong>  United States, Europe, Middle East, and Asia.
                                    </li>
                                    <li>
                                        <strong>Remote Locations:</strong>  We can arrange flights to less accessible areas, provided the local
                                        airport can accommodate our aircraft.

                                    </li>
                                    <p>If you have a specific destination in mind, please inquire, and we’ll do our best to meet your
                                        travel needs
                                    </p>
                                </ul>
                            </div>
                        </div>
                    </details>
                    <details>
                        <summary class="py-2 outline-none cursor-pointer ">Is there Wi-Fi available on board?</summary>
                        <div class="px-4 pb-4">
                            <div class="px-4 pb-4 space-y-5">
                                <p>Yes, many of our aircraft are equipped with in-flight Wi-Fi, allowing you to stay connected
                                    throughout your journey. If Wi-Fi is essential for your flight, please confirm its availability during
                                    the booking process.
                                </p>
                            </div>
                        </div>
                    </details>
                    <details>
                        <summary class="py-2 outline-none cursor-pointer ">What are the catering options?</summary>
                        <div class="px-4 pb-4">
                            <div class="px-4 pb-4 space-y-5">
                                <p>Swiftwings provides a variety of catering options to suit your taste. You can select:</p>
                                <ul class="list-disc pl-6 space-y-5">
                                    <li>
                                        <strong>Gourmet Meals:</strong>Prepared by top chefs, serving international and local cuisines.
                                    </li>
                                    <li>
                                        <strong>Dietary Preferences:</strong>  Vegetarian, vegan, gluten-free, or other specific dietary needs.
                                    </li>
                                    <li>
                                        <strong>Beverages:</strong> A selection of fine wines, spirits, soft drinks, and more

                                    </li>
                                    <p>We work with leading caterers to make sure you have a memorable dining experience during
                                        your flight.

                                    </p>
                                </ul>
                            </div>
                        </div>
                    </details>
                    <details>
                        <summary class="py-2 outline-none cursor-pointer ">How are the crew members selected?</summary>
                        <div class="px-4 pb-4">
                            <div class="px-4 pb-4 space-y-5">
                                <p>Our crew members are selected based on their expertise, professionalism, and dedication to
                                    customer service. Pilots at Swiftwings have thousands of hours of flight experience and are
                                    trained to handle various flight scenarios. The cabin crew is highly trained in hospitality to
                                    guarantee your comfort throughout the journey.

                                </p>
                            </div>
                        </div>
                    </details>
                    <details>
                        <summary class="py-2 outline-none cursor-pointer">What happens if my flight is delayed?</summary>
                        <div class="px-4 pb-4">
                            <div class="px-4 pb-4 space-y-5">
                                <p>While we strive for punctuality, delays can occasionally occur due to factors like weather or air
                                    traffic control restrictions. In such cases, our team will keep you informed and work to minimize
                                    any inconvenience. We will adjust your itinerary as needed and provide assistance to make your
                                    journey as smooth as possible.
                                </p>
                            </div>
                        </div>
                    </details>
                    <details>
                        <summary class="py-2 outline-none cursor-pointer ">Can I arrange multi-leg trips with Swiftwings?</summary>
                        <div class="px-4 pb-4">
                            <div class="px-4 pb-4 space-y-5">
                                <p>Yes, multi-leg trips are possible with Swiftwings. You can plan an itinerary with multiple stops,
                                    whether within a region or across continents. We’ll coordinate the logistics to ensure a seamless
                                    travel experience
                                </p>
                            </div>
                        </div>
                    </details>
                    <details>
                        <summary class="py-2 outline-none cursor-pointer">How do I contact Swiftwings for more information?</summary>
                        <div class="px-4 pb-4">
                            <div class="px-4 pb-4 space-y-5">
                                <p>You can reach out to Swiftwings through the following channels:</p>
                                <ul class="list-disc pl-6 space-y-5">
                                    <li>
                                        <strong>Phone:</strong> Call our customer service line for immediate assistance on <a href="tel:+2349028792910" class="text-blue-600 underline">+2349028792910</a>.
                                    </li>
                                    <li>
                                        <strong>Email:</strong> Send your inquiries to our support team via  <a href="charter@swiftwingsjet.com" class="text-blue-600 underline">charter@swiftwingsjet.com</a>
                                    </li>
                                    <li>
                                        <strong>Website:</strong>Use our contact form to submit questions or request more information <a href="https://www.swiftwingsjet.com/contact-us" class="text-blue-600 underline">here</a>

                                    </li>
                                </ul>
                            </div>
                        </div>
                    </details>
                </div>
            </div>
        </section>
     </NavAndFooter>
    );
};

export default FQR;
