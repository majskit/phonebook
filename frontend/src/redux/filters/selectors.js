export const selectFilter = (state) => state.filters.name;
export const selectFilterName = (state) => state.filters.name;
export const selectContactTypeFilter = (state) => state.filters.contactType;
export const selectFavouriteFilter = (state) => state.filters.isFavourite;
export const selectSortBy = (state) => state.filters.sortBy;
export const selectSortOrder = (state) => state.filters.sortOrder;
export const selectPage = (state) => state.filters.page;
export const selectPerPage = (state) => state.filters.perPage;

export const selectAllFilters = (state) => state.filters;
