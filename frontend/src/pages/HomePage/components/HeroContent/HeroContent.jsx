import PropTypes from "prop-types";
import { FaPhone, FaRocket } from "@/components/shared/icons";
import Button from "@components/Button/Button";
import s from "./HeroContent.module.css";

const HeroContent = ({ isLoggedIn }) => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>
        Your contacts,
        <span className={s.titleAccent}> organized & secure</span>
      </h1>
      <p className={s.subtitle}>
        A modern, intuitive phonebook app that helps you manage your contacts
        with ease. Store, organize, and access your contacts anywhere, anytime.
      </p>
      <div className={s.actions}>
        <Button
          to={isLoggedIn ? "/contacts" : "/register"}
          variant="primary"
          size="lg"
          className={s.actionButton}
        >
          {isLoggedIn ? (
            <>
              <FaPhone style={{ marginRight: "8px" }} />
              Go to Contacts
            </>
          ) : (
            <>
              <FaRocket style={{ marginRight: "8px" }} />
              Get Started
            </>
          )}
        </Button>
        {!isLoggedIn && (
          <Button
            to="/login"
            variant="secondary"
            size="lg"
            className={s.actionButton}
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
};

HeroContent.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default HeroContent;
