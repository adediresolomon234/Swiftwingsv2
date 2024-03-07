import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cors from "cors";
import { fetchAirportsData } from "@/utils/api";

// Initializing the cors middleware
// const cors = Cors({
//   methods: ["GET"], // Add the allowed methods
// });

export const getGithubAccount = createAsyncThunk("github/user", async () => {
  try {
    const response = await axios.get(
      "https://dir.aviapages.com/api/airports/?per_page=50",
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
});

const githubSlice = createSlice({
  name: "github",
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
      .addCase(getGithubAccount.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getGithubAccount.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getGithubAccount.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearUserState } = githubSlice.actions;

export default githubSlice.reducer;
