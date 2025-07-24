import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

const setAuthHeader = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  api.defaults.headers.common.Authorization = "";
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && token !== "undefined" && token !== "null") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      clearAuthHeader();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post("/auth/register", credentials);

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post("/auth/login", credentials);

      localStorage.setItem("token", data.data.accessToken);
      setAuthHeader(data.data.accessToken);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await api.post("/auth/logout");
    localStorage.removeItem("token");
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message
    );
  }
});

export const refresh = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
  try {
    const { data } = await api.post("/auth/refresh");
    localStorage.setItem("token", data.data.accessToken);
    setAuthHeader(data.data.accessToken);
    return data.data;
  } catch (error) {
    localStorage.removeItem("token");
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message
    );
  }
});

export const requestResetEmail = createAsyncThunk(
  "auth/requestResetEmail",
  async (email, thunkAPI) => {
    try {
      const { data } = await api.post("/auth/send-reset-email", { email });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (resetData, thunkAPI) => {
    try {
      const { data } = await api.post("/auth/reset-pwd", resetData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const googleAuthSuccess = createAsyncThunk(
  "auth/googleAuthSuccess",
  async (token, thunkAPI) => {
    try {
      localStorage.setItem("token", token);
      setAuthHeader(token);

      const { data } = await api.get("/auth/me");
      return {
        user: data.data.user,
        accessToken: token,
      };
    } catch (error) {
      localStorage.removeItem("token");
      clearAuthHeader();
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      setAuthHeader(persistedToken);
      const { data } = await api.get("/users/current");
      return data;
    } catch (error) {
      localStorage.removeItem("token");
      clearAuthHeader();
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
