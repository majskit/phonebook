import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectContactTypeFilter,
  selectFavouriteFilter,
  selectSortBy,
  selectSortOrder,
} from "../../redux/filters/selectors";
import {
  changeContactType,
  changeFavouriteFilter,
  changeSortBy,
  changeSortOrder,
  resetFilters,
} from "../../redux/filters/slice";

export const useFilterControls = () => {
  const dispatch = useDispatch();
  
  const contactType = useSelector(selectContactTypeFilter);
  const sortBy = useSelector(selectSortBy);
  const sortOrder = useSelector(selectSortOrder);
  const isFavourite = useSelector(selectFavouriteFilter);

  const hasActiveFilters = useMemo(() => (
    contactType !== "all" || isFavourite !== null || sortBy !== "name" || sortOrder !== "asc"
  ), [contactType, isFavourite, sortBy, sortOrder]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (contactType !== "all") count++;
    if (isFavourite !== null) count++;
    if (sortBy !== "name" || sortOrder !== "asc") count++;
    return count;
  }, [contactType, isFavourite, sortBy, sortOrder]);

  const handleFilterChange = useCallback((key, value) => {
    const actions = {
      contactType: () => dispatch(changeContactType(value)),
      sortBy: () => dispatch(changeSortBy(value)),
      sortOrder: () => dispatch(changeSortOrder(value)),
      isFavourite: () => dispatch(changeFavouriteFilter(value)),
    };
    actions[key]?.();
  }, [dispatch]);

  const removeFilter = useCallback((filterKey) => {
    const actions = {
      contactType: () => dispatch(changeContactType("all")),
      isFavourite: () => dispatch(changeFavouriteFilter(null)),
      sort: () => {
        dispatch(changeSortBy("name"));
        dispatch(changeSortOrder("asc"));
      },
    };
    actions[filterKey]?.();
  }, [dispatch]);

  const clearAllFilters = useCallback(() => dispatch(resetFilters()), [dispatch]);

  return {
    contactType, sortBy, sortOrder, isFavourite,
    hasActiveFilters, activeFiltersCount,
    handleFilterChange, removeFilter, clearAllFilters,
  };
};
