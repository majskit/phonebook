import { useDispatch, useSelector } from "react-redux";
import { FaSearch, FaTimes } from "@/components/shared/icons";
import { selectFilterName } from "@/redux/filters/selectors";
import { changeFilter } from "@/redux/filters/slice";
import s from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filterName = useSelector(selectFilterName);

  const clearSearch = () => {
    dispatch(changeFilter(""));
  };

  return (
    <div className={s.searchBox}>
      <div className={s.searchInputWrapper}>
        <FaSearch className={s.searchIcon} />
        <input
          type="text"
          value={filterName}
          onChange={(e) => {
            dispatch(changeFilter(e.target.value));
          }}
          placeholder="Search contacts by name..."
          className={s.searchInput}
        />
        {filterName && (
          <button onClick={clearSearch} className={s.clearButton}>
            <FaTimes />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
