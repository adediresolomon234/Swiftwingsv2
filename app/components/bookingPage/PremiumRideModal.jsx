import Image from "next/image";
import { IoClose } from "react-icons/io5";

const PremiumRideModal = ({
  open,
  setOpen,
  bookingDetails,
  setBookingDetails,
  isSubmitting,
}) => {
  const handleRideSelection = (isPremium) => {
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      offer_ride: isPremium,
    }));
    isSubmitting();
    setOpen?.(false);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        {/* Header */}
        <div className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 cursor-pointer">
          <IoClose onClick={() => setOpen?.(false)} size={24} />
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Premium Ride Experience</h2>
          <p className="text-gray-500 text-sm">
            Elevate your journey with our luxury vehicle options
          </p>
        </div>

        {/* Image */}
        <div className="relative h-48 rounded-lg overflow-hidden mb-4">
          <Image
            src="/images/benz.jpg"
            alt="Luxury vehicle"
            fill
            className="object-cover"
          />
        </div>

        {/* Description */}
        <div className="text-center space-y-2 mb-4">
          <p className="text-sm text-gray-600">
            Would you like to try one of our premium rides? If yes, you&apos;ll
            be contacted by one of our representatives with available brands.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            className="bg-swPrimary500 hover:bg-swPrimary500/90 text-white w-full rounded-md py-2"
            onClick={() => handleRideSelection(true)}
          >
            Yes, I&apos;d like to try
          </button>
          <button
            className="border border-swPrimary500 hover:bg-swPrimary500/90 hover:text-white text-swPrimary500 w-full rounded-md py-2"
            onClick={() => handleRideSelection(false)}
          >
            No, there&apos;s no need
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumRideModal;
