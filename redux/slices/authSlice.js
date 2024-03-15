import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Validation functions
const validateSignUp = (user) => {
  if (!user.email || !user.password || !user.reenterPassword) {
    throw new Error('Email, password, and re-enter password are required');
  }
};

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

export const signInUser = createAsyncThunk('auth/signInUser', async (userCredentials, { rejectWithValue }) => {
  try {
    const request = await axios.post('https://swiftwings-mw-staging.onrender.com/api/v1/user/login', userCredentials);
    const response = await request.data.data;
    localStorage.setItem('user', JSON.stringify(response));
    return response;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      return rejectWithValue('Invalid email or password');
    }
    return rejectWithValue(err.response?.data || 'An error occurred');
  }
});

export const createUserProfile = createAsyncThunk('auth/createProfile', async (profile, { rejectWithValue }) => {
  try {
    validateProfile(profile);
   
    const response = await axios.put(`https://swiftwings-mw-staging.onrender.com/api/v1/user/${profile._id}`, profile);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || 'An error occurred');
  }
});

// Selectors
export const selectAuthStatus = (state) => state.user.status;
export const selectAuthError = (state) => state.user.error;

// Slice
const authSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    profile: null,
    status: 'idle',
    error: null,
    isLoggedIn: false,
  },
  reducers: {
    signUpSuccess: (state, action) => {
      state.user = action.payload;
      state.status = 'succeeded';
    },
    signInSuccess: (state, action) => {
      state.user = action.payload;
      state.status = 'succeeded';
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = 'idle';
        state.user = null;
        state.error = action.payload || 'An error occurred';
      })
      .addCase(createUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(createUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'An error occurred';
      });
  },
});

export const { signUpSuccess, signInSuccess } = authSlice.actions;
export default authSlice.reducer;
