import { NavLink } from "react-router-dom";
import { FaHome, FaAddressBook } from "@/components/shared/icons";
import s from "./Navigation.module.css";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "@/redux/auth/selectors";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const Navigation = ({ className = "" }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <nav className={`${s.nav} ${className}`}>
      <NavLink to="/" className={buildLinkClass} aria-label="Home">
        <FaHome className={s.linkIcon} />
        <span className={s.linkText}>Home</span>
      </NavLink>

      {isLoggedIn && (
        <NavLink
          to="/contacts"
          className={buildLinkClass}
          aria-label="Contacts"
        >
          <FaAddressBook className={s.linkIcon} />
          <span className={s.linkText}>Contacts</span>
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
