import { useState, useMemo } from "react";
import { FaSort, FaTimes } from "../shared/icons";
import { useFilterControls } from "./hooks";
import { getActiveFiltersDisplay } from "./constants";
import s from "./FilterControls.module.css";

const FilterControls = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    contactType,
    sortBy,
    sortOrder,
    isFavourite,
    hasActiveFilters,
    activeFiltersCount,
    handleFilterChange,
    removeFilter,
    clearAllFilters,
  } = useFilterControls();

  const activeFilters = useMemo(
    () =>
      getActiveFiltersDisplay({ contactType, sortBy, sortOrder, isFavourite }),
    [contactType, sortBy, sortOrder, isFavourite]
  );

  return (
    <div className={s.filterControls}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${s.filterToggle} ${
          hasActiveFilters ? s.filterToggleActive : ""
        }`}
        aria-expanded={isOpen}
      >
        <FaSort />
        <span>Sort & Filter</span>
        {hasActiveFilters && (
          <span className={s.badge}>{activeFiltersCount}</span>
        )}
      </button>

      {activeFilters.length > 0 && (
        <div className={s.activeFilters}>
          {activeFilters.map((filter, index) => {
            const IconComponent = filter.icon;
            return (
              <div key={`${filter.key}-${index}`} className={s.filterTag}>
                {IconComponent && <IconComponent className={s.filterTagIcon} />}
                <span>{filter.label}</span>
                <button
                  onClick={() => removeFilter(filter.key)}
                  className={s.filterTagRemove}
                >
                  <FaTimes />
                </button>
              </div>
            );
          })}
          {activeFilters.length > 1 && (
            <button onClick={clearAllFilters} className={s.clearAllBtn}>
              Clear All
            </button>
          )}
        </div>
      )}

      {isOpen && (
        <div className={s.filterPanel} onClick={() => setIsOpen(false)}>
          <div className={s.filterContent} onClick={(e) => e.stopPropagation()}>
            <div className={s.filterHeader}>
              <h4>Filter & Sort</h4>
              <button onClick={() => setIsOpen(false)} className={s.closeBtn}>
                <FaTimes />
              </button>
            </div>

            <div className={s.filterGroup}>
              <label htmlFor="contactType" className={s.label}>
                Contact Type:
              </label>
              <select
                id="contactType"
                value={contactType}
                onChange={(e) =>
                  handleFilterChange("contactType", e.target.value)
                }
                className={s.select}
              >
                <option value="all">All Types</option>
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="home">Home</option>
              </select>
            </div>

            <div className={s.filterGroup}>
              <label htmlFor="isFavourite" className={s.label}>
                Favorites:
              </label>
              <select
                id="isFavourite"
                value={isFavourite === null ? "" : isFavourite.toString()}
                onChange={(e) =>
                  handleFilterChange(
                    "isFavourite",
                    e.target.value === "" ? null : e.target.value === "true"
                  )
                }
                className={s.select}
              >
                <option value="">All Contacts</option>
                <option value="true">Favorites Only</option>
                <option value="false">Non-favorites Only</option>
              </select>
            </div>

            <div className={s.filterGroup}>
              <label htmlFor="sortBy" className={s.label}>
                Sort By:
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                className={s.select}
              >
                <option value="name">Name</option>
                <option value="phoneNumber">Phone Number</option>
                <option value="email">Email</option>
                <option value="contactType">Contact Type</option>
                <option value="createdAt">Date Created</option>
              </select>
            </div>

            <div className={s.filterGroup}>
              <label htmlFor="sortOrder" className={s.label}>
                Sort Order:
              </label>
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={(e) =>
                  handleFilterChange("sortOrder", e.target.value)
                }
                className={s.select}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <div className={s.filterActions}>
              <button onClick={clearAllFilters} className={s.clearBtn}>
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;
