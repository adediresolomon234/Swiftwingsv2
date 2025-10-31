import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constant";

// ✅ Fetch all aircrafts
export const fetchAircrafts = createAsyncThunk(
  "aircrafts/fetchAircrafts",
  async () => {
    try {
      const response = await axios.get(`${API_URL}/aircraft/all?limit=50`);

      const aircraftsData = response?.data?.data?.aircrafts?.map((aircraft) => ({
        id: aircraft._id,
        name: aircraft.model,
        image: aircraft.image_url || "/default-image-url.png",
        images: [
          aircraft.image_url,
          aircraft.image_url_2,
          aircraft.image_url_3,
          aircraft.image_url_4,
        ],
        speed: aircraft.speed,
        kilometer: aircraft.range,
        feet: aircraft.luggage_capacity,
        location: aircraft.location,
        // ✅ Unified and added aircraft_type
        aircraft_type: aircraft.type || aircraft.classification || "Unknown",
        features: {
          manufacturer: aircraft.manufacturer,
          classification: aircraft.classification,
          no_of_seats: aircraft.no_of_seats,
          interior_height: aircraft.interior_height,
          interior_width: aircraft.interior_width,
          overview_summary: aircraft.overview_summary,
        },
      }));

      return aircraftsData;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch aircrafts");
    }
  }
);

// ✅ Fetch ranked aircrafts
export const fetchRankedAircrafts = createAsyncThunk(
  "aircrafts/fetchRankedAircrafts",
  async (type) => {
    try {
      const response = await axios.get(`${API_URL}/aircraft/aircrafts/${type}`);

      const aircraftsData = response?.data?.data?.map((aircraft) => ({
        id: aircraft._id,
        name: aircraft.model,
        image: aircraft.image_url || "/default-image-url.png",
        images: [
          aircraft.image_url,
          aircraft.image_url_2,
          aircraft.image_url_3,
          aircraft.image_url_4,
        ],
        rank: aircraft.rank,
        // ✅ Unified and added aircraft_type
        aircraft_type: aircraft.type || aircraft.classification || "Unknown",
        speed: aircraft.speed,
        kilometer: aircraft.range,
        feet: aircraft.luggage_capacity,
        location: aircraft.location,
        features: {
          manufacturer: aircraft.manufacturer,
          classification: aircraft.classification,
          no_of_seats: aircraft.no_of_seats,
          interior_height: aircraft.interior_height,
          interior_width: aircraft.interior_width,
          overview_summary: aircraft.overview_summary,
        },
      }));

      return aircraftsData;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch aircrafts");
    }
  }
);

const initialState = {
  aircrafts: [],
  status: "idle",
  error: null,
};

const aircraftsSlice = createSlice({
  name: "aircrafts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAircrafts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAircrafts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.aircrafts = action.payload;
      })
      .addCase(fetchAircrafts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchRankedAircrafts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRankedAircrafts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.aircrafts = action.payload;
      })
      .addCase(fetchRankedAircrafts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default aircraftsSlice.reducer;
