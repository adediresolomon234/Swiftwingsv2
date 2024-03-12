import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async ({ email, password, confirmPassword }, { rejectWithValue }) => {
    if (password !== confirmPassword) {
      return rejectWithValue('Passwords do not match.');
    }
    try {
      const response = await axios.post('https://swiftwings-mw-staging.onrender.com/api/v1/user/add', { email, password });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      if (error.response.status === 409) {
        return rejectWithValue('Email already exists.');
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://swiftwings-mw-staging.onrender.com/api/v1/user/login', userData);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      if (error.response.status === 404) {
        return rejectWithValue('The email you entered is not registered.');
      }
      if (error.response.status === 401) {
        return rejectWithValue('The password you entered is incorrect.');
      }
      const message = error.response.data.message || 'An error occurred during sign-in.';
      return rejectWithValue(message);
    }
  }
);

export const createUserProfile = createAsyncThunk(
  'auth/createUserProfile',
  async ({ title, firstName, lastName, phoneNumber, receiveInformation }, { getState, rejectWithValue }) => {
    const { token } = getState().auth; 
    if (!token) {
      return rejectWithValue('No authentication token found.');
    }
    try {
      const response = await axios.post('https://swiftwings-mw-staging.onrender.com/api/v1/user/add', {
        title,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        receive_information: receiveInformation
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
  'auth/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://swiftwings-mw-staging.onrender.com/api/v1/user/all');
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
  name: 'auth',
  initialState,
  reducers: {
    userProfileCreationSuccess: (state, action) => {
      // You can update state here if needed
    },
    userProfileCreationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
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
        state.users.push(action.payload);
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
      });
  },
});

export const { userProfileCreationSuccess, userProfileCreationFailure } = authSlice.actions;

export default authSlice.reducer;
