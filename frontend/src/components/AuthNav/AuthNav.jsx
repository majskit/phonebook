import Button from "../Button/Button";
import s from "./AuthNav.module.css";

const AuthNav = ({ className = "", size = "md" }) => {
  return (
    <nav
      className={`${s.authNav} ${className}`}
      role="navigation"
      aria-label="Authentication"
    >
      <Button to="/login" variant="secondary" size={size}>
        Sign In
      </Button>
      <Button to="/register" variant="primary" size={size}>
        Sign Up
      </Button>
    </nav>
  );
};

export default AuthNav;
