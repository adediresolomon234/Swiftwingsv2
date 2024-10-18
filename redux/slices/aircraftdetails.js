import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/constant";

export const fetchAircrafts = createAsyncThunk(
  "aircrafts/fetchAircrafts",
  async () => {
    try {
      const response = await axios.get(`${API_URL}/aircraft/all`);

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
        features: {
          manufacturer: aircraft.manufacturer,
          classification: aircraft.classification,
          no_of_seats: aircraft.no_of_seats,
          interior_height: aircraft.interior_height,
          interior_width: aircraft.interior_width,
          overview_summary: aircraft.overview_summary,
        },
      }));
      console.log("aircraftsData", aircraftsData);

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
      });
  },
});

export default aircraftsSlice.reducer;
