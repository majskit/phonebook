import { createSlice } from "@reduxjs/toolkit";
import {
  googleAuthSuccess,
  login,
  logout,
  refresh,
  register,
  requestResetEmail,
  resetPassword,
} from "./operations";

const initialState = {
  user: { name: null, email: null },
  token: localStorage.getItem("token") || null,
  isLoggedIn: !!localStorage.getItem("token"),
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, () => {
        localStorage.removeItem("token");
        return {
          ...initialState,
          token: null,
        };
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
      })

      // Refresh
      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(refresh.rejected, (state) => {
        localStorage.removeItem("token");
        state.isRefreshing = false;
        state.token = null;
        state.isLoggedIn = false;
        state.user = { name: null, email: null };
      })

      // Request reset email
      .addCase(requestResetEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestResetEmail.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(requestResetEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Reset password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(googleAuthSuccess.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(googleAuthSuccess.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(googleAuthSuccess.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;
export const authReducer = authSlice.reducer;
