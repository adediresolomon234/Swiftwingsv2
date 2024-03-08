import { configureStore } from "@reduxjs/toolkit";
import githubReducer from "./slices/githubSlice";
import authSlice from "../redux/slices/authSlice";

export const store = configureStore({
  reducer: {
    github: githubReducer,
    user: authSlice,
  },
});
