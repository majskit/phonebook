import { Link } from "react-router-dom";
import { FcContacts } from "@/components/shared/icons";
import s from "./Logo.module.css";

const Logo = () => {
  return (
    <Link to="/" className={s.logoLink}>
      <div className={s.logoContainer}>
        <FcContacts className={s.logoIcon} />
        <span className={s.logoText}>
          Phone<span className={s.accent}>Book</span>
        </span>
      </div>
    </Link>
  );
};

export default Logo;
