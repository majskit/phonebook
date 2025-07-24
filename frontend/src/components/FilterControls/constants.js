import { FaSort, FaStar, FaUser, FaBriefcase, FaHome } from "../shared/icons";

const CONTACT_TYPES = {
  personal: { label: "Personal", icon: FaUser },
  work: { label: "Work", icon: FaBriefcase },
  home: { label: "Home", icon: FaHome },
};

const SORT_LABELS = {
  name: "Name",
  phoneNumber: "Phone",
  email: "Email",
  contactType: "Type",
  createdAt: "Date",
};

export const getActiveFiltersDisplay = ({
  contactType,
  sortBy,
  sortOrder,
  isFavourite,
}) => {
  const filters = [];

  if (contactType !== "all") {
    filters.push({
      key: "contactType",
      label: CONTACT_TYPES[contactType]?.label || contactType,
      icon: CONTACT_TYPES[contactType]?.icon,
    });
  }

  if (isFavourite !== null) {
    filters.push({
      key: "isFavourite",
      label: isFavourite ? "Favorites" : "Non-favorites",
      icon: FaStar,
    });
  }

  if (sortBy !== "name" || sortOrder !== "asc") {
    filters.push({
      key: "sort",
      label: `${SORT_LABELS[sortBy] || sortBy} (${
        sortOrder === "asc" ? "A-Z" : "Z-A"
      })`,
      icon: FaSort,
    });
  }

  return filters;
};
