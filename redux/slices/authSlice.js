import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    msg: "",
    user: "",
    token: "",
    loading: false,
    error: ""
}

export const signUpUser = createAsyncThunk("auth/signupUser", async (user) => {
    const response = await axios.post("", user);
    return response.data;
})

export const signInUser = createAsyncThunk("auth/signinUser", async (user) => {
    const response = await axios.post("", user);
    return response.data;
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addToken: (state) => {
            state.token = localStorage.getItem("token")
        },
        addUser: (state) => {
            state.user = localStorage.getItem("user")
        },
        logout: (state) => {
            state.token = null;
            localStorage.clear();
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUpUser.pending, (state) => {
                state.loading = true;
                state.error = ""; // Clear any previous error
            })
            .addCase(signUpUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                if (payload.error) {
                    state.error = payload.error;
                } else {
                    state.msg = payload.msg;
                    state.user = payload.user;
                    state.token = payload.token;
                }
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Store the error message
            })
            .addCase(signInUser.pending, (state) => {
                state.loading = true;
                state.error = ""; // Clear any previous error
            })
            .addCase(signInUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                if (payload.error) {
                    state.error = payload.error;
                } else {
                    state.msg = payload.msg;
                    state.user = payload.user;
                    state.token = payload.token;

                    localStorage.setItem('msg', payload.msg)
                    localStorage.setItem('token', payload.token)
                    localStorage.setItem('user', JSON.stringify(payload.user))
                }
            })
            .addCase(signInUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Store the error message
            });
    }
})

export const { addToken, addUser, logout } = authSlice.actions;
export default authSlice.reducer;