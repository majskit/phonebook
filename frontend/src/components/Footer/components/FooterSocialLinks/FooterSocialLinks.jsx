import { FaGithub, FaTwitter, FaLinkedin } from "../../../shared/icons";
import s from "./FooterSocialLinks.module.css";

const FooterSocialLinks = () => {
  return (
    <div className={s.socialSection}>
      <h4 className={s.socialTitle}>Connect</h4>
      <div className={s.socialLinks}>
        <a
          href="https://github.com"
          className={s.socialLink}
          aria-label="GitHub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={20} />
        </a>
        <a
          href="https://twitter.com"
          className={s.socialLink}
          aria-label="Twitter"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter size={20} />
        </a>
        <a
          href="https://linkedin.com"
          className={s.socialLink}
          aria-label="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={20} />
        </a>
      </div>
    </div>
  );
};

export default FooterSocialLinks;
