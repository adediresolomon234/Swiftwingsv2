import NavAndFooter from "@/app/components/shared/NavAndFooter";
import BookingPageInformation from "../components/bookingPage/BookingPage";

const BookJet = () => {
  return (
    <NavAndFooter>
      <div className="py-24 bg-white px-5">
        <BookingPageInformation />
      </div>
    </NavAndFooter>
  );
};

export default BookJet;
