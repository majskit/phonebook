import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  contactType: "all",
  isFavourite: null,
  sortBy: "name",
  sortOrder: "asc",
  page: 1,
  perPage: 10,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.name = action.payload;
      state.page = 1;
    },
    changeContactType: (state, action) => {
      state.contactType = action.payload;
      state.page = 1;
    },
    changeFavouriteFilter: (state, action) => {
      state.isFavourite = action.payload;
      state.page = 1;
    },
    changeSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.page = 1;
    },
    changeSortOrder: (state, action) => {
      state.sortOrder = action.payload;
      state.page = 1;
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    changePerPage: (state, action) => {
      state.perPage = action.payload;
      state.page = 1;
    },
    resetFilters: (state) => {
      state.name = "";
      state.contactType = "all";
      state.isFavourite = null;
      state.sortBy = "name";
      state.sortOrder = "asc";
      state.page = 1;
    },
  },
});

export const {
  changeFilter,
  changeContactType,
  changeFavouriteFilter,
  changeSortBy,
  changeSortOrder,
  changePage,
  changePerPage,
  resetFilters,
} = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
