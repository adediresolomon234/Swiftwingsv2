import { API_URL } from "../../constant";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addEnquiry = createAsyncThunk("enquiry/add", async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/enquiry/add`, payload);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const postFirstTimeEliteClients = createAsyncThunk(
  "booking/first-time-elite-clients",
  async (payload) => {
    try {
      const response = await axios.post(
        `${API_URL}/booking/first-time-elite-clients`,
        payload
      );
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "An error occurred while submitting the form.";
      throw new Error(message);
    }
  }
);

export const postPerFlightPreferences = createAsyncThunk(
  "booking/per-flight-preferences",
  async (payload) => {
    try {
      const response = await axios.post(
        `${API_URL}/booking/per-flight-preferences`,
        payload
      );
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "An error occurred while submitting the form.";
      throw new Error(message);
    }
  }
);

export const postFlightBriefSheets = createAsyncThunk(
  "booking/flight-brief-sheets",
  async (payload) => {
    try {
      const response = await axios.post(
        `${API_URL}/booking/flight-brief-sheets`,
        payload
      );
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "An error occurred while submitting the form.";
      throw new Error(message);
    }
  }
);

const enquirySlice = createSlice({
  name: "enquiry",
  initialState: {
    data: null,
    loading: "idle",
    error: null,
  },
  reducers: {
    clearUserState: (state) => {
      state.data = null;
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addEnquiry.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(addEnquiry.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(addEnquiry.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearUserState } = enquirySlice.actions;

export default enquirySlice.reducer;
