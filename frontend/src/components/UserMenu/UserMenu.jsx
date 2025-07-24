import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaSignOutAlt } from "@/components/shared/icons";
import { selectUser } from "@/redux/auth/selectors";
import { logout } from "@/redux/auth/operations";
import s from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
    navigate("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className={s.container} ref={dropdownRef}>
      <button className={s.userButton} onClick={toggleDropdown}>
        <div className={s.avatar}>{user.name.charAt(0).toUpperCase()}</div>
        <span className={s.username}>{user.name}</span>
        <div className={`${s.dropdownIcon} ${isDropdownOpen ? s.rotated : ""}`}>
          <FaChevronDown />
        </div>
      </button>

      {isDropdownOpen && (
        <div className={s.dropdown}>
          <button
            className={`${s.dropdownItem} ${s.logoutItem}`}
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
