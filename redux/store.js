import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
import aviPagesReducer from "./slices/aviPagesSlice";
import bookingReducer from "./slices/bookingSlice";
import aircraftsSlice from "./slices/aircraftdetails";
import enquirySlice from "./slices/enquirySlice";
import emptylegsReducer from "./slices/emptylegs";

export const store = configureStore({
  reducer: {
    aviPages: aviPagesReducer,
    auth: authReducer,
    booking: bookingReducer,
    aircrafts: aircraftsSlice,
    enquiry: enquirySlice,
    emptylegs: emptylegsReducer,
  },
});

