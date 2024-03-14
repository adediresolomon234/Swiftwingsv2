import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Validation function for sign up
const validateSignUp = (user) => {
  if (!user.email || !user.password || !user.reenterPassword) {
    throw new Error('Email, password, and re-enter password are required');
  }
};

// Validation function for profile
const validateProfile = (profile) => {
  if (!profile.firstName || !profile.lastName || !profile.phoneNumber) {
    throw new Error('First name, last name, and phone number are required');
  }
};

// Async thunks
export const signUpUser = createAsyncThunk('auth/register', async (user, { rejectWithValue, dispatch }) => {
  try {
    validateSignUp(user);
    const response = await axios.post('https://swiftwings-mw-staging.onrender.com/api/v1/user/add', {
      email: user.email,
      password: user.password,
    });
    dispatch(signUpSuccess(response.data));
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const signInUser = createAsyncThunk('auth/login', async (user, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.post('https://swiftwings-mw-staging.onrender.com/api/v1/user/login', user);
    dispatch(signInSuccess(response.data));
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const createUserProfile = createAsyncThunk('auth/createProfile', async (profile, { rejectWithValue }) => {
  try {
    validateProfile(profile);
    // Assuming there's another API endpoint for updating user profile
    const response = await axios.put(`https://swiftwings-mw-staging.onrender.com/api/v1/user/${profile._id}`, profile);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, profile: null, status: 'idle', error: null },
  reducers: {
    signUpSuccess: (state, action) => {
      state.user = action.payload;
      state.status = 'succeeded';
    },
    signInSuccess: (state, action) => {
      state.user = action.payload;
      state.status = 'succeeded';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(createUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { signUpSuccess, signInSuccess } = authSlice.actions;

export default authSlice.reducer;
