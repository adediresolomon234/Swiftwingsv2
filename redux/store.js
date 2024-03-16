import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
import aviPagesReducer from "./slices/aviPagesSlice";

export const store = configureStore({
  reducer: {
    aviPages: aviPagesReducer,
    auth: authReducer,
  },
});
