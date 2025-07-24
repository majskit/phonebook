import Logo from "../../../Logo/Logo";
import s from "./FooterBrand.module.css";

const FooterBrand = () => {
  return (
    <div className={s.brand}>
      <Logo />
      <p className={s.tagline}>Your contacts, organized and secure</p>
    </div>
  );
};

export default FooterBrand;
