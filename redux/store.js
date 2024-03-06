import { configureStore } from "@reduxjs/toolkit";
import githubReducer from "./slices/githubSlice";
export const store = configureStore({
  reducer: {
    github: githubReducer,
  },
});
