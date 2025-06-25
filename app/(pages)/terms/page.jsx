"use client";
import React, { useEffect } from "react";
import NavAndFooter from "../../components/shared/NavAndFooter";

const Terms = () => {
  return (
    <NavAndFooter Nav={true}>
      <section class="bg-[#fffcfc] text-gray-900 py-32 min-h-screen">
        <div class="container flex flex-col justify-center p-4 mx-auto md:p-8">
          <h2 class="mb-12 text-4xl font-bold leading-10 text-center sm:text-5xl text-swPrimary600">
            TERMS OF USE
          </h2>
          <div class="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 divide">
            <details>
              <summary class="py-2 outline-none cursor-pointer text-bold text-swPrimary600  ">
                1. DEFINITIONS
              </summary>
              <div class="px-4 pb-4">
                <p>
                  <b>1.1 </b>. Company refers to SwiftWingsJet, including its
                  affiliates, subsidiaries, directors, officers, employees, and
                  agents.
                </p>
              </div>
              <div class="px-4 pb-4">
                <p>
                  <b>1.2 </b>. Customer refers to any individual, business, or
                  entity that purchases or uses the services provided by the
                  Company.
                </p>
              </div>
              <div class="px-4 pb-4">
                <p>
                  <b>1.3 </b>. Services refers to the private jet charter,
                  aircraft management, and any other related services provided
                  by the Company.
                </p>
              </div>
              <div class="px-4 pb-4">
                <p>
                  <b>1.4</b>. Agreement refers to these Terms of Use and any
                  accompanying service contracts, booking confirmations, or
                  agreements entered into by the Company and the Customer.
                </p>
              </div>
            </details>
            <details>
              <summary class="py-2 outline-none cursor-pointer text-bold text-swPrimary600  ">
                2. ACCEPTANCE OF TERMS
              </summary>
              <div class="px-4 pb-4">
                <p>
                  <b>2.1 </b>. By booking or using the services, the Customer
                  agrees to be bound by these Terms of Use.
                </p>
              </div>
              <div class="px-4 pb-4">
                <p>
                  <b>2.2 </b>. The Company reserves the right to amend these
                  Terms of Use at any time without prior notice. Continued use
                  of the services after such modifications constitutes
                  acceptance of the revised terms.
                </p>
              </div>
            </details>
            <details>
              <summary class="py-2 outline-none cursor-pointer text-bold text-swPrimary600  ">
                3. BOOKINGS AND PAYMENT
              </summary>
              <div class="px-4 pb-4">
                <p>
                  <b>3.1 </b>. All bookings are subject to availability and
                  confirmation by the Company.
                </p>
              </div>
              <div class="px-4 pb-4">
                <p>
                  <b>3.2 </b>. A non-refundable deposit may be required at the
                  time of booking, with the remaining balance due before the
                  scheduled departure.{" "}
                </p>
              </div>
              <div class="px-4 pb-4">
                <p>
                  <b>3.3 </b>. Payments must be made in the currency specified
                  in the booking confirmation using approved payment methods.
                </p>
              </div>
              <div class="px-4 pb-4">
                <p>
                  <b>3.4 </b>. Failure to pay the full amount within the
                  stipulated time frame may result in cancellation without
                  refund.
                </p>
              </div>
            </details>
            <details>
              <summary class="py-2 outline-none cursor-pointer text-bold text-swPrimary600  ">
                4. CANCELLATIONS AND REFUNDS
              </summary>
              <div class="px-4 pb-4">
                <p>
                  <b>4.1 </b>.Cancellations made by the Customer may be subject
                  to fees, as specified in the booking confirmation.
                </p>
              </div>
              <div class="px-4 pb-4">
                <p>
                  <b>4.2 </b>. The Company reserves the right to cancel a
                  booking due to safety, operational, regulatory, or unforeseen
                  circumstances. In such cases, a refund or rescheduling option
                  may be provided at the Company’s discretion.
                </p>
              </div>
              <div class="px-4 pb-4">
                <p>
                  <b>4.3 </b>. No refunds will be issued for cancellations due
                  to Customer’s failure to comply with applicable regulations,
                  documentation requirements, or other contractual obligations .
                </p>
              </div>
            </details>
            <details>
              <summary class="py-2 outline-none cursor-pointer text-bold text-swPrimary600  ">
                5. PASSENGER RESPONSIBILITIES
              </summary>
              <div class="px-4 pb-4">
                <p>
                  <b>5.1 </b>.Passengers must comply with all applicable laws,
                  regulations, and Company policies while using the services.{" "}
                </p>
              </div>
              <div class="px-4 pb-4">
                <p>
                  <b>5.2 </b>. Valid travel documents, visas, and any required
                  health certifications must be provided by the Customer.{" "}
                </p>
              </div>
              <div class="px-4 pb-4">
                <p>
                  <b>5.3 </b>. Dangerous goods, prohibited items, or any
                  materials that violate laws are not permitted on board. The
                  Company reserves the right to refuse service to any Customer
                  found in violation.{" "}
                </p>
              </div>
              <div class="px-4 pb-4">
                <p>
                  <b>5.4 </b>. The Customer is responsible for any damage caused
                  to the aircraft or Company property due to negligence or
                  misconduct.
                </p>
              </div>
            </details>
            <details>
              <summary class="py-2 outline-none cursor-pointer text-bold text-swPrimary600  ">
                6. OPERATIONAL CONTROL AND LIABILITY
              </summary>
              <div class="px-4 pb-4">
                <p>
                  <b>6.1 </b>.The Company retains full operational control over
                  flight scheduling, routing, aircraft selection, and crew
                  assignment.
                </p>
              </div>
              <div class="px-4 pb-4">
                <p>
                  <b>6.2 </b>. The Company is not responsible for delays,
                  cancellations, or modifications due to weather, air traffic
                  control, regulatory actions, mechanical issues, or other force
                  majeure events.{" "}
                </p>
              </div>
              <div class="px-4 pb-4">
                <p>
                  <b>6.3 </b>. The Company’s liability is limited to the extent
                  permitted by applicable law. Compensation for any claims
                  arising from loss, injury, or delays shall not exceed the
                  limitations set forth in the governing aviation regulations.
                </p>
              </div>
            </details>
            <details>
              <summary class="py-2 outline-none cursor-pointer text-bold text-swPrimary600  ">
                7. CONFIDENTIALITY AND DATA PROTECTION
              </summary>
              <div class="px-4 pb-4">
                <p>
                  <b>6.1 </b>.Personal and business information collected during
                  the booking and service process will be handled in accordance
                  with applicable data protection laws.
                </p>
              </div>
              <div class="px-4 pb-4">
                <p>
                  <b>6.2 </b>. The Company is not responsible for delays,
                  cancellations, or modifications due to weather, air traffic
                  control, regulatory actions, mechanical issues, or other force
                  majeure events.{" "}
                </p>
              </div>
              <div class="px-4 pb-4">
                <p>
                  <b>6.3 </b>. The Company’s liability is limited to the extent
                  permitted by applicable law. Compensation for any claims
                  arising from loss, injury, or delays shall not exceed the
                  limitations set forth in the governing aviation regulations.
                </p>
              </div>
            </details>
            <details>
              <summary class="py-2 outline-none cursor-pointer text-bold text-swPrimary600  ">
                8. DISPUTE RESOLUTION
              </summary>
              <div class="px-4 pb-4">
                <p>
                  <b>8.1 </b>.Any disputes arising from these Terms of Use shall
                  first be attempted to be resolved through negotiations between
                  the parties.
                </p>
              </div>
              <div class="px-4 pb-4">
                <p>
                  <b>8.2 </b>. If an amicable resolution cannot be reached,
                  disputes shall be submitted to binding arbitration in a
                  jurisdiction determined by the Company.
                </p>
              </div>
              <div class="px-4 pb-4">
                <p>
                  <b>8.3 </b>. The Customer agrees that any legal claims must be
                  brought within the jurisdiction specified in the Agreement. .
                </p>
              </div>
            </details>
            <details>
              <summary class="py-2 outline-none cursor-pointer text-bold text-swPrimary600  ">
                9. GOVERNING LAW
              </summary>
              <div class="px-4 pb-4">
                <p>
                  <b>9.1 </b>.These Terms of Use shall be governed and
                  interpreted in accordance with the laws of the jurisdiction in
                  which the Company is registered.
                </p>
              </div>
              <div class="px-4 pb-4">
                <p>
                  <b>9.2 </b>. Any provision found to be unenforceable shall not
                  affect the validity of the remaining provisions.
                </p>
              </div>
            </details>
            <details>
              <summary class="py-2 outline-none cursor-pointer text-bold text-swPrimary600  ">
                10. MISCELLANEOUS
              </summary>
              <div class="px-4 pb-4">
                <p>
                  <b>10.1 </b>.These Terms of Use constitute the entire
                  Agreement between the parties regarding the services provided
                  by the Company.
                </p>
              </div>
              <div class="px-4 pb-4">
                <p>
                  <b>10.2 </b>. No waiver or modification of these Terms of Use
                  shall be valid unless agreed to in writing by the Company.
                </p>
              </div>
              <div class="px-4 pb-4">
                <p>
                  <b>10.3 </b>.The Company reserves the right to refuse service
                  to any Customer who fails to comply with these Terms of Use or
                  poses a risk to the safety and integrity of operations.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>
    </NavAndFooter>
  );
};

export default Terms;
