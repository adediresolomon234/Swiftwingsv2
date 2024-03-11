// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for signing up a user
export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/signup', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for signing in a user
export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/signin', userData);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      const message = error.response.data.message || 'An error occurred during sign-in.';
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      });
  },
});

export default authSlice.reducer;
