import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../auth/operations";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (params = {}, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth?.token;

      if (!token) {
        return thunkAPI.rejectWithValue("Authentication required");
      }

      const searchParams = new URLSearchParams();

      if (params.page) searchParams.append("page", params.page);
      if (params.perPage) searchParams.append("perPage", params.perPage);
      if (params.sortBy) searchParams.append("sortBy", params.sortBy);
      if (params.sortOrder) searchParams.append("sortOrder", params.sortOrder);
      if (params.name) searchParams.append("name", params.name);
      if (params.phoneNumber)
        searchParams.append("phoneNumber", params.phoneNumber);
      if (params.email) searchParams.append("email", params.email);
      if (params.isFavourite !== undefined)
        searchParams.append("isFavourite", params.isFavourite);
      if (params.contactType)
        searchParams.append("contactType", params.contactType);

      const queryString = searchParams.toString();
      const url = queryString ? `/contacts?${queryString}` : "/contacts";

      const { data } = await api.get(url);
      return data.data;
    } catch (error) {
      if (error.response?.status === 401) {
        return thunkAPI.rejectWithValue(
          "Authentication failed. Please log in again."
        );
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contactData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth?.token;

      if (!token) {
        return thunkAPI.rejectWithValue("Authentication required");
      }

      if (contactData.photo) {
        const formData = new FormData();
        formData.append("name", contactData.name);
        formData.append("phoneNumber", contactData.phoneNumber);
        if (contactData.email) formData.append("email", contactData.email);
        formData.append("contactType", contactData.contactType);
        if (contactData.isFavourite !== undefined) {
          formData.append("isFavourite", contactData.isFavourite);
        }
        formData.append("photo", contactData.photo);

        const { data } = await api.post("/contacts", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return data.data;
      } else {
        const { data } = await api.post("/contacts", {
          name: contactData.name,
          phoneNumber: contactData.phoneNumber,
          email: contactData.email || undefined,
          contactType: contactData.contactType,
          isFavourite: contactData.isFavourite,
        });
        return data.data;
      }
    } catch (error) {
      if (error.response?.status === 401) {
        return thunkAPI.rejectWithValue(
          "Authentication failed. Please log in again."
        );
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ id, contactData }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth?.token;

      if (!token) {
        return thunkAPI.rejectWithValue("Authentication required");
      }

      const formData = new FormData();

      if (contactData.name) formData.append("name", contactData.name);
      if (contactData.phoneNumber)
        formData.append("phoneNumber", contactData.phoneNumber);
      if (contactData.email) formData.append("email", contactData.email);
      if (contactData.contactType)
        formData.append("contactType", contactData.contactType);
      if (contactData.isFavourite !== undefined) {
        formData.append("isFavourite", contactData.isFavourite);
      }

      if (contactData.photo) {
        formData.append("photo", contactData.photo);
      }

      const { data } = await api.patch(`/contacts/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data.data;
    } catch (error) {
      if (error.response?.status === 401) {
        return thunkAPI.rejectWithValue(
          "Authentication failed. Please log in again."
        );
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth?.token;

      if (!token) {
        return thunkAPI.rejectWithValue("Authentication required");
      }

      await api.delete(`/contacts/${id}`);
      return id;
    } catch (error) {
      if (error.response?.status === 401) {
        return thunkAPI.rejectWithValue(
          "Authentication failed. Please log in again."
        );
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getContactById = createAsyncThunk(
  "contacts/getContactById",
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth?.token;

      if (!token) {
        return thunkAPI.rejectWithValue("Authentication required");
      }

      const { data } = await api.get(`/contacts/${id}`);
      return data.data;
    } catch (error) {
      if (error.response?.status === 401) {
        return thunkAPI.rejectWithValue(
          "Authentication failed. Please log in again."
        );
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
