import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux/slices/authSlice";
import aviPagesReducer from "./slices/aviPagesSlice";

export const store = configureStore({
  reducer: {
    aviPages: aviPagesReducer,
    user: authSlice,
   
  },
});
