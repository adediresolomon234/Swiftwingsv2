import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cors from "cors";
import { fetchAirportsData } from "@/utils/api";
import { API_URL } from "@/constant";

export const getAviAircraft = createAsyncThunk("aircrafts/all", async () => {
  try {
    const response = await axios.get(`${API_URL}/aircrafts`, {
      headers: {
        // origin: "/*",
        Authorization: "Token WJUeXU8O6sj9YLoYJX7zeV4w92u2OAnkMqDy",
      },
    });
    console.log({ response });
    return response.data;
  } catch (error) {
    if (error.response.data.error) {
      throw new Error(error.response.data.error);
    } else throw new Error("An error occured, please try again later");
  }
});

export const getAviAirPort = createAsyncThunk(
  "get/airport",
  async (searchTerm) => {
    try {
      const response = await axios.get(
        `${API_URL}/airports?searchTerm=${searchTerm}`,
        {
          headers: {
            // origin: "/*",
            Authorization: "Token WJUeXU8O6sj9YLoYJX7zeV4w92u2OAnkMqDy",
          },
        }
      );
      console.log({ response });
      return response.data;
    } catch (error) {
      if (error.response.data.error) {
        throw new Error(error.response.data.error);
      } else throw new Error("An error occured, please try again later");
    }
  }
);

const aviPagesSlice = createSlice({
  name: "aviPages",
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
      .addCase(getAviAircraft.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getAviAircraft.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getAviAircraft.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getAviAirPort.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getAviAirPort.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getAviAirPort.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearUserState } = aviPagesSlice.actions;

export default aviPagesSlice.reducer;
