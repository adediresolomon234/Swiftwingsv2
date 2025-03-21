import { API_URL } from "../../constant";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addBooking = createAsyncThunk("booking/add", async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/booking/add`, payload);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const getAllBooking = createAsyncThunk(
  "booking/allBooking",
  async (email) => {
    try {
      const response = await axios.get(`${API_URL}/booking/email/${email}`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getEmptyLegsBooking = createAsyncThunk(
  "emptylegbook/bookings/email/:email",
  async (email) => {
    try {
      const response = await axios.get(
        `${API_URL}/emptylegbook/bookings/email/${email}`
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const addEmptyLeg = createAsyncThunk(
  "booking/add-empty-leg",
  async (payload) => {
    try {
      const response = await axios.post(
        `${API_URL}/subscribe/enquiry/add-empty-leg`,
        payload
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
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
      .addCase(addBooking.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(addBooking.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(addBooking.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearUserState } = bookingSlice.actions;

export default bookingSlice.reducer;
