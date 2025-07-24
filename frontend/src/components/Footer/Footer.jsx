import { FooterBrand, FooterSocialLinks } from "./components";
import s from "./Footer.module.css";
import { FaHeart } from "@components/shared/icons"; // Adjust the import path as necessary

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.content}>
          <FooterBrand />

          <div className={s.links}>
            <FooterSocialLinks />
          </div>
        </div>

        <div className={s.bottom}>
          <div className={s.bottomContent}>
            <p className={s.copyright}>
              © {currentYear} PhoneBook. All rights reserved.
            </p>
            <p className={s.madeWith}>
              Made with{" "}
              <FaHeart
                color="red"
                size={16}
                style={{ verticalAlign: "middle" }}
              />{" "}
              for better contact management
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
