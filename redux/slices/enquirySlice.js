import { API_URL } from "@/constant";
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
