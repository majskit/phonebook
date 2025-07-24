import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
  updateContact,
  getContactById,
} from "./operations";
import { logout } from "../auth/operations";

const initialState = {
  items: [],
  currentContact: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    perPage: 10,
    totalItems: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  },
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    clearCurrentContact: (state) => {
      state.currentContact = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload.data;
        state.pagination = {
          page: action.payload.page,
          perPage: action.payload.perPage,
          totalItems: action.payload.totalItems,
          totalPages: action.payload.totalPages,
          hasPreviousPage: action.payload.hasPreviousPage,
          hasNextPage: action.payload.hasNextPage,
        };
        state.loading = false;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.currentContact = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(getContactById.fulfilled, (state, action) => {
        state.currentContact = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(logout.fulfilled, () => {
        return initialState;
      })
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          addContact.pending,
          deleteContact.pending,
          updateContact.pending,
          getContactById.pending
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          addContact.rejected,
          deleteContact.rejected,
          updateContact.rejected,
          getContactById.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearCurrentContact, clearError } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
