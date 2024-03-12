import { configureStore } from "@reduxjs/toolkit";
<<<<<<< HEAD
import githubReducer from "./slices/githubSlice";
import authSlice from "../redux/slices/authSlice";

export const store = configureStore({
  reducer: {
    github: githubReducer,
    user: authSlice,
=======
import aviPagesReducer from "./slices/aviPagesSlice";
export const store = configureStore({
  reducer: {
    aviPages: aviPagesReducer,
>>>>>>> 3658524c4cfa1202aec4528dd92cbc2ccd663f04
  },
});
