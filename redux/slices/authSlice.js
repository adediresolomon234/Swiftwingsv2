import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constant";
import { getUser } from "../../utils/utils";

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/user/add`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/user/verify-email`,
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const resendVerification = createAsyncThunk(
  "auth/resendVerification",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/user/resend-verification`,
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/user/reset-password`,
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/user/login`, userData);
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
      return rejectWithValue(error?.response?.data?.error || "An error occurred during sign-in.");
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
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  "auth/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/user/all`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const getSubscriptionData = createAsyncThunk(
  "auth/getSubscriptionData",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/user/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${getUser().token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "An error occurred."
      );
    }
  }
);

export const startFreeTrial = createAsyncThunk(
  "auth/startFreeTrial",
  async (_, { getState, rejectWithValue }) => {
    const { token, user } = getState().auth;
    if (!token || !user) {
      return rejectWithValue("User not authenticated.");
    }
    try {
      const response = await axios.post(
        `${API_URL}/user/start-free-trial`,
        { userId: user.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to start free trial."
      );
    }
  }
);

const initialState = {
  user: null,
  token: null,
  subscription: null,
  users: [],
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUserState: (state) => {
      state.user = null;
      state.token = null;
      state.subscription = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(createUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSubscriptionData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubscriptionData.fulfilled, (state, action) => {
        state.loading = false;
        state.subscription = action.payload.subscription;
      })
      .addCase(getSubscriptionData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(startFreeTrial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startFreeTrial.fulfilled, (state, action) => {
        state.loading = false;
        state.subscription = action.payload.subscription || { plan: "free" };
      })
      .addCase(startFreeTrial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserState } = authSlice.actions;

export default authSlice.reducer;