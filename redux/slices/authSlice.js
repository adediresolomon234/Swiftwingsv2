import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constant";

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/user/add`,
        payload
      );
      return response.data;
    } catch (error) {
      return error?.response?.data?.error;
    }
  }
);

export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/user/login`,
        userData
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      if (error.response.status === 404) {
        return rejectWithValue("The email you entered is not registered.");
      }
      if (error.response.status === 401) {
        return rejectWithValue("The password you entered is incorrect.");
      }
      // const message = error || "An error occurred during sign-in.";
      // return rejectWithValue(message);
      return error;
    }
  }
);

export const createUserProfile = createAsyncThunk(
  "auth/createUserProfile",
  async (
    { title, firstName, lastName, phoneNumber, receiveInformation },
    { getState, rejectWithValue }
  ) => {
    const { token } = getState().auth;
    if (!token) {
      return rejectWithValue("No authentication token found.");
    }
    try {
      const response = await axios.post(
        `${API_URL}/user/add`,
        {
          title,
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
          receive_information: receiveInformation,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  "auth/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/user/all`
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  user: null,
  token: null,
  users: [],
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUserState: (state) => {
      state.data = null;
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      })
      .addCase(signInUser.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      })
      .addCase(createUserProfile.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(createUserProfile.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(createUserProfile.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.action.payload;
      });
  },
});

export const { clearUserState } = authSlice.actions;

export default authSlice.reducer;
