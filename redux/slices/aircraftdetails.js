import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from "@/constant";

// Define your initial state
const initialState = {
  aircrafts: [],
  status: "idle",
  error: null,
};

// Define your async thunk to fetch aircrafts
export const fetchAircrafts = createAsyncThunk("aircrafts/fetchAircrafts", async () =>{
  try {
    const response = await axios.get(`${API_URL}/avipages/aircrafts`, {
      headers: {
        Authorization: "Token WJUeXU8O6sj9YLoYJX7zeV4w92u2OAnkMqDy",
      },
    });
    // Extract necessary details from the API response
    const aircraftsData = response.data.data.results.map(aircraft => ({
      id: aircraft.id,
      name: aircraft.name,
      image: aircraft.image || '/default-image-url.png', 
      speed: aircraft.speed, 
      kilometer: aircraft.kilometer, 
      feet: aircraft.feet, 
      features: aircraft.features, 
      specifications: aircraft.specifications, // Assuming 'specifications' is available in the API response
    }));
    return aircraftsData;
  } catch (error) {
    throw new Error("Failed to fetch aircrafts");
  }
});

// Define your slice
const aircraftsSlice = createSlice({
  name: "aircrafts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAircrafts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAircrafts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.aircrafts = action.payload;
      })
      .addCase(fetchAircrafts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default aircraftsSlice.reducer;
