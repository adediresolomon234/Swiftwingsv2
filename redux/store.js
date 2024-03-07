import { configureStore } from "@reduxjs/toolkit";
import aviPagesReducer from "./slices/aviPagesSlice";
export const store = configureStore({
  reducer: {
    aviPages: aviPagesReducer,
  },
});
