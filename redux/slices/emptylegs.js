import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchEmptyLegs = createAsyncThunk(
  "emptylegs/fetchEmptyLegs",
  async ({ page = 1, limit = 10, search = "" } = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/emptylegs`, {
        params: { page, limit, search },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPaginatedEmptyLegs = createAsyncThunk(
  "emptylegs/fetchPaginatedEmptyLegs",
  async (
    { page = 1, limit = 10, search = "", startDate = "", endDate = "" } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `${API_URL}/emptylegs/emptylegs?status=active`,
        {
          params: { page, limit, search, startDate, endDate },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const emptyLegsSlice = createSlice({
  name: "emptylegs",
  initialState: {
    data: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmptyLegs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEmptyLegs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        console.log({ state, x: action.payload });
      })
      .addCase(fetchEmptyLegs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch empty legs.";
      })
      .addCase(fetchPaginatedEmptyLegs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPaginatedEmptyLegs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        console.log({ state, x: action.payload });
      })
      .addCase(fetchPaginatedEmptyLegs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch empty legs.";
      });
  },
});

export default emptyLegsSlice.reducer;
