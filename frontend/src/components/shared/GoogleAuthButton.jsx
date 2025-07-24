import { FcGoogle } from "./icons";
import { useGoogleAuth } from "./hooks";
import s from "./GoogleAuthButton.module.css";

const GoogleAuthButton = ({ text }) => {
  const { handleGoogleAuth } = useGoogleAuth();

  return (
    <button
      type="button"
      className={s.googleButton}
      onClick={handleGoogleAuth}
      aria-label="Sign in with Google"
    >
      <FcGoogle className={s.googleIcon} aria-hidden="true" />
      {text}
    </button>
  );
};

export default GoogleAuthButton;
