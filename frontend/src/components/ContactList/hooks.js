import { useMemo } from "react";

export const useContactFilters = ({
  page,
  perPage,
  sortBy,
  sortOrder,
  nameFilter,
  contactTypeFilter,
  favouriteFilter,
}) => {
  const filters = useMemo(() => {
    const filtersObj = {
      page,
      perPage,
      sortBy,
      sortOrder,
    };

    if (nameFilter) {
      filtersObj.name = nameFilter;
    }

    if (contactTypeFilter && contactTypeFilter !== "all") {
      filtersObj.contactType = contactTypeFilter;
    }

    if (favouriteFilter !== null) {
      filtersObj.isFavourite = favouriteFilter;
    }

    return filtersObj;
  }, [
    page,
    perPage,
    sortBy,
    sortOrder,
    nameFilter,
    contactTypeFilter,
    favouriteFilter,
  ]);

  const hasFilters = useMemo(() => {
    return (
      nameFilter || contactTypeFilter !== "all" || favouriteFilter !== null
    );
  }, [nameFilter, contactTypeFilter, favouriteFilter]);

  return { filters, hasFilters };
};
